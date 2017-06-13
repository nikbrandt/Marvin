module.exports = {
	hangmanInit: function (command, message) {
		if (command === 'hangman') {
			if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.find('name', 'Games')) {
				console.log('wip lol');
			}
		}
	}
};
