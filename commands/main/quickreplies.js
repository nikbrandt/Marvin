module.exports = {
	marvin: function(command, message, bot) {
		if (command == 'marvin') {
			var ms = bot.uptime,
				cd = 24 * 60 * 60 * 1000, // calc days
				ch = 60 * 60 * 1000, // calc hours
				cm = 60 * 1000, // calc minutes
				cs = 1000, // calc seconds
				days = Math.floor(ms / cd),
				dms = days * cd, //days, in ms
				hours = Math.floor((ms - dms) / ch),
				hms = hours * ch, //hours, in ms
				minutes = Math.floor((ms - dms - hms) / cm),
				mms = minutes * cm, //minutes, in ms
				seconds = Math.round((ms - dms - hms - mms) / cs);
			if (seconds == 60) {
				minutes++; // increase by 1
				seconds = 0;
			}
			if (minutes == 60) {
				hours++; // inc by 1
				minutes = 0;
			}
			if (hours == 24) {
				days++; // increase by 1
				hours = 0;
			}
			var dateStrings = [];

			if (days === 1) dateStrings.push('**1** day');
			else if (days > 1) dateStrings.push('**' + String(days) + '** days');

			if (hours === 1) dateStrings.push('**1** hour');
			else if (hours > 1) dateStrings.push('**' + String(hours) + '** hours');

			if (minutes === 1) dateStrings.push('**1** minute');
			else if (minutes > 1) dateStrings.push('**' + String(minutes) + '** minutes');

			if (seconds === 1) dateStrings.push('**1** second');
			else if (seconds > 1) dateStrings.push('**' + String(seconds) + '** seconds');

			var dateString = '';
			for (var i = 0; i < dateStrings.length - 1; i++) {
				dateString += dateStrings[i];
				dateString += ', ';
			}
			if(dateStrings.length >= 2) {
				dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
				dateString += 'and ';
			}
			dateString += dateStrings[dateStrings.length - 1];

			message.channel.send('Pinging...').then(msg => {
				var ping = msg.createdTimestamp - message.createdTimestamp;
				msg.edit(message.channel.send('Marvin.. \nIs running on **' + bot.guilds.size + '** servers \nResponding to **' + bot.users.size + '** users\nHas been active for '+dateString+'\nUsing **'+Math.round(process.memoryUsage().heapUsed * 1.0e-6)+'** MB of RAM\nGot a message ping of **'+ping+'** ms'));
			});
		}
	},
	lenny: function(command, message) {
		if (command == 'lenny') {
			message.channel.send('( ͡° ͜ʖ ͡°)');
		}
	},
	L: function(command, message) {
		if (command == 'l' || command == 'L') {
			message.channel.send(':regional_indicator_l:\n:regional_indicator_l:\n:regional_indicator_l:\n:regional_indicator_l::regional_indicator_l::regional_indicator_l:');
		}
	},
	invite: function(command, message) {
		if (command == 'invite') {
			message.channel.send({embed: {
				title: 'bit.ly/invitemarvin',
				description: 'You need to be a **server manager** to add bots to a server',
				url: 'https://bit.ly/invitemarvin'
			}});
		}
	}
};
