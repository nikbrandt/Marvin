/* eslint-disable quotes */
module.exports = {
	instadelete: function(bot, message) {
		if (message.channel.id != 304430648708300800) return;
		message.delete(10000);
	},
	logger: function(bot, message, moment) {
		if (bot.logChannel === undefined) return;
		if (message.channel.id == bot.logLog.id) return;
		if (message.author.id == bot.user.id) return;
		if (bot.logChannelG === true) {
			if (message.guild.id != bot.logChannel.id) return;
			bot.logLog.send(`**${message.guild.name}** #${message.channel.name} *${message.author.tag}* at ${moment(message.createdTimestamp).format('h:mm:ss a')}\n ${message.content}`);
		}
		if (bot.logChannelG === false) {
			if (message.channel.id != bot.logChannel.id) return;
			bot.logLog.send(`**${message.guild.name}** #${message.channel.name} *${message.author.tag}* at ${moment(message.createdTimestamp).format('h:mm:ss a')}\n ${message.content}`);
		}
	},
	levels: function(bot, message, sql, config) {
		if (message.author.bot) return;
		if (message.channel.type != 'text') return;
		if (message.channel.id == '304429222477299712') return;
		sql.get(`SELECT * FROM guildOptions WHERE guildId = ${message.guild.id}`).then(row3 => { //eslint-disable-line quotes
			if (!row3) return sql.run(`INSERT INTO guildOptions (guildId, prefix, levels) VALUES (?, ?, ?)`, [message.guild.id, '.', 'true']); //eslint-disable-line quotes
			if (row3.levels == 'false' || row3.levels === false) return;
			var usID = message.author.id;
			var gID = message.guild.id;
			sql.get(`SELECT * FROM guildModeration WHERE userId = '${usID}' AND guildId = '${gID}'`).then(row => {
				sql.get(`SELECT * FROM moderation WHERE userId = '${usID}'`).then(row2 => {
					if (!row) sql.run(`INSERT INTO guildModeration (guildId, userId, bans, kicks, mutes, warns, banEnd, muteEnd, xpLevel, xpTotal, xpCurrent, lastMessage, lastXP, xpM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [gID, usID, 0, 0, 0, 0, null, null, 0, 0, 0, Date.now(), Date.now(), 1]);
					if (!row2) sql.run(`INSERT INTO moderation (userId, gBans, gKicks, gMutes, gWarns, gCases, gXP) VALUES (?, ?, ?, ?, ?, ?, ?)`, [usID, 0, 0, 0, 0, 0, 0]);
					if (!row || !row2) return;
					if (Date.now() - row.lastXP < config.xp.xpAdd) return sql.run(`UPDATE guildModeration SET lastMessage = ${Date.now()} WHERE userId = ${usID} AND guildId = ${gID}`);
					var xpM;
					if (Date.now() - row.lastMessage < 15000) {
						xpM = row.xpM * 1.02;
					} else if (Date.now() - row.lastMessage < 30000) {
						xpM = row.xpM * 1.01;
					} else if (Date.now() - row.lastMessage < 60000) {
						xpM = row.xpM * 1.005;
					} else {
						xpM = 1;
					}
					if (xpM > config.xp.maxMult) xpM = config.xp.maxMult;
					sql.run(`UPDATE guildModeration SET xpM = ${xpM} WHERE userId = ${usID} AND guildId = ${gID}`);
					var xpMN = Math.round(xpM * config.xp.base);
					var xpMin = xpMN - config.xp.min;
					var xpMax = xpMN + config.xp.max;
					var xpAdd = Math.round(Math.random() * (xpMax - xpMin) + xpMin);
					var lvArray = [];
					var lvNum = 0;
					var xpL = 0;
					for (var i = 0; i < 101; i++) {
						lvNum += Math.round(config.xp.levelOne * Math.pow(config.xp.eqMult, i));
						lvArray.push(lvNum);
						if (lvNum < row.xpTotal) xpL = i + 1;
					}
					if (row.xpTotal + xpAdd >= lvArray[xpL] && xpL + 1 != row.xpLevel) {
						sql.run(`UPDATE guildModeration SET xpLevel = ${xpL + 1} WHERE userId = '${usID}' AND guildId = '${gID}'`);
						sql.run(`UPDATE guildModeration SET xpCurrent = ${row.xpTotal - lvArray[xpL]} WHERE userId = '${usID}' AND guildId = '${gID}'`);
						message.channel.send(`Good job, <@${message.author.id}>, you've achieved level **${xpL + 1}**!`);
					} else {
						sql.run(`UPDATE guildModeration SET xpCurrent = ${row.xpCurrent + xpAdd} WHERE userId = '${usID}' AND guildId = '${gID}'`);
					}
					sql.run(`UPDATE guildModeration SET xpTotal = ${row.xpTotal + xpAdd} WHERE userId = '${usID}' AND guildId = '${gID}'`);
					sql.run(`UPDATE guildModeration SET lastXP = ${Date.now()} WHERE userId = '${usID}' AND guildId = '${gID}'`);
					sql.run(`UPDATE guildModeration SET lastMessage = ${Date.now()} WHERE userId = '${usID}' AND guildId = '${gID}'`);
					sql.run(`UPDATE moderation SET gXP = ${row2.gXP + xpAdd} WHERE userId = '${usID}'`);
				});
			});
		});
	},
	games: function(bot) {
		setInterval(() => {
			var games = ['.invite is cool', `${bot.guilds.size} servers`, `${bot.users.size} users`, 'tell your friends', 'textedit ftw', 'random joke: a social life', 'what a lonely life', 'here i am, brain the size of a planet..', '.die 4 69', '.mc :o'];
			bot.user.setGame('.help | ' + games[Math.floor(Math.random() * games.length)], 'https://www.twitch.tv/hey');
		}, 30000);
	}
};
