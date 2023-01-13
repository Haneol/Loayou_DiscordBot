const { MessageActionRow, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const axios = require("axios");

const action = async (interaction) => {
    const modal = new Modal()
        .setCustomId("trade_modal")
        .setTitle("거래소 검색");

    const input_trade = new TextInputComponent()
        .setCustomId("input_trade")
        .setLabel("검색할 아이템 이름을 입력하세요!")
        .setStyle("SHORT")
        .setMaxLength(20)
        .setRequired(true);  

    const firstActionRow = new MessageActionRow().addComponents(input_trade);
    
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

const interactions = [
    {
        customId: "trade_modal",
        async action(interaction) {
            const response = interaction.fields.getTextInputValue('input_trade').trim();
				
			const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('🛒 거래소 검색')
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

			try{
				const trade_result = await axios.get(`http://lostarkapi.ga/tradeplus/${encodeURIComponent(response)}`);

				if(trade_result.data.Result === "Failed")
				{
					embed.setDescription('검색에 실패했습니다.\n정확한 아이템 이름을 입력해주세요!');
					interaction.reply({embeds: [embed], ephemeral: true});
				}
				else
				{
					const menu = [];
					for(let i = 0; i < trade_result.data.Data.length; i++)
					{
						const submenu = {
							label: trade_result.data.Data[i],
							value: trade_result.data.Data[i]
						}

						menu.push(submenu);
					}
					
					const row = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId("trade_search")
								.setPlaceholder("검색된 결과 중 원하는 아이템을 선택하세요!")
								.addOptions(menu)
						);

					await interaction.reply({components: [row], ephemeral: true});
				}
			}catch(err)
			{
				console.log(err);
				
				embed.setDescription('에러가 발생했습니다. 아유봇 고객센터에 문의해주세요!');
				interaction.reply({embeds: [embed], ephemeral: true});
			}
        }
    },
    {
        customId: "trade_search",
        async action(interaction) {
            const selectedValue = interaction.values[0];

			const embed = new MessageEmbed()
			.setColor('#F14966')
			.setTitle('🛒 거래소 검색')
			.setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

			try{
				const trade_pre_result = await axios.get(`http://lostarkapi.ga/tradeplus/${encodeURIComponent(selectedValue)}`);
				const regex = /[^0-9]/g;
				const item_num = trade_pre_result.data.FirstItem[0].replace(regex, "");
				const trade_result = await axios.get(`http://lostarkapi.ga/trade/${item_num}`);

				let price_list = ""
				for(let i = 0; i < trade_result.data.Pricechart.length; i++)
				{
					price_list = price_list + `가격 : 🪙${trade_result.data.Pricechart[i].Price}\t수량 : ${trade_result.data.Pricechart[i].Amount}\n`
				}

				embed.addFields(
					{name : `${trade_result.data.Name}`, value: `${price_list}`, inline: true},
					{name : "Powered by", value: "[모코코더#3931](<https://www.inven.co.kr/board/lostark/4821/85972/>)"}
				);

				interaction.reply({embeds: [embed], ephemeral: true});
			}catch(err)
			{
				console.log(err);
				
				embed.setDescription('에러가 발생했습니다. 아유봇 고객센터에 문의해주세요!');
				interaction.reply({embeds: [embed], ephemeral: true});
			}
        }
    }
]

module.exports = {
    func : action,
    components : interactions
}