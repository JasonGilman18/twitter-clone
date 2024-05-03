import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TweetDetails } from '../model/tweet-details';
import { User } from '../model/user';
import { UserDataService } from '../model/user.service';
import { TweetDataService } from '../model/tweet.service';
import { TweetComponent } from '../tweet/tweet.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, TweetComponent, FormsModule],
  providers: [UserDataService, TweetDataService],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  user: User;
  tweets: TweetDetails[];
  newTweetOpen: boolean = false;
  newTweetError: boolean = false;
  newTweetInput: string = "";
  newTweetErrorMsg: string = "";

  @ViewChild('newTweetBox')
  private newTweetBoxDom: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private tweetDataService: TweetDataService
  ) {}

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get("userId");
    if (param == null)
      this.router.navigate([""]);
    else {
      let foundUser = this.userDataService.getUser(Number.parseInt(param));
      if (foundUser != undefined) {
        this.user = foundUser;
        this.tweets = this.tweetDataService.getTweets();
      } else
        this.router.navigate([""]);
    }
  }

  newTweetFocused() {
    this.newTweetOpen = true;
  }

  newTweetFocusOut() {
    this.newTweetOpen = false;
  }

  publishTweet() {
    if (!this.newTweetOpen) {
      this.newTweetOpen = true;
      this.newTweetError = true;
      this.newTweetErrorMsg = "Your tweet cannot be empty";
    }

    if (this.newTweetInput != "") {
      if (this.newTweetInput.length <= 280) {
        this.tweetDataService.addTweet(new TweetDetails(this.user.id, this.newTweetInput));
        this.newTweetInput = "";
        this.newTweetOpen = false;
        this.newTweetError = false;
      } else {
        this.newTweetError = true;
        this.newTweetErrorMsg = "Your tweet can only be 280 characters";
      }
    } else {
      this.newTweetError = true;
      this.newTweetErrorMsg = "Your tweet cannot be empty";
    }
  }

  cancelTweet() {
    this.newTweetInput = "";
    this.newTweetOpen = false;
    this.newTweetError = false;
  }
  
}
