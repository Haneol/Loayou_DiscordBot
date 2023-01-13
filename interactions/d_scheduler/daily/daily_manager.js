const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { daily_embed } = require("./daily_embed");
const { daily_row } = require("./daily_row");

// daily main
// embed, row

async function daily_manager (interaction) {
    const user = await data.getActive(interaction.user.id);
    const id = interaction.user.id;
    const characters = Object.keys(user);
    // 현재 검색 중인 캐릭터 인덱스 설정
    const default_character = await data.get_character(id);
    
    let user_scheduler = data.scheduler.find(item => {
        return item.id === id
    });
    if(!user_scheduler)
    {
        user_scheduler = {id, name: "일일"};
        data.scheduler = data.scheduler.concat(user_scheduler);
    }
    else
        user_scheduler.name = "일일";

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

    // daily_embed
    const embed = await daily_embed(user, default_character);

    // daily_row
    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(default_character)
                .addOptions(menu)
    );

    const row2 = await daily_row(user, default_character);

    await interaction.reply({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

async function daily_manager_update (interaction) {
    const user = await data.getActive(interaction.user.id);
    const characters = Object.keys(user);
    const id = interaction.user.id;
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
        user_scheduler = {id, name: "일일"};
        data.scheduler = data.scheduler.concat(user_scheduler);
    }
    else
        user_scheduler.name = "일일";

    // daily_embed
    const embed = await daily_embed(user, default_character);

    // daily_row
    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(default_character)
                .addOptions(menu)
    );

    const row2 = await daily_row(user, default_character);

    await interaction.update({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

module.exports = {
    daily_manager,
    daily_manager_update,
}