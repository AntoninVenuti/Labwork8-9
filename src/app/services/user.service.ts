/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/


import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

// Import FirebaseAuthentication
import { AngularFireAuth } from '@angular/fire/auth';
// Storage Key to Store User Data
const USER_KEY = 'user';
const TOKEN_KEY = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Authentication state behavior
  authenticationState = new BehaviorSubject(false);
  private user: User;
  private token: any;
  // Import dependencies
  constructor(private storage: Storage,
              private platform: Platform,
              private angularFireAuth: AngularFireAuth) {
    this.platform.ready().then(async () => {
      await this.checkUserDataAsync();
    });
  }

  async checkUserDataAsync() {
    // get user data from storage
    const user = await this.storage.get(USER_KEY);
    const token = await this.storage.get(TOKEN_KEY);
    // If there is user & token data
    if (user && token) {
      this.user = user; // set user
      this.token = token; // set token
      this.authenticationState.next(true); // set authentication state to true
    }
  }

  async register(displayName: string, email: string, password: string) {
    try {
      const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
      const currentUser = this.angularFireAuth.auth.currentUser;
      // Update user displayName
      await currentUser.updateProfile({
        displayName,
        // photoURL: "profile-picture-url.jpg"
      });
      // Get New User Token
      currentUser.getIdToken(true).then(async (token: any) => {
        // Save User data to local storage
        this.user = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        };
        await this.storage.set(USER_KEY, this.user);
        // Save User token
        this.storage.set(TOKEN_KEY, token).then(() => {
          // Set Authentication state to true;
          this.authenticationState.next(true);
        });
      }); // End of getIdToken
    } catch (ex) {
      console.log(ex);
    }

  }

  async login(username: string, password: string) {
    // If username and password are not null authenticate
    if (username && username !== null && password && password !== null) {
      // Signin with firebase email & password
      this.angularFireAuth.auth.signInWithEmailAndPassword(username, password).then((data: any) => {
        // console.log(data.user);
        // Get user accessToken
        this.angularFireAuth.auth.currentUser.getIdToken(true).then(async (token: any) => {
          // Save User data to local storage
          this.user = {
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName
          };
          await this.storage.set(USER_KEY, this.user);
          // Save User token
          this.storage.set(TOKEN_KEY, token).then(() => {
            // Set Authentication state to true;
            this.authenticationState.next(true);
          });
        });
      });

    }
  }

  async logout() {
    // remove user data from local storage
    await this.storage.remove(TOKEN_KEY);
    // Set Authentication state to false;
    this.authenticationState.next(false);
  }

  isAuthenticated(): boolean {
    // return authenticationState
    return this.authenticationState.value;
  }
  // return userInfo
  getUser(): User {
    return this.user;
  }
  // return userToken
  getUserToken() {
    return this.token;
  }
}
