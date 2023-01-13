const { MessageActionRow, MessageEmbed, Modal, TextInputComponent } = require('discord.js');

const action = async (interaction) => {
    const modal = new Modal()
        .setCustomId("calcul_modal")
        .setTitle("경매 계산기");

    const input_gold = new TextInputComponent()
        .setCustomId("input_gold")
        .setLabel("현재 경매가를 입력하세요")
        .setStyle("SHORT")
        .setRequired(true);  

    const firstActionRow = new MessageActionRow().addComponents(input_gold);
    
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

module.exports = {
    func : action,
    customId: "calcul_modal",
    async action(interaction) {
        const response = interaction.fields.getTextInputValue('input_gold');
            
        let embed = new MessageEmbed()
            .setColor('#F14966')
            .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

        if(!isNaN(response))
        {
            const four_people = Math.floor(response * 0.95 * 3 / 4);
            const eight_people = Math.floor(response * 0.95 * 7 / 8);

            embed.setTitle(`"🪙${response}"에 대한 최적금`)
            .addFields(
                {name : "4인 기준", value: `🪙${four_people}`, inline: true},
                {name : "8인 기준", value: `🪙${eight_people}`, inline: true}
            );
        }
        else
        {
            embed.setDescription('잘못된 입력입니다. 숫자만 입력해주세요!');
        }

        await interaction.reply({embeds: [embed], ephemeral: true});
    } 
}