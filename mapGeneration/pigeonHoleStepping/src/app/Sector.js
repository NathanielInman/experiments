export class Sector{
  constructor(){
    this.type = 0;
    this.roomNumber = 0;
  }
  isEmpty(){ return this.type === 0; }
  setEmpty(){ this.type = 0; }
  isFloor(){ return this.type === 1; }
  setFloor(){ this.type = 1; }
  isWall(){ return this.type === 2; }
  setWall(){ this.type = 2; }
  isCorridor(){ return this.type ===3; }
  setCorridor(){ this.type = 3; }
  isDoor(){ return this.type === 4; }
  setDoor(){ this.type = 4; }
  isRemoved(){ return this.type === 5; }
  setRemoved(){ this.type = 5; }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isCorridor()) walkable = true;
    if(this.isDoor()) walkable = true;
    return walkable;
  }
}
