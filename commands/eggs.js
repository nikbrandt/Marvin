module.exports = {
  paasta: function(command, message) {
    if (command == 'paasta') {
      message.channel.send('*paasta#6587 - 4/19/17 at 7:05 PM from #general*\n```corn bread watermelon lookin ass nigga\n```');
    }
  },
  techno: function(command, message) {
    if (command == 'techno') {
      message.channel.send('*Technocoder#9418 - 4/22/17 at 11:03 PM from #general*\n```YOU\'VE HIDDEN THE LAMB SAUCE YOU LAZY FUCKING BASTARD\n```')
    }
  },
  gymno: function(command, message) {
    if (command == 'gymno') {
      message.channel.send({files: ['./media/images/gymno.jpg']});
    }
  },
  fuckthis: function(command, message) {
    if (command == 'ft' || command == 'fuckthis') {
      message.channel.send('http://i.imgur.com/IC84G1h.gif');
    }
  }
};
