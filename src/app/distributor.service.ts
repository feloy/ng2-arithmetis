import { Injectable } from '@angular/core';

import { Tile } from './tile';

@Injectable()
export class DistributorService {

  private level: number = 1;

  constructor() { }

  public setLevel(level: number) {
    this.level = level;
  }

  public getTile(type: number): Tile {
    switch (type) {
      case Tile.NUMBER: return this.getNumberTile(type);

      case Tile.OPERATOR: return this.getOperatorTile(type);

      case Tile.EQUAL: return new Tile(type, '=');
    }
  }

  private getNumberTile(type: number): Tile {
    let value = Math.floor(Math.random() * (1 + this.level));
    return new Tile(type, '' + value);
  }

  private getOperatorTile(type: number): Tile {
    let value = Math.floor(Math.random() * 2);
    return new Tile(type, value == 0 ? '+' : '-');
  }
}
