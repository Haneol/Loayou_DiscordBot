const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const data = require('../data_manager');
//const {weekly_sub_row} = require('./weekly_sub_row');

const weekly_button_main = [
    {
        customId: "weekly_schedule",
        label: "일일",
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
            
        }
    },
    {
        customId: "weekly_schedule_1",
        label: "나침반 컨텐츠",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            
        }
    },
    {
        customId: "weekly_schedule_2",
        label: "레이드",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
            
        }
    },
    {
        customId: "weekly_schedule_3",
        label: "어비스 던전",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
           
        }
    },
    {
        customId: "weekly_schedule_4",
        label: "원정대 컨텐츠",
        style: "SECONDARY",
        disable: false,
        async action(interaction) {
           
        }
    },
]

async function weekly_row2 (user, character) {
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
    weekly_row2,
}