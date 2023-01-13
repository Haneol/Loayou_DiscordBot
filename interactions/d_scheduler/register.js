const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const axios = require("axios");
const data = require('./data_manager');

let response = "";

const action = async (interaction) => {
    const modal = new Modal()
        .setCustomId("register_modal")
        .setTitle("스케줄러 생성");

    const input_register = new TextInputComponent()
        .setCustomId("input_register")
        .setLabel("스케줄러가 필요한 캐릭터 이름을 입력하세요")
        .setStyle("SHORT")
        .setMaxLength(12)
        .setRequired(true);  

    const firstActionRow = new MessageActionRow().addComponents(input_register);
    
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

const register_button = [
    {
        customId: "user_register",
        label: "스케줄러 생성하기 (클릭)",
        style: "SUCCESS",
        async action(interaction) {
            const hasId = await data.has(interaction.user.id);
            if(!hasId)
            {
                action(interaction);
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

const buttons = [
    {
        customId: "register_ok",    // 등록 시, 같은 서버에 있는 캐릭터만 등록되도록 만들기!
        label: "네",
        style: "SUCCESS",
        async action(interaction) {
            const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('📅 스케줄러')
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });
            
            const hasId = await data.has(interaction.user.id);
            if(!hasId)
                {
                    try{
                        const register_result = await axios.get(`http://lostarkapi.ga/userinfo/${encodeURIComponent(response)}`);
        
                        if(register_result.data.Result === "Failed")
                        {
                            embed.setDescription('검색에 실패했습니다.\n정확한 닉네임을 입력해주세요!');
        
                            const row = new MessageActionRow().addComponents(
                                register_button.map((button) => {
                                    return new MessageButton()
                                        .setCustomId(button.customId)
                                        .setLabel(button.label)
                                        .setStyle(button.style);
                                    })
                                );
        
                            //DEBUGGING
                            //await data.register(interaction.user.id, ["두리안겉절이", "두리안동치미", "두리안깍두기"]);

                            await interaction.update({embeds: [embed], ephemeral: true, components: [row]});
                        }
                        else
                        {
                            const name = [];
        
                            const nameList = register_result.data.CharacterList;
                            const selected_server = nameList.find(item => {
                                return item.Name === response
                            }).Server
                            for(let i in nameList)
                            {   
                                if(nameList[i].Server === selected_server)
                                    name.push(nameList[i].Name);
                            }

                            // REGISTER SUCCESS!
                            await data.register(interaction.user.id, name);
            
                            embed.setDescription('설정이 완료되었습니다.\n스케줄러 버튼을 다시 눌러주세요!');
                            await interaction.update({embeds: [embed], ephemeral: true, components: []})
                        }
                    }catch(err)
                    {
                        console.log(err);
        
                        embed.setDescription('에러가 발생했습니다. 아유봇 고객센터에 문의해주세요!');
        
                        await interaction.update({embeds: [embed], ephemeral: true, components: []});
                    }
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
    {
        customId: "register_cancel",
        label: "아니오",
        style: "DANGER",
        async action(interaction) {
            const hasId = await data.has(interaction.user.id);
            if(!hasId)
            {
                action(interaction);
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

const modal = [
    {
        customId: "register_modal",
        async action(interaction) {
            response = interaction.fields.getTextInputValue('input_register').trim();
        
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
                .setTitle('📅 스케줄러')
                .setDescription(`등록할 캐릭터가 "**${response}**"(이)가 맞나요?`)
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

            await interaction.update({embeds: [embed], ephemeral: true, components: [row]});
        }
    },
]

const interactions = modal.concat(buttons, register_button);

module.exports = {
    func : action,
    components : interactions
}