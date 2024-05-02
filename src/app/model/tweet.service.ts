import { Injectable } from "@angular/core";
import { TweetDetails } from "./tweet-details";

@Injectable()
export class TweetDataService {

    private static tweets: TweetDetails[] = [
        new TweetDetails(1, "Hello, World!"),
        new TweetDetails(1, "My second tweet"),
        new TweetDetails(1, "My 3 tweet"),
        new TweetDetails(1, "My 4 tweet"),
        new TweetDetails(1, "My 5 tweet"),
        new TweetDetails(1, "My 6 tweet"),
        new TweetDetails(1, "My 7 tweet"),
        new TweetDetails(1, "My 8 tweet"),
        new TweetDetails(1, "My 9 tweet")
    ];
    
    getTweets() {
        return TweetDataService.tweets;
    }

    addTweets(newTweet: TweetDetails) {
        TweetDataService.tweets.push(newTweet);
    }

}