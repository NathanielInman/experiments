export function caldera(map){
  const calderaSize = map.width*map.height/10,
        sparks = [],
        filled = Math.random()<0.5;

  // first lets create the caldera itself
  let x = Math.floor(map.width/3+Math.random()*map.width/3),
      y = Math.floor(map.height/3+Math.random()*map.height/3),
      size = 0;

  do{
    size++;
    if(filled){
      map.setWater({x,y});
    }else{
      map.setFloorSpecial({x,y});
    } //end if
    if(map.isInbounds({x: x-1,y})&&map.isEmpty({x: x-1,y})){
      sparks.push({x: x-1,y});
    } //end if
    if(map.isInbounds({x: x+1,y})&&map.isEmpty({x: x+1,y})){
      sparks.push({x: x+1,y});
    } //end if
    if(map.isInbounds({x, y: y-1})&&map.isEmpty({x,y: y-1})){
      sparks.push({x,y: y-1});
    } //end if
    if(map.isInbounds({x, y: y+1})&&map.isEmpty({x,y: y+1})){
      sparks.push({x,y: y+1});
    } //end if
    if(sparks.length) ({x,y}=map.constructor.shuffle(sparks).pop());
  }while(size<calderaSize&&sparks.length)

  // now we'll create a map boundary that's fuzzy to contain
  // the player
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(!sector.isEmpty()) return; //don't override
      const yd = Math.abs(y-map.height/2)/(map.height/2),
            xd = Math.abs(x-map.width/2)/(map.width/2),
            d = Math.sqrt(Math.pow(xd,2)+Math.pow(yd,2)),
            r1 = Math.random(),
            r2 = Math.random();

      // d turns it into a circle
      if(r1<d-0.5||r2<0.05){
        sector.setWall();
      }else if(
        filled&&
        map.getNeighbors({
          x: sector.x,y: sector.y, size: 2,
          test(sector){
            return sector.isWater()&&Math.random()<0.5;
          }
        }).length
      ){
        sector.setFloorSpecial();
      }else{
        sector.setFloor();
      } //end if
    }); //end for
  }); //end for

  // now that we've represented the map fully, lets find the largest walkable
  // space and fill in all the rest
  map.clipOrphaned({
    test: sector=> sector.isWalkable()||sector.isEmpty(),
    failure: sector=> sector.setWallSpecial(),
    success: sector=>{
      if(!sector.isWalkable()) sector.setFloor();
    }
  });
} //end function
