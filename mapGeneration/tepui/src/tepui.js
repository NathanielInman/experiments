export function tepui(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(Math.random()<0.4){
        sector.setFloor()
      }else{
        sector.setWall();
      } //end if
    });
  });

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const nearby = map.getNeighbors({
              x: sector.x,y: sector.y,
              test(sector){
                return sector.isWall();
              }
            }).length,
            {x,y} = sector,
            {width,height} = map;

      if(nearby<5&&x>5&&x<width-5&&y>5&&y<height-5){
        sector.setFloorSpecial();
      } //end if
    });
  });

  // remove all but the center
  map.clipOrphaned({
    test: sector=> sector.isFloorSpecial(),
    failure: sector=> sector.setVoid(),
    success: sector=> sector.setFloor(),
    hardFailure: sector=> sector.setVoid()
  });

  const clone = map.clone();

  clone.sectors.forEach(row=>{
    row.forEach(sector=>{
      const nearby = clone.getNeighbors({
        x: sector.x,y: sector.y,orthogonal: false,
        test(sector){
          return sector.isFloor()
        }
      }).length;

      if(nearby&&Math.random()<0.5){
        map.setFloor({x: sector.x,y: sector.y});
      } //end if
    });
  });
} //end function
