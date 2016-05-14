import { Injectable } from '@angular/core';

@Injectable()
export class ChronoService {

  private startTime: number;

  constructor() { }

  public start(): void {
    this.startTime = Math.floor(new Date().getTime() / 1000);
  }

  public get(): number {
    if (this.startTime == null) {
      return 0;
    }
    return Math.floor(new Date().getTime() / 1000) - this.startTime;
  }
}
