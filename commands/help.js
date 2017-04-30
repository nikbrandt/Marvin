const helpOne = require('./help1.js');

module.exports = {
  help: function(command, message, bot, suffix) {
    if (command == 'help') {
      uSuffix = suffix.toUpperCase();
      if (uSuffix == 'QUICK REPLIES' || uSuffix == 'QR') {
        helpOne.qr(message, bot);
      } else if (uSuffix == 'BOT INTERACTIONS' || uSuffix == 'BI') {
        helpOne.bi(message, bot);
      } else if (uSuffix == 'API') {
        helpOne.api(message, bot);
      } else if (uSuffix == 'OTHER') {
        helpOne.other(message, bot);
      } else if (uSuffix == 'COMING SOON' || uSuffix == 'SOON' || uSuffix == 'CS') {
        helpOne.cs(message, bot);
      } else if (uSuffix == 'INFO') {
        helpOne.info(message, bot);
      } else if (uSuffix == 'ALL') {
        helpOne.al(message,bot);
      } else {
        helpOne.general(message, bot);
      };
    }
  }
}

/* Sections:
 - Quick Replies | Replies that are always the same or slightly different
   - .marvin
   - .lenny
   - .L
   - .invite
 - Bot Interactions | Bot will directly interact with your text
   - .say
   - .game
   - .joke <add>
 - API | Commands that use an internet API to work (fun ones here)
   - .8ball
   - .choose
   - .ud
   - .cat
 - Other | All commands that don't fit into the above categories
   - .l33t
   - .airhorn
 - Coming Soon
   - .profile
   - suggest more message
 - Info | information about the bot
   - quite the paranoid android thingy
   - techno, gymno, evie.codes, stackoverflow xD
 - All | List all commands, in DM
 */
