const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
const { daily_manager_update2 } = require("../daily/daily_manager2");
const { setting_manager_update } = require("../setting/setting_manager");
const {weekly_sub_row} = require('./weekly_sub_row');

const weekly_button_main = [
    {
        customId: "weekly_schedule",
        label: "일일",
        style: "PRIMARY",
        disable: false,
        async action(interaction) {
            await daily_manager_update2(interaction);
        }
    },
    {
        customId: "schedule_setting",
        label: "설정",
        style: "DANGER",
        disable: false,
        async action(interaction) {
            await setting_manager_update(interaction)   // 수정
        }
    },
]

const weekly_buttons = [
    {
        customId: "weekly_schedule_0",
        label: "주간 숙제",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await weekly_sub_row(interaction, 0);
        }
    },
    {
        customId: "weekly_schedule_1",
        label: "나침반 컨텐츠",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await weekly_sub_row(interaction, 1);
        }
    },
    {
        customId: "weekly_schedule_2",
        label: "레이드",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            const user = await data.getActive(interaction.user.id);
            const id = interaction.user.id;
            const character = await data.get_character(id);

            const schedule_list = user[character];

            const modal = new Modal()
                .setCustomId("raid_modal")
                .setTitle("레이드");

            let previous_raid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            schedule_list.map( item => {
                if(item.type === "레이드")
                {
                    if(item.name === "아르고스")
                    {
                        previous_raid[0] = item.data;
                    }else if(item.name === "발탄 노말")
                    {
                        previous_raid[1] = item.data;
                    }else if(item.name === "발탄 하드")
                    {
                        previous_raid[2] = item.data;
                    }else if(item.name === "비아 노말")
                    {
                        previous_raid[3] = item.data;
                    }else if(item.name === "비아 하드")
                    {
                        previous_raid[4] = item.data;
                    }else if(item.name === "쿠크 리허설")
                    {
                        previous_raid[5] = item.data;
                    }else if(item.name === "쿠크 노말")
                    {
                        previous_raid[6] = item.data;
                    }else if(item.name === "아브 데자뷰")
                    {
                        previous_raid[7] = item.data;
                    }else if(item.name === "아브 노말")
                    {
                        previous_raid[8] = item.data;
                    }else if(item.name === "아브 하드")
                    {
                        previous_raid[9] = item.data;
                    }
                }
            })

            const progress0 = (previous_raid[0] === 1) ? "완료" : previous_raid[0];
            const progress1 = (previous_raid[1] === 2) ? "완료" : previous_raid[1];
            const progress2 = (previous_raid[2] === 2) ? "완료" : previous_raid[2];
            const progress3 = (previous_raid[3] === 3) ? "완료" : previous_raid[3];
            const progress4 = (previous_raid[4] === 3) ? "완료" : previous_raid[4];
            const progress5 = (previous_raid[5] === 3) ? "완료" : previous_raid[5];
            const progress6 = (previous_raid[6] === 3) ? "완료" : previous_raid[6];
            const progress7 = (previous_raid[7] === 4) ? "완료" : previous_raid[7];
            const progress8 = (previous_raid[8] === 6) ? "완료" : previous_raid[8];
            const progress9 = (previous_raid[9] === 6) ? "완료" : previous_raid[9];

            const input_raid0 = new TextInputComponent()
                .setCustomId("input_raid0")
                .setLabel(`[아르고스] (현재 진행도 : ${progress0})`)
                .setStyle("SHORT")
                .setMaxLength(1)
            
            const input_raid1 = new TextInputComponent()
                .setCustomId("input_raid1")
                .setLabel(`[발탄 노말] (현재 진행도 : ${progress1})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid2 = new TextInputComponent()
                .setCustomId("input_raid2")
                .setLabel(`[발탄 하드] (현재 진행도 : ${progress2})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid3 = new TextInputComponent()
                .setCustomId("input_raid3")
                .setLabel(`[비아 노말] (현재 진행도 : ${progress3})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid4 = new TextInputComponent()
                .setCustomId("input_raid4")
                .setLabel(`[비아 하드] (현재 진행도 : ${progress4})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid5 = new TextInputComponent()
                .setCustomId("input_raid5")
                .setLabel(`[쿠크 리허설] (현재 진행도 : ${progress5})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid6 = new TextInputComponent()
                .setCustomId("input_raid6")
                .setLabel(`[쿠크 노말] (현재 진행도 : ${progress6})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid7 = new TextInputComponent()
                .setCustomId("input_raid7")
                .setLabel(`[아브 데자뷰] (현재 진행도 : ${progress7})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const input_raid8 = new TextInputComponent()
                .setCustomId("input_raid8")
                .setLabel(`[아브 노말] (현재 진행도 : ${progress8})`)
                .setStyle("SHORT")
                .setMaxLength(1)
                
            const input_raid9 = new TextInputComponent()
                .setCustomId("input_raid9")
                .setLabel(`[아브 하드] (현재 진행도 : ${progress9})`)
                .setStyle("SHORT")
                .setMaxLength(1)

            const actionRow0 = new MessageActionRow().addComponents(input_raid0);
            const actionRow1 = new MessageActionRow().addComponents(input_raid1);
            const actionRow2 = new MessageActionRow().addComponents(input_raid2);
            const actionRow3 = new MessageActionRow().addComponents(input_raid3);
            const actionRow4 = new MessageActionRow().addComponents(input_raid4);
            const actionRow5 = new MessageActionRow().addComponents(input_raid5);
            const actionRow6 = new MessageActionRow().addComponents(input_raid6);
            const actionRow7 = new MessageActionRow().addComponents(input_raid7);
            const actionRow8 = new MessageActionRow().addComponents(input_raid8);
            const actionRow9 = new MessageActionRow().addComponents(input_raid9);

            const allActionRow = [];
            schedule_list.map( item => {
                if(item.type === "레이드")
                {
                    if(item.name === "아르고스")
                    {
                        allActionRow.push(actionRow0);
                    }else if(item.name === "발탄 노말")
                    {
                        allActionRow.push(actionRow1);
                    }else if(item.name === "발탄 하드")
                    {
                        allActionRow.push(actionRow2);
                    }else if(item.name === "비아 노말")
                    {
                        allActionRow.push(actionRow3);
                    }else if(item.name === "비아 하드")
                    {
                        allActionRow.push(actionRow4);
                    }else if(item.name === "쿠크 리허설")
                    {
                        allActionRow.push(actionRow5);
                    }else if(item.name === "쿠크 노말")
                    {
                        allActionRow.push(actionRow6);
                    }else if(item.name === "아브 데자뷰")
                    {
                        allActionRow.push(actionRow7);
                    }else if(item.name === "아브 노말")
                    {
                        allActionRow.push(actionRow8);
                    }else if(item.name === "아브 하드")
                    {
                        allActionRow.push(actionRow9);
                    }
                }
            })

            modal.addComponents(allActionRow);
            
            await interaction.showModal(modal);
        }
    },
    {
        customId: "weekly_schedule_3",
        label: "어비스 던전",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await weekly_sub_row(interaction, 2);
        }
    },
    {
        customId: "weekly_schedule_4",
        label: "원정대 컨텐츠",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await weekly_sub_row(interaction, 3);
        }
    },
]

async function weekly_row (user, character) {
    const schedule_list = user[character];
    const shared_list = user.shared;
    
    let tmp = ["일일", "설정"];
    schedule_list.map( item => {
        if(!tmp.includes(`${item.type}`))
        {
            tmp = tmp.concat(`${item.type}`);
        }
    })

    shared_list.map( item => {
        if(!tmp.includes(`${item.type}`))
        {
            tmp = tmp.concat(`${item.type}`);
        }
    })

    weekly_button_main.filter((button) => {
        if(!tmp.includes(button.label))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
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

let interactions = [];
interactions = interactions.concat(weekly_button_main, weekly_buttons);

module.exports = {
    weekly_row,
    components : interactions
}