const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const {token, channelId, ichannelId} = require('./config3.json');
const fs = require('fs');
const axios = require("axios");
const schedule = require('node-schedule');
const data = require("./interactions/d_scheduler/data_manager");


// client 생성
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES], allowedMentions: { parse: ['roles', 'users'], repliedUser: false }});


// 하위 파일 모두 불러오기
function getFiles(dir, files_) {
 	files_ = files_ || [];
	let files = fs.readdirSync(dir);
	for (let i in files){
		let name = dir + '/' + files[i];
		if(fs.statSync(name).isDirectory()){
			getFiles(name, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
};


// interaction 등록
let ia = [];
let buttons = [];

const interactions = getFiles('./interactions');
const buttonFiles = interactions.filter(file => file.endsWith('0.js'));

for (let i in interactions) {
	const selected_interaction = require(`${interactions[i]}`);
	if(selected_interaction.customId){
		ia.push(selected_interaction);
	}
	if(selected_interaction.components)
	{
		ia = ia.concat(selected_interaction.components);
	}
}

//console.log(ia);

for (let i in buttonFiles) {
	const button = require(`${buttonFiles[i]}`);
	buttons.push(button);
}

// 봇 준비 상태
client.on('ready', async c => {
    console.log(`${c.user.tag} 정상 실행`);
	
	// 채널 설정
	const rcon_channel = client.channels.cache.get(channelId);
	const island_channel = client.channels.cache.get(ichannelId);

	// 기본 임베드
	const embed = new MessageEmbed()
	.setColor('#F14966')
        .setTitle('📙 로아유봇 리모콘')
        .setDescription('로아와 관련된 기능을 간편하게 사용할 수 있습니다.')
		.setFooter({text: "아래 버튼을 클릭하세요!"})
        .setAuthor({name: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' });

	const row = new MessageActionRow().addComponents(
		buttons.map((button) => {
			return new MessageButton()
			.setCustomId(button.customId)
			.setLabel(button.label)
			.setStyle(button.style);
		})
	)

	schedule.scheduleJob('0 30 1,9 * * ?', async () => {
		try{
			const island_result = await axios.get(`https://lostarkapi.ga/adventureisland/`);

			const island_embed = new MessageEmbed()
				.setColor('#F14966')
        		.setTitle(`🧭 오늘의 모험섬 [${island_result.data.IslandDate}]`)
				.setFooter({ text: '로아유봇', iconURL: 'https://imgur.com/IhMjCEt.jpg' })
				.addFields(
					{name: `${island_result.data.Island[0].Name}`, value: `${island_result.data.Island[0].Reward}`, inline: true},
					{name: `${island_result.data.Island[1].Name}`, value: `${island_result.data.Island[1].Reward}`, inline: true},
					{name: `${island_result.data.Island[2].Name}`, value: `${island_result.data.Island[2].Reward}`, inline: true},
					{name : "Powered by", value: "[모코코더#3931](<https://www.inven.co.kr/board/lostark/4821/85972/>)"}
				)
		
			island_channel.send({embeds: [island_embed]});
		}catch(err){
			console.log(err);
		}
	});

	//daily reset
	schedule.scheduleJob('0 0 21 * * ?', async () => {
		await data.allReset(0);
	});

	//weekly reset
	schedule.scheduleJob('0 0 21 ? * TUE', async () => {
		await data.allReset(1);
		await data.allReset(2);
	});

	// 기존 리모콘 삭제
	rcon_channel.bulkDelete(5)
		.then(messages => console.log(`Bulk deleted ${messages.size} messages`))
		.catch(console.error);

	// 새 리모콘 생성
	rcon_channel.send({embeds: [embed], components: [row]});
});


// 이벤트 리스너
client.on('interactionCreate', async interaction => {
	if (interaction.isCommand())	// 명령어 이벤트
	{
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '명령어를 실행하는데 오류가 발생했습니다!', ephemeral: true });
		}
	}
	else if (interaction.isButton())	// 버튼 이벤트
	{
		const button = ia.find(
			button => button.customId === interaction.customId
		);

		if(!button) return;

		try {
			await button.action(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '명령어를 실행하는데 오류가 발생했습니다!', ephemeral: true });
		}
		
	}
	else if (interaction.isSelectMenu())	// 셀렉트 메뉴 이벤트
	{
		const menu = ia.find(
			menu => menu.customId === interaction.customId
		);

		if(!menu) return;

		try {
			await menu.action(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '명령어를 실행하는데 오류가 발생했습니다!', ephemeral: true });
		}
	}
	else if (interaction.isModalSubmit())	// 모달 확인 이벤트
	{
		const modal = ia.find(
			modal => modal.customId === interaction.customId
		);

		if(!modal) return;

		try {
			await modal.action(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: '명령어를 실행하는데 오류가 발생했습니다!', ephemeral: true });
		}
	} 
	else return;
});

// 봇 실행 -> token 수정 필요시 config.json
client.login(token);