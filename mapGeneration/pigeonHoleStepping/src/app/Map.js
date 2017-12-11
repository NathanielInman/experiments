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
  getSector(x,y){ return this.sectors[y][x]; }
  isEmpty(x,y){ return this.getSector(x,y).isEmpty(); }
  setEmpty(x,y){ this.getSector(x,y).setEmpty(); }
  isFloor(x,y){ return this.getSector(x,y).isFloor(); }
  setFloor(x,y){ this.getSector(x,y).setFloor(); }
  isWall(x,y){ return this.getSector(x,y).isWall(); }
  setWall(x,y){ this.getSector(x,y).setWall(); }
  isCorridor(x,y){ return this.getSector(x,y).isCorridor(); }
  setCorridor(x,y){ this.getSector(x,y).setCorridor(); }
  isDoor(x,y){ return this.getSector(x,y).isDoor(); }
  setDoor(x,y){ this.getSector(x,y).setDoor(); }
  isRemoved(x,y){ return this.getSector(x,y).isRemoved(); }
  setRemoved(x,y){ this.getSector(x,y).setRemoved(); }
  isWalkable(x,y){ return this.getSector(x,y).isWalkable(); }
  isRoom(x,y){ return this.getSector(x,y).roomNumber>0; }
  setRoom(x,y,num){ this.getSector(x,y).roomNum = num; }
  getRoom(x,y){ return this.getSector(x,y).roomNumber; }
  isSameRoom(x1,y1,x2,y2){
    return this.getSector(x1,y1).roomNum===this.getSector(x2,y2).roomNum;
  }
}
