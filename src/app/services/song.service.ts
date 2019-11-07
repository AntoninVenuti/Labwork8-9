/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'; // import AngularFirestore
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; // import AngularFireDatabase
import { UserService } from '../services/user.service';  // import UserService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  userId: string = null;
  songs: AngularFireList<Song> = null; // To Store FirebaseCollectionItems

  // Inject dependencies
  constructor(private fireDatabase: AngularFireDatabase,
              private userService: UserService) {
    userService.authenticationState.subscribe(state => { // subscribe to authenticationState changes
      if (state) {
        const user: User = userService.getUser();
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }
  get_SongList() {
    if (!this.userId) { return; } // Our Firabase rules set for user only;
    this.songs  = this.fireDatabase.list<Song>(`song-list`);
    return this.songs;
  }
  get_SongInfo(songId: string) {
    // TODO
  }
  add_SongInfo(song: Song) {
    if (!this.userId) { return; } // Our Firabase rules set for user only;
    song.userId = this.userId;
    this.songs.push(song);
  }
  update_SongInfo(song: Song) {
    if (!this.userId) { return; } // Our Firabase rules set for user only;
    // TODO
  }
  delete_SongInfo(song: Song) {
    if (!this.userId) { return; } // Our Firabase rules set for user only;
    // TODO
  }
}
