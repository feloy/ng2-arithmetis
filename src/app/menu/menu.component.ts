import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'ng2-modal';
import { I18nDirective } from 'ng2-i18next/ng2-i18next';

import {MenuScoresComponent } from '../menu-scores';
import {MenuLeaderboardsComponent } from '../menu-leaderboards';

import { GpgsService } from '../gpgs.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [Modal, MenuScoresComponent, MenuLeaderboardsComponent, I18nDirective]
})
export class MenuComponent implements OnInit {

  @Output() restart = new EventEmitter<boolean>();
  @Output() demo = new EventEmitter<boolean>();

  constructor(private gpgs: GpgsService) { }
  ngOnInit() {
  }

  public go() {
    this.restart.emit(true);
  }

  public goDemo() {
    this.demo.emit(true);
  }
}
