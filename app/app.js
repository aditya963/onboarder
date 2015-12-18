import controller from './slack.js';

// give the bot something to listen for.
// controller.hears('hello', 'direct_message,direct_mention,mention', function (bot, message) {
//     bot.reply(message, 'Hello yourself.');
// });
controller.on('rtm_open', function() {
    console.log('yo its open!');
});
controller.on('rtm_close', function() {
    console.log('its closed :(');
});

controller.hears(['Hello'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
    // start a conversation to handle this response.
    bot.startConversation(message, function(err, convo) {

        convo.ask('Shall we proceed Say YES, NO or DONE to quit.', [
        {
            pattern: bot.utterances.yes,
            callback: function(response, convo) {
                controller.storage.users.get(response.user,function (err, user) {
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
                    controller.storage.users.save(user, function(err, id) {
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
            callback: function(response, convo) {
                // just repeat the question
                controller.storage.users.get(response.user,function (err, user) {
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
                    controller.storage.users.save(user, function(err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                    convo.say('OK I quit');
                });
                convo.repeat();
                convo.next();
            }
        }]);
        convo.ask('Not done yet?', [
        {
            pattern: bot.utterances.yes,
            callback: function(response, convo) {
                controller.storage.users.get(response.user,function (err, user) {
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
                    controller.storage.users.save(user, function(err, id) {
                        console.log(user);
                        // bot.reply(message, "Got it. I will call you " + user.name + " from now on.");
                    });
                    convo.say('OK you are done!');
                    convo.next();
                });
            }
        }, {
            default: true,
            callback: function(response, convo) {
                // just repeat the question
                controller.storage.users.get(response.user,function (err, user) {
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
                    controller.storage.users.save(user, function(err, id) {
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
