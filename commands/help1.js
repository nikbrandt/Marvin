module.exports = {
	qr: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'Quick Replies',
					value: '`.marvin` - Get statistics about bot \n`.lenny` - Post a glorious lenny \n`.L` - it\'s an L of L\'s! \n`.invite` - Get an invite code from the bot'
				}]
			}
		});
	},
	bi: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'Bot Interactions',
					value: '`.say` - Have me repeat whatever you want \n`.joke [add]` - View a joke or add one of your own (jokes expire after 1 week)\n`.profile` - Profiles system. More help with `.p h`\n`.dice [amount] [sides]` - Roll some dice.'
				}]
			}
		});
	},
	api: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'API\'s',
					value: '`.8ball` - Obviously the most trustworthy source for questions too your problems \n`.choose` - Perhaps the best/funniest/creepiest/idk way to say yes or no \n`.ud <term>` or `.urbandictionary <term>` - Search the amazing urban dictionary! \n`.trump [term]` - Get a quote from the president about [term] (or get a random quote)\n`.calc <expression>` - Simplify an expression (if you legitimately need other operations such as sine or cos, tell me) \n`.ss <url> [width] [height]` - Take a screenshot of a page\n`.cb` or `.cleverbot <text>` - Talk with cleverbot. \n`.xkcd` - Get a random xkcd comic, using OkxBot\n`.minecraft` - Commands to do with Minecraft. `.mc h` for more info.\n`.dog` - Get a random dog :D\n`.cat` or `.kitty` - INSTANT CUTENESS!'
				}]
			}
		});
	},
	other: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'Other',
					value: '`.l33t <text>` or `.leet <text>` - Translate your text to leet speak \n`.xp [user]` - View you or someone else\'s XP. \n`.xpinfo` - See info about bot leveling\n`.server setting` - Change server settings. As of now, only levels.'
				}]
			}
		});
	},
	cs: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'Coming Soon',
					value: 'On the [trello](https://trello.com/b/lj6U1egX/marvin)\n*Suggest more ideas to Gymnophoria#8146*'
				}]
			}
		});
	},
	info: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				description: '*Quite the Paranoid Android*',
				url: 'http://discord.me/marvin',
				fields: [{
					name: 'Information',
					value: 'Bot made and hosted by **Gymnophoria**#8146 \nHuge amounts of direct help: **Technocoder** \nStarting help: evie.codes and York \n**Thanks!**'
				}]
			}
		});
	},
	al: function (message, bot, colors) {
		message.author.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				title: 'For more help, join the official discord server',
				url: 'http://discord.me/marvin',
				description: '*Quite the Paranoid Android*',
				fields: [{
					name: 'Quick Replies',
					value: '`.marvin` - Get random info about the bot \n`.lenny` - Here I am, brain the size of a planet, posting lennies on discord. \n`.L` - Make an L of L\'s (Stolen from 0kx because his bot went down) \n`.invite` - Invite me to your server'
				},
					{
						name: 'Bot Interactions',
						value: '`.say <text>` - Yeah, I guess I\'ll repeat what you say\n`.joke <add>` Say or add a joke\n`.profile` - Profiles system, more info with `.p h`\n`.dice [amount] [sides]` - Roll some dice.'
					},
					{
						name: 'API',
						value: '`.8ball` - Obviously the most trustworthy source for answers for your problems \n`.choose` - Perhaps the best/funniest/creepiest/idk way to say yes or no \n`.ud <term>` or `.urbandictionary <term>` - Search the amazing urban dictionary! \n`.trump [term]` - Get a quote from the president about [term] (or get a random quote)\n`.calc <expression>` - Simplify an expression (if you legitimately need other operations such as sine or cos, tell me) \n`.ss <url> [width] [height]` - Take a screenshot of a page\n`.cb` or `.cleverbot <text>` - Talk with cleverbot.\n`.xkcd` - Get an xkcd comic, possibly using OkxBot\n`.minecraft` - Commands to do with Minecraft. `.mc h` for more info.\n`.dog` - doggo :p\n`.cat` or `.kitty` - INSTANT CUTENESS!'
					},
					{
						name: 'Other',
						value: '`.l33t` or `.leet` - Translate your text to leet speak \n`.xp [user]` - View you or someone else\'s XP. \n`.xpinfo` - See info about bot leveling\n`.server setting` - Change server settings. As of now, only levels.'
					},
					{
						name: 'Coming Soon',
						value: 'View the bot\'s [trello](https://trello.com/b/lj6U1egX/marvin).'
					},
					{
						name: '.',
						value: 'Suggest ideas to Gymnophoria#8146\n**Technocoder** has been a huge help with this bot, thanks! \n*When typing commands, remove the <>*'
					}]
			}
		});
	},
	owner: (message, bot) => {
		message.channel.send({
			embed: {
				color: 0xff0000,
				title: 'Owner Only',
				description: 'All the creepy lil\' commands that gymno has',
				fields: [{
					name: '\u200b',
					value: '`.kys` - restart the bot\n`.guilds` - list all guilds the bot is in\n`.serverinfo` - get info about a server\n`.sendmessage [c]` - send a message to a channel\n`.log` - set the channel/guild to be logged'
				}]
			}
		});
	},
	general: function (message, bot, colors) {
		message.channel.send({
			embed: {
				color: colors[Math.floor(Math.random() * colors.length)],
				url: 'http://discord.me/marvin',
				title: 'General Help',
				description: 'The help command is divided into different sections. Do `.help <section>` to view help on a specific section. \n**Sections:**',
				footer: {text: 'To view all help, type `.help all` and it will be sent to you by DM. <> represents _required_ parameter, [] represents _optional_ parameter'},
				fields: [{
					name: 'Quick Replies',
					value: 'Replies that are always the same or slightly different'
				},
					{
						name: 'Bot Interactions',
						value: 'In which the bot directly interacts with your text'
					},
					{
						name: 'API',
						value: 'Commands that use an internet API to work (some of the more fun ones)'
					},
					{
						name: 'Other',
						value: 'All commands that do not fit into the above categories'
					},
					{
						name: 'Info',
						value: 'List information about the bot'
					}]
			}
		});
	}
};
