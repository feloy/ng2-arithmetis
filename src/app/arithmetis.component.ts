import { Component, ViewEncapsulation, provide, AfterViewInit, NgZone } from '@angular/core';

import {I18nServiceConfig, I18nService, I18nDirective} from 'ng2-i18next/ng2-i18next';

import { SquareComponent } from './square';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';

declare var i18nextBrowserLanguageDetector: any;
declare var i18nextXHRBackend: any;

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
export class ArithmetisAppComponent implements AfterViewInit {

  private connected: boolean;
  private user: any;
  private profile: any;

  loop25 = new Array(25);
  loop5 = new Array(5);

  constructor(private game: GameService, private i18n: I18nService,
    private zone: NgZone) {
  }

  ngAfterViewInit() {
    gapi.signin2.render(
      'google-login-button',
      {
        'onSuccess': (user) => {
          console.log(user);
          this.zone.run(() => {
            this.connected = true;
            this.user = user;
            this.profile = this.user.getBasicProfile();
          });
        },
        'scope': 'profile',
        'theme': 'dark',
        'onfailure': (err) => {
          console.log('error:' + err);
        }
      });
    console.log('afterview: gapi started'); //this is printed 
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
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.zone.run(() => {
        this.connected = false;
        this.user = null;
        this.profile = null;
      });
    });
  }
}
