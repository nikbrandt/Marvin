module.exports = {
	guild: function (command, message, args, suffix, sql, findMember, bot) {
		if (command === 'guild' || command === 'server' || command === 'g' || command === 's') {
			if (!message.member.permissions.has('MANAGE_GUILD') && message.author.id !== '179114344863367169') return message.channel.send('You do not have the server permission `Manage Server`');
			const gID = message.guild.id;
			sql.get(`SELECT * FROM guildOptions WHERE guildId = ${gID}`).then(row => {
				if (!row) {
					sql.run('INSERT INTO guildOptions (guildId, prefix, levels, swearing, useRole) VALUES (?, ?, ?, ?, ?)', [gID, '.', 'true', 'true', 'false']);
					return message.channel.send('Current Options:\nLevels enabled: `true`\nPrefix: `.`');
				}
				if (args[0] == 'settings' || args[0] == 'options' || args[0] == undefined) {
					let sr1 = message.guild.roles.get(row.staffRole);
					let sr;
					if (sr1 === undefined) sr = 'none';
					else sr = sr1.name;
					message.channel.send(`Current Options for **${message.guild.name}**:\nLevels enabled: \`${row.levels}\`\nPrefix: \`${row.prefix}\`\nSwearing Allowed: \`${row.swearing}\`\nStaff Role: \`${sr}\`\nUsing Staff Role: \`${row.useRole}\`\n*Use **g s swears** for a list of swears, and **g s staff** for a list of staff*`);
				}
				else if (args[0] == 's' || args[0] == 'setting' || args[0] == 'option' || args[0] == 'o') {
					if (args[1] != 'levels' && args[1] != 'list' && args[1] != 'l' && args[1] != 'prefix' && args[1] != 'staff' && args[1] != 'swears' && args[1] != 'swearing' && args[1] != 'staffRole' && args[1] != 'useRole') return message.channel.send('Invalid argument. For a list, type .g s l');
					if (args[1] == 'l' || args[1] == 'list') return message.channel.send('Possible options: `levels`, `prefix`, `staff <add/remove>`, `swears <list>`, `swearing <true/false>`, `staffRole <role mention/name>`, `useRole <true/false>`');
					if (args[1] == 'levels') {
						if (args[2] === undefined) return message.channel.send(`Levels: ${row.levels}`);
						if (args[2] != 'true' && args[2] != 'false') return message.channel.send('Value must be either `true` or `false`');
					}
					if (args[1] == 'prefix') {
						if (args[2] === undefined) return message.channel.send(`Current prefix: \`${row.prefix}\``);
						if (args[2].length > 5) return message.channel.send('That long of a prefix? No thanks.');
					}
					if (args[1] == 'swearing') {
						if (args[2] === undefined) return message.channel.send(`Swearing allowed: ${row.swearing}`);
						if (args[2] !== 'true' && args[2] != 'false') return message.channel.send('Value must be either `true` or `false`');
					}
					if (args[1] == 'useRole') {
						if (args[2] === undefined) return message.channel.send(`Using staff role: ${row.useRole}`);
						if (args[2] != 'true' && args[2] != 'false') return message.channel.send('Value must be either `true` or `false`');
					}

					var inp = args[2];
					var out = '`' + args[2] + '`';
					if (args[1] == 'staff') {
						var memObj = findMember(message, args.slice(3), args.slice(3).join(' '));
						if (args[2] == 'add') {
							if (memObj === undefined) return message.channel.send('Could not find anyone by the name of `' + args.slice(3).join(' ') + '`');
							if (row.staff.includes(memObj.user.id)) return message.channel.send('This user is already a staff member.');
							if (row.staff === null || row.staff == '') inp = memObj.user.id;
							else inp = row.staff + ', ' + memObj.user.id;
							out = 'include `' + memObj.member.displayName + '`';
						} else if (args[2] == 'remove') {
							if (memObj === undefined) return message.channel.send('Could not find anyone by the name of `' + args.slice(3).join(' ') + '`');
							if (!row.staff.includes(memObj.user.id)) return message.channel.send(`${memObj.member.displayName} is not currently a staff member.`);
							inp = row.staff.replace(new RegExp(memObj.user.id + ', |, ' + memObj.user.id + '|' + memObj.user.id, 'g'), '');
							out = 'disinclude `'+ memObj.member.displayName +'`';
						} else {
							var staffArray = [];
							if (row.staff !== null && row.staff !== undefined && row.staff != '') for (let i = 0; i < row.staff.split(',').length; i++) staffArray.push(bot.users.get(row.staff.split(', ')[i]).tag);
							else staffArray = ['No staff.. How sad.'];
							return message.channel.send(`Current **${message.guild.name}** Staff:\n${staffArray.join('\n')}`);
						}
					}
					if (args[1] == 'swears') {
						if (args[2] == 'add') {
							if (args[3] === undefined) return message.channel.send('I can\'t add nothing to the swear list..');
							if (row.swears === undefined || row.swears === null || row.swears == '') inp = args.slice(3).join(' ');
							else inp = row.swears + ', ' + args.slice(3).join(' ');
							out = 'include `' + args.slice(3).join(' ') + '`';
						} else if (args[2] == 'remove') {
							if (args[3] === undefined) return message.channel.send('How does one delete nothing?');
							let swears = args.slice(3).join(' ').split(', ');
							for (let i = 0; i < swears.length; i++) {
								inp = row.swears.replace(new RegExp(`${swears[i]}, |, ${swears[i]}|${swears[i]}`), '');
							}
							out = 'disinclude `' + args.slice(3).join(' ') + '`';
						} else {
							var swearArray = [];
							if (row.swears !== null && row.swears !== undefined && row.swears != '') for (let i = 0; i < row.swears.split(', ').length; i++) swearArray.push(row.swears.split(', ')[i]);
							else swearArray = ['You have no swears set.'];
							message.channel.send('Check your DMs.').then(msg => msg.delete(10000));
							return message.author.send(`Swears for **${message.guild.name}**:\n${swearArray.join(', ')}`);
						}
					}
					if (args[1] == 'staffRole') {
						if (args[2] === undefined && !message.mentions.roles.first()) return message.channel.send(`Current staff role: \`${row.staffRole}\``);
						var role;
						if (message.mentions.roles.first()) {
							role = message.mentions.roles.first();
						} else {
							role = message.guild.roles.find(r => r.name.toUpperCase() == args.slice(2).join(' ').toUpperCase());
							if (role === undefined || role === null) role = message.guild.roles.get(args.slice(2).join(' '));
						}
						if (role === undefined || role === null) return message.channel.send('Could not find role.');
						inp = role.id;
						out = role.name;
					}
					sql.run(`UPDATE guildOptions SET ${args[1]} = '${inp}' WHERE guildId = ${gID}`);
					message.channel.send(`Setting \`${args[1]}\` updated to ${out}`);
				} else return message.channel.send('**.server**:\n`setting <*setting*|list>` - Change a setting of this guild\n`settings` view the settings of this server\nanything else - view this message');
			});
		}
	}
};
