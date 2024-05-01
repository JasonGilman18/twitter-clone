import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../model/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  emailAddress: String = "";
  password: String = "";

  emailAddressError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

  users: User[] = [new User(0, "admin", "admin", "admin@admin.com", "password", "", 0, 0)]

  constructor(
    private router: Router
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
      var validLogin = false;
      this.users.forEach((user) => {
        if (user.email == this.emailAddress && user.password == this.password) {
          validLogin = true;
          return;
        }
      });
  
      if (validLogin)
        this.router.navigate(["register"]);
      else
        this.loginError = true;
    }
  }
}
