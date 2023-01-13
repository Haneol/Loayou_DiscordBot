const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('./data_manager');
const { daily_manager, daily_manager_update } = require("./daily/daily_manager");
const { weekly_manager_update } = require("./weekly/weekly_manager");

async function update_weekly_embed(interaction){
    const user = await data.getActive(interaction.user.id);
    const characters = Object.keys(user);
    const id = interaction.user.id;
    const default_character = await data.get_character(id);
    
    const menu = [];
    characters.pop();
    for(let i in characters)
    {
        const submenu = {
            label: characters[i],
            value: characters[i]
        }
        menu.push(submenu);
    }

    // 수정 : WEEKLY EMBED
    const embed = weekly_scheduler_embed(user, default_character);

    const row_arr = [];
    const row = new MessageActionRow()
        .addComponents(
                new MessageSelectMenu()
                    .setCustomId("scheduler_menu")
                    .setPlaceholder(default_character)
                    .addOptions(menu)
    );

    // 수정 : WEEKLY BUTTON ROW
    const row2 = weekly_scheduler_row(user, default_character);

    await interaction.update({components: row_arr.concat(row, row2), embeds: [embed], ephemeral: true});
}

// 스케줄러 확인 및 관리

function weekly_scheduler_row(user, character){
    const schedule_list = user[character];
    const shared_schedule_list = user.shared;
    
    let tmp = ["일일", "설정",];
    schedule_list.map( item => {
        if(!tmp.includes(`${item.type}`))
        {
            tmp = tmp.concat(`${item.type}`);
        }
    })

    shared_schedule_list.map( item => {
        if(!tmp.includes(`${item.type}`))
        {
            tmp = tmp.concat(`${item.type}`);
        }
    })

    weekly_buttons.filter((button) => {
        if(!tmp.includes(button.label))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
        }
    })
    
    const row = new MessageActionRow()
        .addComponents(
            weekly_button_main.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    const row1 = new MessageActionRow()
        .addComponents(
            weekly_buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    return [row, row1];
}

function weekly_scheduler_row0(user, character){
    const schedule_list = user[character];
    
    let tmp = ["뒤로"];
    schedule_list.map( item => {
        if(!tmp.includes(`${item.name}`))
        {
            tmp = tmp.concat(`${item.name}`);
        }
    })

    daily_schedule_buttons.filter((button) => {
        if(!tmp.includes(button.customId))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
        }
    })
    
    daily_schedule_buttons1.filter((button) => {
        if(!tmp.includes(button.customId))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
        }
    })
    
    const row = new MessageActionRow()
        .addComponents(
            daily_schedule_buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    const row2 = new MessageActionRow()
        .addComponents(
            daily_schedule_buttons1.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    return [row, row2];
}


const action = async (interaction) => {
    await daily_manager(interaction);
   }

const menu = [
    {
        customId: "scheduler_menu",
        async action(interaction) {
            const selected_character = interaction.values[0];

            
        }
    }
]

const modal = [
    {
        customId: "ticket_modal",
        async action(interaction) {
            const user = await data.getActive(interaction.user.id);
            const id = interaction.user.id;
            const character = await data.get_character(id);

            const schedule_list = user[character];
            
            let all_response = [-1,-1,-1,-1,-1,-1,-1];
            schedule_list.map( item => {
                if(item.type === "입장권")
                {
                    if(item.name === "회랑 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket0').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[0] = Number(response_data);
                            }
                        }
                    }else if(item.name === "회랑 하드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket1').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[1] = Number(response_data);
                            }
                        }
                    }else if(item.name === "회랑 헬")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket2').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[2] = Number(response_data);
                            }
                        }
                    }else if(item.name === "큐브 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket3').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[3] = Number(response_data);
                            }
                        }
                    }else if(item.name === "큐브 하드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket4').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[4] = Number(response_data);
                            }
                        }
                    }else if(item.name === "큐브 헬")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket5').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[5] = Number(response_data);
                            }
                        }
                    }else if(item.name === "플래티넘 필드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_ticket6').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                all_response[6] = Number(response_data);
                            }
                        }
                    }
                }
            })

            await data.set(id, character, "회랑 노말", all_response[0]);
            await data.set(id, character, "회랑 하드", all_response[1]);
            await data.set(id, character, "회랑 헬", all_response[2]);
            await data.set(id, character, "큐브 노말", all_response[3]);
            await data.set(id, character, "큐브 하드", all_response[4]);
            await data.set(id, character, "큐브 헬", all_response[5]);
            await data.set(id, character, "플래티넘 필드", all_response[6]);
        
            await daily_manager_update(interaction);
        }
    },
    {
        customId: "raid_modal",
        async action(interaction) {
            const user = await data.getActive(interaction.user.id);
            const id = interaction.user.id;
            const character = await data.get_character(id);

            const schedule_list = user[character];
            
            let all_response = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
            schedule_list.map( item => {
                if(item.type === "레이드")
                {
                    if(item.name === "아르고스")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid0').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 1)
                                {
                                    all_response[0] = 1;
                                }
                                else
                                {
                                    all_response[0] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "발탄 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid1').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 2)
                                {
                                    all_response[1] = 2;
                                }
                                else
                                {
                                    all_response[1] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "발탄 하드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid2').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 2)
                                {
                                    all_response[2] = 2;
                                }
                                else
                                {
                                    all_response[2] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "비아 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid3').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 3)
                                {
                                    all_response[3] = 3;
                                }
                                else
                                {
                                    all_response[3] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "비아 하드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid4').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 3)
                                {
                                    all_response[4] = 3;
                                }
                                else
                                {
                                    all_response[4] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "쿠크 리허설")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid5').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 3)
                                {
                                    all_response[5] = 3;
                                }
                                else
                                {
                                    all_response[5] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "쿠크 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid6').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 3)
                                {
                                    all_response[6] = 3;
                                }
                                else
                                {
                                    all_response[6] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "아브 데자뷰")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid7').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 4)
                                {
                                    all_response[7] = 4;
                                }
                                else
                                {
                                    all_response[7] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "아브 노말")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid8').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 6)
                                {
                                    all_response[8] = 6;
                                }
                                else
                                {
                                    all_response[8] = Number(response_data);
                                }
                            }
                        }
                    }else if(item.name === "아브 하드")
                    {
                        const response_data = interaction.fields.getTextInputValue('input_raid9').trim();
                        if(!isNaN(response_data))
                        {
                            if(response_data !== '' && Number(response_data) >= 0)
                            {
                                if(Number(response_data) > 6)
                                {
                                    all_response[9] = 6;
                                }
                                else
                                {
                                    all_response[9] = Number(response_data);
                                }
                            }
                        }
                    }
                }
            })

            await data.set(id, character, "아르고스", all_response[0]);
            await data.set(id, character, "발탄 노말", all_response[1]);
            await data.set(id, character, "발탄 하드", all_response[2]);
            await data.set(id, character, "비아 노말", all_response[3]);
            await data.set(id, character, "비아 하드", all_response[4]);
            await data.set(id, character, "쿠크 리허설", all_response[5]);
            await data.set(id, character, "쿠크 노말", all_response[6]);
            await data.set(id, character, "아브 데자뷰", all_response[7]);
            await data.set(id, character, "아브 노말", all_response[8]);
            await data.set(id, character, "아브 하드", all_response[9]);
        
            await weekly_manager_update(interaction);
        }
    },
    {
        customId: "reset_check_modal",
        async action(interaction) {
            const response = interaction.fields.getTextInputValue('input_reset_check').trim();
            
            if(response === "초기화")
            {
                await data.reset(interaction.user.id);

                const embed = new MessageEmbed()
                    .setColor('#F14966')
                    .setTitle('📅 스케줄러')
                    .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
                    .setDescription('초기화되었습니다.');
                
                await interaction.update({embeds: [embed], ephemeral: true, components: []})
            }
            else
            {
                const embed = new MessageEmbed()
                    .setColor('#F14966')
                    .setTitle('📅 스케줄러')
                    .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
                    .setDescription('초기화가 되지 않았습니다.');
                
                await interaction.reply({embeds: [embed], ephemeral: true, components: []})
            }
        }
    },
]

let interactions = [];
interactions = interactions.concat(menu, modal);

module.exports = {
    func : action,
    components : interactions
}