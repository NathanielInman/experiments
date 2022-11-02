import { Sector } from './Sector';

export class Map {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.sectors = [];
    this.initialize();
  }

  initialize () {
    for (let y = 0; y < this.height; y++) {
      this.sectors[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.sectors[y][x] = new Sector(x, y);
      } // end for
    } // end for
  }

  getSector (x, y) { return this.sectors[y][x]; }
  setDepth (x, y, depth) { this.getSector(x, y).depth = depth; }
}
