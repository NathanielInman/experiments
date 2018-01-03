class Entity{
  constructor(x,y,id){
    this.id = id;
    this.x = x||0;
    this.y = y||0;
    this.w = 10;
    this.h = 10;
    this.dx = r(2,0,1); //direction of x axis movement
    this.dy = r(2,0,1); //direction of y axis movement
    this.sx = r(1,5); //speed of x value
    this.sy = r(1,5); //speed of y value
  }

  // Each entity knows not the locations of other entities, and
  // moves blindly. The EntityMapper tells it when it has collided
  // with another entity and in what direction it should flee to
  move(){
    this.x=this.dx?this.x+=this.sx:this.x-=this.sx;
    this.y=this.dy?this.y+=this.sy:this.y-=this.sy;
    if(this.x>v.w*0.99&&this.dx||this.x<v.w*0.01&&!this.dx)this.dx^=1;
    if(this.y>v.h*0.99&&this.dy||this.y<v.h*0.01&&!this.dy)this.dy^=1;
  }
}
export class EntityMapper{
  constructor(){
    this.total = 500; //total number of entities we'll draw
    this.collection = []; //holds all of the entities
    this.start();
  }

  // Start the demonstration off by populating a collection of
  // entities up to the total threshold. After everything is populated
  // it calls the main loop function
  start(){
    for(let i=0;i<this.total;i++){
      this.collection.push(new Entity(r(v.w),r(v.h),i));
    } //end for
    this.loop();
  }

  // The main loop function begins by clearing the scene and then
  // draws each entity before it checks their collisions and moves
  // them coorespondingly.
  loop(){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
    ctx.fillStyle='#F00';
    this.collection.forEach((entity)=>{
      ctx.fillRect(entity.x,entity.y,entity.w,entity.h);
      this.checkBounce(entity);
      entity.move();
    });
    setTimeout(()=>this.loop(),16);
  }

  // The entity mapper checks the collisions of each entity, not
  // the entities themselves. It iterates through the entire
  // collection to see if another entity is within the same constraints
  // as the checking entity (and that we're not checking it with
  // itself) This function is slightly more accurate than the spatial
  // mapper but magnitudes slower.
  checkBounce(entity){
    var i=0,c=entity,t;

    // Iterate through the collection and check for collisions
    for(;i<this.collection.length;i++){
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
