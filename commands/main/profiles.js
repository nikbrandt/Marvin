/* eslint-disable quotes */
module.exports = {
	profiles: function(command, message, args, suffix, sql, Discord) {
		if (command == 'profile' || command == 'profiles' || command == 'p') {
			if (message.author.bot) return;
			var usID;
			if (args[0] == '' || args[0] === undefined) {
				usID = message.author.id;
			} else if (args[0] == 'view' || args[0] == 'v') {
				if (message.mentions.users.first()) {
					usID = message.mentions.users.first().id;
				} else if (args[1] !== undefined && args[1] != '') {
					var bFindU = message.guild.members.find(val => val.user.username.toUpperCase() == suffix.slice(args[0].length + 1).toUpperCase());
					if (bFindU == undefined) {
						bFindU = message.guild.members.find(val => val.displayName.toUpperCase() == suffix.slice(args[0].length + 1).toUpperCase());
					}
					if (bFindU == undefined) {
						return message.channel.send('Could not find user by the name of `' + args[1] + '`');
					} else {
						usID = bFindU.id;
					}
				} else {
					usID = message.author.id;
				}
			} else if (args[0] == 'help' || args[0] == 'h') {
				var hEmbed = new Discord.RichEmbed()
					.setTitle('Profiles')
					.setDescription('Main command: .profile <view/setting>')
					.setColor(0x17c65a)
					.addField('View', '`.profile view [name]`\nView another users profile by mention or display name.')
					.addField('Setting', '`.profile setting <setting> <value>`\nChange a setting of your profile\nPossible settings: `status, bio, server, websites, contact, location, gender, age, birthday, color, image`');
				return message.channel.send({embed: hEmbed});
			} else if (args[0] == 'setting' || args[0] == 'settings' || args[0] == 's') {
				if (args[1] == 'list' || args[1] == 'l' || args[1] === undefined) return message.channel.send('Possible settings: \n`status`, `bio`, `server`, `websites`, `contact`, `location`, `gender`, `age`, `birthday`, `color`, `image`');
				if (args[1] != 'status' && args[1] != 'bio' && args[1] != 'server' && args[1] != 'websites' && args[1] != 'contact' && args[1] != 'location' && args[1] != 'gender' && args[1] != 'age' && args[1] != 'birthday' && args[1] != 'color' && args[1] != 'image') {
					return message.channel.send('Unkown setting name `' + args[1] + '`. Use `.profile help` for help.');
				}
				usID = message.author.id;
				sql.get(`SELECT * FROM profiles WHERE userId = '${usID}'`).then(row => {
					if (!row) {
						sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, color, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [usID, null, null, null, null, null, null, null, null, null, null, null]);
						return message.channel.send('Profile created - Please run `' + message.content + '` again.');
					}
					function intoRowQ(r, c, i) {
						sql.run(`UPDATE profiles SET ${r} = '${c}' WHERE userId = ${i}`);
					}
					function intoRow(r, c, i) {
						sql.run(`UPDATE profiles SET ${r} = ${c} WHERE userId = ${i}`);
					}
					if (args[2] == 'remove') {
						message.channel.send(`Field ${args[1]} removed.`);
						return intoRow(args[1], null, usID);
					}
					var pSuffix = suffix.slice(args[0].length + args[1].length + 2);
					if (args[2] == '' || args[2] == undefined && args[1] != 'image') return message.channel.send(`Please include a value for \`${args[1]}\`.`);
					if (args[1] == 'status' && pSuffix.length > 50) return message.channel.send('Statuses cannot be longer than 50 characters.');
					if (args[1] == 'bio' && pSuffix.length > 300) return message.channel.send('Bios cannot be longer than 300 characters.');
					if (args[1] == 'server' && pSuffix.length > 30) return message.channel.send('Server links shouldn\'t be more than 30 characters..');
					if (args[1] == 'websites' && pSuffix.length > 150) return message.channel.send('No more than 150 characters of websites, please.');
					if (args[1] == 'contact' && pSuffix.length > 75) return message.channel.send('Contact info shouldn\'t use more than 75 characters');
					if (args[1] == 'location' && pSuffix.length > 40) return message.channel.send('It shouldn\'t take more than 40 characters to describe your location');
					if (args[1] == 'gender' && pSuffix.length > 20) return message.channel.send('I don\'t care what you are, it should be less than 20 characters.');
					if (args[1] == 'age' && pSuffix.length > 3) return message.channel.send('just no');
					if (args[1] == 'birthday' && pSuffix.length > 25) return message.channel.send('No birth date is that long.');
					if (args[1] == 'color' && pSuffix.length != 6) return message.channel.send('Color should be a 6-digit hex code.');
					if (args[1] == 'image' && message.attachments.size == 0) return message.channel.send('No image was attached.');
					if (args[1] == 'image') {
						intoRowQ(args[1], message.attachments.first().url, usID);
					} else {
						intoRowQ(args[1], pSuffix, usID);
					}
					message.channel.send('Setting `' + args[1] + '` updated.');
				}).catch(() => {
					console.error;
				});
				return;
			} else {
				return message.channel.send('Argument `' + args[0] + '` not found. Please use `.profile help`');
			}

			sql.get(`SELECT * FROM profiles WHERE userId = '${usID}'`).then(row => {
				if (!row) {
					sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, color, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [usID, null, null, null, null, null, null, null, null, null, null, null]);
					return message.channel.send('Blank profile created.');
				}
				var pEmb = new Discord.RichEmbed()
					.setAuthor(message.guild.members.find(val => val.id == usID).displayName, message.guild.members.find(val => val.id == usID).user.avatarURL)
					.setDescription('This person has no profile.. How sad ;-;');
				function pEmbAF(e, h) {
					pEmb.addField(e, h, true);
					pEmb.setDescription('');// userId, status, bio, server, websites, contact, location, gender, age, birthday
				}
				if (row.color !== null) pEmb.setColor(row.color);
				if (row.image !== null && row.image != 'null') pEmb.setThumbnail(row.image);
				if (row.status !== null) pEmbAF('Status', row.status);
				if (row.bio !== null) pEmbAF('Bio', row.bio);
				if (row.server !== null) pEmbAF('Server', row.server);
				if (row.websites !== null) pEmbAF('Websites', row.websites);
				if (row.contact !== null) pEmbAF('Contact', row.contact);
				if (row.location !== null) pEmbAF('Location', row.location);
				if (row.gender !== null) pEmbAF('Gender', row.gender);
				if (row.age !== null) pEmbAF('Age', row.age);
				if (row.birthday !== null) pEmbAF('Birthday', row.birthday);
				message.channel.send({embed: pEmb});
			}).catch(() => {
				console.error;
			});
		}
	}
};
