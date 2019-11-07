/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string; // username binding for login form
  password: string; // password binding for login form
  // Inject named dependencies so we can access inside the class
  constructor(public userService: UserService) { }
  ngOnInit() {
  }
  // user signin function
  login() {
    // Use userService for user authentication
    this.userService.login(this.username, this.password);
  }
}
