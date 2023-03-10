const { MessageEmbed } = require('discord.js');

async function weekly_embed (user, character) {
    const embed = new MessageEmbed()
        .setColor('#F14966')
        .setTitle('π μ€μΌμ€λ¬ : μ£Όκ°')
        .setFooter({ text: 'λ‘μμ λ΄', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

    let weekly_fields = [];
    let weekly_schedule = "";
    let raid_schedule = "";
    let dungeon_schedule = "";
    let compass_schedule = "";
    let shared_schedule = "";
    const schedule_list = user[character];
    schedule_list.map( item => {
        if(item.type === "μ£Όκ° μμ ")
        {
            let emoji_check = '';
            for(let i = 0 ; i<item.max; i++){
                if(i < item.data)
                {
                    emoji_check = emoji_check.concat('β');
                }
                else
                {
                    emoji_check = emoji_check.concat('π©');
                }
            }
            
            weekly_schedule = weekly_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "μ΄λΉμ€ λμ ")
        {
            let emoji_check = '';
            for(let i = 0 ; i<item.max; i++){
                if(i < item.data)
                {
                    emoji_check = emoji_check.concat('β');
                }
                else
                {
                    emoji_check = emoji_check.concat('π©');
                }
            }
            
            dungeon_schedule = dungeon_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(["λ μ΄λ"].includes(item.type))
        {
            let emoji_check = '';
            if(["μλΈ λΈλ§", "μλΈ νλ"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = 'π©';
                        break;
                    case 1:
                        emoji_check = '1οΈβ£';
                        break;
                    case 2:
                        emoji_check = '2οΈβ£';
                        break;
                    case 3:
                        emoji_check = '3οΈβ£';
                        break;
                    case 4:
                        emoji_check = '4οΈβ£';
                        break;
                    case 5:
                        emoji_check = '5οΈβ£';
                        break;
                    default:
                        emoji_check = 'β';
                        break;
                }
            }
            else if(["μλΈ λ°μλ·°"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = 'π©';
                        break;
                    case 1:
                        emoji_check = '1οΈβ£';
                        break;
                    case 2:
                        emoji_check = '2οΈβ£';
                        break;
                    case 3:
                        emoji_check = '3οΈβ£';
                        break;
                    default:
                        emoji_check = 'β';
                        break;
                }
            }
            else if(["λ°ν λΈλ§", "λ°ν νλ"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = 'π©';
                        break;
                    case 1:
                        emoji_check = '1οΈβ£';
                        break;
                    default:
                        emoji_check = 'β';
                        break;
                }
            }
            else if(["μλ₯΄κ³ μ€"].includes(item.name))
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = 'π©';
                        break;
                    default:
                        emoji_check = 'β';
                        break;
                }
            }
            else
            {
                switch(item.data)
                {
                    case 0:
                        emoji_check = 'π©';
                        break;
                    case 1:
                        emoji_check = '1οΈβ£';
                        break;
                    case 2:
                        emoji_check = '2οΈβ£';
                        break;
                    default:
                        emoji_check = 'β';
                        break;
                }
            }
            
            raid_schedule = raid_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
        }
        else if(item.type === "μ£Όκ° μ»¨νμΈ ")
        {
            // μ€λ μμΌ κ΅¬νκΈ°
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
                        emoji_check = emoji_check.concat('β');
                    }
                    else
                    {
                        emoji_check = emoji_check.concat('π©');
                    }
                }

                compass_schedule = compass_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");
            }
        }
    })

    const shared_schedule_list = user.shared;
    shared_schedule_list.map(item => {
        if(item.type === "μμ λ μ»¨νμΈ ")
        {
            let emoji_check = '';
                for(let i = 0 ; i<item.max; i++){
                    if(i < item.data)
                    {
                        emoji_check = emoji_check.concat('β');
                    }
                    else
                    {
                        emoji_check = emoji_check.concat('π©');
                    }
                }

                shared_schedule = shared_schedule.concat("``" + item.name + "`` : " + emoji_check + "\n");      
        }
    })

    if(weekly_schedule !== "")
    {
        const tmp = {name: "μ£Όκ° μμ ", value: weekly_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(compass_schedule !== "")
    {
        const tmp = {name: "λμΉ¨λ° μ»¨νμΈ ", value: compass_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(raid_schedule !== "")
    {
        const tmp = {name: "λ μ΄λ", value: raid_schedule, inline: false};
        weekly_fields.push(tmp);
    }
    if(dungeon_schedule !== "")
    {
        const tmp = {name: "μ΄λΉμ€ λμ ", value: dungeon_schedule, inline: true};
        weekly_fields.push(tmp);
    }
    if(shared_schedule !== "")
    {
        const tmp = {name: "μμ λ μ»¨νμΈ ", value: shared_schedule, inline: true};
        weekly_fields.push(tmp);
    }


    if(weekly_fields)
    {
        embed.addFields(weekly_fields)
    }
    else{
        embed.setDescription(`νμ±νλ μ€μΌμ€μ΄ μμ΅λλ€.\nμλ μ€μ  λ²νΌμ ν΅ν΄ μ€μΌμ€μ μ€μ νμΈμ!`)
    }

    return embed;
}

module.exports = {
    weekly_embed,
}