export function marsh(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+map.noise.simplex2(sector.x/map.width*2,sector.y/map.height*2))/2;

      if(n<0.15){
        sector.setWaterSpecial();
      }else if(n<0.3&&Math.random()<0.3){
        sector.setWall();
      }else if(n<0.3){
        sector.setWater();
      }else if(Math.random()<n-0.25){
        sector.setWall();
      }else if(n>0.7){
        sector.setFloor();
      }else{
        sector.setFloorSpecial();
      } //end if
    });
  });

  map.clipOrphaned({
    test: sector=> sector.isWalkable()||sector.isEmpty(),
    failure: sector=> sector.setWallSpecial()
  });
} //end function
