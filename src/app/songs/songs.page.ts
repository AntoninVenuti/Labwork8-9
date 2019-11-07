/*
Iris Albrecht 902170
Hakan Kucukel 1702362
Antonin Venuti 1902162
*/

import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service'; // Import SongService

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss']
})
export class SongsPage implements OnInit {
  songs: Song[] = null;

  constructor(private songService: SongService) { }

  ngOnInit() {
    // subscribe to valueChanges methon in SongList in songService
    this.songService.get_SongList().valueChanges().subscribe(data => {
      this.songs = []; // Initialize empty array
      data.forEach(item => { // Loop items in collection
        this.songs.push(item as Song); // Insert to array as song
      });
    });
  }
}
