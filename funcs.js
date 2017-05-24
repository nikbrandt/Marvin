/* eslint-disable quotes */
module.exports = {
	instadelete: function(bot, message) {
		if (message.channel.id != 304430648708300800) return;
		message.delete(10000);
	},
	logger: function(bot, message) {
		if (message.channel.id == '304441662724243457') return;
		if (message.channel.type == 'text') {
			bot.channels.get('304441662724243457').send('**'+message.guild+'** #'+message.channel.name+' *'+message.author.username+'#'+message.author.discriminator+'* **|** '+message.content.replace(/@/g,''));
		}
		if (message.channel.type == 'dm') {
			bot.channels.get('304441662724243457').send('**DM** *'+message.author.username+'#'+message.author.discriminator+'* **|** '+message.content.replace(/@/g,''));
		}
	},
	levels: function(bot, message, sql) {
		sql.get(`SELECT * FROM guildOptions WHERE guildId = ${message.guild.id}`).then(row3 => { //eslint-disable-line quotes
			if (!row3) return sql.run(`INSERT INTO guildOptions (guildId, prefix, levels) VALUES (?, ?, ?)`, [message.guild.id, '.', 'true']); //eslint-disable-line quotes
			if (row3.levels == 'false' || row3.levels === false) return;
			if (message.author.bot) return;
			if (message.channel.type != 'text') return;
			if (message.channel.id == '304429222477299712') return;
			var usID = message.author.id;
			var gID = message.guild.id;
			sql.get(`SELECT * FROM guildModeration WHERE userId = '${usID}' AND guildId = '${gID}'`).then(row => {
				sql.get(`SELECT * FROM moderation WHERE userId = '${usID}'`).then(row2 => {
					if (!row) sql.run(`INSERT INTO guildModeration (guildId, userId, bans, kicks, mutes, warns, banEnd, muteEnd, xpLevel, xpTotal, xpCurrent, lastMessage, lastXP, xpM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [gID, usID, 0, 0, 0, 0, null, null, 0, 0, 0, Date.now(), Date.now(), 1]);
					if (!row2) sql.run(`INSERT INTO moderation (userId, gBans, gKicks, gMutes, gWarns, gCases, gXP) VALUES (?, ?, ?, ?, ?, ?, ?)`, [usID, 0, 0, 0, 0, 0, 0]);
					if (!row || !row2) return;
					if (Date.now() - row.lastXP < 15000) return sql.run(`UPDATE guildModeration SET lastMessage = ${Date.now()} WHERE userId = ${usID} AND guildId = ${gID}`);
					var xpM;
					if (Date.now() - row.lastMessage < 15000) {
						xpM = row.xpM * 1.025;
					} else if (Date.now() - row.lastMessage < 30000) {
						xpM = row.xpM * 1.0125;
					} else if (Date.now() - row.lastMessage < 60000) {
						xpM = row.xpM * 1.005;
					} else {
						xpM = 1;
					}
					if (xpM > 3) xpM = 3;
					sql.run(`UPDATE guildModeration SET xpM = ${xpM} WHERE userId = ${usID} AND guildId = ${gID}`);
					var xpMN = Math.round(xpM * 5);
					var xpMin = xpMN - 2;
					var xpMax = xpMN + 2;
					var xpAdd = Math.round(Math.random() * (xpMax - xpMin) + xpMin);
					if (row.xpCurrent + xpAdd >= Math.floor(100 * Math.pow(1.07, row.xpLevel))) {
						sql.run(`UPDATE guildModeration SET xpLevel = ${row.xpLevel + 1} WHERE userId = '${usID}' AND guildId = '${gID}'`);
						sql.run(`UPDATE guildModeration SET xpCurrent = ${Math.floor(100 * Math.pow(1.07, row.xpLevel)) - (row.xpCurrent - xpAdd)} WHERE userId = '${usID}' AND guildId = '${gID}'`);
						message.channel.send(`Good job, <@${message.author.id}>, you've achieved level **${row.xpLevel + 1}**!`);
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
			var games = ['.invite is cool', `${bot.guilds.size} servers`, `${bot.users.size} users`, 'tell your friends'];
			bot.user.setGame('.help | ' + games[Math.floor(Math.random() * games.length)], 'https://www.twitch.tv/hey');
		}, 30000);
	}
};
