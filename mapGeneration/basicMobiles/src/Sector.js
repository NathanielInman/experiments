import {r} from './randomNumber';

/**
 * A sector is a individual location marker on a
 * map. In this example we have either a floor or
 * ground, and sometimes a wall on either
 */
export class Sector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.wall = r(1) < 0.25 ? '#3' + r(3, 5, 1) + '3' : 0;
    this.floor = r(1) < 0.90 ? '#3' + r(5, 9, 1) + '3' : '#131';
    this.water = r(1) < 0.15 ? '#33' + r(5, 9, 1) : 0;
    this.occupied = 0; // holds a mobile object
  }
}
