module.exports = {
	xp: function(command, message, sql, args, suffix, Discord, colors, bot) {
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
						if (!row) return message.channel.send(`**${us.username}** has no XP.`);
						var embed = new Discord.RichEmbed()
							.setAuthor(us.username, us.avatarURL)
							.setColor(colors[Math.floor(Math.random() * colors.length)])
							.setDescription(`Guild Level: **${row.xpLevel}**\nGuild XP: **${row.xpCurrent}**\nGuild Total XP: **${row.xpTotal}**\nGlobal XP: **${row2.gXP}**`); // eslint-disable-line quotes
						message.channel.send({embed});
					});
				});
			});
		}
	}
};
