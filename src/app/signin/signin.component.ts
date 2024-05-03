import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserDataService } from '../model/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, FormsModule],
  providers: [UserDataService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  emailAddress: String = "";
  password: String = "";

  emailAddressError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  signinSubmit() {
    this.emailAddressError = false;
    this.passwordError = false;
    this.loginError = false;

    if (this.emailAddress == "")
      this.emailAddressError = true;
    if (this.password == "")
      this.passwordError = true;

    if (!this.emailAddressError && !this.passwordError) {
      this.userDataService.getUsers().forEach((user) => {
        if (user.email == this.emailAddress && user.password == this.password) {
          this.router.navigate([user.id, "feed"]);
        }
      });
      this.loginError = true;  
    }
  }
  
}
