import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChronoService } from '../chrono.service';

@Component({
  moduleId: module.id,
  selector: 'app-chrono',
  templateUrl: 'chrono.component.html',
  styleUrls: ['chrono.component.css']
})
export class ChronoComponent implements OnInit, OnDestroy {

  private t;
  private interval;

  constructor(private chrono: ChronoService) { }

  ngOnInit() {
    this.interval = setInterval(() => { this.display(); }, 1000);
    this.display();
  }

  private display() {
    this.t = this.chrono.get();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
