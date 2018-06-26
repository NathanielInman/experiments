// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()

export function bornhardt(map){
 let numberOfBornhardts = Math.floor(2+Math.random()*4),
      sizeOfBornhardts = map.width*map.height/50; //2%

  // first create all the bornhardts
  for(let i=0,x,y,sparks,cSize;i<numberOfBornhardts;i++){
    x = Math.floor(map.width/4+Math.random()*map.width/2);
    y = Math.floor(map.height/4+Math.random()*map.height/2);
    cSize = 0;
    sparks = [];
    do{
      cSize++;
      map.setObstruction({x,y});
      if(map.isEmpty({x:x-1,y})) sparks.push({x:x-1,y});
      if(map.isEmpty({x:x+1,y})) sparks.push({x:x+1,y});
      if(map.isEmpty({x,y:y-1})) sparks.push({x,y:y-1});
      if(map.isEmpty({x,y:y+1})) sparks.push({x,y:y+1});
      if(sparks.length) ({x,y}=shuffle(sparks).pop());
    }while(cSize<sizeOfBornhardts&&sparks.length)
  } //end for

  // now we'll create a map boundary that's fuzzy to contain
  // the player
  for(let y=0,yd;y<map.height;y++){
    for(let x=0,xd,r1,r2,d;x<map.width;x++){
      if(map.isObstruction({x,y})) continue; //don't override

      // we get this distance from the axis to the sides
      // and then appropriate the ratio so that points
      // closer to the edge have a higher yield of being
      // a wall.
      yd = Math.abs(y-map.height/2)/(map.height/2);
      xd = Math.abs(x-map.width/2)/(map.width/2);
      d = Math.sqrt(Math.pow(xd,2)+Math.pow(yd,2));
      r1 = Math.random();
      r2 = Math.random();

      // d turns it into a circle
      if(r1<d-0.5||r2<0.05) map.setWall({x,y});
    } //end for
  } //end for

  // now that we've represented the map fully, lets
  // find the largest walkable space and fill in all the
  // rest
  clipOrphaned(map);
} //end function

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
  if(x>0&&map.isEmpty({x:x-1,y})&&!map.getRoom({x:x-1,y})){
    unmapped.push({x: x-1, y});
    map.setRoom({x:x-1,y,id:-1});
  } //end if
  if(y>0&&map.isEmpty({x,y:y-1})&&!map.getRoom({x,y:y-1})){
    unmapped.push({x,y: y-1});
    map.setRoom({x,y:y-1,id:-1});
  } //end if
  if(x<map.width&&map.isEmpty({x:x+1,y})&&!map.getRoom({x:x+1,y})){
    unmapped.push({x: x+1, y});
    map.setRoom({x:x+1,y,id:-1});
  } //end if
  if(y<map.height&&map.isEmpty({x,y:y+1})&&!map.getRoom({x,y:y+1})){
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
      if(!sector.isEmpty()&&!sector.roomNumber){
        locStats.cur++;
        traverse(map,locStats,unmapped,x,y);
      } //end if
    });
  });
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(!sector.isEmpty()&&sector.roomNumber!==locStats.num){
        sector.setWall();
      }else if(sector.isEmpty()){
        sector.setFloor();
      } //end if
    });
  });
  console.log(map);
} //end clipOrphaned()
