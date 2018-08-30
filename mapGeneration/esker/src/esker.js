import {Noise} from 'noisejs';

export function esker(map){

  // start by making the eskers themselves
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const {x,y} = sector;

      let n; // noise variable defines depth

      // Weight: 2
      // random noise map weight (small-sized)
      n = (1+map.noise.simplex2(x/map.width*10,y/map.height*10));

      // Weight: 1
      // this weights things by how close to the center of map they are
      n += 1*((
        1-Math.sqrt(Math.pow(map.width/2-x,2)+Math.pow(map.height/2-y,2))
        /
        Math.sqrt(Math.pow(map.width/2,2)+Math.pow(map.height/2,2))
      ));

      // average the weight
      n/=3;

      // the noise is between 0 and 1
      if(n<0.6){
        sector.setFloor();
      }else if(n<0.80){
        sector.setFloorSpecial();
      }else if(n<0.90){
        sector.setWall();
      }else{
        sector.setWallSpecial();
      } //end if
    });
  });

  // now we'll populate some noise obstructions to make it interesting
  // we need to start by reseting the nosie map so it doesn't match
  map.noise = new Noise(Math.random());
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const {x,y} = sector;

      let n; //noise variable defines depth

      // Weight: 1
      // random noise map widght (large-sized)
      n = (1+map.noise.simplex2(x/map.width*5,y/map.height*5))/2;

      // Weight: 1
      // This weights things by how far from teh center of map they are
      n += 1*((
        Math.sqrt(Math.pow(map.width/2-x,2)+Math.pow(map.height/2-y,2))
        /
        Math.sqrt(Math.pow(map.width/2,2)+Math.pow(map.height/2,2))
      ));

      n/=2;

      // the noise is between 0 and 1
      if(n>0.8){
        sector.setWallSpecial()
      }else if(n>0.68){
        sector.setWall();
      } //end if
    });
  });

  // now remove all orphaned areas from map
  map.clipOrphaned({
    test: sector=> sector.isWalkable(),
    failure: sector=> sector.setWall()
  })
} //end function
