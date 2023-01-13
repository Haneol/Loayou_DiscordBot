const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const data = require('../data_manager');

async function weekly_sub_row(interaction, num) {
    const user = await data.getActive(interaction.user.id);
    const characters = Object.keys(user)
    const id = interaction.user.id;
    const character = await data.get_character(id);

    const menu = [];
    characters.pop(); 
    for(let i in characters)
    {
        const submenu = {
            label: characters[i],
            value: characters[i]
        }
        menu.push(submenu);
    }

    const row_arr = [];

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(character)
                .addOptions(menu)
    );

    // 폴더 안 버튼들 하나로 모으기
    let buttons = [];
    // 윈도우&리눅스 변경 필요 : 수정
    if(num === 0)
    {
        const buttonFiles = fs.readdirSync(`${__dirname}/weekly_quest`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/weekly_quest/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }
    else if(num === 1)
    {
        const buttonFiles = fs.readdirSync(`${__dirname}/weekly_compass`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/weekly_compass/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }
    else if(num === 2)
    {
        const buttonFiles = fs.readdirSync(`${__dirname}/weekly_abyss`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/weekly_abyss/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }
    else if(num === 3)
    {
        const buttonFiles = fs.readdirSync(`${__dirname}/weekly_shared`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/weekly_shared/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }

    let tmp = ["weekly_back"];
    const schedule_list = user[character];
    schedule_list.map( item => {
        if(!tmp.includes(`${item.name}`))
        {
            if(!item.option)
            {
                tmp = tmp.concat(`${item.name}`);
            }
            else
            {
                const curr = new Date();
                const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
                const KR_TIME_DIFF = 3 * 60 * 60 * 1000;
                const kr_curr = new Date(utc + (KR_TIME_DIFF));
                const today = kr_curr.getDay();

                let arr = [];
                arr = arr.concat(item.option);

                if(arr.includes(today))
                {
                    tmp = tmp.concat(`${item.name}`);
                }
            }
        }
    });

    const shared_list = user.shared;
    shared_list.map( item => {
        if(!tmp.includes(`${item.name}`))
        {
            tmp = tmp.concat(`${item.name}`);
        }
    });

    buttons.filter((button) => {
        if(!tmp.includes(button.customId))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
        }
    })

    const row2 = new MessageActionRow().addComponents(
        buttons.map((button) => {
            return new MessageButton()
            .setCustomId(button.customId)
            .setLabel(button.label)
            .setDisabled(button.disable)
            .setStyle(button.style);
        })
    )  

    
    await interaction.update({components: row_arr.concat(row, row2)});
}

module.exports = {
    weekly_sub_row,
}