import {Map} from './Map';

const ri = (lint,uint)=> Math.floor(Math.random()*(uint-lint))+lint;

// wikipedia.org/wiki/Conway%27s_Game_of_Life
function conwayGameOfLife(map,map2){
  let mooresNeighborhood;

  for(let y=0;y<map.height;y++){
    for(let x=0;x<map.width;x++){
      mooresNeighborhood=getMooresNeighborhood(map,map2,x,y);
      if(map2.isFloor(x,y)){
        if(mooresNeighborhood>=4){
          map.setFloor(x,y);
        }else{
          map.setEmpty(x,y);
        } //end if
      }else if(mooresNeighborhood>=5){
        map.setFloor(x,y);
      }else{
        map.setEmpty(x,y);
      } //end if
    } //end for
  } //end for
} //end conwayGameOfLife()

// it gets the number of living cells nearby.
// living cells to us mean sectors that are floors
function getMooresNeighborhood(map,map2,x,y){
  let result=0;

  if(x>0&&y>0&&map2.isFloor(x-1,y-1)) result++;
  if(x>0&&map2.isFloor(x-1,y)) result++;
  if(x>0&&y<map.height&&map2.isFloor(x-1,y+1)) result++;
  if(y>0&&map2.isFloor(x,y-1)) result++;
  if(y<map.height&&map2.isFloor(x,y+1)) result++;
  if(x<map.width&&y>0&&map2.isFloor(x+1,y-1)) result++;
  if(x<map.width&&map2.isFloor(x+1,y)) result++;
  if(x<map.width&&y<map.height&&map2.isFloor(x+1,y+1)) result++;
  return result;
} //end testSides()

// Surround all floors traversable with walls and convert floors near
// map edges to walls
function buildWalls(map){
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isFloor){
        if(x>0&&map.isEmpty(x-1,y)) map.setWall(x-1,y);
        if(x<map.width&&map.isEmpty(x+1,y)) map.setWall(x+1,y);
        if(y>0&&map.isEmpty(x,y-1)) map.setWall(x,y-1);
        if(y<map.height&&map.isEmpty(x,y+1)) map.setWall(x,y+1);
        if(x>0&&y>0&&map.isEmpty(x-1,y-1)) map.setWall(x-1,y-1);
        if(x<map.width&&y<map.height&&map.isEmpty(x+1,y+1)){
          map.setWall(x+1,y+1);
        } //end if
        if(x>0&&y<map.height&&map.isEmpty(x-1,y+1)){
          map.setWall(x-1,y+1);
        } //end if
        if(x<map.width&&y>0&&map.isEmpty(x+1,y-1)){
          map.setWall(x+1,y-1);
        } //end if
        if(x===0||x===map.width-1||y===0||y===map.height-1){
          map.setWall(x,y);
        } //end if
      } //end if
    });
  });
} //end buildWalls()

//look around at location and push unmapped nodes to stack
function traverseLook(map,unmapped,x,y){
  if(x>0&&map.isFloor(x-1,y)&&!map.loc(x-1,y)){
    unmapped.push({x: x-1, y});
    map.setLoc(x-1,y,-1);
  } //end if
  if(y>0&&map.isFloor(x,y-1)&&!map.loc(x,y-1)){
    unmapped.push({x,y: y-1});
    map.setLoc(x,y-1,-1);
  } //end if
  if(x<map.width&&map.isFloor(x+1,y)&&!map.loc(x+1,y)){
    unmapped.push({x: x+1, y});
    map.setLoc(x+1,y,-1);
  } //end if
  if(y<map.height&&map.isFloor(x,y+1)&&!map.loc(x,y+1)){
    unmapped.push({x,y: y+1});
    map.setLoc(x,y+1,-1);
  } //end if
} //end traverseLook()

// Traverse a location completely
function traverse(map,locStats,unmapped,x,y){
  let newLoc = null; //we pull from unmapped

  locStats.val=1; //set the current mas size to 1
  map.setLoc(x,y,locStats.cur);
  traverseLook(map,unmapped,x,y);
  while(unmapped.length>0){
    newLoc=unmapped.pop();
    traverseLook(map,unmapped,newLoc.x,newLoc.y);
    map.setLoc(newLoc.x,newLoc.y,locStats.cur);
    locStats.val++;
    if(locStats.val>locStats.max){
      locStats.max=locStats.val;
      locStats.num=locStats.cur;
    } //end manage maximum mass
  } //end while
} //end traverse()

// Remove orphaned floors by iterating through all sectors
// and each time we find a floor we traverse from that section.
// the largest section traversed is what we keep
function clipOrphaned(map){
  let locStats = {val: 0,cur: 0,num: 0,max: 0},
      unmapped = [];

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isFloor()&&!sector.loc){
        locStats.cur++;
        traverse(map,locStats,unmapped,x,y);
      } //end if
    });
  });
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isFloor()&&sector.loc!==locStats.num) sector.setRemoved();
    });
  });
} //end clipOrphaned()

export function AGC(map,inputDensity){
  let map2 = new Map(map.width,map.height),
      density = inputDensity||55;

  // Start off by creating the secondary map
  // and generating some noise on the two maps
  for(let y=0;y<map.height;y++){
    for(let x=0;x<map.width;x++){
      map.setEmpty(x,y);
      map2.setEmpty(x,y);
      if(ri(0,100)<density) map2.setFloor(x,y);
    } //end for
  } //end for
  conwayGameOfLife(map,map2);
  clipOrphaned(map);
  buildWalls(map);
  return true;
} //end AGC()
