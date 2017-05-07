const helpOne = require('./help1.js');

module.exports = {
	help: function(command, message, bot, suffix, colors) {
		if (command == 'help') {
			var uSuffix = suffix.toUpperCase();
			if (uSuffix == 'QUICK REPLIES' || uSuffix == 'QR') {
				helpOne.qr(message, bot, colors);
			} else if (uSuffix == 'BOT INTERACTIONS' || uSuffix == 'BI') {
				helpOne.bi(message, bot, colors);
			} else if (uSuffix == 'API') {
				helpOne.api(message, bot, colors);
			} else if (uSuffix == 'OTHER') {
				helpOne.other(message, bot, colors);
			} else if (uSuffix == 'COMING SOON' || uSuffix == 'SOON' || uSuffix == 'CS') {
				helpOne.cs(message, bot, colors);
			} else if (uSuffix == 'INFO') {
				helpOne.info(message, bot, colors);
			} else if (uSuffix == 'ALL') {
				helpOne.al(message, bot, colors);
			} else {
				helpOne.general(message, bot, colors);
			}
		}
	}
};
