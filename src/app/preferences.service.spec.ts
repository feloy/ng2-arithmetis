import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { PreferencesService } from './preferences.service';

describe('Preferences Service', () => {
  beforeEachProviders(() => [PreferencesService]);

  it('should ...',
      inject([PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));
});
