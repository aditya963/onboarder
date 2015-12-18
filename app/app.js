import controller from './slack.js';
import convoManager from './managers/convoManager.js';
// give the bot something to listen for.
controller.hears('hello', 'direct_message,direct_mention,mention', function (bot, message) {
    bot.reply(message, 'Hello yourself.');
});
controller.on('rtm_open', function () {
    console.log('yo its open!');
});
controller.on('rtm_close', function () {
    console.log('its closed :(');
});

controller.hears(['invite treasurehunt (.*)'], 'direct_message', function (bot, message) {
    let matches = message.text.match(/\<\@([A-Z0-9]*)\>/g);
    let userIds = matches.map((match) => match.substr(2, match.length - 3));
    userIds.forEach((userId) => {
        convoManager.start(userId)
    });
});
