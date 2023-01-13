const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const { weekly_manager_update } = require('../weekly_manager');

module.exports = {
    customId: "weekly_back",
    label : "뒤로",
    style : "DANGER",
    disable : false,
    async action(interaction) {
        await weekly_manager_update(interaction);
    }
}