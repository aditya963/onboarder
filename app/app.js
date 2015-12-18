import controller from './slack.js';
import convoManager from './managers/convoManager.js';

controller.on('rtm_open', function () {
    console.log('yo its open!');
});
controller.on('rtm_close', function () {
    console.log('its closed :(');
});
// controller.hears(['invite treasure hunt (.*)'], 'direct_message', function (bot, message) {
//     let matches = message.text.match(/\<\@([A-Z0-9]*)\>/g);
//     let userIds = matches.map((match) => match.substr(2, match.length - 3));
//     userIds.forEach((userId) => {
//         controller.trigger('start_treasure_hunt', [bot, userId]);
//     });
// });
controller.hears(['Hello'], ['direct_message'], function (bot, message) {
    convoManager.start(bot, message);
});
