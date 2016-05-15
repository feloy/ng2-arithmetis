import { Component, ViewEncapsulation, provide, AfterViewInit, ViewChild } from '@angular/core';
import {I18nServiceConfig, I18nService, I18nDirective} from 'ng2-i18next/ng2-i18next';
import { Modal } from 'ng2-modal';

import { SquareComponent } from './square';
import { ChronoComponent } from './chrono';
import { MenuComponent } from './menu';

import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';
import { AudioService } from './audio.service';
import { ChronoService } from './chrono.service';
import { GpgsService } from './gpgs.service';
import { PreferencesService } from './preferences.service';

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
    CalculatorService, AudioService, ChronoService, GpgsService,
    PreferencesService],
  directives: [SquareComponent, I18nDirective, ChronoComponent, MenuComponent, Modal],
  encapsulation: ViewEncapsulation.None
})
export class ArithmetisAppComponent implements AfterViewInit {

  @ViewChild('endDemoModal') endDemoModal;

  loop25 = new Array(25);
  loop5 = new Array(5);

  constructor(private game: GameService, private i18n: I18nService,
    private audio: AudioService, private gpgs: GpgsService,
    private distributor: DistributorService, private prefs: PreferencesService) {
  }

  ngAfterViewInit() {
    this.gpgs.createSigninButton();
    if (this.prefs.getPlayDemo()) {
      setTimeout(() => { this.demo(); }, 1000);
    }
  }

  public getPlaceRack() {
    return GameService.PLACE_RACK;
  }
  public getPlaceGrid() {
    return GameService.PLACE_GRID;
  }

  public go() {
    this.distributor.resetSources();
    this.game.restart();
  }

  public signout() {
    this.gpgs.signout();
  }

  public demo() {
    this.prefs.setPlayDemo(false);
    this.game.goDemo(() => {
      this.go();
      this.endDemoModal.open();
    });
  }
}
