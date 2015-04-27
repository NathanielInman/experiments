class Sector{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.wall =  r(1)<0.25?1:0;
    this.floor = r(1)<0.90?1:0;
    if(!this.floor){
      this.water = {
        cur:   100+r(105,0,1),
        max:   100+r(105,0,1),
        dir:   r(2,0,1)
      };
    } //end if
  }
}
class Map{
  constructor(){
    this.width=30;
    this.height=25;
    this.sector=[];
  }
  generate(){
    for(let i=0;i<this.width;i++){
      this.sector[i]=[];
      for(let j=0;j<this.height;j++){
        this.sector[i][j]=new Sector(i,j);
      } //end for
    } //end for
  }
  draw(){
    var sector; //used as a temporary variable
    for(let i=0;i<this.width;i++){
      for(let j=0;j<this.height;j++){
        sector = this.sector[i][j];
        if(sector.water){
          if(sector.water.dir===0){
            sector.water.cur--;
          }else{
            sector.water.cur++;
          } //end if
          if(sector.water.max-50==sector.water.cur||
             sector.water.max+50==sector.water.cur){
            sector.water.dir^=1;
           } //end if
          ctx.fillStyle='rgb(0,0,'+sector.water.cur+')';
        }else if(sector.floor){
          ctx.fillStyle='#333';
        }else{
          ctx.fillStyle='#888';
        } //end if
        ctx.fillRect(i*v.w/this.width,j*v.h/this.height,v.w/this.width+1,v.h/this.height+1);
        if(sector.wall){
          ctx.fillStyle='#888';
          ctx.fillRect(i*v.w/this.width+v.w/this.width*0.1,j*v.h/this.height+v.h/this.height*0.1,v.w/this.width*0.8,v.h/this.height*0.8);
        } //end if
      } //end for
    } //end for
  }
  initialize(){
    var that = this;
    this.generate();
    setInterval(function redraw(){
      that.draw();
    },16);
  }
}
