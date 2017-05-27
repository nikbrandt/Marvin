module.exports = {
	paasta: function(command, message) {
		if (command == 'paasta') {
			var paaQs = ['*paasta#6587 - 5/18/17 at 4:41 PM from #general*\n```The ancient Chinese legends in the scroll of The Dark Cloud, where our hero Cling The Clang makes his way to the clouds. Slowly but surely he makes his way to the Temple of the Dark Sky. He finds the legendary collection of a wide selection of "the toys". But which does he choose? The symbol of the dark, a black and long one? Or the symbol of the Heavans, A moderately sized white one. He gazes upon them thinking of which to choose. Then it hits him. He came to the dark for a reason, its go black you can\'t go back.\n```', '*paasta#6587 - 4/19/17 at 7:05 PM from #general*\n```corn bread watermelon lookin ass nigga\n```'];
			message.channel.send(paaQs[Math.floor(Math.random() * paaQs.length)]);
		}
	},
	techno: function(command, message) {
		if (command == 'techno') message.channel.send('*Technocoder#9418 - 4/22/17 at 11:03 PM from #general*\n```YOU\'VE HIDDEN THE LAMB SAUCE YOU LAZY FUCKING BASTARD\n```');
	},
	gymno: function(command, message) {
		if (command == 'gymno') message.channel.send({files: ['http://i.imgur.com/IJCXt7X.jpg']});
	},
	fuckthis: function(command, message) {
		if (command == 'ft' || command == 'fuckthis') message.channel.send({files: ['http://i.imgur.com/IC84G1h.gif']});
	},
	nintenbot: function(command, message) {
		if (command == 'nintenbot' || command == 'ninten') message.channel.send({files: ['http://i.imgur.com/qKlnz5n.jpg']});
	},
	foreveralone: function(command, message) {
		if (command == 'foreveralone' || command == 'bots') message.channel.send({files: ['http://i.imgur.com/gyqGdK5.jpg']});
	}
};
