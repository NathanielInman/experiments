// eslint-disable-next-line complexity
export function chine(map){
  let xy = Math.random()<0.5,
      xQuarter = map.width/4, xHalf = xQuarter*2, x3Quarters = xQuarter*3,
      yQuarter = map.height/4, yHalf = yQuarter*2, y3Quarters = yQuarter*3,
      x = xy?0:Math.floor(xQuarter+Math.random()*xHalf),
      y = !xy?0:Math.floor(yQuarter+Math.random()*yHalf),
      d = !x?'east':'south',
      p = d,
      s = 8, //waterfall size
      r, //used to hold random variable
      drawnWaterfall = false;

  map.setWater({x,y});
  do{
    r = Math.random();

    // determine if we'll move or not
    if(d==='east'&&r<(0.3+(y>y3Quarters?0.3:0))){
      d='northeast';
    }else if(d==='east'&&r<(0.66+(y<yQuarter?0.3:0))){
      d='southeast';
    }else if(d==='northeast'&&r<(0.75+(y<yQuarter?-0.35:0))&&p==='east'){
      d='east';
    }else if(d==='southeast'&&r<(0.75+(y>y3Quarters?-0.35:0))&&p==='east'){
      d='east';
    }else if(d==='south'&&r<(0.33+(x>x3Quarters?0.3:0))){
      d='southwest'
    }else if(d==='south'&&r<(0.66+(x<xQuarter?0.3:0))){
      d='southeast'
    }else if(d==='southeast'&&r<(0.75+(x>x3Quarters?-0.35:0))&&p==='south'){
      d='south';
    }else if(d==='southwest'&&r<(0.75+(x<xQuarter?-0.35:0))&&p==='south'){
      d='south';
    } //end if

    // now apply the movement, if it's diagonal we'll move vertically
    // then horizontally
    if(d==='northeast'){
      y--; map.setWater({x,y});
      x++; map.setWater({x,y});
    }else if(d==='east'){
      x++; map.setWater({x,y});
    }else if(d==='southeast'){
      y++; map.setWater({x,y});
      x++; map.setWater({x,y});
    }else if(d==='south'){
      y++; map.setWater({x,y});
    }else if(d==='southwest'){
      y++; map.setWater({x,y});
      x--; map.setWater({x,y});
    } //end if

    // now if we're in the center of the map and the waterfall hasn't been
    // drawn then we can do that now
    if(!drawnWaterfall&&x>xQuarter&&x<x3Quarters&&y>yQuarter&&y<y3Quarters){
      let r = Math.floor(s/2), //radius
          sx = x-r, //start x
          ex = x+r, //end x
          sy = y-r, //start y
          ey = y+r, //end y
          cx = sx+(ex-sx)/2, //center x float
          cy = sy+(ey-sy)/2, //center y float
          sa1 = (ex-sx)/2, //semi-axis 1
          sa2 = (ey-sy)/2, //semi-axis 2
          hypotenuse, theta, foci, p1, p2;

      for(let j=sy;j<ey;j++){
        for(let i=sx;i<ex;i++){
          hypotenuse = Math.sqrt(Math.pow(i-cx,2)+Math.pow(j-cy,2));
          theta = Math.asin(Math.abs(j-cy)/hypotenuse);
          p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2);
          p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2);
          foci = (sa1*sa2)/Math.sqrt(p1+p2);
          if(hypotenuse<(foci/4*3)) map.setWaterSpecial({x: i,y: j});
          if(hypotenuse<foci&&Math.random()<0.7) map.setWaterSpecial({x: i,y: j});
        } //end for
      } //end for
      drawnWaterfall=true;
    } //end if

  }while(x!==map.width-1&&y!==map.height-1);

  // now close everything not close enough to river
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(map.isSquareEmptyOfWater({
        x1: sector.x-3,
        y1: sector.y-3,
        x2: sector.x+3,
        y2: sector.y+3
      })&&Math.random()<0.5){
        sector.setWall();
      }else if(!sector.isWater()&&Math.random()<0.1){
        sector.setObstruction();
      }
    });
  });

  // now that we've represented the map fully, lets find the largest walkable
  // space and fill in all the rest
  clipOrphaned(map);

  // lastly lets find all floor that's near water and give it a large chance
  // to be a corridor (sand)
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isWater()) return; //leave water alone
      let x = sector.x,y = sector.y;

      if(map.isInbounds({x: x-1,y})&&map.isWater({x: x-1,y})||
         map.isInbounds({x: x+1,y})&&map.isWater({x: x+1,y})||
         map.isInbounds({x,y: y-1})&&map.isWater({x,y: y-1})||
         map.isInbounds({x,y: y+1})&&map.isWater({x,y: y+1})){
        if(Math.random()<0.5) sector.setCorridor();
      } //end if
    });
  });
} //end function

// Traverse a location completely
function traverse(map,locStats,unmapped,x,y){
  let newLoc = null; //we pull from unmapped

  locStats.val=1; //set the current mas size to 1
  map.setRoom({x,y,id: locStats.cur});
  traverseLook(map,unmapped,x,y);
  while(unmapped.length>0){
    newLoc=unmapped.pop();
    traverseLook(map,unmapped,newLoc.x,newLoc.y);
    map.setRoom({x: newLoc.x,y: newLoc.y,id: locStats.cur});
    locStats.val++;
    if(locStats.val>locStats.max){
      locStats.max=locStats.val;
      locStats.num=locStats.cur;
    } //end manage maximum mass
  } //end while
} //end traverse()

//look around at location and push unmapped nodes to stack
function traverseLook(map,unmapped,x,y){
  if(x>0&&map.isWalkableOrEmpty({x: x-1,y})&&!map.getRoom({x: x-1,y})){
    unmapped.push({x: x-1, y});
    map.setRoom({x: x-1,y,id: -1});
  } //end if
  if(y>0&&map.isWalkableOrEmpty({x,y: y-1})&&!map.getRoom({x,y: y-1})){
    unmapped.push({x,y: y-1});
    map.setRoom({x,y: y-1,id: -1});
  } //end if
  if(x<map.width&&map.isWalkableOrEmpty({x: x+1,y})&&!map.getRoom({x: x+1,y})){
    unmapped.push({x: x+1, y});
    map.setRoom({x: x+1,y,id: -1});
  } //end if
  if(y<map.height&&map.isWalkableOrEmpty({x,y: y+1})&&!map.getRoom({x,y: y+1})){
    unmapped.push({x,y: y+1});
    map.setRoom({x,y: y+1,id: -1});
  } //end if
} //end traverseLook()

// Remove orphaned floors by iterating through all sectors
// and each time we find a floor we traverse from that section.
// the largest section traversed is what we keep
function clipOrphaned(map){
  let locStats = {val: 0,cur: 0,num: 0,max: 0},
      unmapped = [];

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isWalkableOrEmpty()&&!sector.roomNumber){
        locStats.cur++;
        traverse(map,locStats,unmapped,x,y);
      } //end if
    });
  });
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      if(sector.isWalkableOrEmpty()&&sector.roomNumber!==locStats.num){
        sector.setObstruction();
      }else if(sector.isWalkableOrEmpty()&&!sector.isWater()){
        sector.setFloor();
      } //end if
    });
  });
} //end clipOrphaned()
