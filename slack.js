require('dotenv').load();
import Slack from 'slack-client';

export default new Slack(process.env.SLACK_API_TOKEN, true, true);
