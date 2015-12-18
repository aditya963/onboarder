import controller from './slack.js';
import convoManager from './managers/convoManager.js';

controller.hears('hello', 'direct_message,direct_mention,mention', function (bot, message) {
    bot.reply(message, 'Hello yourself.');
});
controller.on('rtm_open', function () {
    console.log('yo its open!');
});
controller.on('rtm_close', function () {
    console.log('its closed :(');
});
controller.on('start_treasure_hunt', function (bot, userId) {
    convoManager.start(bot, userId);
    // controller.storage.users.get(userId, function () {
    //     console.log(arguments);
    // });
});
controller.hears(['invite treasure hunt (.*)'], 'direct_message', function (bot, message) {
    let matches = message.text.match(/\<\@([A-Z0-9]*)\>/g);
    let userIds = matches.map((match) => match.substr(2, match.length - 3));
    userIds.forEach((userId) => {
        controller.trigger('start_treasure_hunt', [bot, userId]);
    });
});
