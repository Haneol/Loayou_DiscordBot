const { MessageActionRow, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const axios = require("axios");

const action = async (interaction) => {
    const modal = new Modal()
        .setCustomId("sasa_modal")
        .setTitle("사건사고 게시판 조회");

    const input_sasa = new TextInputComponent()
        .setCustomId("input_sasa")
        .setLabel("조회할 닉네임을 입력하세요")
        .setStyle("SHORT")
        .setMaxLength(12)
        .setRequired(true);  

    const firstActionRow = new MessageActionRow().addComponents(input_sasa);
    
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

const interactions = [
    {
        customId: "sasa_modal",
        async action(interaction) {
            const response = interaction.fields.getTextInputValue('input_sasa').trim();
			
			console.log(response);
			
			const embed = new MessageEmbed()
			.setColor('#F14966')
			.setTitle('📢 사건사고 게시판 조회')
			.setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

			try{
				const sasa_result = await axios.get(`http://lostarkapi.ga/sasa/${encodeURIComponent(response)}`);

				if(sasa_result.data.Result === "Failed")
				{
					embed.setDescription('조회에 실패했습니다.\n정확한 닉네임을 입력해주세요!');
				}
				else
				{
					embed.addFields(
						{name : "조회 내역", value: `[${sasa_result.data.SasaList[0]}](<${sasa_result.data.SasaUrl}>)`, inline: true},
						{name : "Powered by", value: "[모코코더#3931](<https://www.inven.co.kr/board/lostark/4821/85972/>)"}
					);
				}
			}catch(err)
			{
				console.log(err);
				
				embed.setDescription('에러가 발생했습니다. 아유봇 고객센터에 문의해주세요!');
			}

			await interaction.reply({embeds: [embed], ephemeral: true});
        }
    },
]

module.exports = {
    func : action,
    components : interactions
}