import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserDataService } from '../model/user.service';
import { CommentDetails } from '../model/comment-details';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  inputs: ["comment"],
  providers: [UserDataService],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  comment: CommentDetails;
  commentAuthor: User;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    let foundUser = this.userDataService.getUsers().find(s => s.id == this.comment.authorId);
    if (foundUser)
      this.commentAuthor = foundUser;
    else
      this.router.navigate([""]);
  }
}
