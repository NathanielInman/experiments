export class Sector{
  constructor({x=0,y=0}={}){
    this.x = x;
    this.y = y;
    this.type = 'empty';
    this.roomNumber = 0;
  }
  isEmpty(){ return this.type === 'empty'; }
  setEmpty(){ this.type = 'empty'; }
  isFloor(){ return this.type === 'floor'; }
  setFloor(){ this.type = 'floor'; }
  isWater(){ return this.type === 'water' || this.type === 'waterSpecial'; }
  setWater(){ this.type = 'water'; }
  isWaterSpecial(){ return this.type === 'waterSpecial'; }
  setWaterSpecial(){ this.type = 'waterSpecial'; }
  isWall(){ return this.type === 'wall'; }
  setWall(){ this.type = 'wall'; }
  isCorridor(){ return this.type === 'corridor'; }
  setCorridor(){ this.type = 'corridor'; }
  isDoor(){ return this.type === 'door'; }
  setDoor(){ this.type = 'door'; }
  isRemoved(){ return this.type === 'removed'; }
  setRemoved(){ this.type = 'removed'; }
  isObstruction(){ return this.type === 'obstruction'; }
  setObstruction(){ this.type = 'obstruction'; }
  isWalkableOrEmpty(){
    let result = false;

    result = this.isWalkable();
    if(this.isEmpty()) result = true;
    return result;
  }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isCorridor()) walkable = true;
    if(this.isDoor()) walkable = true;
    if(this.isWater()) walkable = true;
    return walkable;
  }
}
