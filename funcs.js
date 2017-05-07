module.exports = {
	instadelete: function(bot) {
		bot.on('message', message => {
			if (message.channel.id != 304430648708300800) return;
			message.delete(10000);
		});
	},
	logger: function(bot) {
		bot.on('message', message => {
			if (message.channel.id == '304441662724243457') return;
			if (message.channel.type == 'text') {
				bot.channels.get('304441662724243457').send('**'+message.guild+'** #'+message.channel.name+' *'+message.author.username+'#'+message.author.discriminator+'* **|** '+message.content.replace(/@/g,''));
			}
			if (message.channel.type == 'dm') {
				bot.channels.get('304441662724243457').send('**DM** *'+message.author.username+'#'+message.author.discriminator+'* **|** '+message.content.replace(/@/g,''));
			}
		});
	}
};
