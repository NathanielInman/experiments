import {shuffle} from './shuffle';

export function butte(map){
  const butteSize = map.width*map.height/5, //20%
        butte = [];

  let x, y, sparks = [], cSize = 0;

  // first create the butte
  x = Math.floor(map.width/4+Math.random()*map.width/2);
  y = Math.floor(map.height/4+Math.random()*map.height/2);
  sparks = [];
  do{
    cSize++;
    map.setWallSpecial({x,y});
    butte.push({x,y});
    if(map.isEmpty({x: x-1,y})) sparks.push({x: x-1,y});
    if(map.isEmpty({x: x+1,y})) sparks.push({x: x+1,y});
    if(map.isEmpty({x,y: y-1})) sparks.push({x,y: y-1});
    if(map.isEmpty({x,y: y+1})) sparks.push({x,y: y+1});
    if(sparks.length) ({x,y}=shuffle(sparks).pop());
  }while(cSize<butteSize&&sparks.length)

  // now we'll create a map boundary that's fuzzy to contain
  // the player
  for(let y=0,yd;y<map.height;y++){
    for(let x=0,xd,r1,r2,d;x<map.width;x++){
      if(map.isWallSpecial({x,y})) continue; //don't override

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
  map.clipOrphaned(
    sector=> sector.isEmpty(),
    sector=> sector.setWall(),
    sector=> sector.setFloor()
  );

  // now we'll mark the center of the butte for removal
  butte.forEach(sector=>{
    const {x,y} = sector;

    if(
      map.isInbounds({x: x-1,y})&&!map.isWalkable({x: x-1,y})&&
      map.isInbounds({x: x+1,y})&&!map.isWalkable({x: x+1,y})&&
      map.isInbounds({x,y: y-1})&&!map.isWalkable({x,y: y-1})&&
      map.isInbounds({x,y: y+1})&&!map.isWalkable({x,y: y+1})&&
      map.isInbounds({x: x-1,y: y-1})&&!map.isWalkable({x: x-1,y: y-1})&&
      map.isInbounds({x: x+1,y: y-1})&&!map.isWalkable({x: x+1,y: y-1})&&
      map.isInbounds({x: x-1,y: y+1})&&!map.isWalkable({x: x-1,y: y+1})&&
      map.isInbounds({x: x+1,y: y+1})&&!map.isWalkable({x: x+1,y: y+1})
    ){
      sector.remove = true;
    } //end if
  });

  // finally we'll remove all the center that's marked
  butte.filter(s=>s.remove).forEach(sector=>{
    map.setFloorSpecial({x,y}=sector);
  });

  // now we'll make the entrance to the butte
  butte.filter(s=>!s.remove).some(sector=>{
    let {x,y} = sector;

    if(
      map.isInbounds({x: x-1,y})&&map.isWalkable({x: x-1,y})&&
      map.isInbounds({x: x+1,y})&&map.isWalkable({x: x+1,y})
    ){
      map.setDoor({x,y}=sector);
      return true;
    }else if(
      map.isInbounds({x,y: y-1})&&map.isWalkable({x,y: y-1})&&
      map.isInbounds({x,y: y+1})&&map.isWalkable({x,y: y+1})
    ){
      map.setDoor({x,y}=sector);
      return true;
    } //end if
    return false;
  });
} //end function
