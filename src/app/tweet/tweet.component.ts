import { Component, Input, OnInit } from '@angular/core';
import { TweetDetails } from '../model/tweet-details';
import { UserDataService } from '../model/user.service';
import { User } from '../model/user';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tweet',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  providers: [UserDataService],
  inputs: ["tweet"],
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.css'
})
export class TweetComponent implements OnInit {
  
  tweet: TweetDetails;
  author: User;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    let foundUser = this.userDataService.getUser(this.tweet.authorId);
    if (foundUser != undefined)
      this.author = foundUser;
    else
      this.router.navigate([""]);
  }

}
