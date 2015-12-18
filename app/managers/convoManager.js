import controller from '../slack.js';
import User from '../schema/User.js';
import fs from 'fs';

async function ask(bot, convo, question) {
    return new Promise(function (resolve, reject) {
        let regexedAnswer = '^('+question.answers.join('|')+')';
        convo.ask(question.question, [{
            pattern: new RegExp(regexedAnswer,'i'),
            callback: async function (response, convo) {
                let user;
                try {
                    user = await User.findOne({
                        id: response.user
                    }).exec();
                    if (!user) {
                        user = new User({
                            id: response.user
                        });
                    }
                } catch (e) {
                    console.log('failed to fetch', e);
                    convo.say('something broke at our end :(!');
                        reject(e);
                        return;
                }
                var reqdData = {
                    "message_type": "answer",
                    "correct": 1,
                    "question": question.question,
                    "message": response.text,
                    "ts": response.ts,
                }
                console.log("inside")
                console.log(reqdData);
                user.answers.push(reqdData);
                // console.log(user);
                try {
                    await user.save();
                    convo.next();
                    console.log('yo done!');
                    resolve();
                } catch (e) {
                    console.log('failed saving', e);
                    convo.say('something broke at our end :(!');
                    reject(e);
                }
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
                        console.log('inside default');
                        convo.say("try again");
                    });
            
                });
                convo.repeat();
                convo.next();
            }
        }]);
    });
}
export default {
    start(bot, message) {
        bot.startConversation(message, async function (err, convo) {
            
            console.log(__dirname + '/../../questions.json');
            let questionsText = fs.readFileSync(__dirname + '/../../questions.json');
            let questions = JSON.parse(questionsText);
            for (let question of questions) {
                try {
                    console.log(question.answers.map(answer => new RegExp(answer,'i')));
                    await ask(bot, convo, question);
                } catch (e) {

                }
            }
        })
    }
};
