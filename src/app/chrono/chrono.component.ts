import { Component, OnInit } from '@angular/core';

import { ChronoService } from '../chrono.service';

@Component({
  moduleId: module.id,
  selector: 'app-chrono',
  templateUrl: 'chrono.component.html',
  styleUrls: ['chrono.component.css']
})
export class ChronoComponent implements OnInit {

  private t;

  constructor(private chrono: ChronoService) { }

  ngOnInit() {
    setInterval(() => { this.display(); }, 1000);
    this.display();
  }

  private display() {
    this.t = this.chrono.get();
  }
}
