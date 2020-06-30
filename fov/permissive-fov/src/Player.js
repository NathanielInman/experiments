export class Player{
  constructor({x,y,map}){
    this.x = x;
    this.y = y;
    this.map = map;
  }
  initialize(easel){
    document.body.addEventListener('keydown',e=>{
      if(e.key==='h'){
        if(this.map.getSector(this.x-1,this.y).isFloor()){
          this.x--;
        } //end if
      }else if(e.key==='j'){
        if(this.map.getSector(this.x,this.y+1).isFloor()){
          this.y++;
        } //end if
      }else if(e.key==='k'){
        if(this.map.getSector(this.x,this.y-1).isFloor()){
          this.y--;
        } //end if
      }else if(e.key==='l'){
        if(this.map.getSector(this.x+1,this.y).isFloor()){
          this.x++;
        } //end if
      } //end if
      easel.redraw();
    });
  }
}

