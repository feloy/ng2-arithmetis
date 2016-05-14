import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ArithmetisAppComponent } from '../app/arithmetis.component';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';

beforeEachProviders(() => [ArithmetisAppComponent, GameService, DistributorService]);

describe('App: Arithmetis', () => {
  it('should create the app',
      inject([ArithmetisAppComponent], (app: ArithmetisAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
