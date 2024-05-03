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
  inputs: ["tweet", "user"],
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.css'
})
export class TweetComponent implements OnInit {
  
  tweet: TweetDetails;
  comments: CommentDetails[];
  user: User;
  author: User;
  userLikes: boolean;
  userRetweets: boolean;

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
    } else
      this.router.navigate([""]);
  }

  likeClicked() {
    let i = this.user.likedTweets.findIndex(like => like == this.tweet.id);
    if (i != -1) {
      this.user.likedTweets.splice(i, 1);
      this.tweet.likes--;
    } else {
      this.user.likedTweets.push(this.tweet.id);
      this.tweet.likes++;
    }
    this.userLikes = this.user.likedTweets.includes(this.tweet.id);
  }

  retweetClicked() {
    let i = this.user.retweets.findIndex(retweet => retweet == this.tweet.id);
    if (i != -1) {
      this.user.retweets.splice(i, 1);
      this.tweet.retweets--;
    } else {
      this.user.retweets.push(this.tweet.id);
      this.tweet.retweets++;
    }
    this.userRetweets = this.user.retweets.includes(this.tweet.id);
  }

  commentsClicked() {
    if (this.commentsBoxDom.nativeElement.style.display == "none")
      this.commentsBoxDom.nativeElement.style.display = "grid";
    else
      this.commentsBoxDom.nativeElement.style.display = "none";
  }

  commentSubmit() {
    if (this.commentInput != "") {
      let newComment: CommentDetails = new CommentDetails(this.user.id, this.commentInput);
      this.tweet.addComment(newComment);
      this.commentInput = "";
    }
  }

}
