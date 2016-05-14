import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ChronoService } from './chrono.service';

describe('Chrono Service', () => {
  beforeEachProviders(() => [ChronoService]);

  it('should ...',
      inject([ChronoService], (service: ChronoService) => {
    expect(service).toBeTruthy();
  }));
});
