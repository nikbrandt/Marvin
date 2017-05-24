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
				return `**${m.name}** ([id](${m.id})) owned by **${m.owner.displayName}** ([id](${m.ownerID})), ${m.memberCount} members`;
			});
			message.channel.send({embed: {
				title: 'Marvin\'s Servers',
				description: servers.join('\n')
			}});
		}
	},
	serverinfo: async function(command, message, bot, args, moment) {
		if (command == 'serverinfo' || command == 'si' || command == 'guildinfo' || command == 'gi') {
			if(message.author.id != '179114344863367169') return;
			var server = bot.guilds.get(args[0]);
			if (server === undefined || args[0] === undefined) return message.channel.send('`' + args[0] + '` is not a valid server ID.');
			var sOnA = server.presences.map(p=>p.status != 'offline').length;
			var sBotA = 0;
			server.members.map(mem=>{if (mem.user.bot === true) sBotA++;});
			var roleA = server.roles.map(()=>{}).length;
			var inviteC;
			if (server.me.permissions.has('MANAGE_GUILD')) {
				inviteC = 'discord.gg/' + await server.fetchInvites().then(inv => {
					return inv.first().code;
				});
			}
			if (inviteC === undefined) {
				if (server.me.permissions.has('CREATE_INSTANT_INVITE')) {
					inviteC = 'discord.gg/' + await server.defaultChannel.createInvite().then(inv => {
						return inv.first().code;
					});
				} else {
					inviteC = 'unknown ;-;';
				}
			}
			message.channel.send({embed: {
				author: {
					name: server.name + ' (' + server.id + ')',
					icon: server.iconURL
				},
				color: server.owner.displayColor,
				fields: [{
					name: 'Main Stats',
					value: `**Owner**: ${server.owner.displayName} ([id](${server.ownerID}))\nHas **${server.memberCount}** users, **${sOnA}** online, **${sBotA}** are bots.\nJoined on **${moment(server.joinedTimestamp).format('MMM Do YYYY')}** (${moment(server.joinedTimestamp).fromNow()})`
				},
				{
					name: 'Importantish',
					value: `**Default Channel**: ${server.defaultChannel.name} ([id](${server.defaultChannel.id}))\n**Default Role**: [id](${server.defaultRole.id})		**Filter Level**: ${server.explicitContentFilter}\n**Nickname**: ${server.me.nickname}\n**Invite**: ${inviteC}`
				},
				{
					name: 'Useless :p',
					value: `**Channels**: ${server.channels.size}\n**Created on**: ${moment(server.createdTimestamp).format('MMM Do YYYY')} (${moment(server.createdTimestamp).fromNow()})\n**Region**: ${server.region}\nHas **${roleA}** roles.`
				}]
			}});
		}
	}
};
