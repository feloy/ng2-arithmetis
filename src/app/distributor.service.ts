import { Injectable } from '@angular/core';

import { Tile } from './tile';

@Injectable()
export class DistributorService {

  private level: number = 1;

  private nextNumberFctOrArray;
  private nextOperatorFctOrArray;

  private sentNumbers: Array<Tile> = new Array();
  private sentOperators: Array<Tile> = new Array();

  // the pointers are used to go through the nextNumberFctOrArray 
  // and nextOperatorFctOrArray when thy are arrays
  private nextNumberIndex;
  private nextOperatorIndex;

  constructor() {
    this.resetSources();
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public setSources(nextNumberArray, nextOperatorArray) {
    this.nextNumberFctOrArray = nextNumberArray;
    this.nextOperatorFctOrArray = nextOperatorArray;
    this.nextNumberIndex = 0;
    this.nextOperatorIndex = 0;
    this.sentNumbers = new Array();
    this.sentOperators = new Array();
  }

  public resetSources() {
// NE PAS SUPPRIMER    this.dumpSent();
    this.nextNumberFctOrArray = this.getNumberTile;
    this.nextOperatorFctOrArray = this.getOperatorTile;
  }

  public getTile(type: number): Tile {
    let ret;
    switch (type) {
      case Tile.NUMBER:
        if (typeof this.nextNumberFctOrArray == 'function') {
          ret = this.nextNumberFctOrArray(type);
        } else if (this.nextNumberFctOrArray instanceof Array) {
          ret = new Tile(type, '' + this.nextNumberFctOrArray[this.nextNumberIndex]);
          this.nextNumberIndex = (this.nextNumberIndex + 1) % this.nextNumberFctOrArray.length;
        }
        this.sentNumbers.push(ret);
        return ret;

      case Tile.OPERATOR:
        if (typeof this.nextOperatorFctOrArray == 'function') {
          ret = this.nextOperatorFctOrArray(type);
        } else if (this.nextOperatorFctOrArray instanceof Array) {
          ret = new Tile(type, this.nextOperatorFctOrArray[this.nextOperatorIndex]);
          this.nextOperatorIndex =
            (this.nextOperatorIndex + 1) % this.nextOperatorFctOrArray.length;
        }
        this.sentOperators.push(ret);
        return ret;

      case Tile.EQUAL:
        return new Tile(type, '=');
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

  public dumpSent() {
    let numbers: Array<string> = this.sentNumbers.map(tile => tile.face);
    let operators: Array<string> = this.sentOperators.map(tile => tile.face);
    console.log('numbers: ' + numbers);
    console.log('operators: ' + operators);
  }
}
