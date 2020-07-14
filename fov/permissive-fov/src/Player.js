const degreesPerPi = 180/Math.PI;

function bresenhamsLine({
  x1,y1,x2,y2,
  isTransparent=function(){},
  setTransparent=function(){},
  isTranslucent=function(){},
  setTranslucent=function(){},
  isOpaque=function(){}
}){
  const dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1),
        sx = x1 < x2 ? 1 : -1,
        sy = y1 < y2 ? 1 : -1;

  let [x,y] = [x1,y1],
      error = dx - dy,
      state = {};

  while(x!=x2||y!=y2){
    const e2 = 2*error;

    if(isTransparent({x,y,state})) setTransparent({x,y,state});
    if(isTranslucent({x,y,state})) setTranslucent({x,y,state});
    if(isOpaque({x,y,state})) return;
    if(e2>-dy){ error -= dy; x += sx; }
    if(e2<dx){ error += dx; y += sy; }
  } //end while()
} //end bresenhamsLine()

export class Player{
  constructor({x,y,map}){
    this.x = x;
    this.y = y;
    this.map = map;
    this.facing = 'east';
    this.fieldOfViewDegrees = 180;
    this.fieldOfViewRadians = this.fieldOfViewDegrees*Math.PI/180;
    this.sight = 8;
    this.visible = [];
  }
  computeFOV(){
    const quadrants = {
      north: [{x2: -1, y2: -1},{x2: 1, y2: -1}],
      east: [{x2: 1, y2: -1},{x2: 1, y2: 1}],
      south: [{x2: -1, y2: 1},{x2: 1, y2: 1}],
      west: [{x2: -1, y2: -1},{x2: -1, y2: 1}]
    };

    quadrants[this.facing].forEach(quad=>{
      for(
        let sigma = this.fieldOfViewRadians/2;
        sigma > 0;
        sigma -= 0.05
      ){
        const [x1,y1] = [this.x,this.y],
              x2 = Math.round(x1 + quad.x2 * this.sight * Math.cos(sigma)),
              y2 = Math.round(y1 + quad.y2 * this.sight * Math.sin(sigma));

        bresenhamsLine({
          x1,y1,x2,y2,
          isOpaque: ({x,y,state})=>{
            return this.map.isWall({x,y})||state.secondWindow;
          },
          isTransparent: ({x,y})=>{
            return this.map.isFloor({x,y});
          },
          setTransparent: ({x,y})=>{
            this.visible.push(`${x},${y}`);
          },
          isTranslucent: ({x,y})=>{
            return this.map.isWindow({x,y});
          },
          setTranslucent: ({x,y,state})=>{
            if(state.firstWindow){
              state.secondWindow = true;
            } else {
              state.firstWindow = true;
            } //end if
          }
        });
      } //end for
    });
  }
  initialize(easel){
    document.body.addEventListener('keydown',e=>{
      if(e.key==='h'){
        if(this.map.isFloor({x:this.x-1,y:this.y})){
          this.x--;
        } //end if
        this.facing = 'west';
      }else if(e.key==='j'){
        if(this.map.isFloor({x:this.x,y:this.y+1})){
          this.y++;
        } //end if
        this.facing = 'south';
      }else if(e.key==='k'){
        if(this.map.isFloor({x:this.x,y:this.y-1})){
          this.y--;
        } //end if
        this.facing = 'north';
      }else if(e.key==='l'){
        if(this.map.isFloor({x:this.x+1,y:this.y})){
          this.x++;
        } //end if
        this.facing = 'east';
      } //end if
      this.visible.length = 0;
      this.computeFOV();
      easel.redraw();
    });
    this.computeFOV();
  }
}

