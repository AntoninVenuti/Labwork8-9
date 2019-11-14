import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Import UserService & Router
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // Create App Pages Array
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home'
    },
    {
      title: 'Music',
      url: '/tabs/songs',
      icon: 'musical-notes'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'call'
    }
  ];

  public displayNameOrEmail: string;
  // Import dependencies
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Subscribe authentication changes if user logged in route to tabs/home page
      this.userService.authenticationState.subscribe(state => {
        if (state) {
          // Get userInfo
          const user =  this.userService.getUser();
          if (user) { // if there is userInfo
            // Set displayName or Email for Side Navigation Menu
            this.displayNameOrEmail = user.displayName || user.email;
          }
          // Go to home page
          this.router.navigate(['tabs', 'home']);
        } else {
          // if user logged out redirect to login
          this.router.navigate(['login']);
        }
      });
    });
  }
  signOut() {
    // log out current user
    this.userService.logout();
  }
}