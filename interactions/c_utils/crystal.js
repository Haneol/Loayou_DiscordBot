const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const action = async (interaction) => {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('💎 크리스탈 현재 시세')
        .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    try{
        const crystal_result = await axios.get("http://lostarkapi.ga/crystal/");

        embed.addFields(
            {name : "구매", value: `🪙${crystal_result.data.Buy}`, inline: true},
            {name : "판매", value: `🪙${crystal_result.data.Sell}`, inline: true},
            {name : "Powered by", value: "[모코코더#3931](<https://www.inven.co.kr/board/lostark/4821/85972/>)"}
        );

        await interaction.reply({embeds: [embed], ephemeral: true});
    }catch(err)
    {
        console.log(err);

        embed.setDescription('에러가 발생했습니다. 아유봇 고객센터에 문의해주세요!');

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}

module.exports = {
    func : action,
}