import { Component } from '@angular/core';

import { SquareComponent } from './square';

@Component({
  moduleId: module.id,
  selector: 'arithmetis-app',
  templateUrl: 'arithmetis.component.html',
  styleUrls: ['arithmetis.component.css'],
  directives: [SquareComponent]
})
export class ArithmetisAppComponent {
}
