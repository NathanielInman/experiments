/**
 * This class given an accuracy when created will hold objects and create
 * hashes for objects that are given to it if they don't exist. Hashes that
 * already exist will have those new objects applied to them, indicating that
 * those objects are sharing the same area (overlapping)
 */
class SpatialHash{
  constructor(accuracy){
    this.accuracy = accuracy || 5;
    this.hash = {};
    this.list = [];
  }

  // perhaps makeKeys would be more accurate, as it makes the
  // keys and then returns them for the object that's passed.
  // it makes the keys based upon the x&ylocation of the object
  // and creates them out to the width and height
  getKeys(obj){
    var shift = this.accuracy, //name it appropriately
        sx = obj.x >> shift,
        sy = obj.y >> shift,
        ex = (obj.x + obj.w) >> shift,
        ey = (obj.y + obj.h) >> shift,
        x, y, keys = [];

    for(y=sy;y<=ey;y++){
      for(x=sx;x<=ex;x++){
        keys.push(''+x+':'+y);
      } //end for
    } //end for
    return keys;
  }

  // Remove the hashed tree and list
  clear(){
    var key;
    for(key in this.hash){
      if(this.hash[key].length === 0){
        delete this.hash[key];
      }else{
        this.hash[key].length = 0;
      } //end if
    } //end for
    this.list.length = 0;
  }

  // Insert an object into the tree by first adding it to the list, and then
  // computing(and creating) the hash keys to that object if it doesn't exist
  // already
  insert(obj, rect){
    var keys = this.getKeys(rect || obj), key, i;
    this.list.push(obj);
    for(i=0;i<keys.length;i++){
      key = keys[i];
      if(this.hash[key]){
        this.hash[key].push(obj);
      }else{
        this.hash[key] = [obj];
      } //end if
    } //end for
  }

  // Retrieve the objects that share the same hash as the specified object.
  // It's important to note that it will also contain the object you're looking
  // for if that object was placed in the spatial hash already
  retrieve(obj, rect){
    var ret = [], keys, i, key;
    if(!obj && !rect) return this.list;
    keys = this.getKeys(rect || obj);
    for(i=0;i<keys.length;i++){
      key = keys[i];
      if(this.hash[key]){
        ret = ret.concat(this.hash[key]);
      } //end if
    } //end for
    return ret;
  }
}

/**
 * The entities in this demonstration are just rectangles with random width
 * and heights, random velocities on two axis and hold ids and the last objects
 * they interacted with.
 */
class Entity{
  constructor(x,y,id){
    this.id = id;
    this.last = null;
    this.x = x||0;
    this.y = y||0;
    this.w = r(10,20,1);
    this.h = r(10,20,1);
    this.vx = r(-1,1);
    this.vy = r(-1,1);
    this.check = false;
  }

  // Each entity knows not the locations of other entities, and
  // moves blindly. The Mapper tells it when it has collided with
  // another entity and in what direction it should flee to
  move(){
    this.check = false; // When we move, it's assumed we no longer overlap
    this.x+=this.vx;this.y+=this.vy;
    if(this.x>v.w*0.99&&this.vx>0||this.x<v.w*0.01&&this.vx<0)this.vx*=-1;
    if(this.y>v.h*0.99&&this.vy>0||this.y<v.h*0.01&&this.vy<0)this.vy*=-1;
  }
}

/**
 * Mapper is a generic class that holds a collection of entities and a tree
 * for which to relate them to. It initializes the collection, then starts
 * the main loop which tells the entities to move, then calculates their hash
 * and after performing any bouncing interactions, it will draw it and then
 * request a new animation frame from the browser and loop continuously
 */
class Mapper{
  constructor(){
    this.total = 500; //total number of entities we'll draw
    this.collection = []; //holds all of the entities
    this.accuracy = 3; //lower = more accurate = slower
    this.tree = new SpatialHash(this.accuracy);
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

  // Separated the drawing portion from the main loop so it was
  // easier to see. We grab the tree from the base node and
  // iterate through all of the objects, highlighting them if they
  // are overlapping another
  draw(){
    var collection = this.tree.retrieve(); //get drawable nodes

    collection.forEach(function(obj){
      if(obj.check){
        ctx.strokeStyle = 'rgba(255,0,0,0.9)'; //overlapping
      }else{
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; //solitary
      } //end if
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    });
  }

  // The main loop function begins by clearing the scene and then
  // draws each entity before it checks their collisions and moves
  // them coorespondingly.
  loop(){
    var overlapping; //holds all overlapping entities

    ctx.clearRect(0,0,v.w,v.h);
    this.draw();
    this.tree.clear(); //clear the tree and rebuild it
    this.collection.forEach((current)=>{
      current.move(); //move the current entity
      this.tree.insert(current); //add the entity back into tree
      overlapping = this.tree.retrieve({
        x: current.x,
        y: current.y,
        w: current.w,
        h: current.h
      });
      overlapping.forEach((target)=>{
        var c=current,t=target, //shorten variable names
            hold; //used for swapping velocity variables

        if(c.id!=t.id){
          t.check=true;c.check=true; //highlight entities
          if(c.last==t.id||t.last==c.id)return;
          if(c.vx>0&&t.vx>0||t.vx<0&&c.vx<0){ //horizontal collision
            hold=c.vy;c.vy=t.vy;t.vy=hold;
          }else if(c.vy>0&&t.vy>0||c.vy<0&&t.vy<0){ //vertical
            hold=c.vx;c.vx=t.vx;t.vx=hold;
          }else{ //oblique collision
            hold=c.vy;c.vy=t.vy;t.vy=hold;
            hold=c.vx;c.vx=t.vx;t.vx=hold;
          } //end if
          c.last=t.id;t.last=c.id; //prevent them from bouncing on overlap
        } //end if
      });
    });
    requestAnimationFrame(()=>this.loop());
  }
}

/**
 * Main entry point to application
 */
function app() {
  "use strict";

  var scene = new Mapper();
} //end app()
