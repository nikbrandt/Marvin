module.exports = {
  profile: function(command, message) {
    if (command == 'profile') {
      // create table and set all settings to ? for user
      sql.get(`SELECT * FROM profiles WHERE userId ='${message.author.id}'`).then(row => {
        if (!row) {
          sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, ahUses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, 1, 0]);
        }
      }).catch(() => {
        console.error;
        sql.run('CREATE TABLE IF NOT EXISTS profiles (userId TEXT, status TEXT, bio TEXT, server TEXT, websites TEXT, contact TEXT, location TEXT, gender TEXT, age TEXT, birthday TEXT, ahUses INTEGER)').then(() => {
          sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, ahUses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, 1, 0]);
        });
      });
      // leave if not view, undefined, or setting
      if (args[0] != 'view' && args[0] != undefined && args[0] != 'setting') {
        return message.channel.sendMessage('Correct syntax is .profile <view/setting> <type|user> <data>');
      }
      // view someone's profile
      if (args[0] == 'view' || args[0] === undefined) {
        //view own profile
        if (args[1] === undefined || args[1] == '<@'+message.author.id+'>') {
          // sql profile vars
          var status = 'No status set.'; // ASK ABOUT THIS ON DISCORD.JS SERVER
          sql.get(`SELECT * FROM profiles WHERE userId ='${message.author.id}'`).then(row => {
            if (!row) {
              return;
            } else {
              var status = row.status;
            }
          });
            message.channel.sendEmbed({
              color: 875500,
              author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
              },
              fields: [{
                name: 'status',
                value: status,
                inline: true
              }]
            });
          };
        };
      } else { // view someone else's profile
        message.channel.sendMessage('not viewing self, in theory');
      };

      sql.get(`SELECT * FROM profiles WHERE userId ='${message.author.id}'`).then(row => {
        if (!row) {
          sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, ahUses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, 1, 0]);
        }
      }).catch(() => {
        console.error;
        sql.run('CREATE TABLE IF NOT EXISTS profiles (userId TEXT, status TEXT, bio TEXT, server TEXT, websites TEXT, contact TEXT, location TEXT, gender TEXT, age TEXT, birthday TEXT, ahUses INTEGER)').then(() => {
          sql.run('INSERT INTO profiles (userId, status, bio, server, websites, contact, location, gender, age, birthday, ahUses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, 1, 0]);
        });
      });
/*
      {
        sql.run(`UPDATE profiles SET <thing> = ${row.<thing>} WHERE userId = ${message.author.id}`);
      } */
  },
  sendmessage: function(command, message) {
    if (command == 'sm' || command == 'sendmessage') {
      if (message.channel.id != '306262718489427978' && message.channel.id != '304441662724243457') {
        return;
      }
      var smChannel
      if (args[0] != 'send' && args[0] != 'set') {
        message.channel.sendMessage('Correct syntax: `.sm <send/set> <data>`')
        return;
      }
      if (args[0] == 'set') {
        if (args[1] === undefined) {
          if (smChannel === undefined) {
            message.channel.sendMessage('No channel specified. Set one with `.sm set <id>`')
          } else {
            message.channel.sendMessage('Currently sending messages to ' + smChannel)
          }
        } else {
          smChannel = args[1];
          message.channel.sendMessage('Sending messages to `'+smChannel+'`')
        }
      }
      if (args[0] == 'send' && smChannel === undefined) {
        message.channel.sendMessage('Please set a channel to send messages to with `.sm set <id>`')
      }
      if (args[0] == 'send' && args[1] === undefined) {
        message.channel.sendMessage('Please say something to send')
      }
      if (args[0] == 'send' && smChannel != undefined && args[1] != undefined) {
        message.channel.sendMessage('hi');
      }
    }

    if (command == 'smchannel') {
      message.channel.sendMessage(smChannel);
    }
  },
  cleverbot: function(command, message) {
    if (command == 'cb' || command == 'cleverbot' || command == 'clever') {
      let cleverQ = message.content.slice(command.length + 2)
      // cleverbot-node
      cleverbot.write(cleverQ, function (response) {
         message.channel.sendMessage(response.output);
      });
      // cleverbot.io
      clever.create(function (err, session) {
        clever.ask(cleverQ, function (err, response) {
          message.channel.sendMessage(response);
        });
      });
    };
  }
}
