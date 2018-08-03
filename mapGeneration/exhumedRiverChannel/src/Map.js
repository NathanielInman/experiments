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
  getSector({x=0,y=0}={}){ return this.sectors[y][x]; }
  isEmpty({x=0,y=0}={}){
    return this.inBounds({x,y})&&
      this.getSector({x,y}).isEmpty();
  }
  setEmpty({x=0,y=0}={}){ this.getSector({x,y}).setEmpty(); }
  isFloor({x=0,y=0}={}){ return this.getSector({x,y}).isFloor(); }
  setFloor({x=0,y=0}={}){ this.getSector({x,y}).setFloor(); }
  isFloorSpecial({x=0,y=0}={}){ return this.getSector({x,y}).isFloorSpecial(); }
  setFloorSpecial({x=0,y=0}={}){ this.getSector({x,y}).setFloorSpecial(); }
  isWall({x=0,y=0}={}){ return this.getSector({x,y}).isWall(); }
  setWall({x=0,y=0}={}){ this.getSector({x,y}).setWall(); }
  isWallSpecial({x=0,y=0}={}){ return this.getSector({x,y}).isWallSpecial(); }
  setWallSpecial({x=0,y=0}={}){ this.getSector({x,y}).setWallSpecial(); }
  isWater({x=0,y=0}={}){ return this.getSector({x,y}).isWater(); }
  setWater({x=0,y=0}={}){ this.getSector({x,y}).setWater(); }
  isWaterSpecial({x=0,y=0}){ return this.getSector({x,y}).isWaterSpecial(); }
  setWaterSpecial({x=0,y=0}={}){ this.getSector({x,y}).setWaterSpecial(); }
  isDoor({x=0,y=0}={}){ return this.getSector({x,y}).isDoor(); }
  setDoor({x=0,y=0}={}){ this.getSector({x,y}).setDoor(); }
  isRemoved({x=0,y=0}={}){ return this.getSector({x,y}).isRemoved(); }
  setRemoved({x=0,y=0}={}){ this.getSector({x,y}).setRemoved(); }
  isWalkable({x=0,y=0}={}){ return this.getSector({x,y}).isWalkable(); }
  isWalkableOrEmpty({x=0,y=0}={}){ return this.getSector({x,y}).isWalkableOrEmpty(); }
  isRoom({x=0,y=0}={}){ return this.getSector({x,y}).id>0; }
  setRoom({x=0,y=0,id=0}={}){ this.getSector({x,y}).roomNumber = id; }
  getRoom({x=0,y=0}={}){ return this.getSector({x,y}).roomNumber; }
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
    let dx = Math.abs(x2-x1), dy = Math.abs(y2-y1),
        sx = x1<x2?1:-1, sy = y1<y2?1:-1,
        err = dx-dy, err2, //difference and difference*2
        path = [{x: x1,y: y1}];

    while(!(x1===x2&&y1===y2)){
      err2 = 2*err;
      if(err2>-dy){ err-=dy; x1+=sx; } //eslint-disable-line no-param-reassign
      if(err2<dx){ err+=dx; y1+=sy; } //eslint-disable-line no-param-reassign
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
    const list=[],
          sx=Math.min(Math.max(x-1,0),this.width-1),
          sy=Math.min(Math.max(y-1,0),this.height-1),
          ex=Math.min(Math.max(x+1,0),this.width-1),
          ey=Math.min(Math.max(y+1,0),this.height-1);

    for(let cy=sy;cy<=ey;cy++){
      for(let cx=sx;cx<=ex;cx++){
        if(this.isInbounds({x: cx,y: cy})&&this.isWalkable({x: cy,y: cy})){
          list.push(this.getSector({x: cx,y: cy}));
        } //end if
      } //end for
    } //end for
    return list;
  }
  findPath(){
    let weight = 1,
        heuristic = (dx, dy) => dx + dy, //manhattan heuristic
        openList = new Heap([],(a,b)=>a.f===b.f,(a,b)=>a.f - b.f),
        abs = Math.abs, //shorten reference
        SQRT2 = Math.SQRT2, //shorten reference
        altered = [], //keep track of which sectors we modulate (to clean later)
        node = this.getSector({x:x1,y:y1}); //acquire starting node

    // set the g and f value of the start node to be 0
    node.g = 0;
    node.f = 0;

    // push the start node into the open list
    openList.push(node);
    node.opened = true;

    // while the open list is not empty
    while (!openList.length) {

      // pop the position of node which has the minimum f value
      node = openList.pop();
      node.closed = true;

      // if reached the end position, construct the path and return it
      if (node.location.x === targetX && node.location.y === targetY) {
        let path = []; //final path

        // Add all successful nodes to the path array except starting node
        do{
          path.push({x:node.location.x,y:node.location.y});
          node = node.parent;
        }while(node.parent);

        // Clean up fields we've added
        altered.forEach(node=>{
          delete node.g; delete node.h; delete node.f;
          delete node.closed; delete node.parent;
          delete node.opened;
        });

        return path; //pop from list to get path in order
      } //end if

      // get neighbours of the current node
      let neighbors = this.getWalkableNeighbors({x:node.x,y:node.y}),
          neighbor;

      altered.push.apply(altered,neighbors); //flat push
      for (let i = 0,closed=0,ng, l = neighbors.length; i < l; ++i) {
        neighbor = neighbors[i];

        let x = neighbor.location.x,
            y = neighbor.location.y;

        // get the distance between current node and the neighbor
        // and calculate the next g score
        ng = node.g + ((x - node.location.x === 0 || y - node.location.y === 0) ? 1 : SQRT2);

        // check if the neighbor has not been inspected yet, or
        // can be reached with smaller cost from the current node
        if (!neighbor.opened || ng < neighbor.g) {
          neighbor.g = ng;
          neighbor.h = neighbor.h || weight * heuristic(abs(x - targetX), abs(y - targetY));
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = node;

          if (!neighbor.opened) {
            openList.push(neighbor);
            neighbor.opened = true;
            /*
          } else {
            // the neighbor can be reached with smaller cost.
            // Since its f value has been updated, we have to
            // update its position in the open list
            openList.updateItem(neighbor);*/
          }
        }
      } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [{x:startX,y:startY}];
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
  isSquareEmpty({x1=0,y1=0,x2=0,y2=0}={}){
    let dx = x1<x2?1:-1, dy = y1<y2?1:-1;

    for(let y = y1;y!==y2+dy;y+=dy){
      for(let x = x1;x!==x2+dx;x+=dx){
        if(x<1||x>this.width-1||y<1||y>=this.height-1||!this.isEmpty({x,y})){
          return false; //exit early
        } //end if
      } //end for
    } //end for
    return true;
  }
  isSquareEmptyOfWater({x1=0,y1=0,x2=0,y2=0}={}){
    let dx = x1<x2?1:-1, dy = y1<y2?1:-1;

    for(let y = y1;y!==y2+dy;y+=dy){
      for(let x = x1;x!==x2+dx;x+=dx){
        if(x<1||x>this.width-1||y<1||y>=this.height-1){
          continue; //not valid to check
        }else if(this.isWater({x,y})){
          return false; //exit early
        } //end if
      } //end for
    } //end for
    return true;
  }
  fillRoom({x1=0,y1=0,x2=0,y2=0}={}){
    let dx = x1<x2?1:-1, dy = y1<y2?1:-1;

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

