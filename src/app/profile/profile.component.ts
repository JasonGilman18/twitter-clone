import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TweetComponent } from '../tweet/tweet.component';
import { TweetDetails } from '../model/tweet-details';
import { TweetDataService } from '../model/tweet.service';
import { UserDataService } from '../model/user.service';
import { User } from '../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, TweetComponent, FormsModule],
  providers: [UserDataService, TweetDataService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  id: string;
  user: User;
  tweets: TweetDetails[];
  profileIsUsers: boolean;

  editMode: boolean;
  editFirstName: string;
  editLastName: string;
  editBio: string;
  firstNameError: boolean;
  lastNameError: boolean;

  showYourTweets: boolean;
  showLikes: boolean;
  showRetweets: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private tweetDataService: TweetDataService
  ) {}

  ngOnInit() {
    var param = this.route.snapshot.paramMap.get("userId");
    if (param == null)
      this.router.navigate([""]);
    else {
      this.user = this.userDataService.getUser(Number.parseInt(param))!;
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.profileIsUsers = Number.parseInt(this.id) == this.user.id;

      this.tweets = [];
      let userTweets = this.tweetDataService.getTweets().filter(tweet => tweet.authorId == this.user.id);
      let likedTweets = this.tweetDataService.getTweets().filter(tweet => this.user.likedTweets.includes(tweet.id));
      let retweetTweets = this.tweetDataService.getTweets().filter(tweet => this.user.retweets.includes(tweet.id));
      this.tweets = userTweets.concat(likedTweets, retweetTweets);
      this.tweets = this.tweets.sort((n1, n2) => n1.id-n2.id);
    }
  }

  editClicked() {
    this.editFirstName = this.user.firstName;
    this.editLastName = this.user.lastName;
    this.editBio = this.user.bio;
    this.firstNameError = false;
    this.lastNameError = false;
    this.editMode = true;
  }

  editSubmit() {
    if (this.editFirstName == "")
      this.firstNameError = true;
    if (this.editLastName == "")
      this.lastNameError = true;

    if (!this.firstNameError && !this.lastNameError) {
      this.userDataService.editUser(Number.parseInt(this.id), this.editFirstName, this.editLastName, this.editBio);
      this.editMode = false;
      this.router.navigate(["", this.id, "profile", this.id]);
    } else {
      this.editMode = true;
    }
  }

  editCancel() {
    this.editMode = false;
  }

  youTweetsClicked() {

  }

  youLikesClicked() {

  }

  youRetweetsClicked() {

  }

}
