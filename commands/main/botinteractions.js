const jokes = require('../jokes.js');

module.exports = {
	say: function(command, message, suffix) {
		if (command == 'say') {
			message.channel.send(suffix);
		}
	},
	game: function(command, message, args, bot, suffix) {
		if (command == 'game') {
			if (args[0] === undefined || args[0] === '') {
				message.channel.send('Correct syntax: `.game <game>`');
				return;
			}
			message.channel.send({embed :{
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name: 'Now playing',
					value: suffix
				}]
			}});
			bot.user.setGame('.help | ' + suffix);
		}
	},
	joke: function(command, message, suffix, args) {
		if (command == 'joke') {
			var jokeJ = suffix.slice(4);
			if (jokeJ.includes('\n')) {
				message.channel.send('Jokes should be only one line.');
				return;
			}
			if (jokeJ.length > 250) {
				message.channel.send('Jokes should be under 250 chars');
				return;
			}
			if (jokeJ.includes('<@')) {
				message.channel.send('You can\'t mention people in jokes.. ffs');
				return;
			}
			jokes.loadJsonFile('./media/jokes.json');
			jokes.cleanOldJokes(604800000);
			if (args[0] == 'add') {
				jokes.addJoke(jokeJ);
				message.channel.send('`' + jokeJ + '` added as joke.');
				jokes.saveJsonFile('./media/jokes.json');
			} else {
				message.channel.send(jokes.getRandomJoke());
				jokes.saveJsonFile('./media/jokes.json');
			}
		}
	}
};
