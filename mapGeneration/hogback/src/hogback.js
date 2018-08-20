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

export function hogback(map){
  const d = Math.random()<0.5,
        h = d?2:10,
        v = d?10:2;

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*h,sector.y/map.height*v))/2;

      if(n<0.5&&Math.random()<0.5){
        sector.setWall()
      }else if(n<0.5){
        sector.setFloorSpecial();
      }else if(n>0.6&&Math.random()<0.5){
        sector.setWall();
      }else{
        sector.setFloorSpecial();
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
  ({x,y}=getTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  const x1 = x, y1 = y;

  // get the centroid of the open area and use it for center of river
  const walkable = map.sectors.reduce((p,n)=>{
          return [].concat(p,n.filter(sector=> sector.isWalkable()))
        },[]),
        centroid = walkable.reduce((p,n)=>{
          return {x: p.x+n.x,y: p.y+n.y};
        },{x: 0, y: 0});

  const x2 = Math.floor(centroid.x/walkable.length),
        y2 = Math.floor(centroid.y/walkable.length);

  // get the end position, set water
  ({x,y}=getTerminalPoint(map,terminalPositions.pop()));
  map.setWater({x,y});
  const x3 = x, y3 = y;

  map.drunkenPath({
    x1,y1,x2,y2,wide: true,
    draw(sector){
      sector.setWater();
      map.getNeighbors({
        x: sector.x,y: sector.y,size: 2,
        test(sector){
          return sector.isWalkable()&&!sector.isWater();
        }
      }).forEach(sector=> sector.setFloor());
    }
  });
  map.drunkenPath({
    x1: x2,y1: y2,x2: x3, y2: y3, wide: true,
    draw(sector){
      sector.setWater();
      map.getNeighbors({
        x: sector.x, y: sector.y,size: 2,
        test(sector){
          return sector.isWalkable()&&!sector.isWater();
        }
      }).forEach(sector=> sector.setFloor());
    }
  });
} //end function

function getTerminalPoint(map,{xmin,xmax,ymin,ymax}){
  return {
    x: Math.floor(xmin+Math.random()*(xmax-xmin)),
    y: Math.floor(ymin+Math.random()*(ymax-ymin))
  };
} //end getValidTerminalPoint()
