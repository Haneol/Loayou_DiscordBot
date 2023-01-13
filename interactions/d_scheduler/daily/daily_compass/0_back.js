const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const { daily_manager_update } = require('../daily_manager');

module.exports = {
    customId: "daily_back",
    label : "뒤로",
    style : "DANGER",
    disable : false,
    async action(interaction) {
        await daily_manager_update(interaction);
    }
}