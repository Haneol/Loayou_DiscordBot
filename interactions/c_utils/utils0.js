const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent } = require('discord.js');
const calcul = require('./calcul');
const send_money = require('./sendmoney');
const crystal = require('./crystal');
const trade = require('./trade');
const sasa = require('./sasa');

const buttons = [
    {
        customId: "calcul",
        label: "경매 계산기",
        style: "SECONDARY",
        async action(interaction) {
            calcul.func(interaction);
        }
    },
    {
        customId: "send_money",
        label: "거래 수수료",
        style: "SECONDARY",
        async action(interaction) {
            send_money.func(interaction);
        }
    },
    {
        customId: "crystal",
        label: "크리스탈 시세",
        style: "SECONDARY",
        async action(interaction) {
            crystal.func(interaction);
        }
    },
    {
        customId: "trade",
        label: "거래소 검색",
        style: "SECONDARY",
        async action(interaction) {
            trade.func(interaction);
        }
    },
    {
        customId: "sasa",
        label: "사사게 조회",
        style: "SECONDARY",
        async action(interaction) {
            sasa.func(interaction);
        }
    },
]

module.exports = {
    customId: "utils",
	label: "유틸 기능",
	style: "SUCCESS",
	async action(interaction) {
        
        const row = new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style);
            })
        );

        const embed = new MessageEmbed()
            .setColor('#F14966')
            .setTitle('🔗 로아 유틸')
            .setDescription('로스트아크와 관련된 유용한 기능 목록입니다.\n아래 버튼을 눌러 이동하세요!')
            .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

        await interaction.reply({ephemeral: true, embeds: [embed], components: [row]});

	},
    components: buttons
}