import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ArithmetisAppComponent } from '../app/arithmetis.component';

beforeEachProviders(() => [ArithmetisAppComponent]);

describe('App: Arithmetis', () => {
  it('should create the app',
      inject([ArithmetisAppComponent], (app: ArithmetisAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'arithmetis works!\'',
      inject([ArithmetisAppComponent], (app: ArithmetisAppComponent) => {
    expect(app.title).toEqual('arithmetis works!');
  }));
});
