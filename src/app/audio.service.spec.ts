import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('Audio Service', () => {
  beforeEachProviders(() => [AudioService]);

  it('should ...',
      inject([AudioService], (service: AudioService) => {
    expect(service).toBeTruthy();
  }));
});
