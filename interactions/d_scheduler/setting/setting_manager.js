const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { setting_embed } = require("./setting_embed");
const { setting_row } = require("./setting_row");

// setting main
// embed, row

async function setting_manager (interaction) {
    const user = await data.getActive(interaction.user.id);
    const characters = Object.keys(user);
    const id = interaction.user.id;
    
    // 현재 검색 중인 캐릭터 인덱스 설정
    const default_character = await data.get_character(id);

    // 캐릭터 context menu 생성
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

    // setting_embed
    const embed = await setting_embed(user, default_character);

    // setting_row
    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(default_character)
                .addOptions(menu)
    );

    const row2 = await setting_row(user, default_character);

    await interaction.reply({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

async function setting_manager_update (interaction) {
    const user = await data.getActive(interaction.user.id);
    const characters = Object.keys(user);
    const id = interaction.user.id;
    
    // 현재 검색 중인 캐릭터 인덱스 설정
    const default_character = await data.get_character(id);
    
    // 캐릭터 context menu 생성
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

    let user_scheduler = data.scheduler.find(item => {
        return item.id === id
    });
    if(!user_scheduler)
    {
        user_scheduler = {id, name: "설정"};
        data.scheduler = data.scheduler.concat(user_scheduler);
    }
    else
        user_scheduler.name = "설정";

    // setting_embed
    const embed = await setting_embed(user, default_character);

    // setting_row
    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(default_character)
                .addOptions(menu)
    );

    const row2 = await setting_row(id);

    await interaction.update({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

module.exports = {
    setting_manager,
    setting_manager_update,
}