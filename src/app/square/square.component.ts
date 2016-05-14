import { Component, OnInit, Input } from '@angular/core';

import { Tile } from '../tile';

import { GameService, SquareContent, SquarePosition } from '../game.service';

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
  private selected: boolean;

  constructor(private game: GameService) {
    game.change$.subscribe((content: SquareContent) => {
      if (this.place != content.position.place || this.index != content.position.index) {
        return;
      }
      this.tile = content.tile;
    });

    game.selectRack$.subscribe((position: SquarePosition) => {
      this.selected = this.tile && position
        && (this.place == position.place && this.index == position.index);
    });
  }

  ngOnInit() {
  }

  public onclick() {
    this.game.squareSelected(this.place, this.index);
  }
}
