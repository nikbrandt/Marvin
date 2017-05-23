module.exports = {
	xp: function(command, message, sql, Discord, colors) {
		if (command == 'xp') {
			var usID = message.author.id;
			var gID = message.guild.id;
			sql.get(`SELECT * FROM guildModeration WHERE userId = '${usID}' AND guildId = '${gID}'`).then(row => { // eslint-disable-line quotes
				if (!row) return message.channel.send(`**${message.member.displayName}** has no XP.`);
				sql.get(`SELECT * FROM moderation WHERE userId = '${usID}'`).then(row2 => {
					if (!row) return message.channel.send(`**${message.member.displayName}** has no XP.`);
					var embed = new Discord.RichEmbed()
						.setAuthor(message.member.displayName, message.author.avatarURL)
						.setColor(colors[Math.floor(Math.random() * colors.length)])
						.setDescription(`Guild Level: **${row.xpLevel}**\nGuild XP: **${row.xpCurrent}**\nGuild Total XP: **${row.xpTotal}**\nGlobal XP: **${row2.gXP}**`); // eslint-disable-line quotes
					message.channel.send({embed});
				});
			});
		}
	}
};
