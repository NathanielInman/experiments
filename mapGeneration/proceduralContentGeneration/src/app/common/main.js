const CRYPT_STANDARD = 0;
const CRYPT_ANCIENT = 1;
const CRYPT_CATACOMBS = 2;
const MARSHY_DREDGE = 3;
const WIDE_PASSAGES = 4;
const DEEP_PASSAGES = 5;

const tileUnused = 0;
const tileDirtFloor = 1;
const tileDirtWall = 2;
const tileCorridor = 4;
const tileDoor = 5;
const tileBossFloor = 6;
const tileLootFloor = 7;

const N = 0;
const S = 1;
const E = 2;
const W = 3;

export function PCG(map,size,proceduralType){
  var i,j, //used as temporary iterators.
      cx,cy, //center x and y
      rd, //room direction to build
      rs, //room size of which to try to build.
      rt, //room type of which to build
      step=0, //number of times of which we've iterated.
      next, //this holds the next set of information pulled from the todo array
      successfulRooms=1, //this is used for the roomNum as well as debugging
      todo=[], //holds the list of directions that need to be searched and tried
      floorType=tileDirtFloor,
      bossSpawned=false,
      lootSpawned=false,
      useWater=true;

  if(proceduralType===CRYPT_STANDARD||
     proceduralType===CRYPT_ANCIENT||
     proceduralType===CRYPT_CATACOMBS||
     proceduralType===MARSHY_DREDGE||
     proceduralType===WIDE_PASSAGES) useWater = false;
  do{
    step++; //increase the number of times we've iterated by one.
    rs=rf(100); //roll a percentage dice.
    rt=rf(100); //randomly choose a room type
    if(step!==1){
      next=todo.pop();
      cx=next.x;cy=next.y;rd=next.rd;
    }else{
      cx=Math.floor(size/6);
      cy=Math.floor(size/6);
    } //end if
    if(proceduralType===DEEP_PASSAGES){
      rt=1; //100% sphere
    }else{
      rt=rt<50?0:1;
    } //end if
    if(step===1){ //highest chance for the highest room sizes
      rd=rf(4); //choose a random direction to build a room into
      if(rt===0){
        if(rs<40){rs=5; //room size of 7x7 including walls
        }else if(rs<80){rs=4; //room size of 6x6 including walls
        }else if(rs<90){rs=3; //room size of 5x5 including walls
        }else{rs=2;} //room size of 4x4 including walls
      }else if(rt===1){ //initial room if sphere is likely very large
        if(rs<20){rs=15;
        }else if(rs<28){rs=14;
        }else if(rs<36){rs=13;
        }else if(rs<44){rs=12;
        }else if(rs<52){rs=11;
        }else if(rs<60){rs=10;
        }else if(rs<68){rs=9;
        }else if(rs<76){rs=8;
        }else if(rs<84){rs=7;
        }else{rs=6;}
        if(proceduralType===CRYPT_STANDARD||
           proceduralType===CRYPT_ANCIENT||
           proceduralType===CRYPT_CATACOMBS){
          rs=3;
        }else if(proceduralType===MARSHY_DREDGE||
                 proceduralType===WIDE_PASSAGES){
          rs=4;
        }//end if
      } //end if
    }else if(step>=2){ //second highest chance for the highest room sizes
      if(rt===0){
        if(rs<10){rs=5; //room size of 7x7 including walls
        }else if(rs<35){rs=4; //room size of 6x6 including walls
        }else if(rs<70){rs=3; //room size of 5x5 including walls
        }else{rs=2;} //room size of 4x4 including walls
      }else if(rt===1){
        if(rs<2){rs=15;
        }else if(rs<4){rs=14;
        }else if(rs<6){rs=13;
        }else if(rs<8){rs=12;
        }else if(rs<10){rs=11;
        }else if(rs<12){rs=10;
        }else if(rs<14){rs=9;
        }else if(rs<16){rs=8;
        }else if(rs<18){rs=7;
        }else if(rs<20){rs=6;
        }else if(rs<45){rs=5;
        }else if(rs<70){rs=4;
        }else{rs=3;}
        if(proceduralType===CRYPT_STANDARD||
           proceduralType===CRYPT_ANCIENT||
           proceduralType===CRYPT_CATACOMBS){
          rs=3;
        }else if(proceduralType===MARSHY_DREDGE||
                 proceduralType===WIDE_PASSAGES){
          rs=4;
        } //end if
      } //end if
    } //end if
    if(step>=500){
      todo.length=0;
    }else{
      if(bossSpawned===false&&rf(100)<20){
        bossSpawned=true;
        floorType=tileBossFloor;
      }else if(lootSpawned===false&&rf(100)<10||lootSpawned===true&&rf(100)<5){
        lootSpawned=true;
        floorType=tileLootFloor;
      }else{
        floorType=tileDirtFloor;
      }//end if
      if(rt===1){

        //only draw a door after the first iteration
        if(buildSphereRoom(cx,cy,rs,rd,step===1?false:true,useWater===true?rf(5):5)){
          successfulRooms++;
        }else if(!rf(2)){
          rs=2;rt=0; //sphere room failed, try a square room before moving on
        } //end if
      } //end if
      if(rt===0){

        // only draw a door after the first iteration
        if(buildSquareRoom(cx,cy,rs,rd,step===1?false:true)){
          successfulRooms++;
        } //end if
      } //end if
    } //end if
    if(todo.length===0 && successfulRooms<15){
      for(let i=0;i<size;i++)for(let j=0;j<size;j++){cs(i,j);successfulRooms=1;}
      step=0;
    } //end if
  }while(todo.length>0||step===0);

  // Surround the map with walls
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(map[i][j].isWalkable()){
        if(i>0&&map[i-1][j].isEmpty()) map[i-1][j].setWall();
        if(i<size&&map[i+1][j].isEmpty()) map[i+1][j].setWall();
        if(j>0&&map[i][j-1].isEmpty()) map[i][j-1].setWall();
        if(j<size&&map[i][j+1].isEmpty()) map[i][j+1].setWall();
        if(i>0&&j>0&&map[i-1][j-1].isEmpty()) map[i-1][j-1].setWall();
        if(i<size&&j<size&&map[i+1][j+1].isEmpty()) map[i+1][j+1].setWall();
        if(i>0&&j<size&&map[i-1][j+1].isEmpty()) map[i-1][j+1].setWall();
        if(i<size&&j>0&&map[i+1][j-1].isEmpty()) map[i+1][j-1].setWall();
      } //end if
    } //end for
  } //end for
  return true;

  // rf stands for random number floored
  // it takes an optional second param which means we need a random
  // number between the range of num1 and num2
  function rf(num1,num2){
    var result;

    if(num2){
      result = num1+Math.floor(Math.random()*num2);
    }else{
      result = Math.floor(Math.random()*num1);
    } //end if
    return result;
  } //end rf()

  // Check to see if a selection of area is empty
  function checkSpaceEmpty(x,y,x2,y2){
    for(let i=x;i<=x2;i++){
      for(let j=y;j<=y2;j++){
        if(!map[i][j].isEmpty()){
          return false;
        } //end if
      } //end for
    } //end for
    return true;
  } //end checkSpaceEmpty()

  // set cooridor of x,y location
  function sc(x,y){
    map[x][y].setCorridor();
    map[x][y].loc=rd;
    map[x][y].roomNum=successfulRooms;
  } //end sc()

  // clear sector of all information we may have set
  function cs(x,y){
    map[x][y].setEmpty();
    map[x][y].loc=0;
    map[x][y].roomNum=0;
  } //end cs()

  // given a specified x and y coordinate, roomsize, direction and type
  // we will draw a spherical room
  function buildSphereRoom(){
    var x = arguments[0],
        y = arguments[1],
        roomSize = arguments[2],
        direction = arguments[3],
        drawPathway = arguments[4],
        type = 2, //arguments[5],
        floorType = arguments[6],
        i,j,startX,startY,endX,endY,
        centerX,centerY,radius=roomSize/2;

    function drawSpecialty(x,y,startX,startY,endX,endY){
      var halfX = (endX-startX)/2,
          halfY = (endY-startY)/2;

      // island with random dispersion that always touches
      if(type===1){
        map[x][y].setFloor();
        if(!rf(2)){ //50% chance
          if(!rf(2))map[x-1][y-1].setFloor();
          if(!rf(2))map[x+1][y-1].setFloor();
          if(!rf(2))map[x-1][y+1].setFloor();
          if(!rf(2))map[x+1][y+1].setFloor();
        } //end if

      // Completely random dispersion islands
      }else if(type===2){
        if(!rf(2)){ //50% chance
          map[x][y].setFloor();
        }else{
          map[x][y].setWater();
        } //end if

      // Walkways to all cardinal directions with dispersed dirt nearby touching
      }else if(type===3){
        if(x>=startX+halfX&&x<=endX-halfX||y>=startY+halfY&&y<=endY-halfY){
          map[x][y].setFloor();
          if(!rf(3))if(map[x-1][y-1].isWater())map[x-1][y-1].setFloor();
          if(!rf(3))if(map[x+1][y-1].isWater())map[x+1][y-1].setFloor();
          if(!rf(3))if(map[x-1][y+1].isWater())map[x-1][y+1].setFloor();
          if(!rf(3))if(map[x+1][y+1].isWater())map[x+1][y+1].setFloor();
        }else{
          map[x][y].setWater();
        } //end if

      // Dispersed pool of water in the center of the room
      }else if(type===4){
        if(x>=startX+halfX/2&&x<=endX-halfX/2&&y>=startY+halfY/2&&y<=endY-halfY/2){
          map[x][y].setFloor();
        }else{
          map[x][y].setWater();
        } //end if
      } //end if
      return true;
    } //end drawSpecialty()

    if(roomSize===5){
      if(rd===N && x-(roomSize/2)|0-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
        if(!checkSpaceEmpty(x-3,y-6,x+3,y))return false;
        if(drawPathway)sc(x,y);
        startX = x-2; startY=y-5; endX = x+2; endY=y-1;
        /*eslint-disable */
        [
                              [x,y-5],
                    [x-1,y-4],[x,y-4],[x+1,y-4],
          [x-2,y-3],[x-1,y-3],[x,y-3],[x+1,y-3],[x+2,y-3],
                    [x-1,y-2],[x,y-2],[x+1,y-2],
                              [x,y-1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: N,x: x,y: y-6});
        todo.push({rd: W,x: x-3,y: y-3});
        todo.push({rd: E,x: x+3,y: y-3});
      }else if(rd===E && y-(roomSize/2)|0-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
        if(!checkSpaceEmpty(x,y-3,x+6,y+3))return false;
        if(drawPathway)sc(x,y);
        startX = x+1; endX = x+5; startY = y-2; endY = y+2;
        /*eslint-disable */
        [
                              [x+3,y-2],
                    [x+2,y-1],[x+3,y-1],[x+4,y-1],
          [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],[x+5,y  ],
                    [x+2,y+1],[x+3,y+1],[x+4,y+1],
                              [x+3,y+2]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: N,x: x+3,y: y-3});
        todo.push({rd: E,x: x+6,y: y});
        todo.push({rd: S,x: x+3,y: y+3});
      }else if(rd===S && x-(roomSize/2)|0-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
        if(!checkSpaceEmpty(x-3,y,x+3,y+6))return false;
        if(drawPathway)sc(x,y);
        startX = x-2; startY = y+1; endX = x+2; endY = y+5;
        /*eslint-disable */
        [
                              [x  ,y+1],
                    [x-1,y+2],[x  ,y+2],[x+1,y+2],
          [x-2,y+3],[x-1,y+3],[x  ,y+3],[x+1,y+3],[x+2,y+3],
                    [x-1,y+4],[x  ,y+4],[x+1,y+4],
                              [x  ,y+5]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: S,x: x,y: y+6});
        todo.push({rd: W,x: x-3,y: y+3});
        todo.push({rd: E,x: x+3,y: y+3});
      }else if(rd===W && y-(roomSize/2)|0-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
        if(!checkSpaceEmpty(x-6,y-3,x,y+3))return false;
        if(drawPathway)sc(x,y);
        startX = x-5; endX = x-1; startY = y-2; endY = y+2;
        /*eslint-disable */
        [
                              [x-3,y-2],
                    [x-4,y-1],[x-3,y-1],[x-2,y-1],
          [x-5,y  ],[x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
                    [x-4,y+1],[x-3,y+1],[x-2,y+1],
                              [x-3,y+2]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: N,x: x-3,y: y-3});
        todo.push({rd: W,x: x-6,y: y});
        todo.push({rd: S,x: x-3,y: y+3});
      } //end if
    }else if(roomSize===4){
      if(rd===N && x-(roomSize/2)|0-2>=0 && x+Math.ceil(roomSize/2)+2<size&&y-roomSize-2>=0){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y-5,x+3,y))return false;
          if(drawPathway)sc(x,y);
          startX = x-1; endX = x+2; startY = y-4; endY = y-1;
          /*eslint-disable */
          [
                      [x,y-4],[x+1,y-4],
            [x-1,y-3],[x,y-3],[x+1,y-3],[x+2,y-3],
            [x-1,y-2],[x,y-2],[x+1,y-2],[x+2,y-2],
                      [x,y-1],[x+1,y-1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){ //50% chance
            todo.push({rd: E,x: x+3,y: y-2});
          }else{
            todo.push({rd: E,x: x+3,y: y-3});
          } //end if
          if(!rf(2)){ //50% chance
            todo.push({rd: W,x: x-2,y: y-2});
          }else{
            todo.push({rd: W,x: x-2,y: y-3});
          } //end if
          if(!rf(2)){ //50% chance
            todo.push({rd: N,x: x,y: y-5});
          }else{
            todo.push({rd: N,x: x+1,y: y-5});
          } //end if
        }else{
          if(!checkSpaceEmpty(x-3,y-5,x+2,y))return false;
          if(drawPathway)sc(x,y);
          startX = x-2; startY = y-4; endX = x+1; endY= y-1;
          /*eslint-disable */
          [
                      [x-1,y-4],[x,y-4],
            [x-2,y-3],[x-1,y-3],[x,y-3],[x+1,y-3],
            [x-2,y-2],[x-1,y-2],[x,y-2],[x+1,y-2],
                      [x-1,y-1],[x,y-1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: E,x: x+2,y: y-2});
          }else{
            todo.push({rd: E,x: x+2,y: y-3});
          } //end if
          if(!rf(2)){
            todo.push({rd: W,x: x-3,y: y-2});
          }else{
            todo.push({rd: W,x: x-3,y: y-3});
          }
          if(!rf(2)){
            todo.push({rd: N,x: x-1,y: y-5});
          }else{
            todo.push({rd: N,x: x,y: y-5});
          } //end if
        } //end if
      }else if(rd===E && y-Math.floor(roomSize/2)-2>=0 && y+Math.ceil(roomSize/2)+2<size&&x+roomSize+2<size){
        if(!rf(2)){
          if(!checkSpaceEmpty(x,y-2,x+5,y+3))return false;
          if(drawPathway)sc(x,y);
          startX = x+1; endX = x+4; startY = y-1; endY = y+2;
          /*eslint-disable */
          [
                      [x+2,y-1],[x+3,y-1],
            [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],
            [x+1,y+1],[x+2,y+1],[x+3,y+1],[x+4,y+1],
                      [x+2,y+2],[x+3,y+2]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: N,x: x+2,y: y-2});
          }else{
            todo.push({rd: N,x: x+3,y: y-2});
          } //end if
          if(!rf(2)){
            todo.push({rd: E,x: x+5,y: y});
          }else{
            todo.push({rd: E,x: x+5,y: y+1});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x+2,y: y+3});
          }else{
            todo.push({rd: S,x: x+3,y: y+3});
          } //end if
        }else{
          if(!checkSpaceEmpty(x,y-3,x+5,y+2))return false;
          if(drawPathway)sc(x,y);
          startX = x+1; endX = x+4; startY = y-2; endY = y+1;
          /*eslint-disable */
          [
                      [x+2,y-2],[x+3,y-2],
            [x+1,y-1],[x+2,y-1],[x+3,y-1],[x+4,y-1],
            [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],
                      [x+2,y+1],[x+3,y+1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: N,x: x+2,y: y-3});
          }else{
            todo.push({rd: N,x: x+3,y: y-3});
          } //end if
          if(!rf(2)){
            todo.push({rd: E,x: x+5,y: y-1});
          }else{
            todo.push({rd: E,x: x+5,y: y});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x+2,y: y+2});
          }else{
            todo.push({rd: S,x: x+3,y: y+2});
          } //end if
        } //end if
      }else if(rd===S && x-Math.floor(roomSize/2)-2>=0 && x+Math.ceil(roomSize/2)+2<size&&y+roomSize+2<size){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y,x+3,y+5))return false;
          if(drawPathway)sc(x,y);
          startX = x-1; startY = y+1; endX = x+2; endY = y+4;
          /*eslint-disable */
          [
                      [x  ,y+1],[x+1,y+1],
            [x-1,y+2],[x  ,y+2],[x+1,y+2],[x+2,y+2],
            [x-1,y+3],[x  ,y+3],[x+1,y+3],[x+2,y+3],
                      [x  ,y+4],[x+1,y+4]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: E,x: x+3,y: y+2});
          }else{
            todo.push({rd: E,x: x+3,y: y+3});
          } //end if
          if(!rf(2)){
            todo.push({rd: W,x: x-2,y: y+2});
          }else{
            todo.push({rd: W,x: x-2,y: y+3});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x,y: y+5});
          }else{
            todo.push({rd: S,x: x+1,y: y+5});
          } //end if
        }else{
          if(!checkSpaceEmpty(x-3,y,x+2,y+5))return false;
          if(drawPathway)sc(x,y);
          startX = x-2; startY = y+1; endX = x+1; endY = y+4;
          /*eslint-disable */
          [
                      [x-1,y+1],[x  ,y+1],
            [x-2,y+2],[x-1,y+2],[x  ,y+2],[x+1,y+2],
            [x-2,y+3],[x-1,y+3],[x  ,y+3],[x+1,y+3],
                      [x-1,y+4],[x  ,y+4]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: E,x: x+2,y: y+2});
          }else{
            todo.push({rd: E,x: x+2,y: y+3});
          } //end if
          if(!rf(2)){
            todo.push({rd: W,x: x-3,y: y+2});
          }else{
            todo.push({rd: W,x: x-3,y: y+3});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x-1,y: y+5});
          }else{
            todo.push({rd: S,x: x,y: y+5});
          } //end if
        } //end if
      }else if(rd===W && y-Math.floor(roomSize/2)-2>=0 && y+Math.ceil(roomSize/2)+2<size&&x-roomSize-2>=0){
        if(!rf(2)){
          if(!checkSpaceEmpty(x-5,y-2,x,y+3))return false;
          if(drawPathway)sc(x,y);
          startX = x-4; startY = y-1; endX = x-1; endY = y+2;
          /*eslint-disable */
          [
                      [x-3,y-1],[x-2,y-1],
            [x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
            [x-4,y+1],[x-3,y+1],[x-2,y+1],[x-1,y+1],
                      [x-3,y+2],[x-2,y+2]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: N,x: x-2,y: y-2});
          }else{
            todo.push({rd: N,x: x-3,y: y-2});
          } //end if
          if(!rf(2)){
            todo.push({rd: W,x: x-5,y: y});
          }else{
            todo.push({rd: W,x: x-5,y: y+1});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x-2,y: y+3});
          }else{
            todo.push({rd: S,x: x-3,y: y+3});
          } //end if
        }else{
          if(!checkSpaceEmpty(x-5,y-3,x,y+2))return false;
          if(drawPathway)sc(x,y);
          startX = x-4; startY = y-2; endX = x-1; endY = y+1;
          /*eslint-disable */
          [
                      [x-3,y-2],[x-2,y-2],
            [x-4,y-1],[x-3,y-1],[x-2,y-1],[x-1,y-1],
            [x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
                      [x-3,y+1],[x-2,y+1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
          /*eslint-enable */
          if(!rf(2)){
            todo.push({rd: N,x: x-2,y: y-3});
          }else{
            todo.push({rd: N,x: x-3,y: y-3});
          } //end if
          if(!rf(2)){
            todo.push({rd: W,x: x-5,y: y-1});
          }else{
            todo.push({rd: W,x: x-5,y: y});
          } //end if
          if(!rf(2)){
            todo.push({rd: S,x: x-2,y: y+2});
          }else{
            todo.push({rd: S,x: x-3,y: y+2});
          } //end if
        } //end if
      } //end if
    }else if(roomSize===3){
      if(rd===N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
        if(!checkSpaceEmpty(x-2,y-4,x+2,y))return false;
        if(drawPathway)sc(x,y);
        startX = x-1; endX = x+1; startY = y-3; endY = y-1;
        /*eslint-disable */
        [
                    [x,y-3],
          [x-1,y-2],[x,y-2],[x+1,y-2],
                    [x,y-1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: E,x: x+2,y: y-2});
        todo.push({rd: W,x: x-2,y: y-2});
        todo.push({rd: N,x: x,y: y-4});
      }else if(rd===E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
        if(!checkSpaceEmpty(x,y-2,x+4,y+2))return false;
        if(drawPathway)sc(x,y);
        startX = x+1; endX = x+3; startY = y-1; endY = y+1;
        /*eslint-disable */
        [
                    [x+2,y-1],
          [x+1,y  ],[x+2,y  ],[x+3,y  ],
                    [x+2,y+1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: E,x: x+4,y: y});
        todo.push({rd: N,x: x+2,y: y-2});
        todo.push({rd: S,x: x+2,y: y+2});
      }else if(rd===S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
        if(!checkSpaceEmpty(x-2,y,x+2,y+4))return false;
        if(drawPathway)sc(x,y);
        startX = x-1; endX = x+1; startY = y+1; endY = y+3;
        /*eslint-disable */
        [
                    [x  ,y+1],
          [x-1,y+2],[x  ,y+2],[x+1,y+2],
                    [x  ,y+3]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: E,x: x+2,y: y+2});
        todo.push({rd: W,x: x-2,y: y+2});
        todo.push({rd: S,x: x,y: y+4});
      }else if(rd===W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
        if(!checkSpaceEmpty(x-4,y-2,x,y+2))return false;
        if(drawPathway)sc(x,y);
        startX = x-3; startY = y-1; endX = x-1; endY = y+1;
        /*eslint-disable */
        [
                    [x-2,y-1],
          [x-3,y  ],[x-2,y  ],[x-1,y  ],
                    [x-2,y+1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],startX,startY,endX,endY));
        /*eslint-enable */
        todo.push({rd: W,x: x-4,y: y});
        todo.push({rd: N,x: x-2,y: y-2});
        todo.push({rd: S,x: x-2,y: y+2});
      } //end if
    }else if(rd===N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
      centerX=x;centerY=y-Math.floor(radius);
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y-roomSize;endY=y;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      if(drawPathway)sc(x,y);
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          let cx = startX+(endX-startX)/2, //center x float
              cy = startY+(endY-startY)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(endX-startX)/2, // semi-axis 1
              sa2 = 0.5+(endY-startY)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,startX,startY,endX,endY);
          } //end if
        } //end for
      } //end for
      todo.push({rd: N,x: x,y: y-roomSize-1});
      todo.push({rd: W,x: x-Math.floor(radius)+1,y: y-Math.floor(radius)-1});
      todo.push({rd: E,x: x+Math.floor(radius)-1,y: y-Math.floor(radius)-1});
    }else if(rd===E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
      centerX=x+Math.floor(roomSize/2);centerY=y;
      startX=x+1;endX=x+roomSize;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      if(drawPathway)sc(x,y);
      for(i=startX;i<=endX;i++){
        for(j=startY;j<endY;j++){
          let cx = startX+(endX-startX)/2, //center x float
              cy = startY+(endY-startY)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(endX-startX)/2, // semi-axis 1
              sa2 = 0.5+(endY-startY)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,startX,startY,endX,endY);
          } //end if
        } //end for
      } //end for
      todo.push({rd: E,x: x+roomSize,y: y});
      todo.push({rd: N,x: x+Math.ceil(roomSize/2),y: y-Math.floor(roomSize/2)-1});
      todo.push({rd: S,x: x+Math.ceil(roomSize/2),y: y+Math.ceil(roomSize/2)-1});
    }else if(rd===S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
      centerX=x;centerY=y+Math.floor(roomSize/2);
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y+1;endY=y+roomSize;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      if(drawPathway)sc(x,y);
      for(i=startX;i<endX;i++){
        for(j=startY;j<=endY;j++){
          let cx = startX+(endX-startX)/2, //center x float
              cy = startY+(endY-startY)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(endX-startX)/2, // semi-axis 1
              sa2 = 0.5+(endY-startY)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,startX,startY,endX,endY);
          } //end if
        } //end for
      } //end for
      todo.push({rd: S,x: x,y: y+roomSize+1});
      todo.push({rd: W,x: x-Math.floor(roomSize/2)-1,y: y+Math.ceil(roomSize/2)});
      todo.push({rd: E,x: x+Math.ceil(roomSize/2),y: y+Math.ceil(roomSize/2)});
    }else if(rd===W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
      centerX=x-Math.floor(roomSize/2);centerY=y;
      startX=x-roomSize;endX=x;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      if(drawPathway)sc(x,y);
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          let cx = startX+(endX-startX)/2, //center x float
              cy = startY+(endY-startY)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(endX-startX)/2, // semi-axis 1
              sa2 = 0.5+(endY-startY)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,startX,startY,endX,endY);
          } //end if
        } //end for
      } //end for
      todo.push({rd: W,x: x-roomSize-1,y: y});
      todo.push({rd: N,x: x-Math.floor(roomSize/2)-1,y: y-Math.floor(roomSize/2)-1});
      todo.push({rd: S,x: x-Math.floor(roomSize/2)-1,y: y+Math.ceil(roomSize/2)});
    }else{
      return false; //went off side of map
    } //end if
  } //end buildSphereRoom()

  // Given a specified x and y coordinate, roomsize, direction and type
  // we will draw a square room.
  function buildSquareRoom(){
    var x = arguments[0],
        y = arguments[1],
        roomSize = arguments[2],
        direction = arguments[3],
        drawPathway = arguments[4],
        floorType = arguments[5],
        i,j,startX,startY,endX,endY;

    if(rd===N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y-roomSize;endY=y;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          map[i][j].setFloor();
        } //end for
      } //end for
      todo.push({rd: N,x: x,y: y-roomSize-1});
      todo.push({rd: W,x: x-Math.floor(roomSize/2)-1,y: y-Math.floor(roomSize/2)-1});
      todo.push({rd: E,x: x+Math.ceil(roomSize/2),y: y-Math.floor(roomSize/2)-1});
    }else if(rd===E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
      startX=x+1;endX=x+roomSize;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<=endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          map[i][j].setFloor();
        } //end for
      } //end for
      todo.push({rd: E,x: x+roomSize+1,y: y});
      todo.push({rd: N,x: x+Math.ceil(roomSize/2),y: y-Math.floor(roomSize/2)-1});
      todo.push({rd: S,x: x+Math.ceil(roomSize/2),y: y+Math.ceil(roomSize/2)});
    }else if(rd===S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y+1;endY=y+roomSize;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<=endY;j++){
          if(drawPathway)sc(x,y);
          map[i][j].setFloor();
        } //end for
      } //end for
      todo.push({rd: S,x: x,y: y+roomSize+1});
      todo.push({rd: W,x: x-Math.floor(roomSize/2)-1,y: y+Math.ceil(roomSize/2)});
      todo.push({rd: E,x: x+Math.ceil(roomSize/2),y: y+Math.ceil(roomSize/2)});
    }else if(rd===W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
      startX=x-roomSize;endX=x;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          map[i][j].setFloor();
        } //end for
      } //end for
      todo.push({rd: W,x: x-roomSize-1,y: y});
      todo.push({rd: N,x: x-Math.floor(roomSize/2)-1,y: y-Math.floor(roomSize/2)-1});
      todo.push({rd: S,x: x-Math.floor(roomSize/2)-1,y: y+Math.ceil(roomSize/2)});
    }else{
      return false; //went off side of map
    } //end if
    return true;
  } //end buildSquareRoom()
} //end function
