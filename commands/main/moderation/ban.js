let canceledEmbed = {
	author: {
		name: 'Ban',
		icon_url: 'http://i.imgur.com/iq0fi4R.jpg'
	},
	color: 0xff0000,
	description: 'Command canceled.'
};

module.exports = {
	ban: async function(command, message, args, suffix, findMember, checkStaff, checkLog, addNumSQL, Discord, duration, moment) {
		function getTime(inp) {
			let cinp = inp.replace(/ ?seconds?/g, 's').replace(/ ?hours?/g, 'h').replace(/ ?minutes?/g, 'h').replace(/ ?days?/g, 'd').replace(/ ?weeks?/g, 'w');
			let time;
			try {
				time = new duration(cinp);
			} catch (e) {
				return undefined;
			}
			return time.milliseconds();
		}

		function noArgs() {
			let bMsg;
			message.channel.send({embed: bEmbed}).then(msg=>bMsg = msg);
			message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 15000, errors: ['time']}).then(col => {
				let msg = col.first();
				if (msg.guild.me.permissions.has('MANAGE_MESSAGES')) msg.delete(200);
				if (msg.content == 'cancel' || msg.content == 'c') {return bMsg.edit({embed: canceledEmbed});}
				if (msg.content == 'cancel' || msg.content == 'c') return bMsg.edit({embed: canceledEmbed});
				let memObj = findMember(msg, msg.content.split(' '), msg.content);
				if (!memObj) return bMsg.edit({embed: canceledEmbed.description = 'Member not found.'});
				reason(memObj, true, bMsg);
			}).catch(col => bMsg.edit({embed: canceledEmbed}));
		}

		function justName() {
			let memObj;
			memObj = findMember(message, args, args[0]);
			if (memObj === undefined) return message.channel.send(`Could not find member by the name of ${args[0]}. Please mention them or use \`.ban\` as is (no args).`);
			reason(memObj, false);
		}

		function reason(memObj, haveEmbed, embedO) {
			let bMsg;
			if (!haveEmbed) {
				message.channel.send({embed: bEmbed
					.setAuthor(memObj.member.displayName, memObj.user.avatarURL)
					.setDescription('Would you like to add a reason for banning `' + memObj.user.tag + '`?\n<*reason*|no|cancel>\n*Set time with -**format** (e.g. -3d9h)*')
				}).then(m => bMsg = m);
			} else {
				bMsg = embedO;
				bMsg.edit({embed: bEmbed
					.setAuthor(memObj.member.displayName, memObj.user.avatarURL)
					.setDescription('Would you like to add a reason for banning `' + memObj.user.tag + '`?\n<*reason*|no|cancel>\n*Set time with -**format** (e.g. -3d9h)*')
				});
			}
			message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 15000, errors: ['time']}).then(col => {
				let msg = col.first();
				if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete(200);
				if (msg.content == 'cancel' || msg.content == 'c') return msg.edit({embed: canceledEmbed});
				if (msg.content == 'no' || msg.content == 'n') return final(memObj, true, false, false, bMsg);
				if (msg.content.includes('-') && !msg.content.split(' ')[1]) return final(memObj, true, false, true, bMsg, undefined, getTime(msg.content.split('-')[1])); // no reason, but time
				if (!msg.content.includes('-') && msg.content.length > 0) return final(memObj, true, true, false, bMsg, msg.content); // no time, reason
				if (msg.content.includes('-') && msg.content.split(' ')[1]) return final(memObj, true, true, true, bMsg, msg.content.split('-')[0], msg.content.split('-')[1]);
			}).catch(col => bMsg.edit({embed: canceledEmbed}));
		}

		async function final(memObj, hasMsg, hasReason, hasTime, mess, rs, tim) {
			let bMsg;
			if (hasMsg === true) bMsg = mess;
			else {
				await message.channel.send({embed: bEmbed
					.setAuthor(memObj.member.displayName, memObj.user.avatarURL)
					.setDescription(`Are you sure you want to ban \`${memObj.user.tag}\`?\n<yes/no>`)
				}).then(m => bMsg = m);
			}
			if (hasTime && !tim) return bMsg.edit({embed: canceledEmbed.description = 'Invalid time string.'});
			let reason = '\nNo reason provided.';
			let time = 0;
			let timeMsg = '\n**Banned permanently**';
			if (hasReason) reason = '\n**Reason**: ' + rs;
			if (hasTime) {
				time = Date.now() + tim;
				timeMsg = `\n**Banned until**: ${moment(time).utc().format('MMM Do, Y [at] h:mm A [UTC]')}`;
			}
			bMsg.edit({embed: bEmbed
				.setAuthor(memObj.member.displayName, memObj.user.avatarURL)
				.setDescription('Are you sure you want to ban ' + memObj.user.tag + '?\n<yes/no>')
			});
			message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 15000, errors: ['time']}).then(col => {
				let msg = col.first();
				if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete(200);
				if (msg.content == 'n' || msg.content == 'no') return bMsg.edit({embed: canceledEmbed});
				if (msg.content == 'y' || msg.content == 'yes') {
					bMsg.edit({embed: {
						color: 0xff0000,
						author: {
							name: memObj.member.displayName + ` (${memObj.user.id})`,
							icon_url: memObj.user.avatarURL
						},
						description: `${memObj.user.tag} **has been banned**.\nBanned by **${message.author.tag}** (${message.author.id})${reason}${timeMsg}`
					}});
				}
			}).catch(err => bMsg.edit({embed: canceledEmbed}));
		}

		function finish(memObj) {
			// gotta finish dat bna
		}

		let bEmbed = new Discord.RichEmbed()
			.setAuthor('Ban', 'http://i.imgur.com/iq0fi4R.jpg')
			.setColor(0xff0000)
			.setDescription('Who would you like to ban?\n<*name*/cancel>')
			.setFooter('Command will be canceled in 15 seconds.');

		if (command == 'ban') {
			if (await checkStaff(message.member) === false) {
				if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('You don\'t have server permission `BAN_MEMBERS`, and are not part of the staff team.');
				else return message.channel.send('You are not part of this guild\'s staff team.');
			}
			if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send('I don\'t have server permission `BAN_MEMBERS`.');
			let canDel = false;
			if (message.guild.me.permissions.has('MANAGE_MESSAGES')) canDel = true;
			if (!args[0]) { // no arguments at all
				if (canDel) message.delete(200);
				noArgs();
			} else if (!args[1] && !suffix.split('-')[1]) { // name, but not reason provided
				if (canDel) message.delete(200);
				justName(false);
			} else if (args[1] && !suffix.split('-')[1]) { // name and reason provided
				if (canDel) message.delete(200);
				let memObj = findMember(message, args, args[0]);
				if (!memObj) return message.channel.send(`Could not find member by the name of \`${args[0]}\`. Please use mention or ban without arguments.`);
				final(memObj, false, true, false, undefined, suffix.slice(args[0].length + 1));
			} else if (!args[2] && suffix.split('-')[1]) { // name and time provided
				if (canDel) message.delete(200);
				let memObj = findMember(message, args, suffix.split('-')[0].slice(0, -1));
				if (!memObj) return message.channel.send(`Could not find member by the name of \`${suffix.split('-')[0]}\`. Please use mention or ban without arguments.`);
				let time = getTime(message.content.split('-')[1]);
				final(memObj, false, false, true, undefined, undefined, time);
			} else if (args[2] && suffix.split('-')[1]) { // name reason and time
				if (canDel) message.delete(200);
				let memObj = findMember(message, args, args[0]);
				if (!memObj) return message.channel.send(`Could not find member by the name of \`${args[0]}\`. Please use mention or ban without arguments.`);
				let time = getTime(message.content.split('-')[1]);
				final(memObj, false, true, true, undefined, suffix.split('-')[0].slice(args[0].length + 1, -1), time);
			}
		}
	}
};
