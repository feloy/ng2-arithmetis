import { Component, OnInit, Input } from '@angular/core';

import { Tile } from '../tile';

import { GameService, SquareContent } from '../game.service';

@Component({
  moduleId: module.id,
  selector: 'app-square',
  templateUrl: 'square.component.html',
  styleUrls: ['square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() place: number;
  @Input() index: number;

  private tile: Tile;

  constructor(game: GameService) {
    game.change$.subscribe((content: SquareContent) => {
      if (this.place != content.place || this.index != content.index) {
        return;
      }
      this.tile = content.tile;
    });
  }

  ngOnInit() {
  }

}
