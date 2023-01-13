const { MessageActionRow, MessageEmbed, Modal, TextInputComponent } = require('discord.js');

const action = async (interaction) => {
    const modal = new Modal()
        .setCustomId("send_money_modal")
        .setTitle("거래 수수료 계산기");

    const input_send_money = new TextInputComponent()
        .setCustomId("input_send_money")
        .setLabel("수금자가 받을 금액을 입력하세요")
        .setStyle("SHORT")
        .setRequired(true);  

    const firstActionRow = new MessageActionRow().addComponents(input_send_money);
    
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

module.exports = {
    func : action,
    customId: "send_money_modal",
    async action(interaction) {
        const response = interaction.fields.getTextInputValue('input_send_money');
			
        let embed = new MessageEmbed()
            .setColor('#F14966')
            .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

        if(!isNaN(response))
        {
            const result_value = Math.ceil(response * 100 / 95);

            embed.setTitle(`받을 금액 : 🪙${response}`)
            .addFields(
                {name : "보낼 금액", value: `🪙${result_value}`, inline: true}
            );
        }
        else
        {
            embed.setDescription('잘못된 입력입니다. 숫자만 입력해주세요!');
        }

        await interaction.reply({embeds: [embed], ephemeral: true});
    } 
}