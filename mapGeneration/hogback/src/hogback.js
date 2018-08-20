export function hogback(map){
  const points = [],
        minD = 10,
        maxD = 20;

  let x1, y1, x2, y2;

  //horizontal or vertical deviance
  if(Math.random()<0.5){
    x1 = Math.floor(map.width/4+Math.random()*map.width/2);
    y1 = Math.floor(map.height/8+Math.random()*map.height/4);
    x2 = Math.floor(map.width/4+Math.random()*map.width/2);
    y2 = Math.floor(map.height/8*4+Math.random()*map.height/4);
  }else{
    x1 = Math.floor(map.width/8+Math.random()*map.width/4);
    y1 = Math.floor(map.height/4+Math.random()*map.height/2);
    x2 = Math.floor(map.width/8*4+Math.random()*map.width/4);
    y2 = Math.floor(map.height/4+Math.random()*map.height/2);
  } //end if

  while(points.length<4){
    const xd = Math.floor(minD+Math.random()*(maxD-minD) - maxD/2),
          yd = Math.floor(minD+Math.random()*(maxD-minD) - maxD/2);

    points.push({x1: x1+xd, y1: y1+yd, x2: x2+xd, y2: y2+yd});
  }

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(Math.random()<0.7){
        sector.setFloor()
      }else{
        sector.setWall();
      } //end if
    });
  });
  points.forEach(point=>{
    map.getNeighbors({x: point.x1,y: point.y1})
      .forEach(sector=> sector.setFloor());
    map.getNeighbors({x: point.x2,y: point.y2})
      .forEach(sector=> sector.setFloor());
  });
  points.forEach(point=>{
    map.setFloorSpecial({x: point.x1,y: point.y1});
    map.setFloorSpecial({x: point.x2,y: point.y2});
    map.findPath(point).forEach(sector=>{
      if(!sector.type) return; //no path
      map.getNeighbors({
        x: sector.x, y: sector.y, self: true,
        test(sector){
          return !sector.isWallSpecial();
        }
      }).forEach(sector=>{
        sector.setFloorSpecial();
        map.getNeighbors({
          x: sector.x,y: sector.y, size: 2,
          test(sector){
            return Math.random()<0.1&&!sector.isWallSpecial();
          }
        }).forEach(sector=>{
          sector.setFloorSpecial();
        });
      });
      if(Math.random()<0.8) sector.setWallSpecial();
    });
  });

  // remove all but the largest gully
  map.clipOrphaned(
    sector=> sector.isWalkable(),
    sector=> sector.setWallSpecial()
  );
} //end function
