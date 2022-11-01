import { Sector } from './Sector';

export class Map {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.sectors = [];
    this.initialize();
  }

  initialize () {
    for (let y = 0; y <= this.height; y++) {
      this.sectors[y] = [];
      for (let x = 0; x <= this.width; x++) {
        this.sectors[y][x] = new Sector();
      } // end for
    } // end for
  }

  reset () {
    for (let y = 0; y <= this.height; y++) {
      for (let x = 0; x <= this.width; x++) {
        this.sectors[y][x].setEmpty();
      } // end for
    } // end for
  }

  getSector (x, y) { return this.sectors[y][x]; }
  isEmpty (x, y) { return this.getSector(x, y).isEmpty(); }
  setEmpty (x, y) { this.getSector(x, y).setEmpty(); }
  isFloor (x, y) { return this.getSector(x, y).isFloor(); }
  setFloor (x, y) { this.getSector(x, y).setFloor(); }
  isWall (x, y) { return this.getSector(x, y).isWall(); }
  setWall (x, y) { this.getSector(x, y).setWall(); }
  isCorridor (x, y) { return this.getSector(x, y).isCorridor(); }
  setCorridor (x, y) { this.getSector(x, y).setCorridor(); }
  isDoor (x, y) { return this.getSector(x, y).isDoor(); }
  setDoor (x, y) { this.getSector(x, y).setDoor(); }
  isRemoved (x, y) { return this.getSector(x, y).isRemoved(); }
  setRemoved (x, y) { this.getSector(x, y).setRemoved(); }
  isWalkable (x, y) { return this.getSector(x, y).isWalkable(); }
  isRoom (x, y) { return this.getSector(x, y).roomNumber > 0; }
  setRoom (x, y, num) { this.getSector(x, y).roomNumber = num; }
  getRoom (x, y) { return this.getSector(x, y).roomNumber; }
  isSameRoom (x1, y1, x2, y2) {
    return this.getSector(x1, y1).roomNumber === this.getSector(x2, y2).roomNumber;
  }

  // uses bresenhams line algorithm to acquire an array of points
  // inclusively between A(x1,y1) and B(x2,y2)
  getPath (x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1); const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1; const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy; let err2; // difference and difference*2
    const path = [{ x: x1, y: y1 }];

    while (!(x1 === x2 && y1 === y2)) {
      err2 = 2 * err;
      if (err2 > -dy) { err -= dy; x1 += sx; } // eslint-disable-line no-param-reassign
      if (err2 < dx) { err += dx; y1 += sy; } // eslint-disable-line no-param-reassign
      if (x1 <= 1 || x1 > this.width - 2 || y1 <= 1 || y1 > this.height - 2) {
        path.length = 0;
        break; // no need to continue, it fails
      } else {
        path.push({ x: x1, y: y1 });
      } // end if
    } // end while()
    return path;
  }

  isPathEmpty (path) {
    let result = true;

    if (!path.length) {
      result = false;
    } else if (!path.slice(1, path.length).every(p => this.isEmpty(p.x, p.y))) {
      result = false;
    } // end if
    return result;
  }

  isSquareEmpty (x1, y1, x2, y2) {
    const dx = x1 < x2 ? 1 : -1; const dy = y1 < y2 ? 1 : -1;

    for (let y = y1; y !== y2 + dy; y += dy) {
      for (let x = x1; x !== x2 + dx; x += dx) {
        if (x < 1 || x > this.width - 1 || y < 1 || y >= this.height - 1 || !this.isEmpty(x, y)) {
          return false; // exit early
        } // end if
      } // end for
    } // end for
    return true;
  }

  fillRoom (x1, y1, x2, y2) {
    const dx = x1 < x2 ? 1 : -1; const dy = y1 < y2 ? 1 : -1;

    for (let y = y1; y !== y2 + dy; y += dy) {
      for (let x = x1; x !== x2 + dx; x += dx) {
        if (x < 1 || x > this.width - 1 || y < 1 || y > this.height - 1 || !this.isEmpty(x, y)) {
          return; // exit early
        } else if (y === y1 || y === y2 || x === x1 || x === x2) {
          this.setWall(x, y);
        } else {
          this.setFloor(x, y);
        } // end if
      } // end for
    } // end for
  }
}
