import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Calculator Service', () => {
  beforeEachProviders(() => [CalculatorService]);

  it('should ...',
      inject([CalculatorService], (service: CalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
