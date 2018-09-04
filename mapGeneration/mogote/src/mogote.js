export function mogote(map){
  const sizeOfMogotes = map.width*map.height/8, //12.5%
        sparks = [];

  let cSize = 0,
      x = Math.floor(Math.random()*map.width/4+map.width/8*3),
      y = Math.floor(Math.random()*map.height/4+map.height/8*3);

  do{
    cSize++;
    map.setWallSpecial({x,y});
    if(map.isEmpty({x: x-1,y})) sparks.push({x: x-1,y});
    if(map.isEmpty({x: x+1,y})) sparks.push({x: x+1,y});
    if(map.isEmpty({x,y: y-1})) sparks.push({x,y: y-1});
    if(map.isEmpty({x,y: y+1})) sparks.push({x,y: y+1});
    if(sparks.length) ({x,y}=map.constructor.shuffle(sparks).pop());
  }while(cSize<sizeOfMogotes&&sparks.length)

  // now we'll create a map boundary that's fuzzy to contain
  // the player
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isWallSpecial()) return; //don't override
      const yd = Math.abs(y-map.height/2)/(map.height/2),
            xd = Math.abs(x-map.width/2)/(map.width/2),
            d = Math.sqrt(Math.pow(xd,2)+Math.pow(yd,2));

      let n = (1+map.noise.simplex2(sector.x/map.width*3,sector.y/map.height*3))/2;

      // d turns it into a circle
      n=(n+d)/2;
      if(n<0.2){
        sector.setWaterSpecial();
      }else if(n<0.3){
        sector.setWater();
      }else if(n<0.5){
        sector.setFloorSpecial();
      }else if(n>0.8){
        sector.setWallSpecial();
      }else if(n>0.7){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    }); //end for
  }); //end for

  // finally we'll clean up unwalkable sections
  map.clipOrphaned({
    test: sector=> sector.isWalkable(),
    failure: sector=> sector.setWallSpecial()
  });
} //end function
