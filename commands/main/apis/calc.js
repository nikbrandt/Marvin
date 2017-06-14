module.exports = {
	calc: function (command, message, suffix, bot) {
		if (command === 'calc') {
			if (suffix === undefined || suffix === '') {
				message.channel.send('Please specify an expression to simplify.');
				return;
			}
			const request = require('request');
			request('https://newton.now.sh/simplify/' + encodeURIComponent(suffix), function (error, response, body) {
				if (!error && response.statusCode === 200) {
					const newton = JSON.parse(body);
					message.channel.send({
						embed: {
							author: {
								name: 'Marvin',
								icon_url: bot.user.avatarURL
							},
							color: 0x009930,
							fields: [{
								name: 'Expression',
								value: newton.expression,
								inline: true
							},
							{
								name: 'Result',
								value: newton.result,
								inline: true
							}]
						}
					});
				} else {
					if (!response || response === undefined) return;
					console.log('warn - Got an error: ' + error + ', status code: ' + response.statusCode);
				}
			});
		}
	}
};
