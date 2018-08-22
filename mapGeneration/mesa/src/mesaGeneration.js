import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function mesa(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n1 = noise.perlin2(sector.x/map.width*12,sector.y/map.height*10),
            n2 = noise.perlin2(sector.x/map.width*6,sector.y/map.height*6),
            n = (n1+n2)/2;

      if(n<0.05&&Math.random()<0.95){
        sector.setFloor();
      }else if(n<0.05){
        sector.setWallSpecial();
      }else if(n<0.2||Math.random()<0.2){
        sector.setWallSpecial();
      }else{
        sector.setWall();
      } //end if
    });
  });

  // clip all non-walkable parts of the map away
  map.clipOrphaned({
    test: sector=> sector.isWalkable()||sector.isEmpty(),
    failure: sector=> sector.setWallSpecial()
  });
} //end function
