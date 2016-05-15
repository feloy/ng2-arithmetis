import { Component, ViewEncapsulation, provide, AfterViewInit } from '@angular/core';

import {I18nServiceConfig, I18nService, I18nDirective} from 'ng2-i18next/ng2-i18next';

import { SquareComponent } from './square';
import { ChronoComponent } from './chrono';
import { MenuComponent } from './menu';

import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';
import { AudioService } from './audio.service';
import { ChronoService } from './chrono.service';
import { GpgsService } from './gpgs.service';

declare var i18nextBrowserLanguageDetector: any;
declare var i18nextXHRBackend: any;

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
  providers: [I18N_PROVIDERS, GameService, DistributorService,
    CalculatorService, AudioService, ChronoService, GpgsService],
  directives: [SquareComponent, I18nDirective, ChronoComponent, MenuComponent],
  encapsulation: ViewEncapsulation.None
})
export class ArithmetisAppComponent implements AfterViewInit {

  loop25 = new Array(25);
  loop5 = new Array(5);

  constructor(private game: GameService, private i18n: I18nService,
    private audio: AudioService, private gpgs: GpgsService) {
  }

  ngAfterViewInit() {
    this.gpgs.createSigninButton();
  }

  public getPlaceRack() {
    return GameService.PLACE_RACK;
  }
  public getPlaceGrid() {
    return GameService.PLACE_GRID;
  }

  public go() {
    this.game.restart();
  }

  public signout() {
    this.gpgs.signout();
  }

  public onmenu() {
  }
}
