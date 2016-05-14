import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Tile} from './tile';

describe('Tile', () => {
  it('should create an instance', () => {
    expect(new Tile(Tile.NUMBER, '1')).toBeTruthy();
  });
});
