import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Tile } from './tile';
import { DistributorService } from './distributor.service';

export interface SquarePosition {
  place: number;
  index: number;
}

export interface SquareContent {
  tile: Tile;
  position: SquarePosition;
}


@Injectable()
export class GameService {

  static SIZE: number = 5;
  public static PLACE_GRID: number = 1;
  public static PLACE_RACK: number = 2;

  private grid: Array<Tile> = new Array<Tile>(GameService.SIZE * GameService.SIZE);
  private rack: Array<Tile> = new Array<Tile>(GameService.SIZE);

  private started: boolean = false;
  private level: number;

  private changeSource = new Subject<SquareContent>();
  change$ = this.changeSource.asObservable();

  private selectRackSource = new Subject<SquarePosition>();
  selectRack$ = this.selectRackSource.asObservable();

  private selectedRack: SquareContent = null;

  constructor(private distributor: DistributorService) { }

  public restart() {
    this.changeLevel(10);
    for (let i = 0; i < this.grid.length; i++) {
      this.setGridCell(i, null);
    }
    this.setRackCell(0, this.distributor.getTile(Tile.NUMBER));
    this.setRackCell(1, this.distributor.getTile(Tile.OPERATOR));
    this.setRackCell(2, this.distributor.getTile(Tile.NUMBER));
    this.setRackCell(3, this.distributor.getTile(Tile.EQUAL));
    this.setRackCell(4, this.distributor.getTile(Tile.NUMBER));
    this.started = true;
  }

  /** Called from the square component when a square is selected for action */
  public squareSelected(place: number, index: number, tile: Tile) {
    if (!this.started) { return; }
    switch (place) {
      case GameService.PLACE_RACK: this.setSelectedRack(index, tile); break;
      case GameService.PLACE_GRID: this.setSelectedGrid(index); break;
    }
  }

  private changeLevel(level) {
    this.level = level;
    this.distributor.setLevel(this.level);
  }

  private setGridCell(index: number, tile: Tile) {
    this.grid[index] = tile;
    this.changeSource.next({
      tile: tile,
      position: { place: GameService.PLACE_GRID, index: index }
    });
  }

  private setRackCell(index: number, tile: Tile) {
    this.rack[index] = tile;
    this.changeSource.next({
      tile: tile,
      position: { place: GameService.PLACE_RACK, index: index }
    });
  }

  private setSelectedRack(index: number, tile: Tile) {
    if (index == null && tile == null) {
      this.selectedRack = null;
    } else {
      this.selectedRack = { tile: tile, position: { place: GameService.PLACE_RACK, index: index } };
    }
    this.selectRackSource.next({ place: GameService.PLACE_RACK, index: index });
  }

  private setSelectedGrid(index: number) {
    if (this.selectedRack != null && this.grid[index] == null) {
      this.setGridCell(index, this.selectedRack.tile);
      this.setRackCell(
        this.selectedRack.position.index,
        this.distributor.getTile(this.selectedRack.tile.type));
      this.setSelectedRack(null, null);
    }
  }
}
