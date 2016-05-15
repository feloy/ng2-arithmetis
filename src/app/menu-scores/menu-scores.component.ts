import { Component, OnInit } from '@angular/core';

import { Modal } from 'ng2-modal';

@Component({
  moduleId: module.id,
  selector: 'app-menu-scores',
  templateUrl: 'menu-scores.component.html',
  styleUrls: ['menu-scores.component.css'],
  directives: [Modal]
})
export class MenuScoresComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
