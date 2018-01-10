import {Sector} from './Sector';

export class Map{
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.sectors = [];
    this.initialize();
  }
  initialize(){
    for(let y=0;y<=this.height;y++){
      this.sectors[y]=[];
      for(let x=0;x<=this.width;x++){
        this.sectors[y][x]=new Sector();
      } //end for
    } //end for
  }
  loc(x,y){ return this.getSector(x,y).loc; }
  setLoc(x,y,locNumber){ this.getSector(x,y).loc = locNumber; }
  setRoom(x,y,roomNumber){ this.getSector(x,y).roomNumber = roomNumber; }
  getSector(x,y){ return this.sectors[y][x]; }
  isWalkable(x,y){ return this.getSector(x,y).isWalkable(); }
  isEmpty(x,y){ return this.getSector(x,y).isEmpty(); }
  setEmpty(x,y){ this.getSector(x,y).setEmpty(); }
  isFloor(x,y){ return this.getSector(x,y).isFloor(); }
  setFloor(x,y){ this.getSector(x,y).setFloor(); }
  isWall(x,y){ return this.getSector(x,y).isWall(); }
  setWall(x,y){ this.getSector(x,y).setWall(); }
  isDoor(x,y){ return this.getSector(x,y).isDoor(); }
  setDoor(x,y){ this.getSector(x,y).setDoor(); }
  isCorridor(x,y){ return this.getSector(x,y).isCorridor(); }
  setCorridor(x,y){ this.getSector(x,y).setCorridor(); }
  isWater(x,y){ return this.getSector(x,y).isWater(); }
  setWater(x,y){ this.getSector(x,y).setWater(); }
  isError(x,y){ return this.getSector(x,y).isError(); }
  setError(x,y){ this.getSector(x,y).setError(); }
}
