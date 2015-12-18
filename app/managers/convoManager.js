import controller from '../slack.js';

export default {
    start(bot, userId) {
        console.log(userId);
        // controller.startConversation(bot, 'Shall we start the conversation?', function (argument) {
        //     // body...
        // });
        // bot.say({
        //     text: 'yo',
        //     channel: '@aditya'
        // }, function () {
        //     console.log(arguments);
        // });
    }
};
