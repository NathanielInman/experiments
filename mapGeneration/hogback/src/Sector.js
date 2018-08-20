export class Sector{
  constructor({x=0,y=0,type='empty',roomNumber=0}={}){
    this.x = x;
    this.y = y;
    this.type = type;
    this.roomNumber = roomNumber;
  }
  clone(){
    return new Sector({
      x: this.x,
      y: this.y,
      type: this.type,
      roomNumber: this.roomNumber
    });
  }
  isEmpty(){
    return this.type === 'empty';
  }
  setEmpty(){
    this.type = 'empty';
  }
  isRemoved(){
    return this.type === 'removed';
  }
  setRemoved(){
    this.type = 'removed';
  }
  isDoor(){
    return this.type === 'door';
  }
  setDoor(){
    this.type = 'door';
  }
  isFloor(){
    return this.type === 'floor' || this.type === 'floorSpecial';
  }
  setFloor(){
    this.type = 'floor';
  }
  isFloorSpecial(){
    return this.type === 'floorSpecial';
  }
  setFloorSpecial(){
    this.type = 'floorSpecial';
  }
  isWater(){
    return this.type === 'water' || this.type === 'waterSpecial';
  }
  setWater(){
    this.type = 'water';
  }
  isWaterSpecial(){
    return this.type === 'waterSpecial';
  }
  setWaterSpecial(){
    this.type = 'waterSpecial';
  }
  isWall(){
    return this.type === 'wall' || this.type === 'wallSpecial';
  }
  setWall(){
    this.type = 'wall';
  }
  isWallSpecial(){
    return this.type === 'wallSpecial';
  }
  setWallSpecial(){
    this.type = 'wallSpecial';
  }
  isWalkableOrEmpty(){
    let result = false;

    result = this.isWalkable();
    if(this.isEmpty()) result = true;
    return result;
  }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isFloorSpecial()) walkable = true;
    if(this.isDoor()) walkable = true;
    if(this.isWater()) walkable = true;
    return walkable;
  }
}
