import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GameService } from './game.service';
import { DistributorService } from './distributor.service';

describe('Game Service', () => {
  beforeEachProviders(() => [GameService, DistributorService]);

  it('should ...',
      inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
