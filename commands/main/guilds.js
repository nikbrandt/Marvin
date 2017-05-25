module.exports = {
	guild: function(command, message, args, suffix, sql) {
		if (command == 'guild' || command == 'server' || command == 'g' || command == 's') {
			if (!message.member.permissions.has('MANAGE_GUILD') && message.author.id != '179114344863367169') return message.channel.send('You do not have the server permission `Manage Server`');
			var gID = message.guild.id;
			sql.get(`SELECT * FROM guildOptions WHERE guildId = ${gID}`).then(row => { // eslint-disable-line quotes
				if (!row) {
					sql.run(`INSERT INTO guildOptions (guildId, prefix, levels) VALUES (?, ?, ?)`, [gID, '.', 'true']); //eslint-disable-line quotes
					return message.channel.send(`Current Options:\nLevels enabled: \`true\``); //eslint-disable-line quotes
				}
				if (args[0] == 'settings' || args[0] == 'options' || args[0] == undefined) {
					message.channel.send(`Current Options:\nLevels enabled: \`${row.levels}\``); //eslint-disable-line quotes
				}
				if (args[0] == 's' || args[0] == 'setting' || args[0] == 'option' || args[0] == 'o') {
					if (args[1] != 'levels' && args[1] != 'list' && args[1] != 'l') return message.channel.send('Invalid argument. For a list, type .g s l');
					if (args[1] == 'l' || args[1] == 'list') return message.channel.send('Possible options: `levels`');
					if (args[1] == 'levels' && args[2] != 'true' && args[2] != 'false') return message.channel.send('Value must be either `true` or `false`');
					// if (args[1] == 'prefix' && args[2].length > 5) return message.channel.send('That long of a prefix? No thanks.');

					sql.run(`UPDATE guildOptions SET ${args[1]} = '${args[2]}' WHERE guildId = ${gID}`); // eslint-disable-line quotes
					message.channel.send(`Setting \`${args[1]}\` updated to \`${args[2]}\``); // eslint-disable-line quotes
				}
			});
		}
	}
};
