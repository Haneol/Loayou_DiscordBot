const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { weekly_embed } = require("./weekly_embed");
const { weekly_sub_row } = require("./weekly_sub_row");

const check_buttons = [
    {
        customId: "check_back_weekly",
        label: "뒤로",
        style: "DANGER",
        async action(interaction) {
            let user_schedule_name = data.schedule_name.find(item => {
                return item.id === interaction.user.id
            });

            if(["주간 에포나", "주간 이벤트"].includes(user_schedule_name.name))
            {
                await weekly_sub_row(interaction, 0);
            }
            else if(["로웬", "유령선", "툴루비크"].includes(user_schedule_name.name))
            {
                await weekly_sub_row(interaction, 1);
            }
            else if(["오레하 2종", "6종 카드작", "낙원 3종", "카양겔"].includes(user_schedule_name.name))
            {
                await weekly_sub_row(interaction, 2);
            }else if(["도전 어비스", "도전 가디언"].includes(user_schedule_name.name))
            {
                await weekly_sub_row(interaction, 3);
            }
        }
    },
    {
        customId: "check_add_weekly",
        label: "+",
        style: "SUCCESS",
        async action(interaction) {
            const id = interaction.user.id;
            const character = await data.get_character(id);

            let user_schedule = data.schedule_name.find(item => {
                return item.id === id
            });
            await data.add(id, character, user_schedule.name);
            const new_user = await data.getActive(interaction.user.id);
            const embed = await weekly_embed(new_user, character);

            await interaction.update({embeds : [embed]});
        }
    },
    {
        customId: "check_sub_weekly",
        label: "-",
        style: "SUCCESS",
        async action(interaction) {
            const id = interaction.user.id;
            const character = await data.get_character(id);
            
            let user_schedule = data.schedule_name.find(item => {
                return item.id === id
            });
            await data.sub(id, character, user_schedule.name);
            const new_user = await data.getActive(interaction.user.id);
            const embed = await weekly_embed(new_user, character);

            await interaction.update({embeds : [embed]});
        }
    },
]

module.exports = {
    check_buttons,
    components : check_buttons
}