import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function exhumedRiverChannel(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+noise.simplex2(sector.x/map.width*10,sector.y/map.height*10))/2;

      if(n<0.6){
        sector.setFloor();
      }else{
        sector.setWall();
      } //end if
    });
  });
} //end function
