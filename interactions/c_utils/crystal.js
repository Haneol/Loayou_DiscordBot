const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const action = async (interaction) => {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('π ν¬λ¦¬μ€ν νμ¬ μμΈ')
        .setFooter({ text: 'λ‘μμ λ΄', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    try{
        const crystal_result = await axios.get("http://lostarkapi.ga/crystal/");

        embed.addFields(
            {name : "κ΅¬λ§€", value: `πͺ${crystal_result.data.Buy}`, inline: true},
            {name : "νλ§€", value: `πͺ${crystal_result.data.Sell}`, inline: true},
            {name : "Powered by", value: "[λͺ¨μ½μ½λ#3931](<https://www.inven.co.kr/board/lostark/4821/85972/>)"}
        );

        await interaction.reply({embeds: [embed], ephemeral: true});
    }catch(err)
    {
        console.log(err);

        embed.setDescription('μλ¬κ° λ°μνμ΅λλ€. μμ λ΄ κ³ κ°μΌν°μ λ¬Έμν΄μ£ΌμΈμ!');

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}

module.exports = {
    func : action,
}