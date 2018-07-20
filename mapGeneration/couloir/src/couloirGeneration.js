import {Noise} from 'noisejs';

const noise = new Noise(Math.random());

export function couloir(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(noise.simplex2(sector.x/map.width*5,sector.y/map.height*5)<0.05){
        sector.setFloor();
      }else{
        sector.setWall();
      } //end if
    });
  });
} //end function
