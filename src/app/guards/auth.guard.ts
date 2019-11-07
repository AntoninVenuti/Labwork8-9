/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
// AuthGuard implements CanActivate class
export class AuthGuard implements CanActivate {

  constructor(public auth: UserService) { }

  // canActivate function passes to router if route can be activated and navigated.
  canActivate(): boolean {
    // if user authenticated return true
    return this.auth.isAuthenticated();
  }
}