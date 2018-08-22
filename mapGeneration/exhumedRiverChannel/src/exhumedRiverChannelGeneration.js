import {shuffle} from './shuffle';

export function exhumedRiverChannel(map){
  const terminalPositions = shuffle([
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
      const n = (1+map.noise.simplex2(sector.x/map.width*10,sector.y/map.height*10))/2;

      if(n<0.6){
        sector.setFloor();
      }else{
        sector.setWall();
      } //end if
    });
  });
  map.clipOrphaned({
    test: sector=> sector.isWalkable()||sector.isEmpty(),
    failure: sector=> sector.setWallSpecial()
  });

  let x,y;

  // get the start position, set water and save it
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  const x1 = x, y1 = y;

  // get the end position, set water
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  let x2 = x, y2 = y;

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
      if(map.isSquare({
        x1: sector.x-3,
        y1: sector.y-3,
        x2: sector.x+3,
        y2: sector.y+3,
        hard: false,
        test(sector){
          return sector.isWater();
        }
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

  map.clipOrphaned({
    test: sector=> sector.isWalkable()||sector.isEmpty(),
    failure: sector=> sector.setWallSpecial()
  });
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
  const x = sector.x, y = sector.y;

  let n=false,s=false,e=false,w=false;

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
