import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function gully(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*10,sector.y/map.height*10))/2,
            n2 = (1+noise.simplex2(sector.x/map.width*2,sector.y/map.height*10))/2;

      if(n2<0.3){
        sector.setFloorSpecial();
      }else if(Math.random()<n-0.25){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    });
  });
  map.clipOrphaned(sector=> sector.isWalkable(),sector=> sector.setWater());
} //end function
