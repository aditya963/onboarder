require('dotenv').load();
import Botkit from 'botkit';

let controller = Botkit.slackbot({
    debug: false,
    json_file_store: '../data/'
});

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.SLACK_API_TOKEN,
}).startRTM()

export default controller;
