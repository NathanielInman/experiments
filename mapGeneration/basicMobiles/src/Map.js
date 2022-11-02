import { Easel } from '@ion-cloud/core';
import { Actor } from './Actor';
import { Sector } from './Sector';

const easel = new Easel();
const { ctx, viewport: v } = easel;

export class Map {
  constructor () {
    this.width = 30;
    this.height = 25;
    this.sector = [];
    this.actors = [];
  }

  generate () {
    let i, j;
    for (i = 0; i < this.width; i++) {
      this.sector[i] = [];
      for (j = 0; j < this.height; j++) {
        this.sector[i][j] = new Sector(i, j);
      } // end for
    } // end for
    for (i = 0; i < 8; i++) this.actors.push(new Actor(this));
  }

  walkable (x, y) {
    return !this.sector[x][y].water && !this.sector[x][y].wall;
  }

  occupy (mobile) {
    this.sector[mobile.x][mobile.y].occupied = mobile;
  }

  unoccupy (mobile) {
    this.sector[mobile.x][mobile.y].occupied = false;
  }

  tick () {
    this.actors.forEach((actor) => actor.move());
    this.draw();
    setTimeout(() => this.tick(), 16);
  }

  draw () {
    let i; let j; // i == x, j == y
    const w = this.width; const h = this.height; // shorten names
    let sector; // shorten sector name reference

    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        sector = this.sector[i][j]; // make sector easier to write
        ctx.fillStyle = sector.water ? sector.water : sector.floor;
        ctx.fillRect(i * v.w / w, j * v.h / h, v.w / w + 1, v.h / h + 1);
        if (sector.wall || sector.occupied) {
          ctx.fillStyle = sector.occupied ? '#F00' : sector.wall;
          ctx.fillRect(i * v.w / w + v.w / w * 0.1, j * v.h / h + v.h / h * 0.1, v.w / w * 0.8, v.h / h * 0.8);
        } // end if
      } // end for
    } // end for
  }

  initialize () {
    this.generate();
    this.tick();
  }
}
