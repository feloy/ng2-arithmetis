import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal';
import { I18nDirective, I18nService } from 'ng2-i18next/ng2-i18next';

import { GameService } from '../game.service';
import { GpgsService } from '../gpgs.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu-leaderboards',
  templateUrl: 'menu-leaderboards.component.html',
  styleUrls: ['menu-leaderboards.component.css'],
  directives: [Modal, I18nDirective]
})
export class MenuLeaderboardsComponent implements OnInit {

  public boards = null;
  public selectedBoard;

  public logo: string;
  public name: string;
  public scores: Array<any> = new Array(25);

  constructor(private game: GameService, private gpgs: GpgsService,
    private i18n: I18nService) { }

  ngOnInit() {
  }

  open() {
    this.selectedBoard = null;
    this.gpgs.getLeaderboardList(response => {
      this.boards = response.items;
    });
  }

  selectBoard(board) {
    this.scores = null;
    this.selectedBoard = board;
    this.gpgs.getLeaderboard(board.id, response => {
      this.logo = response.iconUrl;
      this.name = response.name;
      this.gpgs.getScores(board.id, scores => {
        this.scores = scores.items;
        if (this.scores == null) {
          this.scores = [];
        }
      });
    });

  }
}
