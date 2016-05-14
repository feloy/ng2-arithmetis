import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Tile } from './tile';
import { DistributorService } from './distributor.service';

export interface SquareContent {
  tile: Tile;
  place: number;
  index: number;
}

@Injectable()
export class GameService {

  static SIZE: number = 5;
  public static PLACE_GRID: number = 1;
  public static PLACE_RACK: number = 2;

  private grid: Array<Tile> = new Array<Tile>(GameService.SIZE * GameService.SIZE);
  private rack: Array<Tile> = new Array<Tile>(GameService.SIZE);

  private level: number;

  private changeSource = new Subject<SquareContent>();
  change$ = this.changeSource.asObservable();

  constructor(private distributor: DistributorService) { }

  public restart() {
    this.level = 1;
    for (let i = 0; i < this.grid.length; i++) {
      this.setGridCell(i, null);
    }
    for (let i = 0; i < this.rack.length; i++) {
      this.setRackCell(i, this.distributor.getTile(Tile.NUMBER));
    }
  }

  private setGridCell(index: number, tile: Tile) {
    this.grid[index] = tile;
    this.changeSource.next({ tile: tile, place: GameService.PLACE_GRID, index: index });
  }

  private setRackCell(index: number, tile: Tile) {
    this.rack[index] = tile;
    this.changeSource.next({ tile: tile, place: GameService.PLACE_RACK, index: index });
  }
}
