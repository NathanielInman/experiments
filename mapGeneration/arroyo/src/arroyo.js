import {Noise} from 'noisejs';
import {shuffle} from './shuffle';

const noise = new Noise(Math.random());

export function arroyo(map){
  const d = Math.random()<0.5,
        h = d?2:10,
        v = d?10:2;

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*h,sector.y/map.height*v))/2;

      if(n<0.4&&Math.random()<0.4){
        sector.setWall()
      }else if(n<0.4){
        sector.setFloor();
      }else if(n>0.5&&Math.random()<0.4){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    });
  });

  // now remove unwalkable
  map.clipOrphaned(
    sector=> sector.isWalkable(),
    sector=> sector.setWallSpecial()
  );

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

  let x,y;

  // get the start position, set water and save it
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  const x1 = x, y1 = y;

  // get the end position, set water
  ({x,y}=getValidTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  const x2 = x, y2 = y;

  // now we'll draw the path between the points
  map.findPath({x1,y1,x2,y2}).forEach(sector=>{
    const x = sector.x, y = sector.y;

    map.setWater({x,y});
    map.getNeighbors({
      x, y, self: true, orthogonal: false,
      test(sector){
        return sector.isWalkable();
      }
    }).forEach(sector=> sector.setWater());
    map.getNeighbors({
      x, y, cardinal: false, size: 2,
      test(sector){
        return sector.isWalkable()&&!sector.isWater();
      }
    }).forEach(sector=>{
      sector.setFloorSpecial();

      // small chance to venture slightly further
      if(Math.random()<0.5){
        map.getNeighbors({
          x: sector.x, y: sector.y, size: 2,
          test(sector){
            return sector.isWalkable()&&
              !sector.isWater()&&!sector.isFloorSpecial();
          }
        }).forEach(sector=> Math.random()<0.5?sector.setFloorSpecial():null);
      } //end if
    });
  });

  // convert gulch to arroyo
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isFloorSpecial()){
        sector.setFloor();
      }else if(sector.isFloor()){
        sector.setFloorSpecial();
      }else if(sector.isWall()&&Math.random()<0.3){
        sector.setFloor();
      } //end if
    });
  });

  // now remove unwalkable
  map.clipOrphaned(
    sector=> sector.isWalkable(),
    sector=> sector.setWallSpecial()
  );
} //end function

function getValidTerminalPoint(map,{xmin,xmax,ymin,ymax}){
  let x, y;

  do{
    x = Math.floor(xmin+Math.random()*(xmax-xmin));
    y = Math.floor(ymin+Math.random()*(ymax-ymin));
  }while(!map.isWalkable({x,y}))
  return {x,y};
} //end getValidTerminalPoint()
