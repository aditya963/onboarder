import controller from './slack.js';
import convoManager from './managers/convoManager.js';
import db from './db.js';

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
controller.hears(['Hello'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function (bot, message) {
    // start a conversation to handle this response.
    bot.startConversation(message, function (err, convo) {

        convo.ask('Shall we proceed Say YES, NO or DONE to quit.', [{
            pattern: bot.utterances.yes,
            callback: function (response, convo) {
                controller.storage.users.get(response.user, function (err, user) {
                    if (!user) {
                        user = {
                            id: response.user
                        };
                    }
                    var reqdData = {
                        "message_type": "answer",
                        "correct": 1,
                        "question": "Shall we proceed Say YES, NO or DONE to quit.",
                        "message": response.text,
                        "ts": response.ts,
                    }
                    if (user.answers) {
                        user.answers.push(reqdData);
                    } else {
                        user.answers = [reqdData];
                    }
                    controller.storage.users.save(user, function (err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                    convo.say('OK you are done!');
                    convo.next();
                    // convo.say('OK you are done!');
                });
            }
        }, {
            default: true,
            callback: function (response, convo) {
                // just repeat the question
                controller.storage.users.get(response.user, function (err, user) {
                    if (!user) {
                        user = {
                            id: response.user
                        };
                    }
                    var reqdData = {
                        "message_type": "answer",
                        "correct": 0,
                        "question": "Shall we proceed Say YES, NO or DONE to quit.",
                        "message": response.text,
                        "ts": response.ts,
                    }
                    if (user.answers) {
                        user.answers.push(reqdData);
                    } else {
                        user.answers = [reqdData];
                    }
                    controller.storage.users.save(user, function (err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                    convo.say('OK I quit');
                });
                convo.repeat();
                convo.next();
            }
        }]);
        convo.ask('Not done yet?', [{
            pattern: bot.utterances.yes,
            callback: function (response, convo) {
                controller.storage.users.get(response.user, function (err, user) {
                    if (!user) {
                        user = {
                            id: response.user
                        };
                    }
                    var reqdData = {
                        "message_type": "answer",
                        "correct": 1,
                        "question": "Shall we proceed Say YES, NO or DONE to quit.",
                        "message": response.text,
                        "ts": response.ts,
                    }
                    if (user.answers) {
                        user.answers.push(reqdData);
                    } else {
                        user.answers = [reqdData];
                    }
                    controller.storage.users.save(user, function (err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                    convo.say('OK you are done!');
                    convo.next();
                });
            }
        }, {
            default: true,
            callback: function (response, convo) {
                // just repeat the question
                controller.storage.users.get(response.user, function (err, user) {
                    if (!user) {
                        user = {
                            id: response.user
                        };
                    }
                    var reqdData = {
                        "message_type": "answer",
                        "correct": 0,
                        "question": "Shall we proceed Say YES, NO or DONE to quit.",
                        "message": response.text,
                        "ts": response.ts,
                    }
                    if (user.answers) {
                        user.answers.push(reqdData);
                    } else {
                        user.answers = [reqdData];
                    }
                    controller.storage.users.save(user, function (err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                });
                convo.repeat();
                convo.next();
            }
        }]);

    })

});
