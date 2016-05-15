import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MenuLeaderboardsComponent } from './menu-leaderboards.component';

describe('Component: MenuLeaderboards', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MenuLeaderboardsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MenuLeaderboardsComponent],
      (component: MenuLeaderboardsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MenuLeaderboardsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MenuLeaderboardsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-menu-leaderboards></app-menu-leaderboards>
  `,
  directives: [MenuLeaderboardsComponent]
})
class MenuLeaderboardsComponentTestController {
}

