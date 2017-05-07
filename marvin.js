 // bot creation
const Discord = require('discord.js');
const bot = new Discord.Client();
 // cleverbot.io
const cleverbot = require('cleverbot.io');
const clever = new cleverbot('cPzDw3MhlM6GfbxU','P9mRGnXV6JKydmqJkitVHp4WLuJVLeT6');
clever.setNick('Marvin');
 /* exported err, session */
clever.create(function (err, session) {});
 // config access
const config = require('./config.json');
 // sql access
const sql = require('sqlite');
// file writing? idk
const fs = require('fs');
// leet
const Leet = require('l33t');
const leet = new Leet;
// command accesss
const eggs = require('./commands/eggs.js');
const coms1 = require('./commands/coms1.js');
const help = require('./commands/help.js');
const unused = require('./commands/unused.js');
const other = require('./other.js');
// main commands
const qr = require('./commands/main/quickreplies.js');

var colors = [0xf44242, 0xed6200, 0xed8e00, 0xede900, 0xa5ed00, 0x47ed00, 0x00ed7e, 0x00edc9, 0x00c5ed, 0x008eed, 0x004bed, 0x3f00ed, 0x8a00ed, 0xc100ed, 0xed00e1, 0xed0072];

sql.open('./profiles.sqlite');

bot.on('ready', () => {
	console.log('Bot started.');
});

bot.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	if (message.channel.type != 'text') return;

	let command = message.content.split(' ')[0];
	command = command.slice(config.prefix.length);

	let args = message.content.split(' ').slice(1);
	let suffix = message.content.slice(command.length + config.prefix.length + 1);

 // easter eggs
	eggs.paasta(command, message);
	eggs.techno(command, message);
	eggs.gymno(command, message);
	eggs.fuckthis(command, message);
 // other commands
	qr.lenny(command, message);
	qr.marvin(command, message, bot);
	qr.L(command, message);
	qr.invite(command, message);
	coms1.say(command, message, suffix);
	coms1.game(command, message, args, bot, suffix);
	coms1.airhorn(command, message, args);
	coms1.kys(command, message);
	coms1.joke(command, message, suffix, args);
	coms1.choose(command, message);
	coms1.ud(command, message, suffix);
	coms1.ball(command, message);
	coms1.leet(command, message, leet, args, suffix);
	coms1.cat(command, message);
	coms1.trump(command, message, suffix);
	coms1.calc(command, message, suffix, bot);
	coms1.ss(command, message, args);
	coms1.xkcd(command, message, bot, args);
	coms1.cleverbot(command, message, suffix, clever);
	coms1.dog(command, message);
	help.help(command, message, bot, suffix, colors);
});

other.instadelete(bot);
other.logger(bot);

 // send to console
bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('debug', (e) => console.info(e));

process.on('unhandledRejection', err => {
	console.error('Uncaught Promise Error: \n' + err.stack);
});

bot.login(config.token);

/* stuff to add:
 - airhorn should have per-player data, stored in .json (part of .profile)
 - okxbot
*/
