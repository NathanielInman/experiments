import { Mrpas } from 'mrpas';

export class Player {
  constructor (map, easel) {
    this.map = map;
    this.easel = easel;
    this.sight = 7;
    this.visible = [];
    this.state = 'free';
    this.initialize();
    this.setKeybindings();
  }

  initialize () {
    do {
      this.x = Math.floor(Math.random() * this.map.width);
      this.y = Math.floor(Math.random() * this.map.height);
    } while (!this.map.isWalkable(this.x, this.y));
    this.fov = new Mrpas(this.map.width, this.map.height, (x, y) => {
      return this.map.isWalkable(x, y);
    });
    this.setVisible();
  }

  setKeybindings () {
    // eslint-disable-next-line complexity
    document.addEventListener('keydown', event => {
      const keyName = event.key;

      if (keyName === 'a' || keyName === 'h' || keyName === 'ArrowLeft') {
        if (this.state === 'free' && this.move('west')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x - 1, this.y)) {
            this.map.setDoorOpen(this.x - 1, this.y);
          } else if (this.map.isDoorOpen(this.x - 1, this.y)) {
            this.map.setDoorClosed(this.x - 1, this.y);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'x' || keyName === 'j' || keyName === 'ArrowDown') {
        if (this.state === 'free' && this.move('south')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x, this.y + 1)) {
            this.map.setDoorOpen(this.x, this.y + 1);
          } else if (this.map.isDoorOpen(this.x, this.y + 1)) {
            this.map.setDoorClosed(this.x, this.y + 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'w' || keyName === 'k' || keyName === 'ArrowUp') {
        if (this.state === 'free' && this.move('north')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x, this.y - 1)) {
            this.map.setDoorOpen(this.x, this.y - 1);
          } else if (this.map.isDoorOpen(this.x, this.y - 1)) {
            this.map.setDoorClosed(this.x, this.y - 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'd' || keyName === 'l' || keyName === 'ArrowRight') {
        if (this.state === 'free' && this.move('east')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x + 1, this.y)) {
            this.map.setDoorOpen(this.x + 1, this.y);
          } else if (this.map.isDoorOpen(this.x + 1, this.y)) {
            this.map.setDoorClosed(this.x + 1, this.y);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'q' || keyName === 'y') {
        if (this.state === 'free' && this.move('northwest')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x - 1, this.y - 1)) {
            this.map.setDoorOpen(this.x - 1, this.y - 1);
          } else if (this.map.isDoorOpen(this.x - 1, this.y - 1)) {
            this.map.setDoorClosed(this.x - 1, this.y - 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'e' || keyName === 'u') {
        if (this.state === 'free' && this.move('northeast')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x + 1, this.y - 1)) {
            this.map.setDoorOpen(this.x + 1, this.y - 1);
          } else if (this.map.isDoorOpen(this.x + 1, this.y - 1)) {
            this.map.setDoorClosed(this.x + 1, this.y - 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'z' || keyName === 'b') {
        if (this.state === 'free' && this.move('southwest')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x - 1, this.y + 1)) {
            this.map.setDoorOpen(this.x - 1, this.y + 1);
          } else if (this.map.isDoorOpen(this.x - 1, this.y + 1)) {
            this.map.setDoorClosed(this.x - 1, this.y + 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'c' || keyName === 'n') {
        if (this.state === 'free' && this.move('southeast')) {
          this.easel.redraw();
        } else if (this.state === 'door') {
          this.unsetVisible();
          if (this.map.isDoorClosed(this.x + 1, this.y + 1)) {
            this.map.setDoorOpen(this.x + 1, this.y + 1);
          } else if (this.map.isDoorOpen(this.x + 1, this.y + 1)) {
            this.map.setDoorClosed(this.x + 1, this.y + 1);
          } // end if
          this.setVisible();
          this.easel.redraw();
          this.state = 'free';
        } // end if
      } else if (keyName === 'o') {
        this.state = 'door';
      }// end if
    });
  }

  // we have to turn off visible sectors before moving to new sectors
  // so the light moves with us
  unsetVisible () {
    this.visible.forEach(s => this.map.unsetVisible(s.x, s.y));
    this.visible.length = 0;
  }

  // this sets sectors as visible if they are walkable
  setVisible () {
    this.fov.compute(this.x, this.y, this.sight, (x, y) => {
      return this.map.isVisible(x, y);
    }, (x, y) => {
      this.map.setVisible(x, y);
      this.visible.push({ x, y });
    });
  }

  // eslint-disable-next-line complexity
  move (direction) {
    let result = false;

    if (direction === 'north' && this.map.isWalkable(this.x, this.y - 1)) {
      this.unsetVisible(); this.y -= 1; this.setVisible();
      result = true;
    } else if (direction === 'north' && this.map.isDoorClosed(this.x, this.y - 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x, this.y - 1); this.setVisible();
      result = true;
    } else if (direction === 'east' && this.map.isWalkable(this.x + 1, this.y)) {
      this.unsetVisible(); this.x += 1; this.setVisible();
      result = true;
    } else if (direction === 'east' && this.map.isDoorClosed(this.x + 1, this.y)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x + 1, this.y); this.setVisible();
      result = true;
    } else if (direction === 'west' && this.map.isWalkable(this.x - 1, this.y)) {
      this.unsetVisible(); this.x -= 1; this.setVisible();
      result = true;
    } else if (direction === 'west' && this.map.isDoorClosed(this.x - 1, this.y)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x - 1, this.y); this.setVisible();
      result = true;
    } else if (direction === 'south' && this.map.isWalkable(this.x, this.y + 1)) {
      this.unsetVisible(); this.y += 1; this.setVisible();
      result = true;
    } else if (direction === 'south' && this.map.isDoorClosed(this.x, this.y + 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x, this.y + 1); this.setVisible();
      result = true;
    } else if (direction === 'northwest' && this.map.isWalkable(this.x - 1, this.y - 1)) {
      this.unsetVisible(); this.x -= 1; this.y -= 1; this.setVisible();
      result = true;
    } else if (direction === 'northwest' && this.map.isDoorClosed(this.x - 1, this.y - 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x - 1, this.y - 1); this.setVisible();
      result = true;
    } else if (direction === 'northeast' && this.map.isWalkable(this.x + 1, this.y - 1)) {
      this.unsetVisible(); this.x += 1; this.y -= 1; this.setVisible();
      result = true;
    } else if (direction === 'northeast' && this.map.isDoorClosed(this.x + 1, this.y - 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x + 1, this.y - 1); this.setVisible();
      result = true;
    } else if (direction === 'southwest' && this.map.isWalkable(this.x - 1, this.y + 1)) {
      this.unsetVisible(); this.x -= 1; this.y += 1; this.setVisible();
      result = true;
    } else if (direction === 'southwest' && this.map.isDoorClosed(this.x - 1, this.y + 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x - 1, this.y + 1); this.setVisible();
      result = true;
    } else if (direction === 'southeast' && this.map.isWalkable(this.x + 1, this.y + 1)) {
      this.unsetVisible(); this.x += 1; this.y += 1; this.setVisible();
      result = true;
    } else if (direction === 'southeast' && this.map.isDoorClosed(this.x + 1, this.y + 1)) {
      this.unsetVisible(); this.map.setDoorOpen(this.x + 1, this.y + 1); this.setVisible();
      result = true;
    } // end if
    return result;
  }
}
