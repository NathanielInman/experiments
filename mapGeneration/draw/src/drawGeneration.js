// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()

class Spark{
  constructor(map,startNode,endNode,possibleNodes=[]){
    this.map = map; //will need to be able to speakt to map
    this.cx = startNode.x; this.cy = startNode.y;
    this.dx = endNode.x; this.dy = endNode.y;
    this.possible = possibleNodes
    this.process();
  }
  process(){
    let ox,oy, //may have to reset position
        wx,wy; //will need to hold the weight based on d

    this.map.setWater({x:this.cx,y:this.cy});
    do{
      ox = this.cx; oy = this.cy;
      wx = this.cx<this.dx?0.35:-0.35;
      wy = this.cy<this.dy?0.35:-0.35;
      if(Math.random()<0.5){
        this.cx += (Math.random()+wx)<0.5?-1:1;;
      }else{
        this.cy += (Math.random()+wy)<0.5?-1:1;
      } //end if

      // allow possibility of river splitting, passing
      // on a possible node
      if(this.possible.length&&Math.random()<0.1){
        new Spark(this.map,{x: this.cx, y: this.cy},this.possible.pop());
      } //end if

      // if cx and cy isn't within the map we need to reset;
      // otherwise we can draw it
      if(!this.map.isInbounds({x:this.cx,y:this.cy})){
        this.cx = ox; this.cy = oy;
      }else{
        this.map.setWater({x: this.cx,y: this.cy});
      } //end if
    }while(this.cx!==this.dx||this.cy!==this.dy)
    this.map.setWater({x:this.cx,y:this.cy});
  }
}
export function draw(map){
  let t = [
    {
      x: Math.floor(map.width/4+Math.random()*map.width/2),
      y: 0
    },
    {
      x: Math.floor(map.width/4+Math.random()*map.width/2),
      y: map.height-1
    },
    {
      x: 0,
      y: Math.floor(map.height/4+Math.random()*map.height/2)
    },
    {
      x: map.width-1,
      y: Math.floor(map.height/4+Math.random()*map.height/2)
    }
  ], r = Math.random();

  // 25% chance to have no split rivers, 25% to have 1, 50% to have 2
  if(r<0.25){
    t = shuffle(t);
    t.length = 2;
  }else if(r<0.85){
    t = shuffle(t);
    t.length = 3;
  }else{
    t = shuffle(t);
  } //end if

  // start the recursive sparks
  new Spark(map,t.pop(),t.pop(),t);

  // now close everything not close enough to river
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(map.isSquareEmptyOfWater({
        x1: sector.x-3,
        y1: sector.y-3,
        x2: sector.x+3,
        y2: sector.y+3
      })&&Math.random()<0.7){
        sector.setWall();
      }else if(!sector.isWater()&&Math.random()<0.1){
        sector.setObstruction();
      }
    });
  });

  // now that we've represented the map fully, lets find the largest walkable
  // space and fill in all the rest
  clipOrphaned(map);

  // lastly lets find all floor that's near water and give it a large chance
  // to be a corridor (sand)
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isWater()) return; //leave water alone
      let x = sector.x,y = sector.y;

      if(map.isInbounds({x:x-1,y})&&map.isWater({x:x-1,y})||
         map.isInbounds({x:x+1,y})&&map.isWater({x:x+1,y})||
         map.isInbounds({x,y:y-1})&&map.isWater({x,y:y-1})||
         map.isInbounds({x,y:y+1})&&map.isWater({x,y:y+1})){
        if(Math.random()<0.5) sector.setCorridor();
      } //end if
    });
  });
} //end function

// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()

// Traverse a location completely
function traverse(map,locStats,unmapped,x,y){
  let newLoc = null; //we pull from unmapped

  locStats.val=1; //set the current mas size to 1
  map.setRoom({x,y,id:locStats.cur});
  traverseLook(map,unmapped,x,y);
  while(unmapped.length>0){
    newLoc=unmapped.pop();
    traverseLook(map,unmapped,newLoc.x,newLoc.y);
    map.setRoom({x:newLoc.x,y:newLoc.y,id:locStats.cur});
    locStats.val++;
    if(locStats.val>locStats.max){
      locStats.max=locStats.val;
      locStats.num=locStats.cur;
    } //end manage maximum mass
  } //end while
} //end traverse()

//look around at location and push unmapped nodes to stack
function traverseLook(map,unmapped,x,y){
  if(x>0&&map.isWalkableOrEmpty({x:x-1,y})&&!map.getRoom({x:x-1,y})){
    unmapped.push({x: x-1, y});
    map.setRoom({x:x-1,y,id:-1});
  } //end if
  if(y>0&&map.isWalkableOrEmpty({x,y:y-1})&&!map.getRoom({x,y:y-1})){
    unmapped.push({x,y: y-1});
    map.setRoom({x,y:y-1,id:-1});
  } //end if
  if(x<map.width&&map.isWalkableOrEmpty({x:x+1,y})&&!map.getRoom({x:x+1,y})){
    unmapped.push({x: x+1, y});
    map.setRoom({x:x+1,y,id:-1});
  } //end if
  if(y<map.height&&map.isWalkableOrEmpty({x,y:y+1})&&!map.getRoom({x,y:y+1})){
    unmapped.push({x,y: y+1});
    map.setRoom({x,y:y+1,id:-1});
  } //end if
} //end traverseLook()

// Remove orphaned floors by iterating through all sectors
// and each time we find a floor we traverse from that section.
// the largest section traversed is what we keep
function clipOrphaned(map){
  let locStats = {val: 0,cur: 0,num: 0,max: 0},
      unmapped = [];

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isWalkableOrEmpty()&&!sector.roomNumber){
        locStats.cur++;
        traverse(map,locStats,unmapped,x,y);
      } //end if
    });
  });
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isWalkableOrEmpty()&&sector.roomNumber!==locStats.num){
        sector.setObstruction();
      }else if(sector.isWalkableOrEmpty()&&!sector.isWater()){
        sector.setFloor();
      } //end if
    });
  });
  console.log(locStats,map);
} //end clipOrphaned()
