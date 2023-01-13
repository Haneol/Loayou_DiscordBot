const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const data = require('../data_manager');
const {daily_manager_update2} = require("../daily/daily_manager2")
const {weekly_manager_update2} = require("../weekly/weekly_manager2");

const setting_buttons = [
    {
        customId: "daily_schedule_back",
        label: "일일",
        style: "PRIMARY",
        disable: false,
        async action(interaction) {
            await daily_manager_update2(interaction); // 수정
        }
    },
    {
        customId: "weekly_schedule_back",
        label: "주간",
        style: "PRIMARY",
        disable: false,
        async action(interaction) {
            await weekly_manager_update2(interaction); // 수정
        }
    },
    {
        customId: "reset_character",
        label: "초기화",
        style: "DANGER",
        disable: false,
        async action(interaction) {
            const modal = new Modal()
                .setCustomId("reset_check_modal")
                .setTitle("원정대 초기화 확인");

            const input_reset_check = new TextInputComponent()
                .setCustomId("input_reset_check")
                .setLabel(`초기화를 원하면 "초기화"라고 입력해주세요.`)
                .setStyle("SHORT")
                .setMaxLength(3)
            

            const allActionRow = new MessageActionRow().addComponents(input_reset_check);

            modal.addComponents(allActionRow);
            
            await interaction.showModal(modal);
        }
    },
    {
        customId: "share_my_schedule",
        label: "공유",
        style: "SUCCESS",
        disable: false,
        async action(interaction) {           
            await data.show(interaction.user.id);
            const isShow = await data.isShow(interaction.user.id);
            if(isShow)
            {
                interaction.component.setStyle("SUCCESS");
            }
            else
            {
                interaction.component.setStyle("SECONDARY");
            }

            await interaction.update({
                components: interaction.message.components
            });
        }
    },
]

// 설정 메뉴 생성
const normal_menu = [
    {
        label: "카오스 던전",
        value: "daily_menu0",
    },
    {
        label: "가디언 토벌",
        value: "daily_menu1",
    },
    {
        label: "일일 에포나",
        value: "daily_menu2",
    },
    {
        label: "일일 이벤트",
        value: "daily_menu3", 
    },
    {
        label: "비탄의 섬",
        value: "daily_menu4", 
    },
    {
        label: "모험섬",
        value: "daily_menu5", 
    },
    {
        label: "카오스게이트",
        value: "daily_menu6", 
    },
    {
        label: "필드보스",
        value: "daily_menu7", 
    },
    {
        label: "점령전",
        value: "daily_menu8", 
    },
    {
        label: "주간 에포나",
        value: "weekly_menu0", 
    },
    {
        label: "주간 이벤트",
        value: "weekly_menu1", 
    },
    {
        label: "로웬",
        value: "weekly_menu2", 
    },
    {
        label: "유령선",
        value: "weekly_menu3", 
    },
    {
        label: "툴루비크",
        value: "weekly_menu4", 
    },
    {
        label: "오레하 2종",
        value: "weekly_menu5", 
    },
    {
        label: "6종 카드작",
        value: "weekly_menu6", 
    },
    {
        label: "낙원 3종",
        value: "weekly_menu7", 
    },
    {
        label: "카양겔",
        value: "weekly_menu8", 
    },
    {
        label: "아르고스",
        value: "weekly_menu9", 
    },
    {
        label: "원정대 컨텐츠",
        value: "shared_menu0", 
    },
]

const ticket_menu = [
    {
        label: "회랑 노말",
        value: "ticket_menu0", 
    },
    {
        label: "회랑 하드",
        value: "ticket_menu1", 
    },
    {
        label: "회랑 헬",
        value: "ticket_menu2", 
    },
    {
        label: "큐브 노말",
        value: "ticket_menu3", 
    },
    {
        label: "큐브 하드",
        value: "ticket_menu4", 
    },
    {
        label: "큐브 헬",
        value: "ticket_menu5", 
    },
    {
        label: "플래티넘 필드",
        value: "ticket_menu6", 
    },
]

const raid_menu = [
    {
        label: "발탄 노말",
        value: "raid_menu0", 
    },
    {
        label: "발탄 하드",
        value: "raid_menu1", 
    },
    {
        label: "비아 노말",
        value: "raid_menu2", 
    },
    {
        label: "비아 하드",
        value: "raid_menu3", 
    },
    {
        label: "쿠크 리허설",
        value: "raid_menu4", 
    },
    {
        label: "쿠크 노말",
        value: "raid_menu5", 
    },
    {
        label: "아브 데자뷰",
        value: "raid_menu6", 
    },
    {
        label: "아브 노말",
        value: "raid_menu7", 
    },
    {
        label: "아브 하드",
        value: "raid_menu8", 
    },
]

async function setting_row (id) {
    
    const isShow = await data.get(`${id}.setting.show`);
    if(isShow)
    {
        setting_buttons.filter((button) => {
            if(button.label === "공유")
            {
                button.style = "SUCCESS";
            }
        })
    }
    else
    {
        setting_buttons.filter((button) => {
            if(button.label === "공유")
            {
                button.style = "SECONDARY";
            }
        })
    }

    const row = new MessageActionRow()
        .addComponents(
            setting_buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setDisabled(button.disable)
                    .setStyle(button.style);
            })
    );

    const menu_row0 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("menu_row0")
                .addOptions(normal_menu)
                .setPlaceholder("기본 스케줄 설정")
                .setMinValues(0)
                .setMaxValues(20)
    );

    const menu_row1 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("menu_row1")
                .addOptions(ticket_menu)
                .setPlaceholder("입장권 설정 (최대 5개)")
                .setMinValues(0)
                .setMaxValues(5)
    );

    const menu_row2 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("menu_row2")
                .addOptions(raid_menu)
                .setPlaceholder("군단장 스케줄 설정 (최대 3개)")
                .setMinValues(0)
                .setMaxValues(3)
    );


    return [row, menu_row0, menu_row1, menu_row2];
}

const menu_interaction = [
    {
        customId: "menu_row0",
        async action(interaction) {
            const id = interaction.user.id;
            const character = await data.get_character(id);

            //선택된 메뉴
            const selectedValue = interaction.values;

            await data.activateReset(id, character, 0);
            await data.activateReset(id, character, 1);
            await data.dataReset(id, character, 0);
            await data.dataReset(id, character, 1);

            // 수정
            let selectedValue_arr = [];
            selectedValue.map(async item => {
                switch(item)
                {
                    case "daily_menu0":
                        selectedValue_arr.push("카오스 던전");
                        break;
                    case "daily_menu1":
                        selectedValue_arr.push("가디언 토벌");
                        break;
                    case "daily_menu2":
                        selectedValue_arr.push("일일 에포나");
                        break;
                    case "daily_menu3":
                        selectedValue_arr.push("일일 이벤트");
                        break;
                    case "daily_menu4":
                        selectedValue_arr.push("비탄의 섬");
                        break;
                    case "daily_menu5":
                        selectedValue_arr.push("모험섬");
                        break;
                    case "daily_menu6":
                        selectedValue_arr.push("카오스게이트");
                        break;
                    case "daily_menu7":
                        selectedValue_arr.push("필드보스");
                        break;
                    case "daily_menu8":
                        selectedValue_arr.push("점령전");
                        break;
                    case "weekly_menu0":
                        selectedValue_arr.push("주간 에포나");
                        break;
                    case "weekly_menu1":
                        selectedValue_arr.push("주간 이벤트");
                        break;
                    case "weekly_menu2":
                        selectedValue_arr.push("로웬");
                        break;
                    case "weekly_menu3":
                        selectedValue_arr.push("유령선");
                        break;
                    case "weekly_menu4":
                        selectedValue_arr.push("툴루비크");
                        break;
                    case "weekly_menu5":
                        selectedValue_arr.push("오레하 2종");
                        break;
                    case "weekly_menu6":
                        selectedValue_arr.push("6종 카드작");
                        break;
                    case "weekly_menu7":
                        selectedValue_arr.push("낙원 3종");
                        break;
                    case "weekly_menu8":
                        selectedValue_arr.push("카양겔");
                        break;
                    case "weekly_menu9":
                        selectedValue_arr.push("아르고스");
                        break;
                    case "shared_menu0":
                        selectedValue_arr.push("원정대 컨텐츠");
                        break;
                }
            })

            await data.activate(id, character, selectedValue_arr);

            const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('📅 스케줄러 : 설정')
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
                .setDescription("아래 버튼과 메뉴를 통해 스케줄러 세부 설정을 변경할 수 있습니다.\n\n기본 스케줄 설정 완료!");


            await interaction.update({embeds: [embed]})
        }
    },
    {
        customId: "menu_row1",
        async action(interaction) {
            const id = interaction.user.id;
            const character = await data.get_character(id);

            //선택된 메뉴
            const selectedValue = interaction.values;

            await data.activateReset(id, character, 3);
            await data.dataReset(id, character, 3);

            // 수정
            let selectedValue_arr = [];
            selectedValue.map(async item => {
                switch(item)
                {
                    case "ticket_menu0":
                        selectedValue_arr.push("회랑 노말");
                        break;
                    case "ticket_menu1":
                        selectedValue_arr.push("회랑 하드");
                        break;
                    case "ticket_menu2":
                        selectedValue_arr.push("회랑 헬");
                        break;
                    case "ticket_menu3":
                        selectedValue_arr.push("큐브 노말");
                        break;
                    case "ticket_menu4":
                        selectedValue_arr.push("큐브 하드");
                        break;
                    case "ticket_menu5":
                        selectedValue_arr.push("큐브 헬");
                        break;
                    case "ticket_menu6":
                        selectedValue_arr.push("플래티넘 필드");
                        break;
                }
            })

            await data.activate(id, character, selectedValue_arr);

            const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('📅 스케줄러 : 설정')
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
                .setDescription("아래 버튼과 메뉴를 통해 스케줄러 세부 설정을 변경할 수 있습니다.\n\n입장권 설정 완료!");


            await interaction.update({embeds: [embed]})
        }
    },
    {
        customId: "menu_row2",
        async action(interaction) {
            const id = interaction.user.id;
            const character = await data.get_character(id);

            //선택된 메뉴
            const selectedValue = interaction.values;

            await data.activateReset(id, character, 2);
            await data.dataReset(id, character, 2);

            // 수정
            let selectedValue_arr = [];
            selectedValue.map(async item => {
                switch(item)
                {
                    case "raid_menu0":
                        if(!selectedValue_arr.includes("발탄 하드"))
                        {
                            selectedValue_arr.push("발탄 노말");
                        }
                        break;
                    case "raid_menu1":
                        if(!selectedValue_arr.includes("발탄 노말"))
                        {
                            selectedValue_arr.push("발탄 하드");
                        }
                        break;
                    case "raid_menu2":
                        if(!selectedValue_arr.includes("비아 하드"))
                        {
                            selectedValue_arr.push("비아 노말");
                        }      
                        break;
                    case "raid_menu3":
                        if(!selectedValue_arr.includes("비아 노말"))
                        {
                            selectedValue_arr.push("비아 하드");
                        }    
                        break;
                    case "raid_menu4":
                        if(!selectedValue_arr.includes("쿠크 노말"))
                        {
                            selectedValue_arr.push("쿠크 리허설");
                        }    
                        break;
                    case "raid_menu5":
                        if(!selectedValue_arr.includes("쿠크 리허설"))
                        {
                            selectedValue_arr.push("쿠크 노말");
                        }
                        break;
                    case "raid_menu6":
                        if(!selectedValue_arr.includes("아브 노말") && !selectedValue_arr.includes("아브 하드"))
                        {
                            selectedValue_arr.push("아브 데자뷰");
                        }
                        break;
                    case "raid_menu7":
                        if(!selectedValue_arr.includes("아브 데자뷰") && !selectedValue_arr.includes("아브 하드"))
                        {
                            selectedValue_arr.push("아브 노말");
                        }
                        break;
                    case "raid_menu8":
                        if(!selectedValue_arr.includes("아브 노말") && !selectedValue_arr.includes("아브 데자뷰"))
                        {
                            selectedValue_arr.push("아브 하드");
                        }
                        break;
                }
            })

            console.log(selectedValue_arr);
            await data.activate(id, character, selectedValue_arr);

            const embed = new MessageEmbed()
                .setColor('#F14966')
                .setTitle('📅 스케줄러 : 설정')
                .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
                .setDescription("아래 버튼과 메뉴를 통해 스케줄러 세부 설정을 변경할 수 있습니다.\n\n군단장 스케줄 설정 완료!");


            await interaction.update({embeds: [embed]})
        }
    }
]

let interactions = [];
interactions = interactions.concat(setting_buttons, menu_interaction);

module.exports = {
    setting_row,
    components : interactions
}