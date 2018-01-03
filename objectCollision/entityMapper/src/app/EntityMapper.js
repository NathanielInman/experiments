const rd0 = uint=> Math.random()*uint;
const rd = (lint,uint)=> Math.random()*(uint-lint)+lint;
const ri0 = uint=> Math.floor(Math.random()*uint);
const ri = (lint,uint)=> Math.floor(Math.random()*(uint-lint))+lint;

class Entity{
  constructor(id,viewport){
    this.id = id;
    this.viewport = viewport;
    this.x = rd0(this.viewport.w);
    this.y = rd0(this.viewport.h);
    this.w = ri(10,12);
    this.h = ri(10,12);
    this.dx = ri0(2); //direction of x axis movement
    this.dy = ri0(2); //direction of y axis movement
    this.sx = rd(0.5,1.5); //speed of x value
    this.sy = rd(0.5,1.5); //speed of y value
  }

  // Each entity knows not the locations of other entities, and
  // moves blindly. The EntityMapper tells it when it has collided
  // with another entity and in what direction it should flee to
  move(){
    this.x=this.dx?this.x+=this.sx:this.x-=this.sx;
    this.y=this.dy?this.y+=this.sy:this.y-=this.sy;
    if(this.x>this.viewport.w*0.99&&this.dx||this.x<this.viewport.w*0.01&&!this.dx)this.dx^=1;
    if(this.y>this.viewport.h*0.99&&this.dy||this.y<this.viewport.h*0.01&&!this.dy)this.dy^=1;
  }
}
export class EntityMapper{
  constructor(viewport,ctx){
    this.total = 500; //total number of entities we'll draw
    this.collection = []; //holds all of the entities
    this.viewport = viewport;
    this.ctx = ctx; //canvas context for drawing
    this.start();
  }

  // Start the demonstration off by populating a collection of
  // entities up to the total threshold. After everything is populated
  // it calls the main loop function
  start(){
    for(let i=0;i<this.total;i++){
      this.collection.push(new Entity(i,this.viewport));
    } //end for
    this.loop();
  }

  // The main loop function begins by clearing the scene and then
  // draws each entity before it checks their collisions and moves
  // them coorespondingly.
  loop(){
    this.ctx.fillStyle='#000';
    this.ctx.fillRect(0,0,this.viewport.w,this.viewport.h);
    this.ctx.fillStyle='#F00';
    this.collection.forEach(entity=>{
      this.ctx.fillRect(entity.x,entity.y,entity.w,entity.h);
      this.checkBounce(entity);
      entity.move();
    });
    requestAnimationFrame(()=>this.loop(),16);
  }

  // The entity mapper checks the collisions of each entity, not
  // the entities themselves. It iterates through the entire
  // collection to see if another entity is within the same constraints
  // as the checking entity (and that we're not checking it with
  // itself) This function is slightly more accurate than the spatial
  // mapper but magnitudes slower.
  checkBounce(c){

    // Iterate through the collection and check for collisions
    this.collection.some(t=>{
      let result = false;

      // Make sure target entity isn't current entity also
      if(c.id!==t.id){
        let scalarCX = Math.floor(c.x/c.w),
            scalarTX = Math.floor(t.x/t.w),
            scalarCY = Math.floor(c.y/c.h),
            scalarTY = Math.floor(t.y/t.h);

        if(scalarCX===scalarTX&&scalarCY===scalarTY){

          // We have a collision, detect which axis will be
          // repelled so we have a directional movement
          if(t.dx!==c.dx===1&&t.dy!==c.dy){
            c.dx^=1;t.dx^=1;c.dy^=1; //oblique collision
          }else if(t.dx===c.dx&&t.dy!==c.dy){
            c.dy^=1;t.dy^=1; //vertical collision
          }else if(t.dx!==c.dx&&t.dy===c.dy){
            c.dx^=1;t.dx^=1; //horizontal collision
          } //end if
          result=true; //prevents bouncing on two objects by leaving early
        } //end if
      } //end if
      return result;
    });
  }
}
