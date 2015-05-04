import { Point } from 'engine/object-model/Point';

class VEdge{
  constructor(s,a,b){
    this.left = a;
    this.right = b;
    this.start = s;
    this.end = null;
    this.f = (b.x - a.x) / (a.y - b.y);
    this.g = s.y - this.f*s.x;
    this.direction = new Point(b.y - a.y, -(b.x - a.x));
    this.B = new Point(s.x + this.direction.x, s.y + this.direction.y);
    this.intersected = false;
    this.iCounted = false;
    this.neighbour = null;
  }
}
