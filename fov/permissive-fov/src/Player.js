export class Player{
  constructor({x,y,map}){
    this.x = x;
    this.y = y;
    this.map = map;
    this.facing = 'east';
    this.visible = {};
    this.sight = 8;
  }
  computeFOV(){
    const possible = {};

    // pre-processing pass to get all possible
    this.map.computeDirectionalFOV({
      x:this.x,y:this.y,radius:this.sight,direction:this.facing,
      exitOnFailure:false,accuracy:0.97,
      onTest:({x,y,state})=>{
        state.visible[`${x},${y}`]=true;
        return true;
      },
      onEach:({x,y,state})=>{
        possible[`${x},${y}`]=true;
      }
    });

    // main pass to get all computed
    this.map.computeDirectionalFOV({
      x:this.x,y:this.y,radius:this.sight,direction:this.facing,
      accuracy:0.97,
      onStart:({state})=>{
        state.visible = this.visible;
      }
    });

    // post-processing pass to ensure raycasted anomalies
    // are fixed
    Object.keys(this.visible)
      .map(key=> key.split(',').map(s=>+s))
      .forEach(([x,y])=>{
        if(this.map.isFloor({x,y})){
          this.map.getNeighbors({
            x,y,
            test:(sector)=>{
              return !this.visible[`${sector.x},${sector.y}`]&&
                !this.map.isFloor({x:sector.x,y:sector.y})&&
                possible[`${sector.x},${sector.y}`]==true;
            }
          }).forEach(sector=>{
            this.visible[`${sector.x},${sector.y}`]=true;
          });
        } //end if
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
      }else if(e.key==='u'){
        if(this.map.isFloor({x:this.x+1,y:this.y-1})){
          this.y--; this.x++;
        } //end if
        this.facing = 'northeast';
      }else if(e.key==='n'){
        if(this.map.isFloor({x:this.x+1,y:this.y+1})){
          this.y++; this.x++;
        } //end if
        this.facing = 'southeast';
      }else if(e.key==='b'){
        if(this.map.isFloor({x:this.x-1,y:this.y+1})){
          this.y++; this.x--;
        } //end if
        this.facing = 'southwest';
      }else if(e.key==='y'){
        if(this.map.isFloor({x:this.x-1,y:this.y-1})){
          this.x--; this.y--;
        } //end if
        this.facing = 'northwest';
      } //end if
      this.visible = {};
      this.computeFOV();
      easel.redraw();
    });
    this.computeFOV();
  }
}

