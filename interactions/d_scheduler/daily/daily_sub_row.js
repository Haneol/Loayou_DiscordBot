const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const data = require('../data_manager');

async function daily_sub_row(interaction, num) {
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
        const buttonFiles = fs.readdirSync(`${__dirname}/daily_quest`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/daily_quest/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }
    else
    {
        const buttonFiles = fs.readdirSync(`${__dirname}/daily_compass`).filter(file => file.endsWith('.js'));
        for (let i in buttonFiles) {
            const button = require(`${__dirname}/daily_compass/${buttonFiles[i]}`);
            buttons.push(button);
        }
    }

    let tmp = ["daily_back"];
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
    })

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

    const division = (arr, n) => {
        const length = arr.length;
        const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
        const newArray = [];
        
        for (let i = 0; i < divide; i++) {
            newArray.push(arr.splice(0, n)); 
        }
        
        return newArray;
    }
    
    const newButtons = (num === 0) ? division(buttons, 4) : division(buttons, 5);


    let row2 = [];
    newButtons.map((buttons) => {
        const tmp_row = new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setDisabled(button.disable)
                .setStyle(button.style);
            })
        )  
        row2 = row2.concat(tmp_row);
    })
    
    await interaction.update({components: row_arr.concat(row, row2)});
}

module.exports = {
    daily_sub_row,
}