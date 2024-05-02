import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserDataService } from '../model/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink, FormsModule],
  providers: [UserDataService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  emailAddress: string = "";
  firstName: string = "";
  lastName: string = "";
  bio: string = "";
  password: string = "";

  emailAddressError: boolean = false;
  firstNameError: boolean = false;
  lastNameError: boolean = false;
  passwordError: boolean = false;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  registerSubmit() {
    this.emailAddressError = false;
    this.firstNameError = false;
    this.lastNameError = false;
    this.passwordError = false;

    if (this.emailAddress == "")
      this.emailAddressError = true;
    if (this.firstName == "")
      this.firstNameError = true;
    if (this.lastName == "")
      this.lastNameError = true;
    if (this.password == "")
      this.passwordError = true;

    if (!this.emailAddressError && !this.firstNameError && !this.lastNameError && !this.passwordError) {
      var newUser: User = new User(this.firstName, this.lastName, this.emailAddress, this.password, this.bio);
      this.userDataService.addUser(newUser);
      this.router.navigate(["sign-in"]);
    }
  }

}
