/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/

import { Component, OnInit } from '@angular/core';
import { IonItemSliding,NavController } from '@ionic/angular';
import { SongService } from '../services/song.service'; // Import SongService


@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss']
})
export class SongsPage implements OnInit {
  songs: Song[] = [];
  firebaseSongs: Song[] = null;
  searchText: string = null;

  constructor(private navController: NavController, private songService: SongService) { }

  ngOnInit() {
    // subscribe to valueChanges methon in SongList in songService
    this.songService.get_SongList().valueChanges().subscribe(data => {
      this.firebaseSongs = []; // Initialize empty array
      data.forEach(item => { // Loop items in collection
        this.firebaseSongs.push(item as Song); // Insert to array as song
      });
      this.songs = this.firebaseSongs;

    });
  }

  search() {
     // console.log(this.searchText); // Debug only
    if (this.searchText === null || this.searchText.length === 0 || this.firebaseSongs === null) {
     // Nothing to search
      this.songs = this.firebaseSongs;
      return;
    }
    // Ignore case sensitivity convert to lowerCase
    const searchText = this.searchText.toLowerCase();
    // Search Song Title or Singer Name
    this.songs = this.firebaseSongs.filter(song => {
      // Search both song title and singer and ignore case
        return song.title.toLowerCase().indexOf(searchText) >= 0 ||  song.singer.toLowerCase().indexOf(searchText) >= 0;
      });
  }
  update(item: IonItemSliding, song: Song) {
    item.close();
    this.songService.set_selectedSong(song);
    this.navController.navigateForward('/edit-song');
  }
  delete(item: IonItemSliding, song: Song) {
    item.close();
    this.songService.delete_SongInfo(song);
  }
}
