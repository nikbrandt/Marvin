module.exports = {
	leet: function(command, message, leet, args, suffix) {
		if (command == 'l33t' || command == 'leet') {
			if (args[0] === undefined || args[0] === '') {
				message.channel.send('Please enter something to translate.');
				return;
			}
			var leetR = leet.encode(suffix);
			message.channel.send(leetR);
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
