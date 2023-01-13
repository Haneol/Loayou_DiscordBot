const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { daily_manager_update } = require('../daily/daily_manager');
const { weekly_manager_update } = require("../weekly/weekly_manager");
const { setting_manager_update } = require("../setting/setting_manager");

module.exports = {
    customId: "scheduler_menu",
    async action(interaction){
        const selectedValue = interaction.values[0];

        //const character_name = await data.get(`${interaction.user.id}.setting.character`);
        await data.set_character(interaction.user.id, selectedValue);

        let user_scheduler = data.scheduler.find((item) => {
            return item.id === interaction.user.id
        })
        if(!user_scheduler)
        {   
            user_scheduler = {id, name: "일일"};
            data.scheduler = data.scheduler.concat(user_scheduler);
        }

        if(user_scheduler.name === "일일")
        {
            await daily_manager_update(interaction);
        }
        else if(user_scheduler.name === "주간")
        {
            await weekly_manager_update(interaction);
        }
        else if(user_scheduler.name === "설정")
        {
            await setting_manager_update(interaction);
        }
    }
}