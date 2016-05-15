import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  /** TRUE if a demo has to be run at startup */
  static PLAY_DEMO = 'arithmetis-play-demo';

  constructor() { }

  getPlayDemo(): boolean {
    let ret = localStorage.getItem(PreferencesService.PLAY_DEMO);
    if (ret == null) {
      return true; // default
    }
    return ret == '1';
  }

  setPlayDemo(val: boolean): void {
    localStorage.setItem(PreferencesService.PLAY_DEMO, val ? '1' : '0');
  }
}
