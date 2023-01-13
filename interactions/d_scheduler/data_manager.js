const { QuickDB } = require('quick.db');
const db = new QuickDB();

const data = {}

data.schedule_name = []; // 현재 검색중인 스케줄 이름
data.character_index = [];
data.scheduler = [];    // 현재 일일 or 주간 상태 확인

const shared_schedule = [
    {name : "도전 가디언", data : 0, max : 1, type : "원정대 컨텐츠", active : true},  // 도비스
    {name : "도전 어비스", data : 0, max : 1, type : "원정대 컨텐츠", active : true},  // 도디언
    {name : "쿠크 리허설", data : 0, max : 1, type : "원정대 컨텐츠", id : "kouku", active : true}, // 쿠크 리허설
    {name : "아브 데자뷰", data : 0, max : 1, type : "원정대 컨텐츠", id : "abrelshud", active : true}, // 아브 데자뷰
]

const all_schedule = [
    //daily schedule
    {name : "카오스 던전", data : 0, max : 2, type : "일일 숙제", active : true},  // 카던
    {name : "가디언 토벌", data : 0, max : 2, type : "일일 숙제", active : true},   // 가디언
    {name : "일일 에포나", data : 0, max : 3, type : "일일 숙제", active : true},  // 에포나
    //daily optional schedule
    {name : "일일 이벤트", data : 0, max : 1, type : "일일 숙제", active : false},    // 일일 이벤트
    {name : "비탄의 섬", data : 0, max : 1, type : "일일 숙제", active : false},   // 비탄의 섬
    //compass schedule
    {name : "모험섬", data : 0, max : 1, type : "나침반 컨텐츠", option : [0,1,2,3,4,5,6], active : true}, // 모험섬
    {name : "카오스게이트", data : 0, max : 1, type : "나침반 컨텐츠", option : [0,1,4,6], active : true}, // 카오스 게이트
    {name : "필드보스", data : 0, max : 1, type : "나침반 컨텐츠", option : [0,2,5],  active : true}, // 필드보스
    {name : "점령전", data : 0, max : 1, type : "나침반 컨텐츠", option : [0,6],  active : true}, // 점령전
    //compass weekly schedule
    {name : "로웬", data : 0, max : 2, type : "주간 컨텐츠", option : [0,1,3,4,6],  active : false}, // 로웬
    {name : "유령선", data : 0, max : 1, type : "주간 컨텐츠", option : [2,4,6],  active : true}, // 유령선
    {name : "툴루비크", data : 0, max : 1, type : "주간 컨텐츠", option : [0,3,6],  active : false}, // 툴루비크
    //weekly schedule
    {name : "주간 에포나", data : 0, max : 3, type : "주간 숙제", active : true}, // 에포나
    {name : "주간 이벤트", data : 0, max : 1, type : "주간 숙제", active : false},    // 주간 이벤트
    {name : "오레하 2종", data : 0, max : 1, type : "어비스 던전", active : true}, // 오레하 2종
    {name : "6종 카드작", data : 0, max : 1, type : "어비스 던전", active : false}, // 6종
    {name : "낙원 3종", data : 0, max : 1, type : "어비스 던전", active : false}, // 낙원 3종
    {name : "카양겔", data : 0, max : 1, type : "어비스 던전", active : false}, // 카양겔
    {name : "아르고스", data : 0, max : 1, type : "레이드", active : true}, // 아르고스
    {name : "발탄 노말", data : 0, max : 1, type : "레이드", id : "valtan", active : true}, // 발탄 노말
    {name : "발탄 하드", data : 0, max : 1, type : "레이드", id : "valtan", active : false}, // 발탄 하드
    {name : "비아 노말", data : 0, max : 1, type : "레이드", id : "vykas", active : true}, // 비아 노말
    {name : "비아 하드", data : 0, max : 1, type : "레이드", id : "vykas", active : false}, // 비아 하드
    {name : "쿠크 리허설", data : 0, max : 1, type : "레이드", id : "kouku", active : true}, // 쿠크 리허설
    {name : "쿠크 노말", data : 0, max : 1, type : "레이드", id : "kouku", active : false}, // 쿠크 노말
    {name : "아브 데자뷰", data : 0, max : 2, type : "레이드", id : "abrelshud", active : false}, // 아브 데자뷰
    {name : "아브 노말", data : 0, max : 3, type : "레이드", id : "abrelshud", active : false}, // 아브 노말 12
    {name : "아브 하드", data : 0, max : 3, type : "레이드", id : "abrelshud", active : false}, // 아브 하드 12
    //ticket schedule
    {name : "회랑 노말", data : 0, type : "입장권", active : true}, // 보스러시 노말
    {name : "회랑 하드", data : 0, type : "입장권", active : false}, // 보스러시 하드
    {name : "회랑 헬", data : 0, type : "입장권", active : false}, // 보스러시 헬
    {name : "큐브 노말", data : 0, type : "입장권", active : true}, // 큐브 노말
    {name : "큐브 하드", data : 0, type : "입장권", active : false}, // 큐브 하드
    {name : "큐브 헬", data : 0, type : "입장권", active : false}, // 큐브 헬
    {name : "플래티넘 필드", data : 0, type : "입장권", active : true}, // 플래티넘 필드
]

data.has = async (id) => {
    const result = await db.has(id);
    return result;
}

data.register = async (id, name) => {   // name : LIST
    for(let i in name)
    {
        await db.set(`${id}.${name[i]}`, all_schedule);
    }
    await db.set(`${id}.shared`, shared_schedule);
    await db.set(`${id}.setting`, {show : true, character : name[0]});
    console.log(name[0]);
}

data.reset = async (id) => {
    await db.delete(id);
}

data.set_character = async (id, num) => {
    await db.set(`${id}.setting.character`, num);
}

data.get_character = async (id) => {
    const result =  await db.get(`${id}.setting.character`);
    return result;
}

data.show = async (id) => {
    const isShow = await db.get(`${id}.setting.show`);

    if(isShow)
        await db.set(`${id}.setting.show`, false);
    else
        await db.set(`${id}.setting.show`, true);
}

data.isShow = async (id) => {
    const isShow = await db.get(`${id}.setting.show`);
    return isShow;
}

data.all = async () => {
    const result = await db.all();
    return result;
}

data.allReset = async (num) => {
    const all_user_data = await db.all();

    let address = [];
    all_user_data.map((item) => {
        const id = item.id;
        const characters = Object.keys(item.value);

        for(let character of characters)
        {
            if(character !== "setting")
            {
                address.push(`${id}.${character}`);
            }
        }
    });

    for(let i of address)
    {
        if(num === 0 && !i.includes("shared"))
        {
            await db.set(`${i}[0].data`, 0);
            await db.set(`${i}[1].data`, 0);
            await db.set(`${i}[2].data`, 0);
            await db.set(`${i}[3].data`, 0);
            await db.set(`${i}[4].data`, 0);
            await db.set(`${i}[5].data`, 0);
            await db.set(`${i}[6].data`, 0);
            await db.set(`${i}[7].data`, 0);
            await db.set(`${i}[8].data`, 0);
        }
        else if(num === 1)
        {
            if(i.includes("shared"))
            {
                await db.set(`${i}[0].data`, 0);
                await db.set(`${i}[1].data`, 0);
                await db.set(`${i}[2].data`, 0);
                await db.set(`${i}[3].data`, 0);
            }
            else
            {
                await db.set(`${i}[9].data`, 0);
                await db.set(`${i}[10].data`, 0);
                await db.set(`${i}[11].data`, 0);
                await db.set(`${i}[12].data`, 0);
                await db.set(`${i}[13].data`, 0);
                await db.set(`${i}[14].data`, 0);
                await db.set(`${i}[15].data`, 0);
                await db.set(`${i}[16].data`, 0);
                await db.set(`${i}[17].data`, 0);
                await db.set(`${i}[18].data`, 0);
            }
        }
        else if(num === 2 && !i.includes("shared"))
        {
            await db.set(`${i}[19].data`, 0);
            await db.set(`${i}[20].data`, 0);
            await db.set(`${i}[21].data`, 0);
            await db.set(`${i}[22].data`, 0);
            await db.set(`${i}[23].data`, 0);
            await db.set(`${i}[24].data`, 0);
            await db.set(`${i}[25].data`, 0);
            await db.set(`${i}[26].data`, 0);
            await db.set(`${i}[27].data`, 0);
        }
        else if(num === 3 && !i.includes("shared"))
        {
            await db.set(`${i}[28].data`, 0);
            await db.set(`${i}[29].data`, 0);
            await db.set(`${i}[30].data`, 0);
            await db.set(`${i}[31].data`, 0);
            await db.set(`${i}[32].data`, 0);
            await db.set(`${i}[33].data`, 0);
            await db.set(`${i}[34].data`, 0);
        }
    }
}

data.dataReset = async (id, character, num) => {
    if(num === 0)
    {
        await db.set(`${id}.${character}[0].data`, 0);
        await db.set(`${id}.${character}[1].data`, 0);
        await db.set(`${id}.${character}[2].data`, 0);
        await db.set(`${id}.${character}[3].data`, 0);
        await db.set(`${id}.${character}[4].data`, 0);
        await db.set(`${id}.${character}[5].data`, 0);
        await db.set(`${id}.${character}[6].data`, 0);
        await db.set(`${id}.${character}[7].data`, 0);
        await db.set(`${id}.${character}[8].data`, 0);
    }
    else if(num === 1)
    {
        await db.set(`${id}.shared[0].data`, 0);
        await db.set(`${id}.shared[1].data`, 0);
        await db.set(`${id}.shared[2].data`, 0);
        await db.set(`${id}.shared[3].data`, 0);
        await db.set(`${id}.${character}[9].data`, 0);
        await db.set(`${id}.${character}[10].data`, 0);
        await db.set(`${id}.${character}[11].data`, 0);
        await db.set(`${id}.${character}[12].data`, 0);
        await db.set(`${id}.${character}[13].data`, 0);
        await db.set(`${id}.${character}[14].data`, 0);
        await db.set(`${id}.${character}[15].data`, 0);
        await db.set(`${id}.${character}[16].data`, 0);
        await db.set(`${id}.${character}[17].data`, 0);
        await db.set(`${id}.${character}[18].data`, 0);
    }
    else if(num === 2)
    {
        await db.set(`${id}.${character}[19].data`, 0);
        await db.set(`${id}.${character}[20].data`, 0);
        await db.set(`${id}.${character}[21].data`, 0);
        await db.set(`${id}.${character}[22].data`, 0);
        await db.set(`${id}.${character}[23].data`, 0);
        await db.set(`${id}.${character}[24].data`, 0);
        await db.set(`${id}.${character}[25].data`, 0);
        await db.set(`${id}.${character}[26].data`, 0);
        await db.set(`${id}.${character}[27].data`, 0);
    }
    else if(num === 3)
    {
        await db.set(`${id}.${character}[28].data`, 0);
        await db.set(`${id}.${character}[29].data`, 0);
        await db.set(`${id}.${character}[30].data`, 0);
        await db.set(`${id}.${character}[31].data`, 0);
        await db.set(`${id}.${character}[32].data`, 0);
        await db.set(`${id}.${character}[33].data`, 0);
        await db.set(`${id}.${character}[34].data`, 0);
    }
}

data.activateReset = async (id, character, num) => {
    if(num === 0)
    {
        await db.set(`${id}.${character}[0].active`, false);
        await db.set(`${id}.${character}[1].active`, false);
        await db.set(`${id}.${character}[2].active`, false);
        await db.set(`${id}.${character}[3].active`, false);
        await db.set(`${id}.${character}[4].active`, false);
        await db.set(`${id}.${character}[5].active`, false);
        await db.set(`${id}.${character}[6].active`, false);
        await db.set(`${id}.${character}[7].active`, false);
        await db.set(`${id}.${character}[8].active`, false);
    }
    else if(num === 1)
    {
        await db.set(`${id}.shared[0].active`, false);
        await db.set(`${id}.shared[1].active`, false);
        await db.set(`${id}.shared[2].active`, false);
        await db.set(`${id}.shared[3].active`, false);
        await db.set(`${id}.${character}[9].active`, false);
        await db.set(`${id}.${character}[10].active`, false);
        await db.set(`${id}.${character}[11].active`, false);
        await db.set(`${id}.${character}[12].active`, false);
        await db.set(`${id}.${character}[13].active`, false);
        await db.set(`${id}.${character}[14].active`, false);
        await db.set(`${id}.${character}[15].active`, false);
        await db.set(`${id}.${character}[16].active`, false);
        await db.set(`${id}.${character}[17].active`, false);
        await db.set(`${id}.${character}[18].active`, false);
    }
    else if(num === 2)
    {
        await db.set(`${id}.${character}[19].active`, false);
        await db.set(`${id}.${character}[20].active`, false);
        await db.set(`${id}.${character}[21].active`, false);
        await db.set(`${id}.${character}[22].active`, false);
        await db.set(`${id}.${character}[23].active`, false);
        await db.set(`${id}.${character}[24].active`, false);
        await db.set(`${id}.${character}[25].active`, false);
        await db.set(`${id}.${character}[26].active`, false);
        await db.set(`${id}.${character}[27].active`, false);
    }
    else if(num === 3)
    {
        await db.set(`${id}.${character}[28].active`, false);
        await db.set(`${id}.${character}[29].active`, false);
        await db.set(`${id}.${character}[30].active`, false);
        await db.set(`${id}.${character}[31].active`, false);
        await db.set(`${id}.${character}[32].active`, false);
        await db.set(`${id}.${character}[33].active`, false);
        await db.set(`${id}.${character}[34].active`, false);
    }
}

data.activate = async (id, character, arr) => {
    for(let i in arr)
    {
        if(["원정대 컨텐츠"].includes(arr[i]))
        {
            await db.set(`${id}.shared[0].active`, true);
            await db.set(`${id}.shared[1].active`, true);
            await db.set(`${id}.shared[2].active`, true);
            await db.set(`${id}.shared[3].active`, true);
        }
        else
        {
            const user_data = await db.get(`${id}.${character}`);

            const user_data_index = user_data.findIndex( item => {
                return item.name === arr[i]
            })

            const address = `${id}.${character}[${user_data_index}].active`
            await db.set(address, true);
        }
    }
}

data.get = async (id) => {
    const user_data = await db.get(id);
    return user_data;
}

data.getActive = async (id) => {
    const user_data = await db.get(id);
    const characters = Object.keys(user_data)

    let active_user_data = {}
    for(let character of characters)
    {
        if(character !== "setting")
        {
            active_user_data[character] = user_data[character].filter(
                function(item){
                    return item.active === true
            })
        }
    }

    return active_user_data;
}

data.set = async (id, character, name, num) => {
    if(["도전 가디언", "도전 어비스"].includes(name))
    {
        const user_data = await db.get(`${id}.shared`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1 && num !== -1)
        {
            await db.set(`${id}.shared[${user_data_index}].data`, num);
        }
    }
    else
    {
        const user_data = await db.get(`${id}.${character}`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1 && num !== -1)
        {
            await db.set(`${id}.${character}[${user_data_index}].data`, num);
        }

        const user_data2 = await db.get(`${id}.${character}`);

        await user_data2.map( item => {
            if(item.active === true && item.name === name  && num !== -1)
            {
                if(item.id === "kouku")
                {
                    if(item.data !== 0)
                    {
                        db.set(`${id}.shared[2].data`, 1);
                    }
                    else
                    {
                        db.set(`${id}.shared[2].data`, 0);
                    }
                }
                else if(item.id === "abrelshud")
                {
                    if(item.data !== 0)
                    {
                        db.set(`${id}.shared[3].data`, 1);
                    }
                    else
                    {
                        db.set(`${id}.shared[3].data`, 0);
                    }
                }
            }
        });
    }
}

data.add = async (id, character, name) => {
    if(["도전 가디언", "도전 어비스"].includes(name))
    {
        const user_data = await db.get(`${id}.shared`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1)
        {
            if(user_data[user_data_index].data < user_data[user_data_index].max)
                await db.add(`${id}.shared[${user_data_index}].data`, 1);
        }
    }
    else
    {
        const user_data = await db.get(`${id}.${character}`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1)
        {
            if(user_data[user_data_index].data < user_data[user_data_index].max)
                await db.add(`${id}.${character}[${user_data_index}].data`, 1);
        }
    }
}

data.sub = async (id, character, name) => {
    if(["도전 가디언", "도전 어비스", "쿠크 리허설", "아브 데자뷰"].includes(name))
    {
        const user_data = await db.get(`${id}.shared`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1)
        {
            if(user_data[user_data_index].data > 0)
            await db.sub(`${id}.shared[${user_data_index}].data`, 1);
        }
    }
    else
    {
        const user_data = await db.get(`${id}.${character}`);

        const user_data_index = user_data.findIndex( item => {
            return item.active === true && item.name === name
        })

        if(user_data_index !== -1)
        {
            if(user_data[user_data_index].data > 0)
                await db.sub(`${id}.${character}[${user_data_index}].data`, 1);
        }
    }
}

module.exports = data;