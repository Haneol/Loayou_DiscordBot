const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const data = require('../data_manager');
const {daily_sub_row} = require('./daily_sub_row');

const daily_button_main = [
    {
        customId: "daily_schedule",
        label: "주간",
        style: "PRIMARY",
        disable: false,
        async action(interaction) {
            
        }
    },
    {
        customId: "schedule_setting",
        label: "설정",
        style: "DANGER",
        disable: false,
        async action(interaction) {
            await interaction.reply({ephemeral: true, content: "TEST : DAILY"});    // 수정
        }
    },
]

const daily_buttons = [
    {
        customId: "daily_schedule_0",
        label: "일일 숙제",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await daily_sub_row(interaction, 0);
        }
    },
    {
        customId: "daily_schedule_1",
        label: "나침반 컨텐츠",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            await daily_sub_row(interaction, );
        }
    },
    {
        customId: "daily_schedule_2",
        label: "입장권",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            const user = await data.getActive(interaction.user.id);
            const id = interaction.user.id;
            const character = await data.get_character(id);

            const schedule_list = user[character];

            const modal = new Modal()
                .setCustomId("ticket_modal")
                .setTitle("입장권 개수 수정");

            let previous_ticket = [0, 0, 0, 0, 0, 0, 0];

            schedule_list.map( item => {
                if(item.type === "입장권")
                {
                    if(item.name === "회랑 노말")
                    {
                        previous_ticket[0] = item.data;
                    }else if(item.name === "회랑 하드")
                    {
                        previous_ticket[1] = item.data;
                    }else if(item.name === "회랑 헬")
                    {
                        previous_ticket[2] = item.data;
                    }else if(item.name === "큐브 노말")
                    {
                        previous_ticket[3] = item.data;
                    }else if(item.name === "큐브 하드")
                    {
                        previous_ticket[4] = item.data;
                    }else if(item.name === "큐브 헬")
                    {
                        previous_ticket[5] = item.data;
                    }else if(item.name === "플래티넘 필드")
                    {
                        previous_ticket[6] = item.data;
                    }
                }
            })

            const input_ticket0 = new TextInputComponent()
                .setCustomId("input_ticket0")
                .setLabel(`[회랑 노말] 입장권 개수(현재 ${previous_ticket[0]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)
            
            const input_ticket1 = new TextInputComponent()
                .setCustomId("input_ticket1")
                .setLabel(`[회랑 하드] 입장권 개수(현재 ${previous_ticket[1]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const input_ticket2 = new TextInputComponent()
                .setCustomId("input_ticket2")
                .setLabel(`[회랑 헬] 입장권 개수(현재 ${previous_ticket[2]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const input_ticket3 = new TextInputComponent()
                .setCustomId("input_ticket3")
                .setLabel(`[큐브 노말] 입장권 개수(현재 ${previous_ticket[3]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const input_ticket4 = new TextInputComponent()
                .setCustomId("input_ticket4")
                .setLabel(`[큐브 하드] 입장권 개수(현재 ${previous_ticket[4]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const input_ticket5 = new TextInputComponent()
                .setCustomId("input_ticket5")
                .setLabel(`[큐브 헬] 입장권 개수(현재 ${previous_ticket[5]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const input_ticket6 = new TextInputComponent()
                .setCustomId("input_ticket6")
                .setLabel(`[플래티넘 필드] 입장권 개수(현재 ${previous_ticket[6]}장)`)
                .setStyle("SHORT")
                .setMaxLength(4)

            const actionRow0 = new MessageActionRow().addComponents(input_ticket0);
            const actionRow1 = new MessageActionRow().addComponents(input_ticket1);
            const actionRow2 = new MessageActionRow().addComponents(input_ticket2);
            const actionRow3 = new MessageActionRow().addComponents(input_ticket3);
            const actionRow4 = new MessageActionRow().addComponents(input_ticket4);
            const actionRow5 = new MessageActionRow().addComponents(input_ticket5);
            const actionRow6 = new MessageActionRow().addComponents(input_ticket6);

            const allActionRow = [];
            schedule_list.map( item => {
                if(item.type === "입장권")
                {
                    if(item.name === "회랑 노말")
                    {
                        allActionRow.push(actionRow0);
                    }else if(item.name === "회랑 하드")
                    {
                        allActionRow.push(actionRow1);
                    }else if(item.name === "회랑 헬")
                    {
                        allActionRow.push(actionRow2);
                    }else if(item.name === "큐브 노말")
                    {
                        allActionRow.push(actionRow3);
                    }else if(item.name === "큐브 하드")
                    {
                        allActionRow.push(actionRow4);
                    }else if(item.name === "큐브 헬")
                    {
                        allActionRow.push(actionRow5);
                    }else if(item.name === "플래티넘 필드")
                    {
                        allActionRow.push(actionRow6);
                    }
                }
            })

            modal.addComponents(allActionRow);
            
            await interaction.showModal(modal);
        }
    },
]

async function daily_row2 (user, character) {
    const schedule_list = user[character];
    
    let tmp = ["주간", "설정"];
    schedule_list.map( item => {
        if(!tmp.includes(`${item.type}`))
        {
            tmp = tmp.concat(`${item.type}`);
        }
    })

    daily_button_main.filter((button) => {
        if(!tmp.includes(button.label))
        {
            button.disable = true;
        }
        else
        {
            button.disable = false;
        }
    })

    daily_buttons.filter((button) => {
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
            daily_button_main.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    const row1 = new MessageActionRow()
        .addComponents(
            daily_buttons.map((button) => {
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
interactions = interactions.concat(daily_button_main, daily_buttons);

module.exports = {
    daily_row2,
}