const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const raid = [
    {
        customId: "valtan",
        label: "발탄",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {
            await interaction.update({components: [raid_valtan.row]});
        }
    },
    {
        customId: "vykas",
        label: "비아키스",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {
            await interaction.update({components: [raid_vykas.row]});
        }
    },
    {
        customId: "kouku",
        label: "쿠크세이튼",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {
            await interaction.update({components: [raid_kouku.row]});
        }
    },
    {
        customId: "abrelshud",
        label: "아브렐슈드",
        style: "SECONDARY",
        disabled: true,
        async action(interaction) {
            await interaction.update({components: [raid_abrelshud.row]});
        }
    },
]

const buttons = [
    {
        customId: "kouku_back",
        label: "쿠크세이튼",
        style: "DANGER",
        disabled: false,
        async action(interaction) {   
            const row = new MessageActionRow().addComponents(
                raid.map((button) => {
                    return new MessageButton()
                        .setCustomId(button.customId)
                        .setLabel(button.label)
                        .setStyle(button.style)
                        .setDisabled(button.disabled);
                })
            );

            await interaction.update({components: [row]});
        }
    },
    {
        customId: "kouku_1",
        label: "1넴",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {   

            const embed = new MessageEmbed()
            .setColor('#F14966')
            .setImage('https://imgur.com/hQjNwh2.jpg')
            .setFooter({ text: '이미지를 눌러 확인하세요.\nPC의 경우 원본보기 클릭!'});

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    },
    {
        customId: "kouku_2",
        label: "2넴",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {   
             
            const embed = new MessageEmbed()
            .setColor('#F14966')
            .setImage('https://imgur.com/RVrkGnd.jpg')
            .setFooter({ text: '이미지를 눌러 확인하세요.\nPC의 경우 원본보기 클릭!'});

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    },
    {
        customId: "kouku_3",
        label: "3넴",
        style: "SECONDARY",
        disabled: false,
        async action(interaction) {   
             
            const embed = new MessageEmbed()
            .setColor('#F14966')
            .setImage('https://imgur.com/l8Sb08H.jpg')
            .setFooter({ text: '이미지를 눌러 확인하세요.\nPC의 경우 원본보기 클릭!'});

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    },
]

module.exports = {
    row : new MessageActionRow().addComponents(
        buttons.map((button) => {
            return new MessageButton()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(button.style)
                .setDisabled(button.disabled);
        })
    ),
    components : buttons
}