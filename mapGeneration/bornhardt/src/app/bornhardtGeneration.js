import {shuffle} from './shuffle';

export function bornhardt(map){
  const numberOfBornhardts = Math.floor(2+Math.random()*4),
        sizeOfBornhardts = map.width*map.height/50; //2%

  // first create all the bornhardts
  for(let i=0,x,y,sparks,cSize;i<numberOfBornhardts;i++){
    x = Math.floor(map.width/4+Math.random()*map.width/2);
    y = Math.floor(map.height/4+Math.random()*map.height/2);
    cSize = 0;
    sparks = [];
    do{
      cSize++;
      map.setWallSpecial({x,y});
      if(map.isEmpty({x: x-1,y})) sparks.push({x: x-1,y});
      if(map.isEmpty({x: x+1,y})) sparks.push({x: x+1,y});
      if(map.isEmpty({x,y: y-1})) sparks.push({x,y: y-1});
      if(map.isEmpty({x,y: y+1})) sparks.push({x,y: y+1});
      if(sparks.length) ({x,y}=shuffle(sparks).pop());
    }while(cSize<sizeOfBornhardts&&sparks.length)
  } //end for

  // now we'll create a map boundary that's fuzzy to contain
  // the player
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isWallSpecial()) return; //don't override
      const yd = Math.abs(y-map.height/2)/(map.height/2),
            xd = Math.abs(x-map.width/2)/(map.width/2),
            d = Math.sqrt(Math.pow(xd,2)+Math.pow(yd,2)),
            r1 = Math.random(),
            r2 = Math.random();

      // d turns it into a circle
      if(r1<d-0.5||r2<0.05) sector.setWall();
    }); //end for
  }); //end for

  // now that we've represented the map fully, lets
  // find the largest walkable space and fill in all the
  // rest
  map.clipOrphaned(
    sector=> sector.isEmpty(),
    sector=> sector.setWallSpecial(),
    sector=> sector.setFloor()
  );
} //end function
