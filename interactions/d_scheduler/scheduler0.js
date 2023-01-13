const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent } = require('discord.js');
const register = require('./register');
const data = require('./data_manager');
const user = require('./schedule_manager');

const register_button = [
    {
        customId: "user_register",
        label: "스케줄러 생성하기 (클릭)",
        style: "SUCCESS",
        async action(interaction) {
            const hasId = await data.has(interaction.user.id);
            if(!hasId)
            {
                register.func(interaction);
            }
            else
            {
                const embed = new MessageEmbed()
                    .setColor('#F14966')
                    .setTitle('📅 스케줄러')
                    .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

                embed.setDescription('이미 설정이 완료되었습니다.');
                await interaction.update({embeds: [embed], ephemeral: true, components: []});
            }
        }
    },
]

let interactions = []
interactions = interactions.concat(register_button);

module.exports = {
    customId: "scheduler",
	label: "스케줄러",
	style: "SUCCESS",
	async action(interaction) {

        const id = interaction.user.id;

        const hasId = await data.has(id);
        if(!hasId){   // 유저 신규 생성
            const row = new MessageActionRow().addComponents(
            register_button.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style);
                })
            );

            const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('📅 스케줄러')
                .setDescription(`정보가 존재하지 않아 스케줄러 생성을 시작합니다.\n아래 버튼을 클릭해주세요!`)
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

            await interaction.reply({ephemeral: true, embeds: [embed], components: [row]});

        } else {    // 유저 데이터 보여주기
            user.func(interaction);
        }

        /*
            MEMO
            1. 데이터 관리 quickDB 사용
            2. key : id
            3. value : 모든 일일/주간 퀘 횟수
            4. schedule에 따라, 일일은 새벽 6시/ 주간은 수요일 새벽 6시에 초기화 필요
        */
	},
    components: interactions
}