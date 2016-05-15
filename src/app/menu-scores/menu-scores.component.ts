import { Component, OnInit } from '@angular/core';

import { Modal } from 'ng2-modal';

import { GameService } from '../game.service';
import { GpgsService } from '../gpgs.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu-scores',
  templateUrl: 'menu-scores.component.html',
  styleUrls: ['menu-scores.component.css'],
  directives: [Modal]
})
export class MenuScoresComponent implements OnInit {

  public logo: string = '/assets/icons8/Synchronize-32.png';
  public name: string;
  public scores: Array<any> = new Array(25);

  constructor(private game: GameService, private gpgs: GpgsService) { }

  ngOnInit() {
  }

  open() {
    this.gpgs.getLeaderboardForLevel(this.game.level, response => {
      console.log(response);
      this.logo = response.iconUrl;
      this.name = response.name;
      this.gpgs.getScoresForLevel(this.game.level, scores => {
        console.log(scores);
        this.scores = scores.items;
      });
    });
  }
}
