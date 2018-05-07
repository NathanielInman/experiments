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
  setRoom(x,y,num){ this.getSector(x,y).roomNumber = num; }
  getRoom(x,y){ return this.getSector(x,y).roomNumber; }
  isSameRoom(x1,y1,x2,y2){
    return this.getSector(x1,y1).roomNumber===this.getSector(x2,y2).roomNumber;
  }

  // uses bresenhams line algorithm to check if all points A(x1,y1) and B(x2,y2)
  // are empty and on the map
  isPathFree(x1,y1,x2,y2){
    let result = true,
        dx = Math.abs(x2-x1), dy = Math.abs(y2-y1),
        sx = x1<x2?1:-1, sy = y1<y2?1:-1,
        err = dx-dy, err2; //difference and difference*2

    while(!(x1===x2&&y1===y2)){
      err2 = 2*err;
      if(err2>-dy){ err-=dy; x1+=sx; } //eslint-disable-line no-param-reassign
      if(err2<dx){ err+=dx; y1+=sy; } //eslint-disable-line no-param-reassign
      if(x1<=1||x1>=this.width-1||y1<=1||y1>=this.height-2||!this.isEmpty(x1,y1)){
        result = false;
        break; //no need to continue, it fails
      }
    }
    return result;
  }

  // uses bresenhams line algorithm to set all points between A(x1,y1) and
  // B(2,y2) to a floor
  setPathFloor(x1,y1,x2,y2){
    let dx = Math.abs(x2-x1), dy = Math.abs(y2-y1),
        sx = x1<x2?1:-1, sy = y1<y2?1:-1,
        err = dx-dy, err2; //difference and difference*2

    while(!(x1===x2&&y1===y2)){
      err2 = 2*err;
      if(err2>-dy){ err-=dy; x1+=sx; } //eslint-disable-line no-param-reassign
      if(err2<dx){ err+=dx; y1+=sy; } //eslint-disable-line no-param-reassign
      if(x1<=1||x1>=thiswidth-1||y1<=1||y1>=this.height-2||!this.isEmpty(x1,y1)){
        result = false;
        break; //no need to continue, it fails
      }
    }
  }
}

