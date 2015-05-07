class Entity{
  constructor(x,y,id){
    this.id = id; //The main identifier of the entity (unchanging);
    this.iid = 0; //the location identifier (changes);
    this.x = x||0;
    this.y = y||0;
    this.w = 10;
    this.h = 10;
    this.dx = r(2,0,1); //direction of x axis movement
    this.dy = r(2,0,1); //direction of y axis movement
    this.sx = r(1,5); //speed of x value
    this.sy = r(1,5); //speed of y value
  }
  move(){
    this.x=this.dx?this.x+=this.sx:this.x-=this.sx;
    this.y=this.dy?this.y+=this.sy:this.y-=this.sy;
    if(this.x>v.w*0.99&&this.dx||this.x<v.w*0.01&&!this.dx)this.dx^=1;
    if(this.y>v.h*0.99&&this.dy||this.y<v.h*0.01&&!this.dy)this.dy^=1;
  }
}
class SpatialMapper{
  constructor(){
    this.total = 500; //total number of entities we'll draw
    this.collection = []; //holds all of the entities
    this.mapperSize = 100;
    this.mapper = (function(s){
      var m = [],i,j; //shorten variables for simplicity
      for(i=0;i<s;i++){m[i]=[];for(j=0;j<s;j++)m[i][j]=[];}
      return m; //return the structured array mapperSize^2 length
    })(this.mapperSize);
    this.start();
  }
  start(){
    for(let i=0;i<this.total;i++){
      let e = new Entity(r(v.w),r(v.h)),
          i = this.getMapperIndex(e);

      i.push(e.id);
      e.iid = i.length;
      this.collection.push(e);
    } //end for
    this.loop();
  }
  loop(){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
    ctx.fillStyle='#F00';
    this.collection.forEach((e)=>{
      ctx.fillRect(e.x,e.y,e.w,e.h);
      this.checkBounce(e);
      e.move();

      // Remove original mapper location and apply id
      // to the new coordinate location after updating it
      //remove location identifier
      this.getMapperIndex(e).splice(e.iid,1);
      e.iid = this.getMapperIndex(e).length;
      this.getMapperIndex(e).push(e.id);
    });
    setTimeout(()=>this.loop(),16);
  }
  getMapperIndex(e){
    return this.mapper[this.getXIndex(e)][this.getYIndex(e)];
  }
  getXIndex(e){
    return M.floor(e.x/v.w*this.mapperSize);
  }
  getYIndex(e){
    return M.floor(e.y/v.h*this.mapperSize);
  }
  checkBounce(e){
    var i=0,c=e,t;

    // Iterate through the collection and check for collisions
    for(;i<this.getMapperIndex(entity).length;i++){
      t=this.collection[i];

      // Make sure target entity isn't current entity also
      if(i!==t.id&&Math.abs(c.x-t.x)/10<1&&Math.abs(c.y-t.y)/10<1){
        // We have a collision, detect which axis will be
        // repelled so we have a directional movement
        if(t.dx!=c.dx==1&&t.dy!=c.dy){
          c.dx^=1;t.dx^=1;c.dy^=1; //oblique collision
        }else if(t.dx==c.dx&&t.dy!=c.dy){
          c.dy^=1;t.dy^=1; //vertical collision
        }else if(t.dx!=c.dx&&t.dy==c.dy){
          c.dx^=1;t.dx^=1; //horizontal collision
        } //end if
        break; //prevents bouncing on two objects by leaving early
      } //end if
    } //end for
  }
}

/**
 * Main entry point to application
 */
function app() {
  "use strict";

  var scene = new SpatialMapper();
} //end app()
