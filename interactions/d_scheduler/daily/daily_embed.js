const { MessageEmbed } = require('discord.js');

async function daily_embed (user, character) {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('📅 스케줄러 : 일일')
        .setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    let daily_fields = [];
    let daily_schedule = "";
    let compass_schedule = "";
    let ticket_schedule = "";
    const schedule_list = user[character];
    schedule_list.map( item => {
        if(item.type === "일일 숙제")
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
            
            daily_schedule = daily_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "나침반 컨텐츠")
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
        else if(item.type === "입장권")
        {
            ticket_schedule = ticket_schedule.concat("``" + item.name + "`` : 🎟️x" + item.data + "\n");
        }
    })

    if(daily_schedule !== "")
    {
        const tmp = {name: "일일 숙제", value: daily_schedule, inline: true};
        daily_fields.push(tmp);
    }
    if(compass_schedule !== "")
    {
        const tmp = {name: "나침반 컨텐츠", value: compass_schedule, inline: true};
        daily_fields.push(tmp);
    }
    if(ticket_schedule !== "")
    {
        const tmp = {name: "입장권", value: ticket_schedule};
        daily_fields.push(tmp);
    }

    if(daily_fields)
    {
        embed.addFields(daily_fields)
    }
    else{
        embed.setDescription(`활성화된 스케줄이 없습니다.\n아래 설정 버튼을 통해 스케줄을 설정하세요!`)
    }

    return embed;
}

module.exports = {
    daily_embed,
}