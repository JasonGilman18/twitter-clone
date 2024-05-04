import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { TweetDetails } from '../model/tweet-details';
import { UserDataService } from '../model/user.service';
import { User } from '../model/user';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetDataService } from '../model/tweet.service';
import { CommentDetails } from '../model/comment-details';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-tweet',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, FormsModule, CommentComponent],
  providers: [UserDataService, TweetDataService],
  inputs: ["tweet", "loggedUser"],
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.css'
})
export class TweetComponent implements OnInit {
  
  tweet: TweetDetails;
  comments: CommentDetails[];
  loggedUser: User;
  author: User;
  userLikes: boolean;
  userRetweets: boolean;

  commentsOpen: boolean = false;
  commentInput: string = "";

  @ViewChild('commentsBox')
  private commentsBoxDom: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private tweetDataService: TweetDataService
  ) {}

  ngOnInit() {
    this.comments = this.tweet.comments;
    let foundUser = this.userDataService.getUser(this.tweet.authorId);
    if (foundUser != undefined) {
      this.author = foundUser;
      this.userLikes = this.loggedUser.likedTweets.includes(this.tweet.id);
      this.userRetweets = this.loggedUser.retweets.includes(this.tweet.id);
    } else
      this.router.navigate([""]);
  }

  likeClicked() {
    let i = this.loggedUser.likedTweets.findIndex(like => like == this.tweet.id);
    if (i != -1) {
      this.loggedUser.likedTweets.splice(i, 1);
      this.tweet.likes--;
    } else {
      this.loggedUser.likedTweets.push(this.tweet.id);
      this.tweet.likes++;
    }
    this.userLikes = this.loggedUser.likedTweets.includes(this.tweet.id);
  }

  retweetClicked() {
    let i = this.loggedUser.retweets.findIndex(retweet => retweet == this.tweet.id);
    if (i != -1) {
      this.loggedUser.retweets.splice(i, 1);
      this.tweet.retweets--;
    } else {
      this.loggedUser.retweets.push(this.tweet.id);
      this.tweet.retweets++;
    }
    this.userRetweets = this.loggedUser.retweets.includes(this.tweet.id);
  }

  commentsClicked() {
    this.commentsOpen = !this.commentsOpen;
    if (this.commentsBoxDom.nativeElement.style.display == "none")
      this.commentsBoxDom.nativeElement.style.display = "grid";
    else
      this.commentsBoxDom.nativeElement.style.display = "none";
  }

  commentSubmit() {
    if (this.commentInput != "") {
      if (this.commentInput.length <= 280) {
        let newComment: CommentDetails = new CommentDetails(this.loggedUser.id, this.commentInput);
        this.tweet.addComment(newComment);
        this.commentInput = "";
      }
    }
  }

}
