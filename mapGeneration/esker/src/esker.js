export function esker(map){
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      let {x,y} = sector, n;

      // Weight: 1
      // random noise map weight
      n = (1+map.noise.simplex2(x/map.width*x,y/map.height*y))/2;

      // Weight: 2
      // this weights things by how close to the center of map they are
      n += 1.7*((
        1-Math.sqrt(Math.pow(map.width/2-x,2)+Math.pow(map.height/2-y,2))
        /
        Math.sqrt(Math.pow(map.width/2,2)+Math.pow(map.height/2,2))
      ));

      n/=3;
      if(n<0.5){
        sector.setWall();
      }else{
        sector.setFloor();
      } //end if
    });
  });
} //end function
