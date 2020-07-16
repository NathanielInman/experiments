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
    this.map.computeDirectionalFOV({
      x:this.x,y:this.y,radius:this.sight,direction:this.facing,
      setVisible:({x,y})=>{
        this.visible[`${x},${y}`]=true;
      }
    });
    Object.keys(this.visible)
      .map(key=> key.split(',').map(s=>+s))
      .forEach(([x,y])=>{
        console.log(x,y);
        if(this.map.isFloor({x,y})&&!(x===this.x&&y===this.y)){
            this.map.getNeighbors({
            x,y,orthogonal:false,
            test:(sector)=>{
              console.log('test',sector);
              return !sector.isFloor()&&!this.visible[`${sector.x},${sector.y}`];
            }
          }).forEach(sector=>{
            console.log('found',sector.x,sector.y);
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

