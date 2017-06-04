module.exports = {
	xkcd: function (command, message, bot, args) {
		if (command === 'xkcd') {
			const request = require('request');
			const moment = require('moment');
			request('https://xkcd.com/info.0.json', function (error, response, body) {
				if (!error && response.statusCode === 200) {
					let xk = JSON.parse(body);
					let xkN;
					if (args[0] === undefined || args[0] === 'random') {
						xkN = Math.floor(Math.random() * xk.num);
					} else if (args[0] === 'latest' || args[0] === 'today') {
						xkN = xk.num;
					} else {
						const parsed = parseInt(args[0]);
						if (isNaN(parsed)) return message.channel.send('You didn\'t give me a number');
						if (parsed > xk.num) return message.channel.send('This comic doesn\'t exist yet.');
						xkN = parsed;
					}
					if (message.channel.members.has('219764584146403330') && bot.users.get('219764584146403330').presence.status === 'online') {
						message.channel.send('/xkcd ' + xkN).then(msg => {
							msg.delete(1000);
						});
					} else {
						request('https://xkcd.com/' + xkN + '/info.0.json', function (err, resp, bod) {
							if (!err && resp.statusCode === 200) {
								xk = JSON.parse(bod);
								message.channel.send({
									embed: {
										title: xk.title,
										description: xk.alt,
										footer: {text: '#' + xk.num + ' | ' + moment(xk.year + '-' + xk.month + '-' + xk.day, 'YYYY-M-D').format('dddd MMMM Do, YYYY')},
										image: {url: xk.img}
									}
								});
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
