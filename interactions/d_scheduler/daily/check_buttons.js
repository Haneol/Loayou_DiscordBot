const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { daily_embed } = require("./daily_embed");
const { daily_sub_row } = require("./daily_sub_row");

const check_buttons = [
    {
        customId: "check_back_daily",
        label: "뒤로",
        style: "DANGER",
        async action(interaction) {
            let user_schedule_name = data.schedule_name.find(item => {
                return item.id === interaction.user.id
            });

            if(["카오스 던전", "가디언 토벌", "일일 에포나", "일일 이벤트", "비탄의 섬"].includes(user_schedule_name.name))
            {
                await daily_sub_row(interaction, 0);
            }else if(["모험섬", "카오스게이트", "필드보스", "점령전"].includes(user_schedule_name.name))
            {
                await daily_sub_row(interaction, 1);
            }
        }
    },
    {
        customId: "check_add_daily",
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
            const embed = await daily_embed(new_user, character);

            await interaction.update({embeds : [embed]});
        }
    },
    {
        customId: "check_sub_daily",
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
            const embed = await daily_embed(new_user, character);

            await interaction.update({embeds : [embed]});
        }
    },
]

module.exports = {
    check_buttons,
    components : check_buttons
}