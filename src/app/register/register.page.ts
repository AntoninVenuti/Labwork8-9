/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  displayName: string; // displayName binding for register form
  email: string; // email binding for register form
  password: string; // password binding for register form
  errorMessage: string; 
  constructor(public userService: UserService) { }

  ngOnInit() {
  }
  register() {
    this.errorMessage = null;
    // Simple validation
    if (this.email && this.email.length >= 6 && this.password &&  this.password.length >= 6) {
      // Use userService for user registration
      this.userService.register(this.displayName, this.email, this.password);
    } else {
      this.errorMessage = 'Please enter valid email and password!';
    }

  }
}
