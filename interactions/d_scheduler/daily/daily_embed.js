const { MessageEmbed } = require('discord.js');

async function daily_embed (user, character) {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('๐ ์ค์ผ์ค๋ฌ : ์ผ์ผ')
        .setFooter({ text: '๋ก์์ ๋ด', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    let daily_fields = [];
    let daily_schedule = "";
    let compass_schedule = "";
    let ticket_schedule = "";
    const schedule_list = user[character];
    schedule_list.map( item => {
        if(item.type === "์ผ์ผ ์์ ")
        {
            let emoji_check = '';
            for(let i = 0 ; i<item.max; i++){
                if(i < item.data)
                {
                    emoji_check = emoji_check.concat('โ');
                }
                else
                {
                    emoji_check = emoji_check.concat('๐ฉ');
                }
            }
            
            daily_schedule = daily_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "๋์นจ๋ฐ ์ปจํ์ธ ")
        {
            // ์ค๋ ์์ผ ๊ตฌํ๊ธฐ
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
                        emoji_check = emoji_check.concat('โ');
                    }
                    else
                    {
                        emoji_check = emoji_check.concat('๐ฉ');
                    }
                }

                compass_schedule = compass_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
            }
        }
        else if(item.type === "์์ฅ๊ถ")
        {
            ticket_schedule = ticket_schedule.concat("``" + item.name + "`` : ๐๏ธx" + item.data + "\n");
        }
    })

    if(daily_schedule !== "")
    {
        const tmp = {name: "์ผ์ผ ์์ ", value: daily_schedule, inline: true};
        daily_fields.push(tmp);
    }
    if(compass_schedule !== "")
    {
        const tmp = {name: "๋์นจ๋ฐ ์ปจํ์ธ ", value: compass_schedule, inline: true};
        daily_fields.push(tmp);
    }
    if(ticket_schedule !== "")
    {
        const tmp = {name: "์์ฅ๊ถ", value: ticket_schedule};
        daily_fields.push(tmp);
    }

    if(daily_fields)
    {
        embed.addFields(daily_fields)
    }
    else{
        embed.setDescription(`ํ์ฑํ๋ ์ค์ผ์ค์ด ์์ต๋๋ค.\n์๋ ์ค์  ๋ฒํผ์ ํตํด ์ค์ผ์ค์ ์ค์ ํ์ธ์!`)
    }

    return embed;
}

module.exports = {
    daily_embed,
}