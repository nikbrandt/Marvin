const request = require('request');
const moment = require('moment');

module.exports = {
	mc: async function(command, message, args, suffix, Discord, bot) {
		if (command == 'mc' || command == 'minecraft') {
			if (args[0] === undefined) return message.channel.send('Please use either `server`, `status`, `skin`, `uuid`, or `history`');
			if (args[0] == 'server') {
				if (args[1] === undefined) return message.channe.send('Pelase specify a server to check.');
				request('https://mcapi.ca/query/' + args[1] + '/info', (error, response, body) => {
					if (!error && response.statusCode == 200) {
						let si = JSON.parse(body);
						if (si.status != true) return message.channel.send(`\`${args[1]}\` is either an invalid IP or offline.`);
						var port;
						if (si.port == 25565) port = '';
						else port = ':' + si.port;
						message.channel.send({embed: new Discord.RichEmbed()
							.setColor('#42f489')
							.setAuthor(`${si.hostname}${port}`, 'https://mcapi.ca/query/' + args[1] + '/icon')
							.setDescription(`**Ping**: ${si.ping}\n**Protocol**: ${si.protocol}`)
							.addField('Players', si.players.online + '/' + si.players.max, true)
							.addField('Version', si.version, true)
							.addField('MOTD', si.motds.clean)
							.setFooter('Courtesy of mcapi.ca')
						});
					} else return message.channel.send(`\`${args[1]}\` is not a valid server IP.`);
				});
			}
			if (args[0] == 'status') {
				request('https://mcapi.ca/mcstatus', (error, response, body) => {
					if (!error && response.statusCode == 200) {
						let mcS = JSON.parse(body);
						message.channel.send(`Website: **${mcS['minecraft.net'].status}**\nSession: **${mcS['session.minecraft.net'].status}**\nAccounts: **${mcS['account.mojang.com'].status}**\nAuth: **${mcS['auth.mojang.com'].status}**\nSkins: **${mcS['skins.minecraft.net'].status}**\nTextures: **${mcS['textures.minecraft.net'].status}**\nAuth Server: **${mcS['authserver.mojang.com'].status}**\nSession Server: **${mcS['sessionserver.mojang.com'].status}**\nCourtesy of mcapi.ca`);
					}
				});
			}
			if (args[0] == 'skin') {
				if (args[1] === undefined) return message.channel.send('You didn\'t specify a skin to send..');
				message.channel.send('Render Courtesy of Crafatar', {files: ['https://crafatar.com/renders/body/' + args[1] + '?overlay&.png']});
			}
			if (args[0] == 'uuid') {
				if (args[1] === undefined) return message.channel.send('I can\'t find the UUID of no one..');
				request('https://api.mojang.com/users/profiles/minecraft/' + args[1] + '?at=' + moment().format('x'), (error, response, body) => {
					if (!error && response.statusCode == 200) {
						let ui = JSON.parse(body);
						message.channel.send(`User **${ui.name}** has UUID **${ui.id}**`);
					} else {
						message.channel.send(`\`${args[1]}\` is not a valid Minecraft username.`);
					}
				});
			}
			if (args[0] == 'history' || args[0] == 'names') {
				if (args[1].length == 32) {
					bot.mcuuid = args[1];
				} else if (args[1].length > 2 && args[1].length < 16) {
					request('https://api.mojang.com/users/profiles/minecraft/' + args[1] + '?at=' + moment().format('x'), (error, response, body) => {
						if (!error && response.statusCode == 200) {
							let ui = JSON.parse(body);
							bot.mcuuid = ui.id;
							if (bot.mcuuid === undefined) return message.channel.send('You did not provide me with a valid username or UUID.');
							request('https://api.mojang.com/user/profiles/' + bot.mcuuid + '/names', (error, response, body) => {
								if (!error && response.statusCode == 200) {
									let hist = JSON.parse(body);
									var histSlice = 0;
									if (hist.length > 10) histSlice = hist.length - 10;
									hist = hist.slice(histSlice);
									let histEnd = hist.map(h => {
										let hName = h.name;
										let hDate = h.changedToAt;
										return (`**${hName}**, ${moment(hDate).format('h:mm:ss A on MMM Do YYYY')}`);
									});
									var plusM = '';
									if (histSlice) plusM = `\n${histSlice} more names.`;
									message.channel.send(histEnd.join('\n') + plusM);
								}
							});
						} else {
							message.channel.send(`\`${args[1]}\` is not a valid username.`);
						}
					});
					return;
				} else {
					return message.channel.send('You did not provide me with a username or UUID.');
				}
				if (bot.mcuuid === undefined) return message.channel.send('You did not provide me with a valid username or UUID.');
				request('https://api.mojang.com/user/profiles/' + bot.mcuuid + '/names', (error, response, body) => {
					if (!error && response.statusCode == 200) {
						let hist = JSON.parse(body);
						var histSlice = 0;
						if (hist.length > 10) histSlice = hist.length - 10;
						hist = hist.slice(histSlice);
						let histEnd = hist.map(h => {
							let hName = h.name;
							let hDate = h.changedToAt;
							return (`**${hName}**, ${moment(hDate).format('h:mm:ss A on MMM Do YYYY')}`);
						});
						var plusM = '';
						if (histSlice) plusM = `\n${histSlice} more names.`;
						message.channel.send(histEnd.join('\n') + plusM);
					}
				});
			}
			if (args[0] == 'help' || args[0] == 'h' || args[0] == 'l' || args[0] == 'list') {
				message.channel.send('**.minecraft**\nit\'s a command about minecraft.. \nPossible subcommands: \n`server` - Get information about a server\n`status` - Get the current Minecraft status\n`skin` - Get someone\'s skin.\n`uuid` - Get someone\'s UUID\n`history` - Get the name history of someone.');
			}
		}
	}
};
