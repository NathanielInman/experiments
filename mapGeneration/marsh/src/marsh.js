import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function marsh(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*2,sector.y/map.height*2))/2;

      if(n<0.15){
        sector.setWaterSpecial();
      }else if(n<0.3&&Math.random()<0.3){
        sector.setWall();
      }else if(n<0.3){
        sector.setWater();
      }else if(Math.random()<n-0.25){
        sector.setWall();
      }else if(n>0.7){
        sector.setFloor();
      }else{
        sector.setFloorSpecial();
      } //end if
    });
  });

  clipOrphaned(map);
} //end function

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
  const locStats = {val: 0,cur: 0,num: 0,max: 0},
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
