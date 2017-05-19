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
// file storage
const fs = require('fs');
// leet
const leet = require('leet');
// canvas
var Canvas = require('canvas');
// command accesss
const eggs = require('./commands/eggs.js');
const coms1 = require('./commands/coms1.js');
const help = require('./commands/help.js');
const unused = require('./commands/unused.js');
const funcs = require('./funcs.js');
// main commands
const qr = require('./commands/main/quickreplies.js');
const bi = require('./commands/main/botinteractions.js');
const apis = require('./commands/main/apis/smallapis.js');
const ud = require('./commands/main/apis/ud.js');
const trump = require('./commands/main/apis/trump.js');
const calc = require('./commands/main/apis/calc.js');
const xkcd = require('./commands/main/apis/xkcd.js');
const other = require('./commands/main/other.js');
const profiles = require('./commands/main/profiles.js');

var colors = [0xf44242, 0xed6200, 0xed8e00, 0xede900, 0xa5ed00, 0x47ed00, 0x00ed7e, 0x00edc9, 0x00c5ed, 0x008eed, 0x004bed, 0x3f00ed, 0x8a00ed, 0xc100ed, 0xed00e1, 0xed0072];

sql.open('./media/main.sqlite');

bot.on('ready', () => {
	console.log('Bot started.');
});

bot.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	if (message.channel.type != 'text') return;

	let command = message.content.split(' ')[0].slice(config.prefix.length);

	let args = message.content.split(' ').slice(1);
	let suffix = message.content.slice(command.length + config.prefix.length + 1);

 // easter eggs
	eggs.paasta(command, message);
	eggs.techno(command, message);
	eggs.gymno(command, message);
	eggs.fuckthis(command, message);
	eggs.nintenbot(command, message);
 // other commands
	qr.lenny(command, message);
	qr.marvin(command, message, bot);
	qr.L(command, message);
	qr.invite(command, message);
	bi.say(command, message, suffix);
	bi.game(command, message, args, bot, suffix);
	bi.joke(command, message, suffix, args);
	apis.ball(command, message);
	apis.choose(command, message);
	apis.ss(command, message, args);
	apis.cleverbot(command, message, suffix, clever);
	apis.cat(command, message);
	apis.dog(command, message);
	ud.ud(command, message, suffix);
	trump.trump(command, message, suffix);
	calc.calc(command, message, suffix, bot);
	xkcd.xkcd(command, message, bot, args);
	other.leet(command, message, leet, args, suffix);
	// other.airhorn(command, message, args);
	coms1.kys(command, message);
	profiles.profiles(command, message, args, suffix, sql, Discord, Canvas, fs);
	help.help(command, message, bot, suffix, colors);
});

funcs.instadelete(bot);
funcs.logger(bot);

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
