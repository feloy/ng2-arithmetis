import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';

import { I18nService, I18nServiceConfig } from 'ng2-i18next/ng2-i18next';

import { ArithmetisAppComponent } from '../app/arithmetis.component';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';
import { CalculatorService } from './calculator.service';
import { AudioService } from './audio.service';
import { ChronoService } from './chrono.service';
import { GpgsService } from './gpgs.service';
import { PreferencesService } from './preferences.service';

beforeEachProviders(() => [ArithmetisAppComponent, GameService,
  DistributorService, CalculatorService, AudioService,
  ChronoService, GpgsService, I18nService, I18nServiceConfig,
  PreferencesService]);

describe('App: Arithmetis', () => {
  it('should create the app',
    inject([ArithmetisAppComponent], (app: ArithmetisAppComponent) => {
      expect(app).toBeTruthy();
    }));
});
