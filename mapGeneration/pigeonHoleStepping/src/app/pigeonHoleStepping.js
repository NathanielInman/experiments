const WEST = 0;
const EAST = 1;
const NORTH = 2;
const SOUTH = 3;

export function PHS(map,osize,deviation){
  let size=osize-Math.floor(Math.random()*deviation),
      cx=Math.floor(size/2),cy=Math.floor(size/2),
      fail=0,win=0,val=0,
      roomNum={
        num:          1,
        done:         [true], //add index 0 because num starts at 1
        topLeftX:     [0], //add index 0 because num starts at 1
        topLeftY:     [0], //add index 0 because num starts at 1
        bottomRightX: [0], //add index 0 because num starts at 1
        bottomRightY: [0] //add index 0 because num starts at 1
      },
      direction=0;


  if(size%2===0)size++;
  createCorridors();
  drawTileDirtWalls();
  allocateRooms();
  partitionRooms();
  drawTileDoors();
  pruneMap();
  cleanMap();
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

    if(direction===NORTH && !blocked(NORTH)){
      if(map.isCorridor(cx,cy-6)){
        cy-=6;
      }else{
        for(;cy>=cy-5;cy--) map.setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===EAST && !blocked(EAST)){
      if(map.isCorridor(cx+6,cy)){
        cx+=6;
      }else{
        for(;cx<=cx+5;cx++) setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===SOUTH && !blocked(SOUTH)){
      if(map.isCorridor(cx,cy+6)){
        cy+=6;
      }else{
        for(;cy<=cy+5;cy++) setCorridor(cx,cy);
        result = true;
      } //end if
    }else if(direction===WEST && !blocked(WEST)){
      if(map.isCorridor(cx-6,cy)){
        cx-=6;
      }else{
        for(;cx>=cx-5;cx--) setCorridor(cx,cy);
        result = true;
      } //end if
    } //end function
    return result;
  } //end move function
  function nextTotileCorridor(x,y){
    var result = false;

    if(x>0&&isCorridor(x-1,y))result = true;
    if(y>0&&isCorridor(x,y-1))result = true;
    if(x<size-1&&isCorridor(x+1,y))result = true;
    if(y<size-1&&isCorridor(x,y+1))result = true;
    if(y>0&&y>0&&isCorridor(x-1,y-1))result = true;
    if(x>0&&y<size-1&&isCorridor(x-1,y+1))result = true;
    if(x<size-1&&y>0&&isCorridor(x+1,y-1))result = true;
    if(x<size-1&&y<size-1&&isCorridor(x+1,y+1))result = true;
    return result;
  } //end nextToTileCorridor()
  function drawTileDirtWalls(){
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(i===0&&!isCorridor(i,j)){setWall(i,j);
        }else if(j===0&&!isCorridor(i,j)){setWall(i,j);
        }else if(i===size-1&&!isCorridor(i,j)){setWall(i,j);
        }else if(j===size-1&&!isCorridor(i,j)){setWall(i,j);
        }else if(isEmpty(i,j)&&nextTotileCorridor(i,j)){setWall(i,j);}
      } //end for
    } //end for
  } //end drawTileDirtWalls()
  function fillRoom(x,y,x2,y2){
    var fail=false,
        drawn=false;

    for(let j=y;j<=y2;j++){
      for(let i=x;i<=x2;i++){
        if(isEmpty(i,j)){
          drawn=true;
          setRoom(i,j,roomNum.num);
        }else{
          fail=true;
          break;
        } //end if
      } //end for
      if(fail)break;
    } //end for
    if(drawn){
      roomNum.topLeftX.push(x);roomNum.bottomRightX.push(x2);
      roomNum.topLeftY.push(y);roomNum.bottomRightY.push(y2);
      roomNum.done.push(false);
      roomNum.num++;
    } //end if
  } //end fillRoom()
  function allocateRooms(){
    var minWidth=0,minHeight=0,
        maxWidth=5,maxHeight=5;

    /*eslint-disable */
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(isEmpty(i,j)){
          minWidth=0;minHeight=0;
          (()=>{
            for(let y=i;y<size;y++){
              for(let x=j;x<size;x++){
                if(!isEmpty(y,x)){
                  if(y===i){
                    if(x-j<3){
                      return;
                    }else{
                      minWidth=x-j;
                    } //end if
                  }else if(x-j<minWidth&&y-i>=3){
                    fillRoom(i,j,y-1,j+minWidth-1);
                    return;
                  }else{
                    return;
                  } //end if
                  break;
                }else if(y-i>maxHeight){
                  fillRoom(i,j,y-1,j+minWidth-1);
                  return;
                }else if(x>minWidth&&minWidth!==0){ //out of bounds
                  break;
                }else if(x-j>maxWidth && y===i){
                  minWidth=maxWidth-1;
                  break;
                }//end if
              } //end for
            } //end for
          })();
        } //end if
      } //end for
    } //end for
    /*eslint-enable */
  } //end allocateRooms()
  function partitionRooms(){
    for(let i=1;i<size-1;i++){
      for(let j=1;j<size-1;j++){
        if(isRoom(i,j)&&isRoom(i,j-1)&&!isSameRoom(i,j,i,j-1)){
          setWall(i,j-1);
        } //end if
        if(isRoom(i,j)&&isRoom(i-1,j)&&!isSameRoom(i,j,i-1,j)){
          setWall(i-1,j);
        } //end if
        if(isRoom(i,j)&&isRoom(i+1,j+1)&&!isSameRoom(i,j,i+1,j+1)){
          setWall(i,j);
        } //end if
        if(isRoom(i,j-1)&&isRoom(i-1,j)&&!isRoom(i,j)&&
           !isSameRoom(i,j-1,i-1,j)){
          setWall(i-1,j);
        } //end if
        if(isEmpty(i,j)){
          setWall(i,j); //set the to a wall
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
    var isUseful; //details whether wall is useful

    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(map[i][j].isWall()){
          isUseful = false;
          if(i>0&&map[i-1][j].isWalkable()) isUseful = true;
          if(j>0&&map[i][j-1].isWalkable()) isUseful = true;
          if(i<size-1&&map[i+1][j].isWalkable()) isUseful = true;
          if(j<size-1&&map[i][j+1].isWalkable()) isUseful = true;
          if(i>0&&j>0&&map[i-1][j-1].isWalkable()) isUseful = true;
          if(i>0&&j<size-1&&map[i-1][j+1].isWalkable()) isUseful = true;
          if(i<size-1&&j>0&&map[i+1][j-1].isWalkable()) isUseful = true;
          if(i<size-1&&j<size-1&&map[i+1][j+1].isWalkable()) isUseful = true;
          if(!isUseful) map[i][j].setEmpty();
        } //end if
      } //end for
    } //end for
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

    while(fail<75&&win<size*3){
      direction=Math.floor(Math.random()*4);
      if(direction===NORTH&&cy-7>=0&&move(NORTH)){
        win++
      }else if(direction===EAST&&cx+7<size&&move(EAST)){
        win++;
      }else if(direction===SOUTH&&cy+7<size&&move(SOUTH)){
        win++
      }else if(direction===WEST&&cx-7>=0&&move(WEST)){
        win++
      }else{
        fail++;
      } //end if
    } //end while
    carveDeadEnds();

    function carveDeadEnds(){
      for(let i=1;i<size-1;i++){
        for(let j=1;j<size-1;j++){
          if(isEmpty(i,j)&&isCorridor(i-1,j)&&isCorridor(i+1,j)||
             isEmpty(i,j)&&isCorridor(i,j-1)&&isCorridor(i,j+1)||
             isEmpty(i,j)&&isCorridor(i-1,j)&&isCorridor(i,j+1)&&
               isCorridor(i-2,j)&&isCorridor(i,j+2)||
             isEmpty(i,j)&&isCorridor(i,j+1)&&isCorridor(i+1,j)&&
               isCorridor(i,j+2)&&isCorridor(i+2,j)||
             isEmpty(i,j)&&isCorridor(i+1,j)&&isCorridor(i,j-1)&&
               isCorridor(i+2,j)&&isCorridor(i,j-2)||
             isEmpty(i,j)&&isCorridor(i,j-1)&&isCorridor(i-1,j)&&
               isCorridor(i,j-2)&&isCorridor(i-2,j)){
            setEmpty(i-1,j);setEmpty(i-1,j-1);setEmpty(i-1,j+1);
            setEmpty(i,j+1);setEmpty(i+1,j+1);setEmpty(i+1,j);
            setEmpty(i+1,j-1);setEmpty(i,j-1);
          } //end if
        } //end for
      } //end for
    } //end carveDeadEnds function
  } //end createCorridors()
} //end function
