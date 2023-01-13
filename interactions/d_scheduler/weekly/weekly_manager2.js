const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { weekly_embed } = require("./weekly_embed");
const { weekly_row2 } = require("./weekly_row2");

// weekly main
// embed, row

async function weekly_manager_update2 (interaction) {
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
        user_scheduler = {id, name: "주간"};
        data.scheduler = data.scheduler.concat(user_scheduler);
    }
    else
        user_scheduler.name = "주간";

    // weekly_embed
    const embed = await weekly_embed(user, default_character);

    // weekly_row
    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("scheduler_menu")
                .setPlaceholder(default_character)
                .addOptions(menu)
    );

    const row2 = await weekly_row2(user, default_character);

    await interaction.update({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

module.exports = {
    weekly_manager_update2,
}