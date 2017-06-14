module.exports = {
	ud: function (command, message, suffix) {
		if (command === 'ud' || command === 'urbandictionary') {
			const request = require('request');
			request('http://api.urbandictionary.com/v0/define?term=' + suffix, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					const uD = JSON.parse(body);
					const uDChoose = Math.floor(Math.random() * (uD.list.length));
					if (uD.result_type !== 'no_results') {
						message.channel.send({
							embed: {
								color: 680000,
								title: uD.list[uDChoose].word,
								url: uD.list[uDChoose].permalink,
								fields: [{
									name: 'Definition',
									value: uD.list[uDChoose].definition,
									inline: true
								},
								{
									name: 'Example',
									value: '*' + uD.list[uDChoose].example + '*',
									inline: true
								},
								{
									name: 'Author',
									value: uD.list[uDChoose].author,
									inline: true
								},
								{
									name: 'Ratings',
									value: ':thumbsup: ' + uD.list[uDChoose].thumbs_up + ' :thumbsdown: ' + uD.list[uDChoose].thumbs_down,
									inline: true
								}]
							}
						});
					} else {
						message.channel.send('**' + suffix + '**: \nNot even the urban dictionary has something like this..');
					}
				} else {
					console.log('Got an error: ', error, ', status code: ', response.statusCode);
				}
			});
		}
	}
};
