import {Point} from './Point';

// Each sector is a location that the player can be at one time.
// If they make any movements they leave that sector. They are dictated
// by the Point class where z is the current depth or level, then y and x
// to locate them on their perspective map. Sectors can contain multiple
// items but only one occupied flag, so no two actors can share the same
// sector.
export class Sector{
  constructor(x,y,z,map){
    if(x!==undefined&&y!==undefined&&z!==undefined){
      this.location = new Point(z,y,x); //used for reverse look-up
    }else{
      this.location = new Point(-1,-1,-1); //off-map
      this.mock = true;
    } //end if
    this.map=map||{
      environment:{
        color:{
          value:'rgba(0,0,0,0)',
          strength:0.3
        }
      }
    };
    this.setVoid();
  }
  isOccupied(){
    return this.occupied;
  }
  isWalkable(){
    let walkable = true;

    if(this.isWall()) walkable = false;
    if(this.isVoid()) walkable = false;
    return walkable&&!this.isOccupied();
  }
  isRoom(){
    return this.room!==null;
  }
  setRoom(id){
    this.setFloor();
    this.room = id;
  }
  getRoom(){
    return this.room;
  }
  isVoid(){
    return this.floor&&this.floor.name==='empty'&&
           this.wall&&this.wall.name==='empty';
  }
  setVoid(){
    this.occupied=false; //indicates whether or not this sector is occupied
    this.viewed=0; //indicates whether or not this sector has been viewed before
    this.environment=this.map.environment; //reference the maps environment
    this.items=[]; //an array of the items the sector contains
    this.floor={name:'empty'}; //make empty
    this.wall={name:'empty'}; //make empty
    this.room= null; //holds the room id that the sector is attributed to
    this.spawns=-1; //indicates what type of spawning location it is
    this.door=null; //if it's true then it's a door
    this.locationId=null;
  }
  getLocation(){
    return this.locationId;
  }
  setLocation(id){
    this.locationId = id;
  }
  isFloor(){
    return this.floor&&this.floor.name!=='empty';
  }
  setFloor(){
    /*
    let floors = this.map.world.engine.floors,
        list = this.environment.floors,
        index = list[r(0,list.length,1)];

    this.clearWall();
    this.floor = floors.find(floor=> floor.name===index);
    this.corridor = false;*/
    this.clearWall();
    this.floor = {name: 'default'};
    this.corridor = false;
  }
  clearFloor(){
    this.floor={name:'empty'}; //make empty
    this.room=null;
  }
  isWall(){
    return this.wall&&this.wall.name!=='empty';
  }
  setWall(){
    /*let walls = this.map.world.engine.walls,
        list = this.environment.walls,
        index = list[r(0,list.length,1)];

    this.clearFloor();
    this.wall = walls.find(wall=> wall.name===index);*/
    this.clearFloor();
    this.wall={name: 'default'};
  }
  clearWall(){
    this.wall={name:'empty'}; //make empty
  }
  isCorridor(){
    return this.isFloor()&&this.corridor;
  }
  setCorridor(){
    this.setFloor();
    this.corridor = true;
  }
  isWater(){
    return this.floor&&this.floor.name==='water'||
           this.floor&&this.floor.name==='lava';
  }
  setWater(){
    /*let floors = this.map.world.engine.floors,
        list = this.environment.floors,
        index = 'water';

    this.floor = floors.find(floor=> floor.name===index);*/
    this.floor = {name: 'water'};
  }
  isDoor(){
    return this.isFloor()&&this.door;
  }
  setDoor(){
    this.setFloor();
    this.clearWall();
    this.door = true;
  }
  isPortal(){
    return this.floor&&this.floor.name==='portal';
  }
  setPortal(){
    this.floor = {
      name: 'portal',
      character: '>',
      background: '#000',
      color: '#FFF'
    };
  }
}

