import { Component } from '@angular/core';

import { SquareComponent } from './square';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';

@Component({
  moduleId: module.id,
  selector: 'arithmetis-app',
  templateUrl: 'arithmetis.component.html',
  styleUrls: ['arithmetis.component.css'],
  providers: [GameService, DistributorService],
  directives: [SquareComponent]
})
export class ArithmetisAppComponent {

  constructor(private game: GameService) { }

  public getPlaceRack() {
    return GameService.PLACE_RACK;
  }
  public getPlaceGrid() {
    return GameService.PLACE_GRID;
  }

  public go() {
    this.game.restart();
  }
}
