/* global ctx */
/* global v */
class Sector{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.wall =  r(1)<0.25?1:0;
    this.floor = r(1)<0.90?1:0; 
  }
}
class Map{
  constructor(){
    this.width=3000;
    this.height=2500;
    this.sector=[];
    this.fps = 500; //higher fps will speed loading
  }
  generate(){
    var i,j;
    for(i=0;i<this.width;i++){
      this.sector[i]=[];
      for(j=0;j<this.height;j++){
        this.sector[i][j]=new Sector(i,j);
      } //end for
    } //end for
  }
  
  /**
   * We draw the map asynchronously, only updating as much sectors as we 
   * possibly can within the specified Map fps. 
   * 
   * k = the current sector being drawn
   * m = the max allowable sectors to be drawn per frame refresh.
   *     this is computed dynamically per iteration 
   * t = the time for which is current frame started so we can adjust
   *     the m variable each iteration until we maximize the drawn sectors
   *     to it's allowable fps threshold
   */
  draw(k,m,t){
    var sector, //temp variable used to shorten and clean up code 
        i, j, // x && y variables computed based off the iteration number (k)
        w = this.width, h = this.height, //shorten width and height variables
        s = w*h,  //the max size is width x height
        l = m - k; //this is the target sectors we'll attempt to draw this frame

    // Draw as much as we can within the allocated Map fps
    for(k=k||0,m=m||2;k<m&&k<s;k++){
      i=k%w; // Acquire the current horizontal position (x)
      j=k/w|0; // Acquire the current vertical position (y)
      sector = this.sector[i][j]; // make sector easier to write
      if(sector.floor){ 
        ctx.fillStyle='#232';
      }else{ 
        ctx.fillStyle='#888';
      } //end if
      ctx.fillRect(i*v.w/w,j*v.h/h,v.w/w+1,v.h/h+1);
      if(sector.wall){ 
        ctx.fillStyle='#888';
        ctx.fillRect(i*v.w/w+v.w/w*0.1,j*v.h/h+v.h/h*0.1,v.w/w*0.8,v.h/h*0.8);
      } //end if
    } //end for
    
    // If our current iteration is less then the size, there's more to do
    if(k<s){
      setTimeout(()=>{
        if(!t){ //First iteration we start the timer and merely double the m
          this.draw(k,m*2,Date.now());
        }else{
          this.draw(k,m+Math.floor(l*(1-(Date.now()-t-this.fps)/this.fps)),Date.now());
        } //end if
      },1);
    } //end if
  }
  initialize(){
    this.generate();
    this.draw();
  }
}
