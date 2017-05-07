module.exports = {
	ball: function(command, message) {
		if (command == '8ball') {
			var request = require('request');
			request('https://8ball.delegator.com/magic/JSON/0', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var ball = JSON.parse(body);
					message.channel.send(':8ball: ' + ball.magic.answer);
				} else {
					console.log('warn - Got an error: ' + error + ', status code: ' + response.statusCode);
				}
			});
		}
	},
	choose: function(command, message) {
		if (command == 'choose') {
			var request = require('request');
			request('http://yesno.wtf/api', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var yesNo = JSON.parse(body);
					message.channel.send(yesNo.image);
				} else {
					console.log('Got an error: ', error, ', status code: ', response.statusCode);
				}
			});
		}
	},
	ss: function(command, message, args) {
		if (command == 'ss' || command == 'screenshot') {
			if (args[0] === undefined || args[0] === '') {
				message.channel.send('Please send a website to take a screenshot of');
			}
			var w = args[1];
			var h = args[2];
			if (args[1] === undefined || args[1] === '') {
				w = 960;
				h = 1500;
			}
			message.channel.send('http://api.screenshotlayer.com/api/capture?access_key=a3963a574b8cd45613333b83d5593e9c&viewport=' + w + 'x' + h + '&url=' + args[0]);
		}
	},
	cleverbot: function(command, message, suffix, clever) {
		if (command == 'cb' || command == 'cleverbot' || command == 'clever') {
			clever.ask(suffix, function(err, response) {
				message.channel.send(response);
			});
		}
	},
	cat: function(command, message) {
		if (command == 'cat' || command == 'kitty' || command == 'kitten') {
			var request = require('request');
			request('http://random.cat/meow', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var cat = JSON.parse(body);
					message.channel.send(cat.file);
				} else {
					console.log('warn - Got an error: ' + error + ', status code: ' + response.statusCode);
				}
			});
		}
	},
	dog: function(command, message) {
		if (command == 'dog' || command == 'pupper' || command == 'puppy' || command == 'doggo' || command == 'doge') {
			var request = require('request');
			request('https://random.dog/woof.json', function(error, response, body) {
				var dog = JSON.parse(body);
				message.channel.send(dog.url);
			});
		}
	}
};
