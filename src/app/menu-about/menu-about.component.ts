import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal';
import { I18nDirective, I18nService } from 'ng2-i18next/ng2-i18next';

@Component({
  moduleId: module.id,
  selector: 'app-menu-about',
  templateUrl: 'menu-about.component.html',
  styleUrls: ['menu-about.component.css'],
  directives: [I18nDirective, Modal],
  providers: [I18nService]
})
export class MenuAboutComponent implements OnInit {

  constructor(private i18n: I18nService) {}

  ngOnInit() {
  }

}
