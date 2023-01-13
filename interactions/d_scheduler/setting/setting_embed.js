const { MessageEmbed } = require('discord.js');

async function setting_embed () {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('📅 스케줄러 : 설정')
        .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
        .setDescription("아래 버튼과 메뉴를 통해 스케줄러 세부 설정을 변경할 수 있습니다.");

    return embed;
}

module.exports = {
    setting_embed,
}