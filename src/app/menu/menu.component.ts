import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal';

import {MenuScoresComponent } from '../menu-scores';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [Modal, MenuScoresComponent]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  viewScores() {

  }
}
