import slack from './slack.js';

slack.on('open', () => {
    console.log('yo im open!');
});

slack.on('message', (message) => {
    console.log('got a message!', message);
});
slack.on('error', (error) => {
    console.log('oops!!', error);
});

slack.login();
