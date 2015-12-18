require('dotenv').load();
import Botkit from 'botkit';

let controller = Botkit.slackbot({
    debug: false
});

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.SLACK_API_TOKEN,
}).startRTM()

export default controller;
