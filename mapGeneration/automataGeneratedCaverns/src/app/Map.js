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
  type(x,y){ return this.getSector(x,y).type; }
  loc(x,y){ return this.getSector(x,y).loc; }
  setLoc(x,y,loc){ this.getSector(x,y).loc = loc; }
  isEmpty(x,y){ return this.getSector(x,y).isEmpty(); }
  setEmpty(x,y){ return this.getSector(x,y).setEmpty(); }
  isFloor(x,y){ return this.getSector(x,y).isFloor(); }
  setFloor(x,y){ return this.getSector(x,y).setFloor(); }
  isWall(x,y){ return this.getSector(x,y).isWall(); }
  setWall(x,y){ return this.getSector(x,y).setWall(); }
  isRemoved(x,y){ return this.getSector(x,y).isRemoved(); }
  setRemoved(x,y){ return this.getSector(x,y).setRemoved(); }
}
