const request = require('request');
const moment = require('moment');

function server(channel, server, Discord, args) {
	request('https://mcapi.ca/query/' + server + '/info', (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let si = JSON.parse(body);
			if (si.status !== true) return channel.send(`\`${server}\` is either an invalid IP or offline.`);
			let port;
			if (si.port === 25565) port = '';
			else port = ':' + si.port;
			channel.send({
				embed: new Discord.RichEmbed()
					.setColor('#42f489')
					.setAuthor(`${si.hostname}${port}`, 'https://mcapi.ca/query/' + args[1] + '/icon')
					.setDescription(`**Ping**: ${si.ping}\n**Protocol**: ${si.protocol}`)
					.addField('Players', si['players']['online'] + '/' + si['players']['max'], true)
					.addField('Version', si['version'], true)
					.addField('MOTD', si['motds']['clean'])
					.setFooter('Courtesy of mcapi.ca')
			});
		} else return channel.send(`\`${args[1]}\` is not a valid server IP.`);
	});
}
function status(channel) {
	request('https://mcapi.ca/mcstatus', (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let mcS = JSON.parse(body);
			channel.send(`Website: **${mcS['minecraft.net'].status}**\n
			Session: **${mcS['session.minecraft.net'].status}**\n
			Accounts: **${mcS['account.mojang.com'].status}**\n
			Auth: **${mcS['auth.mojang.com'].status}**\n
			Skins: **${mcS['skins.minecraft.net'].status}**\n
			Textures: **${mcS['textures.minecraft.net'].status}**\n
			Auth Server: **${mcS['authserver.mojang.com'].status}**\n
			Session Server: **${mcS['sessionserver.mojang.com'].status}**\n
			Courtesy of mcapi.ca`);
		}
	});
}
function skin(channel, args) {
	channel.send('Render Courtesy of Crafatar', {files: ['https://crafatar.com/renders/body/' + args[1] + '?overlay&.png']});
}
function uuid(channel, name) {
	request('https://api.mojang.com/users/profiles/minecraft/' + name + '?at=' + moment().format('x'), (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let ui = JSON.parse(body);
			channel.send(`User **${ui.name}** has UUID **${ui.id}**`);
		} else {
			channel.send(`\`${name}\` is not a valid Minecraft username.`);
		}
	});
}
function nameHistoryByName(channel, name) {
	request('https://api.mojang.com/users/profiles/minecraft/' + name + '?at=' + moment().format('x'), (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let ui = JSON.parse(body);
			if(ui.id === undefined) return channel.send('You did not provide me with a valid username or UUID.');
			nameHistoryByUUID(channel, ui.id);
		} else {
			channel.send(`\`${name}\` is not a valid username.`);
		}
	});
}
function nameHistoryByUUID(channel, uuid) {
	request('https://api.mojang.com/user/profiles/' + uuid + '/names', (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let hist = JSON.parse(body).reverse();
			let histSlice = 0;
			if (hist.length > 10) histSlice = hist.length - 10;
			hist = hist.slice(histSlice);
			let histEnd = hist.map(h => {
				let hName = h['name'];
				let hDate = h['changedToAt'];
				if (hDate) return (`**${hName}**, ${moment(hDate).format('h:mm:ss A on MMM Do, YYYY')}`);
				else return (`**${hName}**, original name`);
			});
			let plusM = '';
			if (histSlice) plusM = `\n${histSlice} more names.`;
			channel.send(histEnd.join('\n') + plusM);
		}
	});
}

module.exports = { /* eslint-disable indent*/
	mc: async function (command, message, args, suffix, Discord) {
		if(!(command === 'mc' || command === 'minecraft')) return;
		switch (args[0]) {
			case undefined:
				message.channel.send('Please use either `server`, `status`, `skin`, `uuid`, or `history`');
				break;
			case 'server':
				if (args[1] === undefined) return message.channel.send('Please specify a server to check.');
				server(message.channel, args[1], Discord, args);
				break;
			case 'status':
				status(message.channel);
				break;
			case 'skin':
				if (args[1] === undefined) return message.channel.send('You didn\'t specify a skin to send..');
				skin(message.channel, args);
				break;
			case 'uuid':
				if (args[1] === undefined) return message.channel.send('I can\'t find the UUID of no one..');
				uuid(message.channel, args[1]);
				break;
			case 'history':
			case 'names':
				if (args[1].length === 32) {
					nameHistoryByUUID(message.channel, args[1]);
				} else if (args[1].length > 2 && args[1].length < 16) {
					nameHistoryByName(message.channel, args[1]);
					return;
				} else {
					return message.channel.send('You did not provide me with a username or UUID.');
				}
				break;
			case 'help':
			case 'h':
			case 'l':
			case 'list':
				message.channel.send('**.minecraft**\n' +
					'it\'s a command about minecraft.. \n' +
					'Possible subcommands: \n' +
					'`server` - Get information about a server\n' +
					'`status` - Get the current Minecraft status\n' +
					'`skin` - Get someone\'s skin.\n' +
					'`uuid` - Get someone\'s UUID\n' +
					'`history` - Get the name history of someone.');
				break;
		}
	}
};
