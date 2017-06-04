const jokes = require('../jokes.js');

module.exports = {
	say: function (command, message, suffix) {
		if (command === 'say') {
			message.channel.send(suffix.replace(/@/g, '@\u200b'));
		}
	},
	game: function (command, message, args, bot, suffix) {
		if (command === 'game') {
			if (args[0] === undefined || args[0] === '') {
				message.channel.send('Correct syntax: `.game <game>`');
				return;
			}
			message.channel.send({
				embed: {
					color: 3447003,
					fields: [{
						name: 'Now playing',
						value: suffix
					}]
				}
			});
			bot.user.setGame('.help | ' + suffix);
		}
	},
	joke: function (command, message, suffix, args) {
		if (command === 'joke') {
			const jokeJ = suffix.slice(4);
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
			if (args[0] === 'add') {
				jokes.addJoke(jokeJ);
				message.channel.send('`' + jokeJ + '` added as joke.');
				jokes.saveJsonFile('./media/jokes.json');
			} else {
				message.channel.send(jokes.getRandomJoke());
				jokes.saveJsonFile('./media/jokes.json');
			}
		}
	},
	dice: (command, message, args, numtoword) => {
		function rand(num) {
			return Math.floor(Math.random() * num) + 1;
		}

		function diceCalc(amount, sides) {
			if (amount === 1) return ` and **${rand(sides)}**`;
			if (amount === 2) return `, **${rand(sides)}**, and **${rand(sides)}**`;
			return `, **${rand(sides)}**, **${rand(sides)}**, and **${rand(sides)}**`;
		}

		if (command === 'dice' || command === 'roll' || command === 'die') {
			if (args[0] === undefined) return message.channel.send(`You rolled a **6 sided** die, resulting in a **${Math.floor(Math.random() * 5) + 1}**`);
			let dCount, dSides;
			if (args[0] !== undefined && args[1] !== undefined) {
				dCount = parseInt(args[0], 10);
				dSides = parseInt(args[1], 10);
			} else {
				dCount = parseInt(args[0], 10);
				dSides = 6;
			}
			if (args[1] !== undefined && isNaN(dSides)) return message.channel.send(`Value \`${args[1]}\` is not a number.`);
			if (args[0] !== undefined && isNaN(dCount)) return message.channel.send(`Value \`${args[0]}\` is not a number.`);
			if (dCount > 4) return message.channel.send('I\'m not rolling more than 4 dice for ya\'');
			if (dSides > 120) return message.channel.send(`Really? A ${dSides} sided die?`);
			if (dCount < 1) return message.channel.send('How does one role a negative amount of dice 🤔');
			if (dSides < 1) return message.channel.send('How does a die contain less than one side 🤔');
			if (dCount === 1) return message.channel.send(`You rolled a ${dSides} sided die, resulting in a **${rand(dSides)}**`);
			message.channel.send(`You rolled ${numtoword.toWords(dCount)} ${numtoword.toWords(dSides)}-sided dice, resulting in **${rand(dSides)}**${diceCalc(dCount - 1, dSides)}`);
		}
	}
};
