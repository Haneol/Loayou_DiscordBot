const { MessageEmbed } = require('discord.js');

async function weekly_embed (user, character) {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('📅 스케줄러 : 주간')
        .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    let weekly_fields = [];
    let weekly_schedule = "";
    let raid_schedule = "";
    let dungeon_schedule = "";
    let compass_schedule = "";
    let shared_schedule = "";
    const schedule_list = user[character];
    schedule_list.map( item => {
        if(item.type === "주간 숙제")
        {
            let emoji_check = '';
            for(let i = 0 ; i<item.max; i++){
                if(i < item.data)
                {
                    emoji_check = emoji_check.concat('✅');
                }
                else
                {
                    emoji_check = emoji_check.concat('🟩');
                }
            }
            
            weekly_schedule = weekly_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "어비스 던전")
        {
            let emoji_check = '';
            for(let i = 0 ; i<item.max; i++){
                if(i < item.data)
                {
                    emoji_check = emoji_check.concat('✅');
                }
                else
                {
                    emoji_check = emoji_check.concat('🟩');
                }
            }
            
            dungeon_schedule = dungeon_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(["레이드"].includes(item.type))
        {
            let emoji_check = '';
            if(["아브 노말", "아브 하드"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = '🟩';
                        break;
                    case 1:
                        emoji_check = '1️⃣';
                        break;
                    case 2:
                        emoji_check = '2️⃣';
                        break;
                    case 3:
                        emoji_check = '3️⃣';
                        break;
                    case 4:
                        emoji_check = '4️⃣';
                        break;
                    case 5:
                        emoji_check = '5️⃣';
                        break;
                    default:
                        emoji_check = '✅';
                        break;
                }
            }
            else if(["아브 데자뷰"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = '🟩';
                        break;
                    case 1:
                        emoji_check = '1️⃣';
                        break;
                    case 2:
                        emoji_check = '2️⃣';
                        break;
                    case 3:
                        emoji_check = '3️⃣';
                        break;
                    default:
                        emoji_check = '✅';
                        break;
                }
            }
            else if(["발탄 노말", "발탄 하드"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = '🟩';
                        break;
                    case 1:
                        emoji_check = '1️⃣';
                        break;
                    default:
                        emoji_check = '✅';
                        break;
                }
            }
            else if(["아르고스"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = '🟩';
                        break;
                    default:
                        emoji_check = '✅';
                        break;
                }
            }
            else
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = '🟩';
                        break;
                    case 1:
                        emoji_check = '1️⃣';
                        break;
                    case 2:
                        emoji_check = '2️⃣';
                        break;
                    default:
                        emoji_check = '✅';
                        break;
                }
            }
            
            raid_schedule = raid_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "주간 컨텐츠")
        {
            // 오늘 요일 구하기
            const curr = new Date();
            const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
            const KR_TIME_DIFF = 3 * 60 * 60 * 1000;
            const kr_curr = new Date(utc + (KR_TIME_DIFF));
            const today = kr_curr.getDay();

            let arr = [];
            arr = arr.concat(item.option);

            if(arr.includes(today))
            {
                let emoji_check = '';
                for(let i = 0 ; i<item.max; i++){
                    if(i < item.data)
                    {
                        emoji_check = emoji_check.concat('✅');
                    }
                    else
                    {
                        emoji_check = emoji_check.concat('🟩');
                    }
                }

                compass_schedule = compass_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
            }
        }
    })

    const shared_schedule_list = user.shared;
    shared_schedule_list.map(item => {
        if(item.type === "원정대 컨텐츠")
        {
            let emoji_check = '';
                for(let i = 0 ; i<item.max; i++){
                    if(i < item.data)
                    {
                        emoji_check = emoji_check.concat('✅');
                    }
                    else
                    {
                        emoji_check = emoji_check.concat('🟩');
                    }
                }

                shared_schedule = shared_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");      
        }
    })

    if(weekly_schedule !== "")
    {
        const tmp = {name: "주간 숙제", value: weekly_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(compass_schedule !== "")
    {
        const tmp = {name: "나침반 컨텐츠", value: compass_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(raid_schedule !== "")
    {
        const tmp = {name: "레이드", value: raid_schedule, inline: false};
        weekly_fields.push(tmp);
    }
    if(dungeon_schedule !== "")
    {
        const tmp = {name: "어비스 던전", value: dungeon_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(shared_schedule !== "")
    {
        const tmp = {name: "원정대 컨텐츠", value: shared_schedule, inline: true};
        weekly_fields.push(tmp);
    }


    if(weekly_fields)
    {
        embed.addFields(weekly_fields)
    }
    else{
        embed.setDescription(`활성화된 스케줄이 없습니다.\n아래 설정 버튼을 통해 스케줄을 설정하세요!`)
    }

    return embed;
}

module.exports = {
    weekly_embed,
}