import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GpgsService } from './gpgs.service';

describe('Gpgs Service', () => {
  beforeEachProviders(() => [GpgsService]);

  it('should ...',
      inject([GpgsService], (service: GpgsService) => {
    expect(service).toBeTruthy();
  }));
});
