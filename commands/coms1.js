module.exports = {
	kys: function(command, message) {
		if (command == 'kys') {
			if (message.author.id != '179114344863367169') {
				return;
			}
			process.exit(0);
		}
	},
};
