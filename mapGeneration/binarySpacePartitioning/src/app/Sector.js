const VOID = 0,
      FLOOR = 1,
      WALL = 2,
      DOOR = 3,
      OTHER = 4;

export class Sector{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.type=VOID;
  }
  isFloor(){ return this.type===FLOOR }
  isWall(){ return this.type===WALL }
  isEmpty(){ return this.type===VOID }
  isDoor(){ return this.type===DOOR }
  isOther(){ return this.type===OTHER }
  setFloor(){
    this.type=FLOOR;
  }
  setWall(){
    this.type=WALL;
  }
  setEmpty(){
    this.type=VOID;
  }
  setDoor(){
    this.type=DOOR;
  }
  setOther(){
    this.type=OTHER;
  }
}

