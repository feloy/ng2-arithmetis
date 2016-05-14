import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DistributorService } from './distributor.service';
import { Tile } from './tile';

describe('Distributor Service', () => {
  beforeEachProviders(() => [DistributorService]);

  it('should create an instance',
    inject([DistributorService], (service: DistributorService) => {
      expect(service).toBeTruthy();
    }));

  it('should return a tile',
    inject([DistributorService], (service: DistributorService) => {
      expect(service.getTile(Tile.NUMBER)).toBeTruthy();
    }));

  it('should return an equal tile with =',
    inject([DistributorService], (service: DistributorService) => {
      expect(service.getTile(Tile.EQUAL)).toEqual(new Tile(Tile.EQUAL, '='));
    }));

  it('should return an operator tile with + or -',
    inject([DistributorService], (service: DistributorService) => {
      let tileFace = service.getTile(Tile.OPERATOR).face;
      expect(tileFace == '+' || tileFace == '-').toBe(true);
    }));

  it('should create a number tile between 0 and level',
    inject([DistributorService], (service: DistributorService) => {
      let level = 5;
      service.setLevel(level);
      let vals = [0, 0, 0, 0, 0, 0];
      let others = 0;
      for (let i = 0; i < 100; i++) {
        let tileFace = service.getTile(Tile.NUMBER).face;
        let tileFaceValue = Number(tileFace);
        if (tileFaceValue <= level) {
          vals[tileFaceValue]++;
        } else {
          others++;
        }
      }
      expect(others).toBe(0);
      for (let v = 0; v <= level; v++) {
        expect(vals[v]).toBeGreaterThan(0);
      }
    }));

});
