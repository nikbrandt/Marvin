module.exports = {
	trump: function(command, message, suffix) {
		if (command == 'trump') {
			if (suffix.length < 3 && suffix !== undefined && suffix != 'random' && suffix !== '') {
				message.channel.send('Search term needs to be 3 or more characters');
			}
			var request = require('request');
			if (suffix === undefined || suffix == 'random' || suffix === '') {
				request('https://api.tronalddump.io/random/quote', function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var trump = JSON.parse(body);
						message.channel.send({embed: {
							author: {
								name: 'Trump',
								icon_url: 'https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_400x400.jpg'
							},
							color: 0x009933,
							timestamp: trump.appeared_at,
							url: trump._embedded.source[0].url,
							fields: [{
								name: 'Quote',
								value: trump.value,
								inline: true
							},
							{
								name: 'Tags',
								value: trump.tags.toString(),
								inline: true
							}]
						}});
					} else {
						console.log('warn - Got an error: ' + error + ', status code: ' + response.statusCode);
					}
				});
			} else {
				request('https://api.tronalddump.io/search/quote?query=' + suffix, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var trump = JSON.parse(body);
						if (trump.count === 0) {
							message.channel.send('Trump hasn\'t even said something that messed up..');
							return;
						}
						var trumpN = Math.floor(Math.random()*trump._embedded.quotes.length);
						message.channel.send({embed: {
							author: {
								name: 'Trump',
								icon_url: 'https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_400x400.jpg'
							},
							color: 0x009933,
							timestamp: trump._embedded.quotes[trumpN].appeared_at,
							url: trump._embedded.quotes[trumpN]._embedded.source[0].url,
							fields: [{
								name: 'Quote',
								value: trump._embedded.quotes[trumpN].value,
								inline: true
							},
							{
								name: 'Tags',
								value: trump._embedded.quotes[trumpN].tags.toString(),
								inline: true
							}]
						}});
					} else {
						console.log('warn - Got an error: ' + error + ', status code: ' + response.statusCode);
					}
				});
			}
		}
	}
};
