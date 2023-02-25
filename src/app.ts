import * as dotenv from "dotenv";
import Snoowrap from "snoowrap";
import { CommentStream, SubmissionStream, InboxStream } from "snoostorm";

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDDIT_USER, REDDIT_PASS } = process.env;
if (!(CLIENT_ID && CLIENT_SECRET && REDDIT_USER && REDDIT_PASS))
	throw new Error("environment variables not set");

function run() {
	const client = new Snoowrap({
		userAgent: "wheretofindsouthparkbot-reddit",
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		username: REDDIT_USER,
		password: REDDIT_PASS,
	});

	const inbox = new InboxStream(client, {
		limit: 20,
		pollTime: 15_000,
		filter: 'mentions',
	});

	try {
		inbox.on("listing", (listings) => {
			for (const listing of listings) {
				if (listing.subreddit_name_prefixed !== 'r/testingground4bots') { continue; }
				console.log(listing);
			}
		});
	} catch (e) {
		console.error(e);
		run();
	}
}

run();
