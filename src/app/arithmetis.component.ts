import { Component, ViewEncapsulation, provide } from '@angular/core';

import {I18nServiceConfig, I18nService, I18nDirective} from 'ng2-i18next/ng2-i18next';

import { SquareComponent } from './square';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';

declare var i18nextBrowserLanguageDetector: any;
declare var i18nextXHRBackend: any;

declare var profile: any;
declare var gapi;

const I18N_PROVIDERS = [
  provide(I18nServiceConfig, {
    useValue: {
      use: [i18nextBrowserLanguageDetector, i18nextXHRBackend],
      config: {
        detection: { order: ['navigator'] },
        fallbackLng: 'en'
      }
    }
  }),
  I18nService
];

@Component({
  moduleId: module.id,
  selector: 'arithmetis-app',
  templateUrl: 'arithmetis.component.html',
  styleUrls: ['arithmetis.component.css'],
  providers: [I18N_PROVIDERS, GameService, DistributorService, CalculatorService],
  directives: [SquareComponent, I18nDirective],
  encapsulation: ViewEncapsulation.None
})
export class ArithmetisAppComponent {

  public profile = profile;
  loop25 = new Array(25);
  loop5 = new Array(5);

  constructor(private game: GameService, private i18n: I18nService) { }

  public getPlaceRack() {
    return GameService.PLACE_RACK;
  }
  public getPlaceGrid() {
    return GameService.PLACE_GRID;
  }

  public go() {
    this.game.restart();

    gapi.client.load('games', 'v1', (resp) => {
      var request = gapi.client.games.leaderboards.list(
        { maxResults: 5 }
      );
      request.execute(function (response) {
        console.log(response);
        // Do something interesting with the response
      });
    });
  }
}
