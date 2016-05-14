import { Component, OnInit } from '@angular/core';

import { Tile } from '../tile';

@Component({
  moduleId: module.id,
  selector: 'app-square',
  templateUrl: 'square.component.html',
  styleUrls: ['square.component.css']
})
export class SquareComponent implements OnInit {

  private tile: Tile;

  constructor() { }

  ngOnInit() {
  }

}
