import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  song: Song  = null;
  constructor(private navController: NavController, private songService: SongService) { }

  ngOnInit() {
    console.log(this.songService.selectedSong);
    this.song = this.songService.selectedSong;
  }
  update() {
    this.songService.update_SongInfo(this.song);
    this.songService.selectedSong = null;
    this.navController.navigateBack('/tabs/songs');
  }

}
