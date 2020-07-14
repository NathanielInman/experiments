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
        this.sectors[y][x]=new Sector();
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
  getSector({x,y}){ return this.sectors[y][x]; }
  isEmpty({x,y}){ return this.getSector({x,y}).isEmpty(); }
  setEmpty({x,y}){ return this.getSector({x,y}).setEmpty(); }
  isFloor({x,y}){ return this.getSector({x,y}).isFloor(); }
  setFloor({x,y}){ return this.getSector({x,y}).setFloor(); }
  isWall({x,y}){ return this.getSector({x,y}).isWall(); }
  setWall({x,y}){ return this.getSector({x,y}).setWall(); }
  isWindow({x,y}){ return this.getSector({x,y}).isWindow(); }
  setWindow({x,y}){ return this.getSector({x,y}).setWIndow(); }
}
