import { Component } from '@angular/core';

import { SquareComponent } from './square';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';

@Component({
  moduleId: module.id,
  selector: 'arithmetis-app',
  templateUrl: 'arithmetis.component.html',
  styleUrls: ['arithmetis.component.css'],
  providers: [GameService, DistributorService, CalculatorService],
  directives: [SquareComponent]
})
export class ArithmetisAppComponent {

  loop25 = new Array(25);
  loop5 = new Array(5);

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
