export class Sector{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.floor=0;
    this.wall=0;
  }
  isFloor(){
    return !this.wall&&this.floor;
  }
  isWall(){
    return this.wall&&this.floor;
  }
  isEmpty(){
    return !this.wall&&!this.floor;
  }
  setFloor(){
    this.floor=1;
    this.wall=0;
  }
  setWall(){
    this.wall=1;
    this.floor=1;
  }
  setEmpty(){
    this.wall=0;
    this.floor=0;
  }
  setActive(){
    this.active=1;
  }
}
