import { Component, OnInit } from '@angular/core';

import { Modal } from 'ng2-modal';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [Modal]
})
export class MenuComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
