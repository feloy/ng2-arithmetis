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
import { MenuAboutComponent } from './menu-about.component';

describe('Component: MenuAbout', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MenuAboutComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MenuAboutComponent],
      (component: MenuAboutComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MenuAboutComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MenuAboutComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-menu-about></app-menu-about>
  `,
  directives: [MenuAboutComponent]
})
class MenuAboutComponentTestController {
}

