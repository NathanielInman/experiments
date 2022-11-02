import { r } from './randomNumber';

export class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.speed = r(0.1, 1);
  }

  move () {
    this.y += this.speed;
    if (this.y > window.v.h - 10) this.y = 1;
  }
}
