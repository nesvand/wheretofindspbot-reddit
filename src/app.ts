import * as dotenv from "dotenv";
import Snoowrap from "snoowrap";
import { SubmissionStream } from "snoostorm";

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDDIT_USER, REDDIT_PASS } = process.env;
if (!(CLIENT_ID && CLIENT_SECRET && REDDIT_USER && REDDIT_PASS))
	throw new Error("environment variables not set");

const client = new Snoowrap({
	userAgent: 'wheretofindsouthparkbot-reddit',
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	username: REDDIT_USER,
	password: REDDIT_PASS,
});

const submissions = new SubmissionStream(client, {
	subreddit: 'testingground4bots',
	limit: 20,
	pollTime: 2000,
});

submissions.on('listing', (l) => {
	l.forEach((ll) => {
		if (ll.title.toLowerCase().includes('watch') && ll.title.toLowerCase().includes('where')) {
			ll.reply('found you');
		}
	});
});
