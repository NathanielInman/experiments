const tileUnused = 0;
const tileDirtFloor = 1;
const tileDirtWall = 2;
const tileError = 3;
const tileCorridor = 4;
const tileDoor = 5;
const WEST = 0;
const EAST = 1;
const NORTH = 2;
const SOUTH = 3;

export function PHS(map,osize,deviation){
  var isRoomEqual=(x,y,x2,y2)=> map[x][y].roomNum===map[x2][y2].roomNum,
      isRoom=(x,y)=> map[x][y].roomNum>0,
      isTileEmpty=(x,y)=> map[x][y].type===tileUnused||map[x][y].type===tileError,
      isTileCorridor=(x,y)=> map[x][y].type===tileCorridor,
      isTileDirtWall=(x,y)=> map[x][y].type===tileDirtWall,
      isEmpty=(x,y)=> map[x][y].type===tileUnused,
      setRoom=(x,y,room)=>{map[x][y].roomNum=room;map[x][y].type=tileDirtFloor;},
      setRoomType=(x,y,type)=> map[x][y].name=type,
      setTileCorridor=(x,y)=>{map[x][y].type=tileCorridor;map[x][y].roomNum=0;},
      setTileDoor=(x,y)=>{map[x][y].type=tileDoor;map[x][y].roomNum=0;},
      setTileDirtWall=(x,y)=>{map[x][y].type=tileDirtWall;map[x][y].roomNum=0;},
      setTileUnused=(x,y)=>{map[x][y].type=tileUnused;map[x][y].roomNum=0;},
      setEmpty=(x,y)=>{map[x][y].type=tileUnused;},
      getRoom=(x,y)=> map[x][y].roomNum,
      size=osize-Math.floor(Math.random()*deviation),
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
  cleanMap();
  return true;

  // This function checks to see if the tileCorridors will create
  // a square. We can't allow this, so we return true if they will and
  // prevent it in the move function
  function blocked(direction){
    if(direction===NORTH||direction===SOUTH){
      if(cx-6>=0){ //westward block
        if(isTileCorridor(cx-1,cy)&&isTileCorridor(cx-6,cy+(direction===NORTH?-1:1))&&isTileCorridor(cx-1,cy+(direction===NORTH?-6:6)))return true;
      } //end if
      if(cx+6<size){ //eastward block
        if(isTileCorridor(cx+1,cy)&&isTileCorridor(cx+6,cy+(direction===NORTH?-1:1))&&isTileCorridor(cx+1,cy+(direction===NORTH?-6:6)))return true;
      } //end if
    }else if(direction===EAST||direction===WEST){
      if(cy-6>=0){ //northward block
        if(isTileCorridor(cx,cy-1)&&isTileCorridor(cx+(direction===WEST?-1:1),cy-6)&&isTileCorridor(cx+(direction===WEST?-6:6),cy-1))return true;
      } //end if
      if(cy+6<size){ //southward block
        if(isTileCorridor(cx,cy+1)&&isTileCorridor(cx+(direction===WEST?-1:1),cy+6)&&isTileCorridor(cx+(direction===WEST?-6:6),cy+1))return true;
      } //end if
    } //end if
    return false;
  } //end function

  // Carve out a path for the player in the direction specified
  function move(direction){
    var result,i;

    if(direction===NORTH && !blocked(NORTH)){
      if(isTileCorridor(cx,cy-6)){
        cy-=6;
        result = 2;
      }else{
        for(i=cy;i>=cy-5;i--) setTileCorridor(cx,i);
        cy=i;
        result = 1;
      } //end if
    }else if(direction===EAST && !blocked(EAST)){
      if(isTileCorridor(cx+6,cy)){
        cx+=6;
        result = 2;
      }else{
        for(i=cx;i<=cx+5;i++) setTileCorridor(i,cy);
        cx=i;
        result = 1;
      } //end if
    }else if(direction===SOUTH && !blocked(SOUTH)){
      if(isTileCorridor(cx,cy+6)){
        cy+=6;
        result = 2;
      }else{
        for(i=cy;i<=cy+5;i++) setTileCorridor(cx,i);
        cy=i;
        result = 1;
      } //end if
    }else if(direction===WEST && !blocked(WEST)){
      if(isTileCorridor(cx-6,cy)){
        cx-=6;
        result = 2;
      }else{
        for(i=cx;i>=cx-5;i--) setTileCorridor(i,cy);
        cx=i;
        result = 1;
      } //end if
    }else{
      result = 0;
    } //end function
    return result;
  } //end move function
  function generateRoomType(){
    var roomType=Math.floor(Math.random()*25),
        result = 'Unknown';

    if(roomType===0){result = 'Bedroom';
    }else if(roomType===1){result = 'Bathroom';
    }else if(roomType===2){result = 'Lavatory';
    }else if(roomType===3){result = 'Prison Block';
    }else if(roomType===4){result = 'Kitchen';
    }else if(roomType===5){result = 'Meat Hall';
    }else if(roomType===6){result = 'Armory';
    }else if(roomType===7){result = 'Barracks';
    }else if(roomType===8){result = 'Library';
    }else if(roomType===9){result = 'Storage';
    }else if(roomType===10){result = 'Meeting Room';
    }else if(roomType===11){result = 'Great Hall';
    }else if(roomType===12){result = 'Cellar';
    }else if(roomType===13){result = 'Pantry';
    }else if(roomType===14){result = 'Larder';
    }else if(roomType===15){result = 'Buttery';
    }else if(roomType===16){result = 'Linen Room';
    }else if(roomType===17){result = 'Wine Cellar';
    }else if(roomType===18){result = 'Bar';
    }else if(roomType===19){result = 'Servant Quarters';
    }else if(roomType===20){result = 'Cooks Quarters';
    }else if(roomType===21){result = 'Scullions Quarters';
    }else if(roomType===22){result = 'Lauderer Quarters';
    }else if(roomType===23){result = 'Cellerer Quarters';
    }else if(roomType===24){result = 'Chapel';
    } //end if
    return result;
  } //end generateRoomType()
  function nextTotileCorridor(x,y){
    var result = false;

    if(x>0&&isTileCorridor(x-1,y))result = true;
    if(y>0&&isTileCorridor(x,y-1))result = true;
    if(x<size-1&&isTileCorridor(x+1,y))result = true;
    if(y<size-1&&isTileCorridor(x,y+1))result = true;
    if(y>0&&y>0&&isTileCorridor(x-1,y-1))result = true;
    if(x>0&&y<size-1&&isTileCorridor(x-1,y+1))result = true;
    if(x<size-1&&y>0&&isTileCorridor(x+1,y-1))result = true;
    if(x<size-1&&y<size-1&&isTileCorridor(x+1,y+1))result = true;
    return result;
  } //end nextToTileCorridor()
  function drawTileDirtWalls(){
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(i===0&&!isTileCorridor(i,j)){setTileDirtWall(i,j);
        }else if(j===0&&!isTileCorridor(i,j)){setTileDirtWall(i,j);
        }else if(i===size-1&&!isTileCorridor(i,j)){setTileDirtWall(i,j);
        }else if(j===size-1&&!isTileCorridor(i,j)){setTileDirtWall(i,j);
        }else if(isEmpty(i,j)&&nextTotileCorridor(i,j)){setTileDirtWall(i,j);}
      } //end for
    } //end for
  } //end drawTileDirtWalls()
  function fillRoom(x,y,x2,y2){
    var fail=false,
        drawn=false,
        roomName=generateRoomType();

    for(let j=y;j<=y2;j++){
      for(let i=x;i<=x2;i++){
        if(isEmpty(i,j)){
          drawn=true;
          setRoomType(i,j,roomName);
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
        if(isRoom(i,j)&&isRoom(i,j-1)&&!isRoomEqual(i,j,i,j-1)){
          setTileDirtWall(i,j-1); //set the previous rooms tile to a wall instead
        } //end if
        if(isRoom(i,j)&&isRoom(i-1,j)&&!isRoomEqual(i,j,i-1,j)){
          setTileDirtWall(i-1,j); //set the previous rooms tile to a wall instead
        } //end if
        if(isRoom(i,j)&&isRoom(i+1,j+1)&&!isRoomEqual(i,j,i+1,j+1)){
          setTileDirtWall(i,j);
        } //end if
        if(isRoom(i,j-1)&&isRoom(i-1,j)&&!isRoom(i,j)&&!isRoomEqual(i,j-1,i-1,j)){
          setTileDirtWall(i-1,j);
        } //end if
        if(isEmpty(i,j)){
          setTileDirtWall(i,j); //set the to a wall
        } //end if
      } //end for
    } //end for
  } //end partitionRooms()
  function drawTileDoors(){
    var chance;

    for(let i=1;i<size-1;i++){
      for(let j=1;j<size-1;j++){
        if(isTileCorridor(i,j)){

          // South tileDirtWall room
          if(i<size-2&&isTileDirtWall(i+1,j)&&isRoom(i+2,j)){

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(isTileCorridor(i,j+1)&&isTileDirtWall(i+1,j+1)&&isRoomEqual(i+2,j+1,i+2,j)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=0;
            }//end if

            // The tileDoor wil be spawned here at a 50% chance if there's another
            // location for the tileDoor, elseif there is no other location for the
            // tileDoor, then it will be spawned here with a 100% chance
            if(chance>80){
              if(roomNum.done[getRoom(i+2,j)]===false){
                roomNum.done[getRoom(i+2,j)]=true;
                setTileDoor(i+1,j);
              } //end if
            } //end if
          } //end if

          // East tileDirtWall room
          if(j<size-2&&isTileDirtWall(i,j+1)&&isRoom(i,j+2)){

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(isTileCorridor(i+1,j)&&isTileDirtWall(i+1,j+1)&&isRoomEqual(i+1,j+2,i,j+2)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=100;
            }//end if

            // The tileDoor wil be spawned here at a 50% chance if there's another
            // location for the tileDoor, elseif there is no other location for the
            // tileDoor, then it will be spawned here with a 100% chance
            if(chance>60){
              if(roomNum.done[getRoom(i,j+2)]===false){
                roomNum.done[getRoom(i,j+2)]=true;
                setTileDoor(i,j+1);
              } //end if
            }//end if
          } //end if

          // west tileDirtWall room
          if(i>2&&isTileDirtWall(i-1,j)&&isRoom(i-2,j)){ //west tileDirtWall room

            // check to see if there's another place for the tileDoor, and give
            // it a chance to be spawned instead of at the current location
            if(roomNum.done[getRoom(i-2,j)]===false){
              roomNum.done[getRoom(i-2,j)]=true;
              setTileDoor(i-1,j);
            } //end if
          } //end if
          if(j>2&&isTileDirtWall(i,j-1)&&isRoom(i,j-2)){ //north tileDirtWall room
            if(roomNum.done[getRoom(i,j-2)]===false){
              roomNum.done[getRoom(i,j-2)]=true;
              setTileDoor(i,j-1);
            } //end if
          } //end if
        } //end if
      } //end for
    } //end for
  } //end drawTileDoors()
  function cleanMap(){
    var node = {x: 0,y: 0},
        loc_max = {val: 0,cur: 0,num: 0,max: 0},
        unmapped=[];

    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        if(map[i][j].isWalkable()&&!map[i][j].loc){
          traverse(++loc_max.cur,i,j);
        } //end if
      } //end for
    } //end for
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
  function print(str){
    var result = str;

    if(str.length===1){
      result = '0'+str;
    } //end if
    return result;
  } //end print function
  function createCorridors(){
    while(fail<75&&win<size*3){
      direction=Math.floor(Math.random()*4);
      if(direction===0){//north
        if(cy-7>=0){
          val=move(NORTH);
          if(val===0){
            fail++
          }else if(val===1){
            win++;
          } //end if
        }else{
          fail++;
        } //end if
      }else if(direction===1){//east
        if(cx+7<size){
          val=move(EAST);
          if(val===0){
            fail++
          }else if(val===1){
            win++;
          } //end if
        }else{
          fail++;
        } //end if
      }else if(direction===2){//south
        if(cy+7<size){
          val=move(SOUTH);
          if(val===0){
            fail++
          }else if(val===1){
            win++;
          } //end if
        }else{
          fail++;
        } //end if
      }else if(direction===3){//west
        if(cx-7>=0){
          val=move(WEST);
          if(val===0){
            fail++
          }else if(val===1){
            win++;
          } //end if
        }else{
          fail++;
        } //end if
      } //end if
    } //end while
    carveDeadEnds();

    function carveDeadEnds(){
      for(let i=1;i<size-1;i++){
        for(let j=1;j<size-1;j++){
          if(isEmpty(i,j) && isTileCorridor(i-1,j) && isTileCorridor(i+1,j)||
             isEmpty(i,j) && isTileCorridor(i,j-1) && isTileCorridor(i,j+1)||
             isEmpty(i,j) && isTileCorridor(i-1,j) && isTileCorridor(i,j+1) &&
               isTileCorridor(i-2,j) && isTileCorridor(i,j+2)||
             isEmpty(i,j) && isTileCorridor(i,j+1) && isTileCorridor(i+1,j) &&
               isTileCorridor(i,j+2) && isTileCorridor(i+2,j)||
             isEmpty(i,j) && isTileCorridor(i+1,j) && isTileCorridor(i,j-1) &&
               isTileCorridor(i+2,j) && isTileCorridor(i,j-2)||
             isEmpty(i,j) && isTileCorridor(i,j-1) && isTileCorridor(i-1,j) &&
               isTileCorridor(i,j-2) && isTileCorridor(i-2,j)){
            setEmpty(i-1,j);setEmpty(i-1,j-1);setEmpty(i-1,j+1);
            setEmpty(i,j+1);setEmpty(i+1,j+1);setEmpty(i+1,j);
            setEmpty(i+1,j-1);setEmpty(i,j-1);
          } //end if
        } //end for
      } //end for
    } //end carveDeadEnds function
  } //end createCorridors()
} //end function
