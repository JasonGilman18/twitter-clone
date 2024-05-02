import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TweetDetails } from '../model/tweet-details';
import { User } from '../model/user';
import { UserDataService } from '../model/user.service';
import { TweetDataService } from '../model/tweet.service';
import { TweetComponent } from '../tweet/tweet.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, TweetComponent],
  providers: [UserDataService, TweetDataService],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  user: User;
  tweets: TweetDetails[];

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
  
}
