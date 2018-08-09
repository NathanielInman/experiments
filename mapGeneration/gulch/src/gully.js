import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function gully(map){
  const d = Math.random()<0.5,
        h = d?2:10,
        v = d?10:2;

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*h,sector.y/map.height*v))/2;

      if(n<0.4){
        sector.setFloorSpecial();
      }else if(n>0.5&&Math.random()<0.4){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    });
  });

  // remove all but the largest gully
  map.clipOrphaned(
    sector=> sector.isFloorSpecial(),
    sector=> Math.random()<0.4?sector.setWall():sector.setFloor()
  );

  // now remove unwalkable
  map.clipOrphaned(
    sector=> sector.isWalkable(),
    sector=> sector.setWallSpecial()
  );
} //end function
