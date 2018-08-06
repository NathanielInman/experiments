import {Noise} from 'noisejs';

// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()

const noise = new Noise(Math.random());

export function exhumedRiverChannel(map){
  let x,y,x1,y1,x2,y2,terminalPositions = shuffle([
    {
      xmin: 0,
      xmax: 0,
      ymin: Math.floor(map.height/4),
      ymax: Math.floor(map.height/4*3)
    },
    {
      xmin: map.width-1,
      xmax: map.width-1,
      ymin: Math.floor(map.height/4),
      ymax: Math.floor(map.height/4*3)
    },
    {
      xmin: Math.floor(map.width/4),
      xmax: Math.floor(map.width/4*3),
      ymin: 0,
      ymax: 0
    },
    {
      xmin: Math.floor(map.width/4),
      xmax: Math.floor(map.width/4*3),
      ymin: map.height-1,
      ymax: map.height-1
    }
  ]);

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      let n = (1+noise.simplex2(sector.x/map.width*10,sector.y/map.height*10))/2;

      if(n<0.6){
        sector.setFloor();
      }else{
        sector.setWall();
      } //end if
    });
  });
  clipOrphaned(map);

  // get the start position, set water and save it
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  x1 = x; y1 = y;

  // get the end position, set water
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  x2 = x; y2 = y;

  // now we'll draw the path between the points
  map.findPath({x1,y1,x2,y2}).forEach(sector=> drawPath(map,sector));

  // 50% chance to have a forked river
  if(Math.random()<0.5){
    ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
    map.setWater({x,y});
    x2 = x; y2 = y;

    // now we'll draw the fork of the path
    map.findPath({x1,y1,x2,y2}).forEach(sector=> drawPath(map,sector));
  } //end if

  // now close everything not close enough to the exhumed channel
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(map.isSquareEmptyOfWater({
        x1: sector.x-3,
        y1: sector.y-3,
        x2: sector.x+3,
        y2: sector.y+3
      })&&Math.random()<0.6){
        sector.setWall();
      }else if(!sector.isWater()&&Math.random()<0.1){
        sector.setWallSpecial();
      }else if(sector.isWater()){
        sector.setFloorSpecial();
      }else if(!sector.isWater()){
        sector.setFloor();
      } //end if
    });
  });

  clipOrphaned(map);
} //end function

function getValidTerminalPoint(map,{xmin,xmax,ymin,ymax}){
  let x, y;

  do{
    x = Math.floor(xmin+Math.random()*(xmax-xmin));
    y = Math.floor(ymin+Math.random()*(ymax-ymin));
  }while(!map.isWalkable({x,y}))
  return {x,y};
} //end getValidTerminalPoint()

//eslint-disable-next-line complexity
function drawPath(map, sector){
  let n=false,s=false,e=false,w=false,
      x = sector.x, y = sector.y;

  map.setWater({x,y});
  if(map.isInbounds({x: x-1,y})&&map.isWalkable({x: x-1,y})){
    if(Math.random()<0.5){
      map.setWater({x: x-1,y});
      w = true;
    } //end if
  } //end if
  if(map.isInbounds({x: x+1,y})&&map.isWalkable({x: x+1,y})){
    if(Math.random()<0.5){
      map.setWater({x: x+1,y});
      e = true;
    } //end if
  } //end if
  if(map.isInbounds({x,y: y-1})&&map.isWalkable({x,y: y-1})){
    if(Math.random()<0.5){
      map.setWater({x,y: y-1});
      n = true;
    } //end if
  } //end if
  if(map.isInbounds({x,y: y+1})&&map.isWalkable({x,y: y+1})){
    if(Math.random()<0.5){
      map.setWater({x,y: y+1});
      s = true;
    } //end if
  } //end if
  if(map.isInbounds({x: x+1,y: y-1})&&map.isWalkable({x: x+1,y: y-1})&&(n||e)){
    if(Math.random()<0.5) map.setWater({x: x+1,y: y-1});
  } //end if
  if(map.isInbounds({x: x+1,y: y+1})&&map.isWalkable({x: x+1,y: y+1})&&(s||e)){
    if(Math.random()<0.5) map.setWater({x: x+1,y: y+1});
  } //end if
  if(map.isInbounds({x: x-1,y: y+1})&&map.isWalkable({x: x-1,y: y+1})&&(s||w)){
    if(Math.random()<0.5) map.setWater({x: x-1,y: y+1});
  } //end if
  if(map.isInbounds({x: x-1,y: y-1})&&map.isWalkable({x: x-1,y: y-1})&&(n||w)){
    if(Math.random()<0.5) map.setWater({x: x-1,y: y-1});
  } //end if
} //end drawPath()

// Traverse a location completely
function traverse(map,locStats,unmapped,x,y){
  let newLoc = null; //we pull from unmapped

  locStats.val=1; //set the current mas size to 1
  map.setRoom({x,y,id: locStats.cur});
  traverseLook(map,unmapped,x,y);
  while(unmapped.length>0){
    newLoc=unmapped.pop();
    traverseLook(map,unmapped,newLoc.x,newLoc.y);
    map.setRoom({x: newLoc.x,y: newLoc.y,id: locStats.cur});
    locStats.val++;
    if(locStats.val>locStats.max){
      locStats.max=locStats.val;
      locStats.num=locStats.cur;
    } //end manage maximum mass
  } //end while
} //end traverse()

//look around at location and push unmapped nodes to stack
function traverseLook(map,unmapped,x,y){
  if(x>0&&map.isWalkableOrEmpty({x: x-1,y})&&!map.getRoom({x: x-1,y})){
    unmapped.push({x: x-1, y});
    map.setRoom({x: x-1,y,id: -1});
  } //end if
  if(y>0&&map.isWalkableOrEmpty({x,y: y-1})&&!map.getRoom({x,y: y-1})){
    unmapped.push({x,y: y-1});
    map.setRoom({x,y: y-1,id: -1});
  } //end if
  if(x<map.width-1&&map.isWalkableOrEmpty({x: x+1,y})&&!map.getRoom({x: x+1,y})){
    unmapped.push({x: x+1, y});
    map.setRoom({x: x+1,y,id: -1});
  } //end if
  if(y<map.height-1&&map.isWalkableOrEmpty({x,y: y+1})&&!map.getRoom({x,y: y+1})){
    unmapped.push({x,y: y+1});
    map.setRoom({x,y: y+1,id: -1});
  } //end if
} //end traverseLook()

// Remove orphaned floors by iterating through all sectors
// and each time we find a floor we traverse from that section.
// the largest section traversed is what we keep
function clipOrphaned(map){
  let locStats = {val: 0,cur: 0,num: 0,max: 0},
      unmapped = [];

  // we have to start by removing roomNumbers if they exist because
  // we run this function more than once
  map.sectors.forEach(row=>{

    //eslint-disable-next-line no-return-assign
    row.forEach(sector=> sector.roomNumber = 0);
  });
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
        sector.setWallSpecial();
      } //end if
    });
  });
} //end clipOrphaned()
