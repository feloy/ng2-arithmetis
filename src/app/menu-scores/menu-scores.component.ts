import { Component, OnInit } from '@angular/core';

import { Modal } from 'ng2-modal';
import { I18nDirective } from 'ng2-i18next/ng2-i18next';

import { GameService } from '../game.service';
import { GpgsService } from '../gpgs.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu-scores',
  templateUrl: 'menu-scores.component.html',
  styleUrls: ['menu-scores.component.css'],
  directives: [Modal, I18nDirective]
})
export class MenuScoresComponent implements OnInit {

  public logo: string;
  public name: string;
  public scores: Array<any> = new Array(25);

  constructor(private game: GameService, private gpgs: GpgsService) { }

  ngOnInit() {
  }

  open() {
    this.gpgs.getLeaderboardForLevel(this.game.level, response => {
      this.logo = response.iconUrl;
      this.name = response.name;
      this.gpgs.getScoresForLevel(this.game.level, scores => {
        this.scores = scores.items;
        if (this.scores == null) {
          this.scores = [];
        }
      });
    });
  }
}
