module.exports = {
  nick: function(command, message) {
    if (command == 'nick') {
      if (args[0] === undefined) {
        message.channel.sendMessage('Correct syntax: `.nick <bot nick>`');
        return;
      }
      var nick = message.content.slice(6)
      message.channel.sendEmbed({
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        fields: [{
          name: 'Nickname set to',
          value: nick
        }]
      });
      message.guild.members.get(bot.user.id).setNickname(nick);
    }
  },
  addjoke: function(command, message, fs, suffix) {
    if (command == 'jokeadd' || command == 'addjoke') {
      fs.appendFile('./media/jokes.txt', suffix + " ~END\n", function(err) {} );
      message.channel.sendMessage('Added `' + suffix + '` as a joke');
    }
  },
  joke: function(command, message, fs) {
    if (command == 'joke') {
      fs.readFile('./media/jokes.txt', "utf8", function(err, fileContents) {
        var lines = fileContents.split(" ~END\n");
        var gymnoSucks = Math.floor(Math.random()*(lines.length - 1));
        message.channel.sendMessage(lines[gymnoSucks]);
      })
    }
  },
  addjoke2: function(command, message, suffix) {
    if (command == 'addjoke' || command == 'jokeadd') {
      jokes.loadJsonFile('./media/jokes.json');
      message.channel.sendMessage('`' + suffix + '` added as a joke');
      jokes.addJoke(suffix);
      jokes.cleanOldJokes(604800000);
      jokes.saveJsonFile('./media/jokes.json');
    }
  }
}
