import { r } from './randomNumber';

export class VEvent {
  constructor (p, pe) {
    this.point = p;
    this.pe = pe;
    this.y = p.y;
    this.key = r(100000000);
    this.arch = null;
    this.value = 0;
  }

  compare (other) {
    return ((this.y > other.y) ? 1 : -1);
  }
}
