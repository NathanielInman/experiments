import {Sector} from './Sector';
import Heap from 'collections/heap';

export class Map{
  constructor({width=50,height=50}){
    this.width = width;
    this.height = height;
    this.sectors = [];
    this.initialize();
  }
  initialize(){
    for(let y=0;y<=this.height;y++){
      this.sectors[y]=[];
      for(let x=0;x<=this.width;x++){
        this.sectors[y][x]=new Sector({x,y});
      } //end for
    } //end for
  }
  reset(){
    this.sectors.forEach(row=>{
      row.forEach(sector=> sector.setEmpty());
    });
  }
  getSector({x=0,y=0}={}){
    return this.sectors[y][x];
  }
  isEmpty({x=0,y=0}={}){
    return this.inBounds({x,y})&&
      this.getSector({x,y}).isEmpty();
  }
  setEmpty({x=0,y=0}={}){
    this.getSector({x,y}).setEmpty();
  }
  isFloor({x=0,y=0}={}){
    return this.getSector({x,y}).isFloor();
  }
  setFloor({x=0,y=0}={}){
    this.getSector({x,y}).setFloor();
  }
  isFloorSpecial({x=0,y=0}={}){
    return this.getSector({x,y}).isFloorSpecial();
  }
  setFloorSpecial({x=0,y=0}={}){
    this.getSector({x,y}).setFloorSpecial();
  }
  isWall({x=0,y=0}={}){
    return this.getSector({x,y}).isWall();
  }
  setWall({x=0,y=0}={}){
    this.getSector({x,y}).setWall();
  }
  isWallSpecial({x=0,y=0}={}){
    return this.getSector({x,y}).isWallSpecial();
  }
  setWallSpecial({x=0,y=0}={}){
    this.getSector({x,y}).setWallSpecial();
  }
  isWater({x=0,y=0}={}){
    return this.getSector({x,y}).isWater();
  }
  setWater({x=0,y=0}={}){
    this.getSector({x,y}).setWater();
  }
  isWaterSpecial({x=0,y=0}){
    return this.getSector({x,y}).isWaterSpecial();
  }
  setWaterSpecial({x=0,y=0}={}){
    this.getSector({x,y}).setWaterSpecial();
  }
  isDoor({x=0,y=0}={}){
    return this.getSector({x,y}).isDoor();
  }
  setDoor({x=0,y=0}={}){
    this.getSector({x,y}).setDoor();
  }
  isRemoved({x=0,y=0}={}){
    return this.getSector({x,y}).isRemoved();
  }
  setRemoved({x=0,y=0}={}){
    this.getSector({x,y}).setRemoved();
  }
  isWalkable({x=0,y=0}={}){
    return this.getSector({x,y}).isWalkable();
  }
  isWalkableOrEmpty({x=0,y=0}={}){
    return this.getSector({x,y}).isWalkableOrEmpty();
  }
  isRoom({x=0,y=0}={}){
    return this.getSector({x,y}).id>0;
  }
  setRoom({x=0,y=0,id=0}={}){
    this.getSector({x,y}).roomNumber = id;
  }
  getRoom({x=0,y=0}={}){
    return this.getSector({x,y}).roomNumber;
  }
  isSameRoom({x1=0,y1=0,x2=0,y2=0}={}){
    return this.getSector({x: x1,y: y1}).roomNumber===
      this.getSector({x: x2,y: y2}).roomNumber;
  }
  isInbounds({x=0,y=0}={}){
    return x>=0&&x<=this.width-1&&y>=0&&y<=this.height-1;
  }

  // uses bresenhams line algorithm to acquire an array of points
  // inclusively between A(x1,y1) and B(x2,y2)
  getPath({x1=0,y1=0,x2=0,y2=0}={}){
    const dx = Math.abs(x2-x1), dy = Math.abs(y2-y1),
          sx = x1<x2?1:-1, sy = y1<y2?1:-1,
          path = [{x: x1,y: y1}];

    let err = dx-dy, err2; //difference and difference*2

    while(!(x1===x2&&y1===y2)){
      err2 = 2*err;
      if(err2>-dy){
        err-=dy; x1+=sx; //eslint-disable-line no-param-reassign
      } //end if
      if(err2<dx){
        err+=dx; y1+=sy; //eslint-disable-line no-param-reassign
      } //end if
      if(x1<=1||x1>this.width-2||y1<=1||y1>this.height-2){
        path.length=0
        break; //no need to continue, it fails
      }else{
        path.push({x: x1,y: y1});
      } //end if
    } //end while()
    return path;
  }
  getWalkableNeighbors({x=0,y=0}={}){
    const list=[];

    if(this.isInbounds({x: x-1,y})&&this.isWalkable({x: x-1,y})){
      list.push(this.getSector({x: x-1,y}));
    } //end if
    if(this.isInbounds({x: x+1,y})&&this.isWalkable({x: x+1,y})){
      list.push(this.getSector({x: x+1,y}));
    } //end if
    if(this.isInbounds({x,y: y-1})&&this.isWalkable({x,y: y-1})){
      list.push(this.getSector({x,y: y-1}));
    } //end if
    if(this.isInbounds({x,y: y+1})&&this.isWalkable({x,y: y+1})){
      list.push(this.getSector({x,y: y+1}));
    } //end if
    return list;
  }
  findPath({x1=0,y1=0,x2=0,y2=0}={}){
    const weight = 1,
          heuristic = (dx, dy) => dx + dy, //manhattan heuristic
          openList = new Heap([],(a,b)=>a.f===b.f,(a,b)=>b.path.f - a.path.f),
          abs = Math.abs, //shorten reference
          SQRT2 = Math.SQRT2; //shorten reference

    let node = this.getSector({x: x1,y: y1}); //acquire starting node

    // set the g and f value of the start node to be 0
    node.path = {g: 0, f: 0, opened: false, closed: false, parent: null};

    // push the start node into the open list
    openList.push(node);
    node.path.opened = true;

    // while the open list is not empty
    while (openList.length) {

      // pop the position of node which has the minimum f value
      node = openList.pop();
      node.path.closed = true;

      // if reached the end position, construct the path and return it
      if (node.x === x2 && node.y === y2) {
        const path = []; //final path

        // Add all successful nodes to the path array except starting node
        do{
          path.push({x: node.x,y: node.y});
          node = node.path.parent;
        }while(node.path.parent);

        // we'll remove all the added attributes
        this.sectors.forEach(row=> row.forEach(sector=> delete sector.path));

        // pop from list to get path in order
        return path;
      } //end if

      // get neighbours of the current node
      const neighbors = this.getWalkableNeighbors({x: node.x,y: node.y});

      for (let i = 0, ng; i < neighbors.length; ++i) {
        const neighbor = neighbors[i],
              x = neighbor.x,
              y = neighbor.y;

        // inherit the new path or create the container object
        neighbor.path=neighbor.path||{};

        // get the distance between current node and the neighbor
        // and calculate the next g score
        ng = node.path.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

        // check if the neighbor has not been inspected yet, or
        // can be reached with smaller cost from the current node
        if (!neighbor.path.opened || ng < neighbor.path.g) {
          neighbor.path.g = ng;
          neighbor.path.h = neighbor.path.h || weight * heuristic(abs(x - x2), abs(y - y2));
          neighbor.path.f = neighbor.path.g + neighbor.path.h;
          neighbor.path.parent = node;

          if (!neighbor.path.opened) {
            openList.push(neighbor);
            neighbor.path.opened = true;
          } //end if
        } //end if
      } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [{x: x1,y: y1}];
  }
  isPathEmpty(path=[]){
    let result = true;

    if(!path.length){
      result = false;
    }else if(!path.slice(1,path.length).every(p=> this.isEmpty(p))){
      result = false;
    } //end if
    return result;
  }
  isSquare({x1=0,y1=0,x2=0,y2=0}={},testFn){
    const dx = x1<x2?1:-1, dy = y1<y2?1:-1;

    for(let y = y1;y!==y2+dy;y+=dy){
      for(let x = x1;x!==x2+dx;x+=dx){
        if(
          x<1||x>this.width-1||y<1||y>=this.height-1||
          testFn(this.getSector({x,y}))
        ){
          return false; //exit early
        } //end if
      } //end for
    } //end for
    return true;
  }
  fillRoom({x1=0,y1=0,x2=0,y2=0}={}){
    const dx = x1<x2?1:-1, dy = y1<y2?1:-1;

    for(let y = y1;y!==y2+dy;y+=dy){
      for(let x = x1;x!==x2+dx;x+=dx){
        if(x<1||x>this.width-1||y<1||y>this.height-1||!this.isEmpty({x,y})){
          return; //exit early
        }else if(y===y1||y===y2||x===x1||x===x2){
          this.setWall({x,y});
        }else{
          this.setFloor({x,y});
        } //end if
      } //end for
    } //end for
  }
}

