import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  public static BEEP = 'assets/snd/beep.mp3';
  public static DONE = 'assets/snd/done.mp3';
  public static LEVEL_A = 'assets/snd/level_a.mp3';
  public static LEVEL_C = 'assets/snd/level_c.mp3';
  public static LEVEL_D = 'assets/snd/level_d.mp3';
  public static LEVEL_E = 'assets/snd/level_e.mp3';
  public static LEVEL_F = 'assets/snd/level_f.mp3';
  public static LEVEL_G = 'assets/snd/level_g.mp3';

  private levels: Array<string> = [
    AudioService.LEVEL_A,
    AudioService.LEVEL_C,
    AudioService.LEVEL_D,
    AudioService.LEVEL_E,
    AudioService.LEVEL_F,
    AudioService.LEVEL_G
  ];

  constructor() { }

  public playDone(n: number) {
    if (n == 0) {
      return;
    }
    this.play(AudioService.DONE);
  }

  public playBeep() {
    this.play(AudioService.BEEP);
  }

  public playLevel(level: number) {
    this.play(this.levels[level % (this.levels.length)]);
  }

  private play(snd: string) {
    var audio = new Audio(snd);
    audio.play();
  }

}
