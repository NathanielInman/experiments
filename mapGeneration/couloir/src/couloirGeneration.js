import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function couloir(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = noise.simplex2(sector.x/map.width*5,sector.y/map.height*5);

      if(n<0.05&&Math.random()<0.1){
        sector.setFloorSpecial();
      }else if(n<0.05&&Math.random()<0.95){
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
    failure: sector=> sector.setWall()
  });
} //end function
