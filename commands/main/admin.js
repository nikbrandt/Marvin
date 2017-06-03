module.exports = {
	kys: function(command, message) {
		if (command == 'kys') {
			if (message.author.id != '179114344863367169') return;
			process.exit(0);
		}
	},
	listservers: (command, message, bot) => {
		if (command == 'servers' || command == 'guilds') {
			if(message.author.id != '179114344863367169') return;
			var servers = bot.guilds.map(m => {
				return `**${m.name}** (${m.id}) owned by **${m.owner.displayName}** ([id](${m.ownerID})), ${m.memberCount} members`;
			});
			message.channel.send({embed: {
				title: 'Marvin\'s Servers',
				description: servers.join('\n')
			}});
		}
	},
	serverinfo: async function(command, message, bot, args, moment) {
		if (command == 'serverinfo' || command == 'si' || command == 'guildinfo' || command == 'gi') {
			if(message.author.id === '179114344863367169') {
				var server = bot.guilds.get(args[0]);
				if (server === undefined || args[0] === undefined) server = message.guild;
			} else server = message.guild;
			var sOnA = server.presences.filter(p=>p.status != 'offline').size;
			var sBotA = server.members.filter(mem => mem.user.bot).size;
			var roleA = server.roles.size;
			var rolesL = server.roles.map(ro => ro.name);
			if (rolesL.length > 10) {
				var slice = rolesL.length - 10;
				rolesL = rolesL.slice(0, -slice);
				rolesL = rolesL.join('\n') + `\n**${slice}** more roles.`;
			} else {
				rolesL = rolesL.join('\n');
			}
			var inviteC;
			if (server.me.permissions.has('MANAGE_GUILD')) {
				inviteC = 'discord.gg/' + await server.fetchInvites().then(inv => {
					return inv.first().code;
				});
			}
			if (inviteC === undefined) {
				if (server.me.permissions.has('CREATE_INSTANT_INVITE')) {
					inviteC = 'discord.gg/' + await server.defaultChannel.createInvite().then(inv2 => {
						return inv2.code;
					});
				} else {
					inviteC = 'unknown ;-;';
				}
			}
			var tChans = 0;
			server.channels.map(ch => {if (ch.type == 'text') tChans++;});
			var vChans = 0;
			server.channels.map(ch => {if (ch.type == 'voice') vChans++;});
			message.channel.send({embed: {
				author: {
					name: server.name + ' (' + server.id + ')',
					icon_url: server.iconURL
				},
				color: server.owner.displayColor,
				fields: [{
					name: 'Main Stats',
					value: `**Owner**: ${server.owner.displayName} ([id](${server.ownerID}))\nHas **${server.memberCount}** users, **${sOnA}** online, **${sBotA}** are bots.\nJoined on **${moment(server.joinedTimestamp).format('MMM Do YYYY')}** (${moment(server.joinedTimestamp).fromNow()})\n**Invite**: ${inviteC}`,
					inline: true
				},
				{
					name: 'Importantish',
					value: `**Default Channel**: ${server.defaultChannel.name} ([id](${server.defaultChannel.id}))\n**Default Role**: [id](${server.defaultRole.id})		**Filter Level**: ${server.explicitContentFilter}\n**Nickname**: ${server.me.nickname}\n**Channels**: ${server.channels.size} (${tChans} text, ${vChans} voice)`,
					inline: true
				},
				{
					name: 'Roles',
					value: `${rolesL}`,
					inline: true
				},
				{
					name: 'Useless :p',
					value: `**Created on**: ${moment(server.createdTimestamp).format('MMM Do YYYY')} (${moment(server.createdTimestamp).fromNow()})\n**Region**: ${server.region}\n**AFK Channel**: [id](${server.afkChannelID})\nHas **${server.emojis.size}** emojis\n**Verification Level**: ${server.verificationLevel}\n**Available**: ${server.available}\nHas **${roleA}** roles.\n\n[Icon URL](${server.iconURL})`,
					inline: true
				}]
			}});
		}
	},
	sendmessage: (command, message, bot, args, suffix) => {
		if (command == 'sm' || command == 'sendmessage') {
			if (message.author.id != '179114344863367169') return;
			if (args[0] === undefined) return message.channel.send('wat');
			if (args[0] == 'c' || args[0] == 'channel') {
				if (args[1] === undefined) return message.channel.send('im sorry but i cant send to nothing ffs');
				var channel = bot.channels.get(args[1]);
				if (channel === undefined) return message.channel.send(`\`${args[1]}\` is not a valid server or channel id. rip you.`);
				message.channel.send(`Successfully set sendmessage channel to **${channel.name}** in **${channel.guild.name}**`);
				bot.smChannel = channel;
			} else {
				if (bot.smChannel === undefined) return message.channel.send('you have no channel defined ffs');
				bot.smChannel.send(suffix);
			}
		}
	},
	logger: (command, message, bot, args) => {
		if (command == 'logger' || command == 'log') {
			if (message.author.id != '179114344863367169') return;
			if (args[0] === undefined) {
				if (bot.logChannelG === undefined) return message.channel.send('Not logging in any channel.');
				if (bot.logChannelG === false) return message.channel.send(`Currently logging in channel \`${bot.logChannel.name}\` of \`${bot.logChannel.guild.name}\``);
				if (bot.logChannelG === true) return message.channel.send(`Currently logging all messages of \`${bot.logChannel}\``);
			}
			var channel = bot.channels.get(args[0]);
			var server = bot.guilds.get(args[0]);
			if (channel === undefined) return message.channel.send(`\`${args[0]}\` isn't a valid server or channel id.. dumbo`);
			if (server === undefined) {
				message.channel.send(`Set logging channel to \`${channel.name}\` of \`${channel.guild.name}\``);
				bot.logChannel = channel;
				bot.logChannelG = false;
			} else {
				message.channel.send(`Logging all **${server.name}** server messages.`);
				bot.logChannel = server;
				bot.logChannelG = true;
			}
		}
	},
	userinfo: (command, message, bot, args, moment) => {
		if (command == 'userinfo' || command == 'whois') {
			var member;
			if(message.author.id === '179114344863367169') {
				if (args[1] != undefined) member = bot.guilds.get(args[1]).member(args[0]);
				else member = message.guild.member(args[0]);
				if (member === undefined || args[0] === undefined) member = message.member;
			} else member = message.member;
			var user = member.user;
			var muteStatus;
			var deafStatus;
			if (member.selfMute && member.serverMute) muteStatus = 'user and server';
			else if (member.selfMute && !member.serverMute) muteStatus = 'user';
			else if (!member.selfMute && member.serverMute) muteStatus = 'server';
			else muteStatus = 'false';
			if (member.selfDeaf && member.serverDeaf) deafStatus = 'user and server';
			else if (member.selfDeaf && !member.serverDeaf) deafStatus = 'user';
			else if (!member.selfDeaf && member.serverDeaf) deafStatus = 'server';
			else deafStatus = 'false';
			var roles = member.roles.map(r => r.name).join(', ');
			var game;
			if (user.presence.game) game = user.presence.game.name;
			else game = 'none';
			message.channel.send({embed: {
				author: {
					name: user.tag,
					icon_url: user.avatarURL
				},
				color: member.displayColor,
				fields: [{
					name: 'User Info',
					value: `**Joined on**: ${moment(user.createdTimestamp).format('MMM Do YYYY')} (${moment(user.createdTimestamp).fromNow()})\n**Presence**: ${user.presence.status}\n**Game**: \`${game}\`\n**ID**: ${user.id}\n**Bot**: ${user.bot}`,
					inline: true
				},
				{
					name: 'Member Info',
					value: `**Nickname**: ${member.nickname}\n**Muted**: ${muteStatus}\n**Deafened**: ${deafStatus}\n**Roles**: ${roles}\n**Joined on**: ${moment(member.joinedTimestamp).format('MMM Do YYYY')} (${moment(member.joinedTimestamp).fromNow()})`,
					inline: true
				}]
			}});
		}
	}
};
