const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../../data_manager');
const { check_buttons } = require('../check_buttons');

module.exports = {
    customId: "주간 이벤트",
    label : "이벤트",
    style : "SECONDARY",
    disable : false,
    async action(interaction) {
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

        // 현재 버튼 이름 설정
        let user_schedule_name = data.schedule_name.find(item => {
            return item.id === id
        });
        if(!user_schedule_name)
        {
            user_schedule_name = {id, name: "주간 이벤트"};
            data.schedule_name = data.schedule_name.concat(user_schedule_name);
        }
        else
            user_schedule_name.name = "주간 이벤트";

        const row_arr = [];
        const row = new MessageActionRow()
            .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("scheduler_menu")
                        .setPlaceholder(character)
                        .addOptions(menu)
        );

        const row2 = new MessageActionRow()
            .addComponents(
                check_buttons.map((button) => {
                    return new MessageButton()
                        .setCustomId(button.customId)
                        .setLabel(button.label)
                        .setStyle(button.style);
                })
        );
        
        await interaction.update({ephemeral: true, components: row_arr.concat(row, row2)});
    }
}