import { Injectable } from "@angular/core";
import { TweetDetails } from "./tweet-details";

@Injectable()
export class TweetDataService {

    private static tweets: TweetDetails[] = [
        new TweetDetails(1, "Hello, World!"),
        new TweetDetails(1, "My second tweet")
    ];
    
    getTweets() {
        return TweetDataService.tweets;
    }

    addTweets(newTweet: TweetDetails) {
        TweetDataService.tweets.push(newTweet);
    }

}