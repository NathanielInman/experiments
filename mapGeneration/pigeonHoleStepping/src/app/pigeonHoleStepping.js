import Set from 'collections/set';

const WEST = 0;
const EAST = 1;
const NORTH = 2;
const SOUTH = 3;

export function PHS(map,osize,deviation){
  let size=osize-Math.floor(Math.random()*deviation),
      cx=Math.floor(map.width/2), //current x position
      cy=Math.floor(map.height/2), //current y position
      roomNum={
        num:          1,
        done:         [true], //add index 0 because num starts at 1
        topLeftX:     [0], //add index 0 because num starts at 1
        topLeftY:     [0], //add index 0 because num starts at 1
        bottomRightX: [0], //add index 0 because num starts at 1
        bottomRightY: [0] //add index 0 because num starts at 1
      },
      direction=0;


  console.log('map',map);
  if(size%2===0)size++;
  createCorridors();
  drawWalls();
  allocateRooms();
  //partitionRooms();
  //drawTileDoors();
  //pruneMap();
  //cleanMap();
  return true;

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

    console.log('move',cx,cy);
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

  function nextToCorridor(x,y){
    let result = false;

    if(x>0&&map.isCorridor(x-1,y)) result = true;
    if(y>0&&map.isCorridor(x,y-1)) result = true;
    if(x<map.width-1&&map.isCorridor(x+1,y)) result = true;
    if(y<map.height-1&&map.isCorridor(x,y+1)) result = true;
    if(x>0&&y>0&&map.isCorridor(x-1,y-1)) result = true;
    if(x>0&&y<map.height-1&&map.isCorridor(x-1,y+1)) result = true;
    if(x<map.width-1&&y>0&&map.isCorridor(x+1,y-1)) result = true;
    if(x<map.width-1&&y<map.height-1&&map.isCorridor(x+1,y+1)) result = true;
    return result;
  } //end nextToCorridor()

  function drawWalls(){
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()&&nextToCorridor(x,y)) sector.setWall();
      });
    });
  } //end drawWalls()

  function fillRoom(x,y,x2,y2){
    console.log('!!!fill room!!!',x,y,x2,y2);
    for(let j=y-1;j<=y2+1;j++){
      for(let i=x-1;i<=x2+1;i++){
        if(j===y-1||j===y2+1||i===x-1||i===x2+1){
          map.setWall(i,j);
        }else{
          map.setRoom(i,j,roomNum.num);
          map.setFloor(i,j);
        } //end if
      } //end for
    } //end for
    roomNum.topLeftX.push(x);roomNum.bottomRightX.push(x2);
    roomNum.topLeftY.push(y);roomNum.bottomRightY.push(y2);
    roomNum.done.push(false);
    roomNum.num++;
  } //end fillRoom()

  function allocateRooms(){
    let minWidth=3,minHeight=3,
        maxWidth=5,maxHeight=5,
        freeX,freeY,intersectY;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          freeX=new Set();
          for(let i=x,sx=x;i>0&&i<map.width-2&&i-x<=maxWidth;i++){
            if(map.isEmpty(i,y)) freeX.add(i);
          } //end for
          if(freeX.length>=minWidth){
            freeY=new Set();
            intersectY=new Set();
            freeX.toArray().forEach((fx,fxIndex)=>{
              for(let i=y,sy=y;i>0&&i<map.height-2&&i-y<=maxHeight;i++){
                if(map.isEmpty(fx,i)&&fxIndex===0) freeY.add(i);
                if(map.isEmpty(fx,i)&&fxIndex!==0) intersectY.add(i);
              } //end for
              if(fxIndex>0) freeY = freeY.intersection(intersectY);
            });
            if(freeY.length>=minHeight) fillRoom(freeX.min(),freeY.min(),freeX.max(),freeY.max());
          } //end if
        } //end if
      });
    });
  } //end allocateRooms()

  function partitionRooms(){
    for(let i=1;i<size-1;i++){
      for(let j=1;j<size-1;j++){
        if(map.isRoom(i,j)&&map.isRoom(i,j-1)&&!map.isSameRoom(i,j,i,j-1)){
          map.setWall(i,j-1);
        } //end if
        if(map.isRoom(i,j)&&map.isRoom(i-1,j)&&!map.isSameRoom(i,j,i-1,j)){
          map.setWall(i-1,j);
        } //end if
        if(map.isRoom(i,j)&&map.isRoom(i+1,j+1)&&!map.isSameRoom(i,j,i+1,j+1)){
          map.setWall(i,j);
        } //end if
        if(map.isRoom(i,j-1)&&map.isRoom(i-1,j)&&!map.isRoom(i,j)&&
           !map.isSameRoom(i,j-1,i-1,j)){
          map.setWall(i-1,j);
        } //end if
        if(map.isEmpty(i,j)){
          map.setWall(i,j); //set the to a wall
        } //end if
      } //end for
    } //end for
  } //end partitionRooms()

  function drawTileDoors(){
    var chance;

    for(let i=1;i<size-1;i++){
      for(let j=1;j<size-1;j++){
        if(isCorridor(i,j)){

          // South tileDirtWall room
          if(i<size-2&&isWall(i+1,j)&&isRoom(i+2,j)){

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(isCorridor(i,j+1)&&isWall(i+1,j+1)&&
               isSameRoom(i+2,j+1,i+2,j)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=0;
            }//end if

            // The tileDoor wil be spawned here at a 50% chance if there's
            // another location for the tileDoor, elseif there is no other
            // location for the tileDoor, then it will be spawned here with
            // a 100% chance
            if(chance>80){
              if(roomNum.done[getRoom(i+2,j)]===false){
                roomNum.done[getRoom(i+2,j)]=true;
                setDoor(i+1,j);
              } //end if
            } //end if
          } //end if

          // East tileDirtWall room
          if(j<size-2&&isWall(i,j+1)&&isRoom(i,j+2)){

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(isCorridor(i+1,j)&&isWall(i+1,j+1)&&
               isSameRoom(i+1,j+2,i,j+2)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=100;
            }//end if

            // The tileDoor wil be spawned here at a 50% chance if there's
            // another location for the tileDoor, elseif there is no other
            // location for the tileDoor, then it will be spawned here with
            // a 100% chance
            if(chance>60){
              if(roomNum.done[getRoom(i,j+2)]===false){
                roomNum.done[getRoom(i,j+2)]=true;
                setDoor(i,j+1);
              } //end if
            }//end if
          } //end if

          // west tileDirtWall room
          if(i>2&&isWall(i-1,j)&&isRoom(i-2,j)){

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(roomNum.done[getRoom(i-2,j)]===false){
              roomNum.done[getRoom(i-2,j)]=true;
              setDoor(i-1,j);
            } //end if
          } //end if
          if(j>2&&isWall(i,j-1)&&isRoom(i,j-2)){
            if(roomNum.done[getRoom(i,j-2)]===false){
              roomNum.done[getRoom(i,j-2)]=true;
              setDoor(i,j-1);
            } //end if
          } //end if
        } //end if
      } //end for
    } //end for
  } //end drawTileDoors()

  function cleanMap(){
    let isUseful;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isWall()){
          isUseful = false;
          if(y>0&&map.isWalkable(x,y-1)) isUseful = true;
          if(x>0&&map.isWalkable(x-1,y)) isUseful = true;
          if(y<map.height-1&&map.isWalkable(x,y+1)) isUseful = true;
          if(x<map.width-1&&map.isWalkable(x+1,y)) isUseful = true;
          if(x>0&&y>0&&map.isWalkable(x-1,y-1)) isUseful = true;
          if(x>0&&y<map.height-1&&map.isWalkable(x-1,y+1)) isUseful = true;
          if(x<map.width-1&&y>0&&map.isWalkable(x+1,y-1)) isUseful = true;
          if(x<map.width-1&&y<map.height-1&&map.isWalkable(x+1,y+1)) isUseful = true;
          if(!isUseful) sector.setEmpty();
        } //end if
      });
    });
  } //end cleanMap()

  // We are able to prune the map by iterating one-by-one through the
  // map and if the cell we're currently is one is walkable, then we
  // iterate through all nearby walkable floors, marking that floor as
  // seen and giving it the same identifier room number, keeping track
  // of the number or rooms per room identifier. Then we loop
  // through the entire map and remove cells that are of a room number
  // that isn't the largest size (thus keeping the largest room only)
  function pruneMap(){
    var node = {x: 0,y: 0},
        loc_max = {val: 0,cur: 0,num: 0,max: 0},
        unmapped=[];

    // iterate through all cells once, marking their location number
    // which is the number all nearby walkable cells will share
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(map[i][j].isWalkable()&&!map[i][j].loc){
          traverse(++loc_max.cur,i,j);
        } //end if
      } //end for
    } //end for

    // loop through all the cells, clearing them if they don't share the
    // location id of the most-touching or largest area we found
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(map[i][j].isWalkable()&&map[i][j].loc!==loc_max.num){
          map[i][j].type=tileError;
        } //end if
      } //end for
    } //end for

    //look around at location and push unmapped nodes to stack
    function traverse_look(i,j){
      if(i>0&&map[i-1][j].isWalkable()&&!map[i-1][j].loc){
        node={x: i-1,y: j};
        unmapped.push(node);map[i-1][j].loc=-1;
      } //end if
      if(j>0&&map[i][j-1].isWalkable()&&!map[i][j-1].loc){
        node={x: i,y: j-1};
        unmapped.push(node);map[i][j-1].loc=-1;
      } //end if
      if(i<size&&map[i+1][j].isWalkable()&&!map[i+1][j].loc){
        node={x: i+1,y: j};
        unmapped.push(node);map[i+1][j].loc=-1;
      } //end if
      if(j<size&&map[i][j+1].isWalkable()&&!map[i][j+1].loc){
        node={x: i,y: j+1};
        unmapped.push(node);map[i][j+1].loc=-1;
      } //end if
    } //end traverse_look()

    // Traverse a location completely
    function traverse(curLoc,i,j){
      var newLoc = node,
          x = i, y = j;

      loc_max.val=1; //set the current mas size to 1
      map[x][y].loc=curLoc;
      traverse_look(x,y);
      while(unmapped.length>0){
        newLoc=unmapped.pop();
        x=newLoc.x;
        y=newLoc.y;
        traverse_look(x,y);
        map[x][y].loc=curLoc;
        loc_max.val++;
        if(loc_max.val>loc_max.max){
          loc_max.max=loc_max.val;
          loc_max.num=loc_max.cur;
        } //end manage maximum mass
      } //end while
    } //end traverse()
  } //end cleanMap()

  // Drunk walker makes corridors according to the
  // restriction that we need to leave enough space for rooms
  function createCorridors(){
    let fail=0, win=0;

    while(fail<750&&win<map.width+map.height){
      console.log('while',fail,win);
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
    console.log('fail',fail,win);

    // now we carve the dead ends
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
} //end function
