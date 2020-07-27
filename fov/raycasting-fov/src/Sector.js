export class Sector{
  constructor({x,y}){
    this.type = 0;
    this.x = x;
    this.y = y;
  }
  isEmpty(){ return this.type === 0; }
  setEmpty(){ return this.type = 0; }
  isFloor(){ return this.type === 1; }
  setFloor(){ return this.type = 1; }
  isWall(){ return this.type === 2; }
  setWall(){ return this.type = 2; }
  isWindow(){ return this.type === 3; }
  setWindow(){ return this.type = 3; }
  isWalkable(){ return this.isFloor()||this.isEmpty(); }
  isDoorClosed(){ return false; }
}
