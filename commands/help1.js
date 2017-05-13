module.exports = {
	qr: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'Quick Replies',
				value: '`.marvin` - Get statistics about bot \n`.lenny` - Post a glorious lenny \n`.L` - it\'s an L of L\'s! \n`.invite` - Get an invite code from the bot'
			}]
		}});
	},
	bi: function (message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'Bot Interactions',
				value: '`.say` - Have me repeat whatever you want \n`.game` - Set my game to whatever you so please \n`.joke [add]` View a joke or add one of your own (jokes expire after 1 week)\n`.profile` - Profiles system. More help with `.p h`'
			}]
		}});
	},
	api: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'API\'s',
				value: '`.8ball` - Obviously the most trustworthy source for questions too your problems \n`.choose` - Perhaps the best/funniest/creepiest/idk way to say yes or no \n`.ud <term>` or `.urbandictionary <term>` - Search the amazing urban dictionary! \n`.trump [term]` - Get a quote from the president about [term] (or get a random quote)\n`.calc <expression>` - Simplify an expression (if you legitimately need other operations such as sine or cos, tell me) \n`.ss <url> [width] [height]` - Take a screenshot of a page\n`.cb` or `.cleverbot <text>` - Talk with cleverbot. \n`.xkcd` - Get a random xkcd comic, using OkxBot\n`.dog` - Get a random dog :D\n`.cat` or `.kitty` - INSTANT CUTENESS!'
			}]
		}});
	},
	other: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'Other',
				value: '`.l33t <text>` or `.leet <text>` - Translate your text to leet speak \n`.airhorn [type/list]` - Play an airhorn sound'
			}]
		}});
	},
	cs: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'Coming Soon',
				value: 'On the [trello](https://trello.com/b/lj6U1egX/marvin)\n*Suggest more ideas to Gymnophoria#8146*'
			}]
		}});
	},
	info: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			description: '*Quite the Paranoid Android*',
			url: 'http://discord.me/marvin',
			fields: [{
				name: 'Information',
				value: 'Bot made and hosted by **Gymnophoria**#8146 \nHuge amounts of direct help: **Technocoder** \nStarting help: evie.codes and York \n**Thanks!**'
			}]
		}});
	},
	al: function(message, bot, colors) {
		message.author.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			title: 'For more help, join the official discord server',
			url: 'http://discord.me/marvin',
			description: '*Quite the Paranoid Android*',
			fields: [{
				name: 'Quick Replies',
				value: '`.marvin` - Get random info about the bot \n`.lenny` - Here I am, brain the size of a planet, posting lennies on discord. \n`.L` - Make an L of L\'s (Stolen from 0kx because his bot went down) \n`.invite` - Invite me to your server'
			},
			{
				name: 'Bot Interactions',
				value: '`.say <text>` - Yeah, I guess I\'ll repeat what you say\n`.game <game>` - Change the bot\'s game. (Has a decent rate limit)\n`.joke <add>` Say or add a joke\n`.profile` - Profiles system, more info with `.p h`'
			},
			{
				name: 'API',
				value: '`.8ball` - Obviously the most trustworthy source for answers for your problems \n`.choose` - Perhaps the best/funniest/creepiest/idk way to say yes or no \n`.ud <term>` or `.urbandictionary <term>` - Search the amazing urban dictionary! \n`.trump [term]` - Get a quote from the president about [term] (or get a random quote)\n`.calc <expression>` - Simplify an expression (if you legitimately need other operations such as sine or cos, tell me) \n`.ss <url> [width] [height]` - Take a screenshot of a page\n`.cb` or `.cleverbot <text>` - Talk with cleverbot.\n`.xkcd` - Get an xkcd comic using OkxBot \n`.dog` - doggo :p\n`.cat` or `.kitty` - INSTANT CUTENESS!'
			},
			{
				name: 'Other',
				value: '`.l33t` or `.leet` - Translate your text to leet speak \n`.airhorn <type/list>` - Play an airhorn sound'
			},
			{
				name: 'Coming Soon',
				value: 'View the bot\'s [trello](https://trello.com/b/lj6U1egX/marvin).'
			},
			{
				name: '.',
				value: 'Suggest ideas to Gymnophoria#8146\n**Technocoder** has been a huge help with this bot, thanks! \n*When typing commands, remove the <>*'
			}]
		}});
	},
	general: function(message, bot, colors) {
		message.channel.send({embed: {
			color: colors[Math.floor(Math.random()*colors.length)],
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
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
		}});
	}
};
