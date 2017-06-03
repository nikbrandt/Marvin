module.exports = {
	xp: function(command, message, sql, args, suffix, Discord, colors, bot, config) {
		if (command == 'xp') {
			sql.get(`SELECT * FROM guildOptions WHERE guildId = ${message.guild.id}`).then(row3 => { //eslint-disable-line quotes
				if (!row3) return sql.run(`INSERT INTO guildOptions (guildId, prefix, levels) VALUES (?, ?, ?)`, [message.guild.id, '.', 'true']); //eslint-disable-line quotes
				if (row3.levels == 'false' || row3.levels === false) return message.channel.send('This guild\'s staff have disabled leveling.');
				var usID;
				if (message.mentions.users.first()) {
					usID = message.mentions.users.first().id;
				} else if (args[0] !== undefined && args[0] != '') {
					var bFindU = message.guild.members.find(val => val.user.username.toUpperCase() == suffix.toUpperCase());
					if (bFindU == undefined) {
						bFindU = message.guild.members.find(val => val.displayName.toUpperCase() == suffix.toUpperCase());
					}
					if (bFindU == undefined) {
						return message.channel.send('Could not find user by the name of `' + args[0] + '`');
					} else {
						usID = bFindU.id;
					}
				} else {
					usID = message.author.id;
				}
				var gID = message.guild.id;
				var us = bot.users.get(usID);
				sql.get(`SELECT * FROM guildModeration WHERE userId = '${usID}' AND guildId = '${gID}'`).then(row => { // eslint-disable-line quotes
					if (!row) return message.channel.send(`**${us.username}** has no XP.`);
					sql.get(`SELECT * FROM moderation WHERE userId = '${usID}'`).then(row2 => {
						if (!row2) return message.channel.send(`**${us.username}** has no XP.`);
						var nl = config.xp.levelOne * Math.pow(config.xp.eqMult, row.xpLevel + 1);
						message.channel.send(`**${us.username}** (*${row2.gXP} global XP*)\nXP: \`${row.xpCurrent}\` | Total XP: \`${row.xpTotal}\` | Level: \`${row.xpLevel}\`\n\`${Math.floor(config.xp.levelOne * Math.pow(config.xp.eqMult, row.xpLevel + 1)) - row.xpCurrent}\` XP to level ${row.xpLevel + 1} (${Math.round(row.xpCurrent / nl * 1000) / 10}%)`);
					});
				});
			});
		}
	},
	xpinfo: (command, message, config, colors) => {
		if (command == 'xpinfo' || command == 'xi') {
			message.channel.send({embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				title: 'Leveling System',
				description: 'Marvin has a leveling system that gives you xp and levels you up as you type messages. To disable this in your guild, do `.g s levels false`.',
				fields: [{
					name: 'Current Options',
					value: `XP Revolving around **${config.xp.base}**, for a range of **${config.xp.base - config.xp.min} to ${config.xp.base + config.xp.max}** XP per message.\nXP is added every **${config.xp.xpAdd / 1000}** seconds\nTo achieve level 1, you need **${config.xp.levelOne}** XP.\nEach level requires **${config.xp.eqMult}**x as much xp as the previous.\nThe maximum your xp can be multiplied for activity is **${config.xp.maxMult}**x`
				}]
			}});
		}
	},
	leaderboard: async (command, message, args, sql, bot) => {
		function usVal(num) {
			if (top5[num] === undefined) {
				us[num] = '';
			} else {
				us[num] = `${bot.users.get(top5[num].userId).username} | Level ${top5[num].xpLevel} | ${top5[num].xpTotal} XP`;
			}
		}
		function usValG(num) {
			if (top5[num] === undefined) {
				us[num] = '';
			} else {
				us[num] = `${bot.users.get(top5[num].userId).username} | ${top5[num].gXP} XP`;
			}
		}
		if (command == 'leaderboard' || command == 'lb') {
			var top5;
			var us = ['', '', '', '', ''];
			if (args[0] === undefined || args[0] == 'server' || args[0] == 'local' || args[0] == 'guild' || args[0].length == 18) {
				var gID = message.guild.id;
				if (message.author.id == '179114344863367169') {
					if (args[1] == undefined) {
						gID = bot.guilds.get(args[0]).id;
						if (gID === undefined) {
							message.channel.send('that\'s not a guild lol');
							return gID = message.guild.id;
						}
					} else {
						gID = bot.guilds.get(args[1]).id;
						if (gID === undefined) {
							message.channel.send('that\'s not a guild lol');
							return gID = message.guild.id;
						}
					}
				}
				top5 = await sql.all('SELECT * FROM guildModeration WHERE guildId = \'' + gID + '\'').then(rows => {
					return rows.sort(function(a, b) { return a.xpTotal < b.xpTotal ? 1 : -1; }).slice(0, 5);
				});
				if (top5[0] === undefined) {
					us[0] = 'No one has talked yet.. ;-;';
					us[1] = '', us[2] = '', us[3] = '', us[4] = '';
				} else {
					usVal(0);
					usVal(1);
					usVal(2);
					usVal(3);
					usVal(4);
				}
				message.channel.send(`${bot.guilds.get(gID).name} **Leaderboard**\n👑 **${us[0]}**\n:two: ${us[1]}\n:three: ${us[2]}\n:four: ${us[3]}\n:five: ${us[4]}`);
			}
			if (args[0] == 'global' || args[0] == 'g') {
				top5 = await sql.all('SELECT * FROM moderation').then(rows => {
					return rows.sort(function(a, b) { return a.gXP < b.gXP ? 1 : -1; }).slice(0, 5);
				});
				usValG(0);
				usValG(1);
				usValG(2);
				usValG(3);
				usValG(4);
				message.channel.send(`Global **Leaderboard**\n👑 **${us[0]}**\n:two: ${us[1]}\n:three: ${us[2]}\n:four: ${us[3]}\n:five: ${us[4]}`);
			}
		}
	}
};
