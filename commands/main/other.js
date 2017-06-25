module.exports = {
	leet: function (command, message, leet, args, suffix) {
		if (command === 'l33t' || command === 'leet') {
			if (args[0] === undefined || args[0] === '') {
				message.channel.send('Please enter something to translate.');
				return;
			}
			const leetR = leet.convert(suffix);
			message.channel.send(leetR);
		}
	},
	eval: function (command, message, suffix, bot, Discord, sql, config) {
		let evaled;
		if (command === '.eval') {
			if (message.author.id !== '163735744995655680') return;
			let eErr = false;
			let eErrM;
			try {
				evaled = eval(suffix);

				if (typeof evaled !== 'string') {
					evaled = require('util').inspect(evaled);
				}
			} catch (err) {
				eErr = true;
				eErrM = err;
			}
			if (evaled !== undefined) {
				if (evaled.length > 1024) {
					let eSL = evaled.length - 970;
					evaled = evaled.slice(0, -eSL) + '\n\n// Trimmed ' + eSL + ' chars';
				}
			}
			if (suffix === 'bot.token' || suffix === 'client.token') {
				const tTexts = ['Seriously?', 'lmao', 'you tried..', 'i\'m not that guillible ffs', 'just.. no.', ':l', '🤔', '*sigh*'];
				evaled = tTexts[Math.floor(Math.random() * tTexts.length)];
			}
			let embedM;
			if (eErr === false) {
				embedM = new Discord.RichEmbed()
					.setAuthor('Eval')
					.addField(':pencil2: Input', '```js\n' + suffix + '\n```')
					.addField(':clipboard: Output', '```js\n' + evaled + '\n```');
			} else { //REMOVE EMBED PLS
				embedM = new Discord.RichEmbed()
					.setAuthor('Eval')
					.addField(':pencil2: Input', '```js\n' + suffix + '\n```')
					.addField(':warning: Error', '```js\n' + eErrM + '\n```');
			}
			message.channel.send({embed: embedM}).then(msg => setTimeout(function () {
				if (evaled === undefined) {
					evaled = 'undefined';
				}
				if (evaled.length > 100) {
					let eLS = evaled.length - 100;
					evaled = evaled.slice(0, -eLS) + '\n\n// Trimmed ' + eLS + ' chars';
				}
				let eErrEM;
				if (eErr === true) {
					eErrEM = '\n:warning: **Error**: ```js\n' + eErrM + '\n```';
				} else {
					eErrEM = '';
				}
				msg.edit(':pencil2: **Input**: ```js\n' + suffix + '\n```\n:clipboard: **Output**: ```js\n' + evaled + '\n```' + eErrEM, {embed: {}});
			}, 10000));
		}
	}/*,
	 airhorn: function(command, message, args) {
	 if (command == 'airhorn' || command == 'ah') {
	 const channel = message.member.voiceChannel;
	 if (!message.member.voiceChannel) {
	 message.channel.send('You need to be in a voice channel for me to play sounds');
	 return;
	 }
	 var airType = args[0];
	 if (args[0] === undefined || args[0] === '') {airType = 'original';}
	 if (airType == 'original' || airType == 'mlg' || airType == 'sad' || airType == 'illuminati') {
	 channel.join().then(connection => {
	 const dispatcher = connection.playFile('./media/sounds/airhorn/' + airType + '.mp3');
	 dispatcher.on('end', end => {
	 channel.leave();
	 });
	 }).catch(console.error);
	 } else {
	 message.channel.send(':loudspeaker: Please choose airhorn type `original`, `illuminati`, `mlg`, or `sad`');
	 }
	 }
	 }*/
};
