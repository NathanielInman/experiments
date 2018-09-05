export function fjord(map){
  const sinkholes = [];

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+map.noise.simplex2(sector.x/map.width*12,sector.y/map.height*12))/2;

      if(n<0.1){
        sinkholes.push(sector);
      }else if(n>0.8){
        sector.setWallSpecial();
      }else if(n>0.6){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    }); //end for
  }); //end for

  sinkholes.forEach(sector=>{
    map.getNeighbors({
      x: sector.x, y: sector.y, size: 2,
      test(sector){
        return sector.isFloor();
      }
    }).forEach(sector=>{
      if(Math.random()<0.5){
        sector.setFloorSpecial();
      }else if(Math.random()<0.5){
        sector.setEmpty();
      } //end if
    })
  });

  // finally we'll clean up unwalkable sections
  map.clipOrphaned({
    test: sector=> sector.isWalkable(),
    failure: sector=> sector.setWallSpecial()
  });
} //end function
