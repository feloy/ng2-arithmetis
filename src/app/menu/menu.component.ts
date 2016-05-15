import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'ng2-modal';

import {MenuScoresComponent } from '../menu-scores';
import {MenuLeaderboardsComponent } from '../menu-leaderboards';

import { GpgsService } from '../gpgs.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [Modal, MenuScoresComponent, MenuLeaderboardsComponent]
})
export class MenuComponent implements OnInit {

  @Output() restart = new EventEmitter<boolean>();

  constructor(private gpgs: GpgsService) { }
  ngOnInit() {
  }

  public go() {
    this.restart.emit(true);
  }
}
