import Set from 'collections/set';

const WEST = 0;
const EAST = 1;
const NORTH = 2;
const SOUTH = 3;

export function PHS(map){
  let cx=Math.floor(map.width/2), //current x position
      cy=Math.floor(map.height/2), //current y position
      currentRoomNumber=1;

  createCorridors();
  allocateRooms();
  wallifyCorridors();
  return map;

  // This function checks to see if the tileCorridors will create
  // a square. We can't allow this, so we return true if they will and
  // prevent it in the move function
  function blocked(direction){
    let result = false;

    if(direction===NORTH&&cy-6>=0){
      if(cx-6>=0&& //northwest
        map.isCorridor(cx-1,cy)&&
        map.isCorridor(cx-6,cy-1)&&
        map.isCorridor(cx-1,cy-6)) result = true;
      if(cx+6<map.width&& //northeast
        map.isCorridor(cx+1,cy)&&
        map.isCorridor(cx+6,cy-1)&&
        map.isCorridor(cx+1,cy-6)) result = true
    }else if(direction===SOUTH&&cy+6<map.height){
      if(cx-6>=0&& //southwest
        map.isCorridor(cx-1,cy)&&
        map.isCorridor(cx-6,cy+1)&&
        map.isCorridor(cx-1,cy+6)) result = true;
      if(cx+6<map.width&& //southeast
        map.isCorridor(cx+1,cy)&&
        map.isCorridor(cx+6,cy+1)&&
        map.isCorridor(cx+1,cy+6)) result = true;
    }else if(direction===EAST&&cx+6<map.width){
      if(cy-6>=0&& //eastnorth
        map.isCorridor(cx,cy-1)&&
        map.isCorridor(cx+1,cy-6)&&
        map.isCorridor(cx+6,cy-1)) result = true
      if(cy+6<map.height&& //eastsouth
        map.isCorridor(cx,cy+1)&&
        map.isCorridor(cx+1,cy+6)&&
        map.isCorridor(cx+6,cy+1)) result = true
    }else if(direction===WEST&&cx-6>=0){
      if(cy-6>=0&& //westnorth
        map.isCorridor(cx,cy-1)&&
        map.isCorridor(cx-1,cy-6)&&
        map.isCorridor(cx-6,cy-1)) result = true;
      if(cy<map.height&& //westsouth
        map.isCorridor(cx,cy+1)&&
        map.isCorridor(cx-1,cy+6)&&
        map.isCorridor(cx-6,cy+1)) result = true;
    } //end if
    return result;
  } //end function

  // Carve out a path for the player in the direction specified
  function move(direction){
    let result=false;

    if(direction===NORTH && !blocked(NORTH)){
      if(map.isCorridor(cx,cy-6)){
        cy-=6;
      }else{
        for(let cyc=cy;cy>=cyc-5;cy--) map.setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===EAST && !blocked(EAST)){
      if(map.isCorridor(cx+6,cy)){
        cx+=6;
      }else{
        for(let cxc=cx;cx<=cxc+5;cx++) map.setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===SOUTH && !blocked(SOUTH)){
      if(map.isCorridor(cx,cy+6)){
        cy+=6;
      }else{
        for(let cyc=cy;cy<=cyc+5;cy++) map.setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===WEST && !blocked(WEST)){
      if(map.isCorridor(cx-6,cy)){
        cx-=6;
      }else{
        for(let cxc=cx;cx>=cxc-5;cx--) map.setCorridor(cx,cy);
        result = true;
      } //end if
    } //end function
    return result;
  } //end move function

  function fillRoom(x,y,x2,y2){
    let setDoor = false, randomDirection, failureCount=0;

    for(let j=y;j<=y2;j++){
      for(let i=x;i<=x2;i++){
        if(j===y||j===y2||i===x||i===x2){
          map.setWall(i,j);
        }else{
          map.setRoom(i,j,currentRoomNumber);
          map.setFloor(i,j);
        } //end if
      } //end for
    } //end for
    while(!setDoor&&failureCount<100){
      randomDirection=Math.floor(Math.random()*5);

      if(randomDirection===NORTH){
        let rx=Math.floor(Math.random()*(x2-x))+x;

        if(map.isFloor(rx,y+1)&&map.isCorridor(rx,y-1)){
          map.setDoor(rx,y);setDoor = true;
        } //end if
      }else if(randomDirection===EAST){
        let ry=Math.floor(Math.random()*(y2-y))+y;

        if(map.isFloor(x2-1,ry)&&map.isCorridor(x2+1,ry)){
          map.setDoor(x2,ry);setDoor = true;
        } //end if
      }else if(randomDirection===WEST){
        let ry=Math.floor(Math.random()*(y2-y))+y;

        if(map.isFloor(x+1,ry)&&map.isCorridor(x-1,ry)){
          map.setDoor(x,ry);setDoor = true;
        } //end if
      }else if(randomDirection===SOUTH){
        let rx=Math.floor(Math.random()*(x2-x))+x;

        if(map.isFloor(rx,y2-1)&&map.isCorridor(rx,y2+1)){
          map.setDoor(rx,y2);setDoor = true;
        } //end if
      } //end if
      failureCount++;
    } //end while()

    // In the unlikely event that the map has a void and we couldn't
    // connect the room to a hallway, lets clear the room we made; otherwise
    // lets attribute the room
    if(!setDoor){
      for(let j=y;j<=y2;j++){
        for(let i=x;i<=x2;i++){
          map.setEmpty(i,j);
        } //end for
      } //end for
    }else{
      currentRoomNumber++;
    } //end if
  } //end fillRoom()

  function allocateRooms(){
    let minWidth=4,minHeight=4,
        maxWidth=5,maxHeight=5,
        freeX,freeY,intersectY;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          freeX=new Set();
          for(let i=x,sx=x;i>0&&i<map.width-2&&i-sx<=maxWidth;i++){
            if(map.isEmpty(i,y)){
              freeX.add(i);
            }else{
              break;
            } //end if
          } //end for
          if(freeX.length>=minWidth){
            freeY=new Set();
            intersectY=new Set();
            freeX.toArray().some((fx,fxIndex)=>{
              intersectY.clear();
              for(let i=y,sy=y;i>0&&i<map.height-2&&i-sy<=maxHeight;i++){
                if(map.isEmpty(fx,i)){
                  if(fxIndex===0) freeY.add(i);
                  if(fxIndex!==0) intersectY.add(i);
                }else{
                  break;
                } //end if
              } //end for
              if(fxIndex>0){
                freeY = freeY.intersection(intersectY);
                if(freeY.length===0) return true;
              } //end if
              return false;
            });
            if(freeY.length>=minHeight) fillRoom(freeX.min(),freeY.min(),freeX.max(),freeY.max());
          } //end if
        } //end if
      });
    });
  } //end allocateRooms()

  // Drunk walker makes corridors according to the
  // restriction that we need to leave enough space for rooms
  function createCorridors(){
    let fail=0, win=0, direction;

    while(fail<750&&win<map.width+map.height){
      direction=Math.floor(Math.random()*4);
      if(direction===NORTH&&cy-7>=0&&move(NORTH)){
        win++
      }else if(direction===EAST&&cx+7<map.width&&move(EAST)){
        win++;
      }else if(direction===SOUTH&&cy+7<map.height&&move(SOUTH)){
        win++
      }else if(direction===WEST&&cx-7>=0&&move(WEST)){
        win++
      }else{
        fail++;
      } //end if
    } //end while

    // now we carve the dead ends before we start applying rooms to the
    // corridors; otherwise we might create orphaned rooms if we prune
    // it later
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(x>0&&x<map.width-1&&sector.isEmpty()&&map.isCorridor(x-1,y)&&map.isCorridor(x+1,y)||
          y>0&&y<map.height-1&&sector.isEmpty()&&map.isCorridor(x,y-1)&&map.isCorridor(x,y+1)||
          x>1&&y<map.height-2&&sector.isEmpty()&&map.isCorridor(x-1,y)&&map.isCorridor(x,y+1)&&
            map.isCorridor(x-2,y)&&map.isCorridor(x,y+2)||
          x>1&&y<map.height-2&&sector.isEmpty()&&map.isCorridor(x,y+1)&&map.isCorridor(x+1,y)&&
            map.isCorridor(x,y+2)&&map.isCorridor(x+2,y)||
          x<map.width-2&&y>1&&sector.isEmpty()&&map.isCorridor(x+1,y)&&map.isCorridor(x,y-1)&&
            map.isCorridor(x+2,y)&&map.isCorridor(x,y-2)||
          x>1&&y>1&&sector.isEmpty()&&map.isCorridor(x,y-1)&&map.isCorridor(x-1,y)&&
            map.isCorridor(x,y-2)&&map.isCorridor(x-2,y)){
          map.setEmpty(x-1,y-1);map.setEmpty(x,y-1);map.setEmpty(x+1,y-1);
          map.setEmpty(x-1,y);map.setEmpty(x+1,y);
          map.setEmpty(x-1,y+1);map.setEmpty(x,y+1);map.setEmpty(x+1,y+1);
        } //end if
      });
    });
  } //end createCorridors()

  // surround the corridors that arent surrounded with walls yet with walls now.
  function wallifyCorridors(){
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isCorridor()){
          if(x>0&&map.isEmpty(x-1,y)) map.setWall(x-1,y);
          if(x>0&&y>0&&map.isEmpty(x-1,y-1)) map.setWall(x-1,y-1);
          if(y>0&&map.isEmpty(x,y-1)) map.setWall(x,y-1);
          if(y>0&&x<map.width-1&&map.isEmpty(x+1,y-1)) map.setWall(x+1,y-1);
          if(x<map.width-1&&map.isEmpty(x+1,y)) map.setWall(x+1,y);
          if(x<map.width-1&&y<map.height-1&&map.isEmpty(x+1,y+1)) map.setWall(x+1,y+1);
          if(y<map.height-1&&map.isEmpty(x,y+1)) map.setWall(x,y+1);
          if(y<map.height-1&&x>0&&map.isEmpty(x-1,y+1)) map.setWall(x-1,y+1);
        } //end if
      });
    });
  } //end wallifyCorridors()
} //end function
