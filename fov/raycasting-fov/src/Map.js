import {Sector} from './Sector';
import {Player} from './Player';

export class Map{
  constructor(template){
    this.template = template;
    this.sectors = [];
    this.initialize();
  }
  initialize(){
    this.height = this.template.length;
    this.width = this.template[0].length;
    for(let y=0;y<this.height;y++){
      this.sectors[y]=[];
      for(let x=0;x<this.width;x++){
        this.sectors[y][x]=new Sector({x,y});
        if(this.template[y][x]==='#'){
          this.sectors[y][x].setWall();
        }else if(this.template[y][x]==='%'){
          this.sectors[y][x].setWindow();
        }else if(this.template[y][x]==='@'){
          this.player = new Player({x,y,map:this});
          this.sectors[y][x].setFloor();
        }else{
          this.sectors[y][x].setFloor();
        } //end if
      } //end for
    } //end for
  }
  // translate allows a {x,y} point to be translated to a touching sector
  // before an operation. All functions that operate on a point are supported
  // Before:
  //   map.isFloor({x: sector.x+1, y: sector.y})
  // After:
  //   map.isFloor(sector,'east');
  static translate({x=0,y=0,direction}={}){
    if(direction==='north'){
      return {x,y:y-1};
    }else if(direction==='northeast'){
      return {x:x+1,y:y-1};
    }else if(direction==='east'){
      return {x:x+1,y};
    }else if(direction==='southeast'){
      return {x:x+1,y:y+1};
    }else if(direction==='south'){
      return {x,y:y+1};
    }else if(direction==='southwest'){
      return {x:x-1,y:y+1};
    }else if(direction==='west'){
      return {x:x-1,y};
    }else if(direction==='northwest'){
      return {x:x-1,y:y-1};
    } //end if
    return {x,y};
  }
  isInbounds({
    x=0,y=0,x1=0,y1=0,x2=this.width-1,y2=this.height-1
  }={},direction){
    if(direction) ({x,y} = this.constructor.translate({x,y,direction}));
    return x>=x1&&x<=x2&&y>=y1&&y<=y2&&
      x>=0&&y>=0&&x<=this.width-1&&y<=this.height-1;
  }
  // may change based on door state
  isWalkable({x=0,y=0}={},direction){
    if(direction) ({x,y} = this.constructor.translate({x,y,direction}));
    return this.getSector({x,y}).isWalkable();
  }
  getSector({x,y}){ return this.sectors[y][x]; }
  isEmpty({x,y}){ return this.getSector({x,y}).isEmpty(); }
  setEmpty({x,y}){ return this.getSector({x,y}).setEmpty(); }
  isFloor({x,y}){ return this.getSector({x,y}).isFloor(); }
  setFloor({x,y}){ return this.getSector({x,y}).setFloor(); }
  isWall({x,y}){ return this.getSector({x,y}).isWall(); }
  setWall({x,y}){ return this.getSector({x,y}).setWall(); }
  isWindow({x,y}){ return this.getSector({x,y}).isWindow(); }
  setWindow({x,y}){ return this.getSector({x,y}).setWIndow(); }
  isDoorClosed({x,y}){ return this.getSector({x,y}).isDoorClosed(); }

  // uses bresenhams line algorithm to acquire an array of points
  // inclusively between A(x1,y1) and B(x2,y2)
  bresenhamsLine({
    x1=0,y1=0,x2=0,y2=0,state={},
    onStart=()=>{},
    onTest=()=>{return true;},
    onSuccess=()=>{},
    onFailure=()=>{},
    onEach=()=>{},
    onFinish=()=>{},
    exitOnFailure=true
  }={}){
    const dx = Math.abs(x2 - x1),
          dy = Math.abs(y2 - y1),
          sx = x1 < x2 ? 1 : -1,
          sy = y1 < y2 ? 1 : -1;

    let [x,y] = [x1,y1],
        error = dx - dy,
        error2;

    onStart({x,y,x1,y1,x2,y2,state});
    do{
      onEach({x,y,x1,y1,x2,y2,state});
      if(!state.failing&&onTest({x,y,x1,y1,x2,y2,state})){
        onSuccess({x,y,x1,y1,x2,y2,state});
      }else{
        state.failing = true;
        if(exitOnFailure) state.finished = true;
        onFailure({x,y,x1,y1,x2,y2,state});
      } //end if
      if(x==x2&&y==y2) state.finished = true;
      error2 = 2 * error;
      if(error2 > -dy){ error -= dy; x += sx; }
      if(error2 < dx){ error += dx; y += sy; }
    }while(!state.finished)
    onFinish({x,y,x1,y1,x2,y2,state});
    return state;
  }
  computeFOV({x=null,y=null,...args}={}){
    if(x===null||y===null) throw new Error('computeFOV: x & y required');
    this.computeDirectionalFOV({x,y,direction:'east',...args});
    this.computeDirectionalFOV({x,y,direction:'west',...args});
  }

  // ray-casting
  computeDirectionalFOV({
    x=null,y=null,
    direction='east',
    fieldOfViewDegrees=180,
    fieldOfViewRadians=fieldOfViewDegrees*Math.PI/180,
    radius=8,
    accuracy=0.97, //higher accuracy required for higher radius
    isTransparent=({x,y})=> this.isWalkable({x,y})||this.isEmpty({x,y}),
    setTransparent=({x,y,state})=> state.visible[`${x},${y}`]=true,
    isTranslucent=({x,y})=> this.isWindow({x,y}),
    setTranslucent=({x,y,state})=>{
      if(state.firstWindow){
        state.secondWindow = true;
      } else {
        state.firstWindow = true;
      } //end if
    },
    isOpaque=({x,y,state})=> this.isWall({x,y})||this.isDoorClosed({x,y})||state.secondWindow,
    setVisible=()=>{},
    onStart=({state})=>{ state.visible = {}; },
    onTest=({x,y,state})=>{
      if(!this.isInbounds({x,y})) return false;
      if(isTransparent({x,y,state})) setTransparent({x,y,state});
      if(isTranslucent({x,y,state})) setTranslucent({x,y,state});
      state.visible[`${x},${y}`]=true;
      setVisible({x,y,state});
      if(isOpaque({x,y,state})) return false;
      return true;
    },
    ...args
  }={}){
    if(x===null||y===null) throw new Error('computeDirectionalFOV: x & y required');
    const quadrants = {
            north: -Math.PI,
            east: -Math.PI/2,
            south: Math.PI*2,
            west: Math.PI/2*5,
            northwest: Math.PI/4*3,
            northeast: -3*Math.PI/4,
            southwest: Math.PI/4,
            southeast: -Math.PI/4
          },
          theta = quadrants[direction]; 

    for(
      let sigma = fieldOfViewRadians;
      sigma > 0;
      sigma -= 1 - accuracy
    ){
      const [x1,y1] = [x,y],
            x2 = Math.round(x1 + radius * Math.cos(sigma + theta)),
            y2 = Math.round(y1 + radius * Math.sin(sigma + theta));

      this.bresenhamsLine({x1,y1,x2,y2,onStart,onTest, ...args});
    } //end for
  }

  // return the neighbors of a given sector that pass the `test` function.
  // Can specify whether or not testing of orthogonal, cardinal or the
  // originating sector. `size` will expand to not just nearby sectors
  getNeighbors({
    sector,x=sector.x,y=sector.y,size=1,
    orthogonal=true,cardinal=true,self=false,
    test=()=>true
  }={}){
    const list=[],
          listAdd = loc=>{
            if(this.isInbounds(loc)&&test(this.getSector(loc))){
              list.push(this.getSector(loc));
            } //end if
          };

    for(let cy=y-size;cy<=y+size;cy++){
      for(let cx=x-size;cx<=x+size;cx++){
        if(cx===x&&cy===y&&self){
          listAdd({x: cx, y: cy});
        }else if(cx===x&&cy===y&&!self){
          continue;
        }else if(cx===x&&cardinal||cy===y&&cardinal){ //cardinal
          listAdd({x: cx, y: cy});
        }else if(orthogonal){ //orthogonal
          listAdd({x: cx, y: cy});
        } //end if
      } //end for
    } //end for
    return list;
  }

}
