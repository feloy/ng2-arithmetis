import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Tile } from './tile';
import { DistributorService } from './distributor.service';
import { Clearable, CalculatorService } from './calculator.service';
import { AudioService } from './audio.service';
import { ChronoService } from './chrono.service';
import { GpgsService } from './gpgs.service';

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

  public started: boolean = false;
  public linesLeft: number;
  public myBestAtLevel = null;
  public level: number;

  private beepDone = false;
  private demoInterval = null;
  private demoMoves: Array<number>;

  private changeSource = new Subject<SquareContent>();
  change$ = this.changeSource.asObservable();

  private selectRackSource = new Subject<SquarePosition>();
  selectRack$ = this.selectRackSource.asObservable();

  private selectedRack: SquareContent = null;

  constructor(private distributor: DistributorService,
    private calculator: CalculatorService, private audio: AudioService,
    private chrono: ChronoService, private gpgs: GpgsService) { }

  /** restart a new game  */
  public restart() {
    if (this.demoInterval != null) {
      clearInterval(this.demoInterval);
      this.demoInterval = null;
    }
    // NE PAS SUPPRIMER   console.log(this.demoMoves);
    this.demoMoves = new Array();
    this.selectedRack = null;
    this.selectRackSource.next({ place: GameService.PLACE_RACK, index: null });

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
    this.gpgs.getMyBestAtLevel(this.level, score => {
      if (typeof score.items != 'undefined') {
        this.myBestAtLevel = score.items[0].scoreString;
      } else {
        this.myBestAtLevel = null;
      }
    });

    if (this.level > 1) {
      this.audio.playLevel(this.level);
      this.gpgs.sendLeaderboardLevel(this.level - 1);
      this.gpgs.sendLeaderboardChrono(this.level - 1, this.chrono.get());
    }

    this.chrono.start();
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
    if (!this.selectedRack) {
      return;
    }
    let newContent: SquareContent = {
      tile: this.selectedRack.tile,
      position: { place: GameService.PLACE_GRID, index }
    };
    let toClear: Array<Clearable> = new Array();
    if (this.grid[index] == null
      && (toClear = this.calculator.canAddTile(this.grid, newContent))) {

      // Save the move for demo
      this.demoMoves.push(this.selectedRack.position.index);
      this.demoMoves.push(index % GameService.SIZE);
      this.demoMoves.push(Math.floor(index / GameService.SIZE));
      this.demoMoves.push(null);

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


  public goDemo(callback) {
    let clicRackAtPos = (i: number) => {
      this.squareSelected(GameService.PLACE_RACK, i, this.rack[i]);
    };
    let clickGridAtPos = (i: number, x: number, y: number) => {
      this.squareSelected(GameService.PLACE_GRID, x + GameService.SIZE * y, this.rack[i]);
    };

    let numbers = [0, 0, 0, 1, 0, 0, 1, 0, 2, 1, 2, 0, 0, 2, 2];
    let operators = ['-', '-', '-', '+'];
    this.distributor.setSources(numbers, operators);
    this.restart();

    var ops = [
      /*
        0, 0, 4, null, 
        1, 1, 4, null, 
        2, 2, 4, null, 
        3, 3, 4, null, 
        4, 4, 4, null,
        */
      () => { clicRackAtPos(0); },
      () => { clickGridAtPos(0, 0, 4); },
      () => { clicRackAtPos(1); },
      () => { clickGridAtPos(1, 1, 4); },
      () => { clicRackAtPos(2); },
      () => { clickGridAtPos(2, 2, 4); },
      () => { clicRackAtPos(3); },
      () => { clickGridAtPos(3, 3, 4); },
      () => { clicRackAtPos(4); },
      () => { clickGridAtPos(4, 4, 4); },
      /*
      0, 0, 4, null, 
      1, 1, 4, null, 
      2, 2, 4, null, 
      3, 3, 4, null, 
      0, 4, 0, null, 
      */
      () => { clicRackAtPos(0); },
      () => { clickGridAtPos(0, 0, 4); },
      () => { clicRackAtPos(1); },
      () => { clickGridAtPos(1, 1, 4); },
      () => { clicRackAtPos(2); },
      () => { clickGridAtPos(2, 2, 4); },
      () => { clicRackAtPos(3); },
      () => { clickGridAtPos(3, 3, 4); },
      () => { clicRackAtPos(0); },
      () => { clickGridAtPos(0, 4, 0); },
      /*
        1, 4, 1, null, 
        2, 4, 2, null, 
        3, 4, 3, null, 
        2, 4, 4, null, 
        0, 0, 4, null,
        */
      () => { clicRackAtPos(1); },
      () => { clickGridAtPos(1, 4, 1); },
      () => { clicRackAtPos(2); },
      () => { clickGridAtPos(2, 4, 2); },
      () => { clicRackAtPos(3); },
      () => { clickGridAtPos(3, 4, 3); },
      () => { clicRackAtPos(2); },
      () => { clickGridAtPos(2, 4, 4); },
      () => { clicRackAtPos(0); },
      () => { clickGridAtPos(0, 0, 4); },
      /*
      4, 1, 4, null, 
      3, 2, 4, null, 
      2, 3, 4, null, 
      4, 4, 4, null]
      */
      () => { clicRackAtPos(4); },
      () => { clickGridAtPos(4, 1, 4); },
      () => { clicRackAtPos(3); },
      () => { clickGridAtPos(3, 2, 4); },
      () => { clicRackAtPos(2); },
      () => { clickGridAtPos(2, 3, 4); },
      () => { clicRackAtPos(4); },
      () => { clickGridAtPos(4, 4, 4); },


    ];
    var i = 0;
    this.demoInterval = setInterval(() => {
      ops[i++]();
      if (i >= ops.length) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;
        setTimeout(() => callback(), 2000);
      }
    }, 1000);
  }
}
