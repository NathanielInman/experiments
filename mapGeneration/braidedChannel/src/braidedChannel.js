export function braidedChannel(map){
  let x1,y1,x2,y2,direction=Math.random(),water=[];

  if(direction<0.25){
    direction = 'horizontal';
  }else if(direction<0.5){
    direction = 'vertical';
  }else if(direction<0.75){
    direction = 'forward';
  }else{
    direction = 'backward';
  } //end if

  for(let rivers=0;rivers<Math.floor(5+Math.random()*5);rivers++){
    if(direction==='horizontal'){
      x1 = 0;
      x2 = map.width-1;
      y1 = Math.floor(Math.random()*map.height/2+map.height/4);
      y2 = Math.floor(Math.random()*map.height/2+map.height/4);
    }else if(direction==='vertical'){
      x1 = Math.floor(Math.random()*map.width/2+map.width/4);
      x2 = Math.floor(Math.random()*map.width/2+map.width/4);
      y1 = 0;
      y2 = map.height-1;
    }else if(direction==='forward'){
      if(Math.random()<0.5){ // most eastward
        x1 = Math.floor(Math.random()*map.width/4);
        x2 = map.width-1;
        y1 = map.height-1;
        y2 = Math.floor(Math.random()*map.height/4);
      }else{
        x1 = 0;
        x2 = Math.floor(Math.random()*map.width/4+map.width/2);
        y1 = Math.floor(Math.random()*map.height/4+map.height/2);
        y2 = 0;
      } //end if
    }else if(direction==='backward'){
      if(Math.random()<0.5){ //most eastward
        x1 = Math.floor(Math.random()*map.width/4);
        x2 = map.width-1;
        y1 = 0;
        y2 = Math.floor(Math.random()*map.height/4+map.height/2);
      }else{
        x1 = 0;
        x2 = Math.floor(Math.random()*map.width/4+map.width/2);
        y1 = Math.floor(Math.random()*map.height/4);
        y2 = map.height-1;
      } //end if
    } //end if
    map.drunkenPath({
      x1,y1,x2,y2,wide: true,
      draw(sector){
        sector.setWater();
        water.push(sector);
      }
    });
  } //end for

  // now we'll surround water with sand
  water.forEach(sector=>{
    map.getNeighbors({
      x: sector.x,y: sector.y,
      test(sector){
        return sector.isEmpty();
      }
    }).forEach(sector=> sector.setFloorSpecial());
  });

  // now we'll generate some noise and populate all non-river data
  let x=['horizontal','forward'].includes(direction)?6:12,
      y=['vertical','backward'].includes(direction)?6:12;

  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+map.noise.simplex2(sector.x/map.width*x,sector.y/map.height*y))/2;

      if(n<0.2&&!sector.isWater()){
        sector.setWallSpecial();
      }else if(n<0.5&&!sector.isWater()){
        sector.setWall();
      }else if(sector.isEmpty()){
        sector.setFloor();
      }else if(n<0.2&&sector.isWater()){
        sector.setWaterSpecial();
      } //end if
    });
  });

  map.clipOrphaned({
    test: sector=> sector.isWalkable(),
    failure: sector=> sector.setWallSpecial()
  });
} //end function
