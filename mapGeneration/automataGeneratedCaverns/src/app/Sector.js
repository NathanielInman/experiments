export class Sector{
  constructor(){
    this.type = 0;
    this.loc = 0;
  }
  isEmpty(){ return this.type === 0; }
  setEmpty(){ this.type = 0; }
  isFloor(){ return this.type === 1; }
  setFloor(){ this.type = 1; }
  isWall(){ return this.type === 2; }
  setWall(){ this.type = 2; }
  isRemoved(){ return this.type === 3; }
  setRemoved(){ this.type = 3; }
}
