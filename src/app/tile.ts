export class Tile {
  static NUMBER: number = 1;
  static OPERATOR: number = 2;
  static EQUAL: number = 3;

  public type: number;
  public face: string;

  constructor(type: number, face: string) {
    this.type = type;
    this.face = face;
  }
}
