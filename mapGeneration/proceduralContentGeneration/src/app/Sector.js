export class Sector{
  constructor(){
    this.type = 0;
  }
  isEmpty(){ return this.type===0; }
  setEmpty(){ this.type = 0; }
  isFloor(){ return this.type===1; }
  setFloor(){ this.type = 1; }
  isWall(){ return this.type===2; }
  setWall(){ this.type = 2; }
  isDoor(){ return this.type===3; }
  setDoor(){ this.type = 3; }
  isCorridor(){ return this.type===4; }
  setCorridor(){ this.type=4; }
  isWater(){ return this.type===5; }
  setWater(){ this.type=5; }
  isError(){ return this.type===6; }
  setError(){ this.type=6; }
}

