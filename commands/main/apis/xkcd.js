module.exports = {
	xkcd: function(command, message, bot, args) {
		if (command == 'xkcd') {
			var request = require('request');
			request('https://xkcd.com/info.0.json', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var xk = JSON.parse(body);
					var xkN = Math.floor(Math.random()*xk.num);
					if (message.channel.members.has('219764584146403330') && bot.users.get('219764584146403330').presence.status == 'online') {
						message.channel.send('/xkcd ' + xkN);
					} else {
						request('https://xkcd.com/' + xkN + '/info.0.json', function(err, resp, bod) {
							if (!err && resp.statusCode == 200) {
								xk = JSON.parse(bod);
								message.channel.send({embed: {
									author: {
										name: 'Marvin',
										icon_url: bot.user.avatarURL
									},
									title: xk.title,
									description: xk.alt,
									footer: {text: '#' + xk.num},
									timestamp: new Date(xk.year, xk.month, xk.day),
									image: {url: xk.img}
								}});
							} else {
								console.log('Error: ' + err + ', status code: ' + resp.statusCode);
							}
						});
					}
				} else {
					console.log('Error: ' + error + ', status code: ' + response.statusCode);
				}
			});
		}
	}
};
