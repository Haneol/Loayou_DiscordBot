const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const buttons = [
    {
        label: "로아 홈페이지",
        style: "LINK",
        url: "https://lostark.game.onstove.com/Main",
    },
    {
        label: "로아 인벤",
        style: "LINK",
        url: "https://lostark.inven.co.kr/",
    },
    {
        label: "로아와",
        style: "LINK",
        url: "https://loawa.com/",
    },
    {
        label: "아이스펭",
        style: "LINK",
        url: "https://loa.icepeng.com/",
    },
    {
        label: "빙파고",
        style: "LINK",
        url: "https://ialy1595.me/kouku/",
    },
]

module.exports = {
    customId: "loa_link",
	label: "로아 링크",
	style: "SECONDARY",
	async action(interaction) {
        
        const row = new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                    .setLabel(button.label)
                    .setStyle(button.style)
                    .setURL(button.url);
            })
        );

        const embed = new MessageEmbed()
            .setColor('#F14966')
            .setTitle('🔗 로아 링크')
            .setDescription('로스트아크와 관련된 유용한 링크 목록입니다.\n아래 버튼을 눌러 이동하세요!')
            .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

        await interaction.reply({ephemeral: true, embeds: [embed], components: [row]});
	},
}