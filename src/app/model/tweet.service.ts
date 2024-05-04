import { Injectable } from "@angular/core";
import { TweetDetails } from "./tweet-details";

@Injectable()
export class TweetDataService {

    private static tweets: TweetDetails[] = [
        new TweetDetails(0, "Hello, World!"),
        new TweetDetails(0, "My second tweet"),
        new TweetDetails(1, "I rode my bike!"),
        new TweetDetails(1, "Can't wait for tomorrow"),
        new TweetDetails(2, "What should i cook?"),
        new TweetDetails(2, "Had a great dinner")
    ];
    
    getTweets() {
        return TweetDataService.tweets;
    }

    addTweet(newTweet: TweetDetails) {
        TweetDataService.tweets.push(newTweet);
    }

}