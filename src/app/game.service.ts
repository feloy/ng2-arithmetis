import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Tile } from './tile';
import { DistributorService } from './distributor.service';
import { Clearable, CalculatorService } from './calculator.service';
import { AudioService } from './audio.service';
import { ChronoService } from './chrono.service';

export interface SquarePosition {
  place: number;
  index: number;
}

export interface SquareContent {
  tile: Tile;
  position: SquarePosition;
}

declare var gapi;

@Injectable()
export class GameService {

  static SIZE: number = 5;
  public static PLACE_GRID: number = 1;
  public static PLACE_RACK: number = 2;

  private grid: Array<Tile> = new Array<Tile>(GameService.SIZE * GameService.SIZE);
  private rack: Array<Tile> = new Array<Tile>(GameService.SIZE);

  public started: boolean = false;
  private level: number;
  public linesLeft: number;
  private beepDone = false;

  private changeSource = new Subject<SquareContent>();
  change$ = this.changeSource.asObservable();

  private selectRackSource = new Subject<SquarePosition>();
  selectRack$ = this.selectRackSource.asObservable();

  private selectedRack: SquareContent = null;

  constructor(private distributor: DistributorService,
    private calculator: CalculatorService, private audio: AudioService,
    private chrono: ChronoService) { }

  /** restart a new game  */
  public restart() {
    this.changeLevel(1);
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

  /** subroutine to change level and tell to all concerned */
  private changeLevel(level) {
    this.level = level;
    this.distributor.setLevel(this.level);
    this.linesLeft = this.level;

    this.chrono.start();

    if (this.level > 1) {
      this.sendLeaderboardLevel();
      this.audio.playLevel(this.level);
    }
  }

  /** subroutine to place tile in the grid and tell to all concerned */
  public setGridCell(index: number, tile: Tile) {
    this.grid[index] = tile;
    this.changeSource.next({
      tile: tile,
      position: { place: GameService.PLACE_GRID, index: index }
    });
  }

  /** subroutine to place tile in the rack and tell to all concerned */
  private setRackCell(index: number, tile: Tile) {
    this.rack[index] = tile;
    this.changeSource.next({
      tile: tile,
      position: { place: GameService.PLACE_RACK, index: index }
    });
  }

  /** subroutine to mark a tile in the rack selected and tell to all concerned */
  private setSelectedRack(index: number, tile: Tile) {
    if (index == null && tile == null) {
      this.selectedRack = null;
    } else {
      this.selectedRack = { tile: tile, position: { place: GameService.PLACE_RACK, index: index } };
    }
    this.selectRackSource.next({ place: GameService.PLACE_RACK, index: index });
  }

  /** subroutine to place the selected tile in the grid */
  private setSelectedGrid(index: number) {
    let newContent: SquareContent = {
      tile: this.selectedRack.tile,
      position: { place: GameService.PLACE_GRID, index }
    };
    let toClear: Array<Clearable> = new Array();
    if (this.selectedRack != null && this.grid[index] == null
      && (toClear = this.calculator.canAddTile(this.grid, newContent))) {

      this.setGridCell(index, this.selectedRack.tile);
      this.setRackCell(
        this.selectedRack.position.index,
        this.distributor.getTile(this.selectedRack.tile.type));
      this.setSelectedRack(null, null);

      this.audio.playDone(toClear.length);

      for (let i = 0; i < toClear.length; i++) {
        let clearable: Clearable = toClear[i];
        switch (clearable.direction) {
          case CalculatorService.DIR_HORIZONTAL: this.clearLine(clearable.offset); break;
          case CalculatorService.DIR_VERTICAL: this.clearCol(clearable.offset); break;
          case CalculatorService.DIR_ANTISLASH: this.clearAntislash(); break;
          case CalculatorService.DIR_SLASH: this.clearSlash(); break;
        }
      }
      this.linesLeft = Math.max(0, this.linesLeft - toClear.length);
      if (this.linesLeft == 0 && this.calculator.gridIsEmpty(this.grid)) {
        this.changeLevel(this.level + 1);
        this.beepDone = false;
      } else if (this.linesLeft == 0 && !this.beepDone) {
        this.audio.playBeep();
        this.beepDone = true;
      }
    }
  }

  private clearLine(line: number) {
    for (let i = 0; i < GameService.SIZE; i++) {
      this.setGridCell(i + GameService.SIZE * line, null);
    }
  }

  private clearCol(col: number) {
    for (let i = 0; i < GameService.SIZE; i++) {
      this.setGridCell(col + GameService.SIZE * i, null);
    }
  }

  private clearAntislash() {
    for (let i = 0; i < GameService.SIZE; i++) {
      this.setGridCell(i + GameService.SIZE * i, null);
    }
  }

  private clearSlash() {
    for (let i = 0; i < GameService.SIZE; i++) {
      this.setGridCell(i + GameService.SIZE * (GameService.SIZE - 1 - i), null);
    }
  }

  private sendLeaderboardLevel() {
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.submit(
        {
          leaderboardId: 'CgkIg-L2stUXEAIQHw',
          score: this.level
        }
      );
      request.execute(function (response) {
        console.log(response);
      });
    });
  }
}
