const MAPTYPES = [
  {
    name: 'standard crypt',
    waterChance: 5,
    roomShape: [
      {
        name: 'square',
        chance: 95,
        sizes: [
          {size: 5, chance: 10},{size: 4, chance: 35},
          {size: 3, chance: 70},{size: 2, chance: 100}
        ]
      },
      {
        name: 'spherical',
        chance: 100,
        sizes: [
          {size: 9, chance: 4},{size: 8, chance: 8},
          {size: 7, chance: 12},{size: 6, chance: 20},
          {size: 5, chance: 45},{size: 4, chance: 70},
          {size: 3, chance: 100}
        ]
      }
    ]
  },
  {
    name: 'ancient crypt',
    waterChance: 85,
    roomShape: [
      {
        name: 'square',
        chance: 80,
        sizes: [
          {size: 5, chance: 10},{size: 4, chance: 35},
          {size: 3, chance: 70},{size: 2, chance: 100}
        ]
      },
      {
        name: 'spherical',
        chance: 100,
        sizes: [
          {size: 9, chance: 4},{size: 8, chance: 8},
          {size: 7, chance: 12},{size: 6, chance: 20},
          {size: 5, chance: 45},{size: 4, chance: 70},
          {size: 3, chance: 100}
        ]
      }
    ]
  },
  {
    name: 'crypt catacombs',
    waterChance: 15,
    roomShape: [
      {
        name: 'square',
        chance: 100,
        sizes: [
          {size: 5, chance: 10},{size: 4, chance: 35},
          {size: 3, chance: 70},{size: 2, chance: 100}
        ]
      }
    ]
  },
  {
    name: 'marshy dredge',
    waterChance: 85,
    roomShape: [
      {
        name: 'spherical',
        chance: 50,
        sizes: [
          {size: 15, chance: 2},{size: 14, chance: 4},
          {size: 13, chance: 6},{size: 12, chance: 8},
          {size: 11, chance: 10},{size: 10, chance: 12},
          {size: 9, chance: 14},{size: 8, chance: 16},
          {size: 7, chance: 18},{size: 6, chance: 20},
          {size: 5, chance: 45},{size: 4, chance: 70},
          {size: 3, chance: 100}
        ]
      },
      {
        name: 'square',
        chance: 100,
        sizes: [
          {size: 5, chance: 10},{size: 4, chance: 35},
          {size: 3, chance: 70},{size: 2, chance: 100}
        ]
      }
    ]
  },
  {
    name: 'wide passages',
    waterChance: 35,
    roomShape: [
      {
        name: 'spherical',
        chance: 100,
        sizes: [
          {size: 15, chance: 4},{size: 14, chance: 8},
          {size: 13, chance: 12},{size: 12, chance: 16},
          {size: 11, chance: 20},{size: 10, chance: 24},
          {size: 9, chance: 28},{size: 8, chance: 32},
          {size: 7, chance: 36},{size: 6, chance: 40},
          {size: 5, chance: 70},{size: 4, chance: 90},
          {size: 3, chance: 100}
        ]
      }
    ]
  },
  {
    name: 'deep passages',
    waterChance: 60,
    roomShape: [
      {
        name: 'spherical',
        chance: 90,
        sizes: [
          {size: 11, chance: 4},{size: 10, chance: 8},
          {size: 9, chance: 12},{size: 8, chance: 16},
          {size: 7, chance: 20},{size: 6, chance: 30},
          {size: 5, chance: 50},{size: 4, chance: 70},
          {size: 3, chance: 100}
        ]
      },
      {
        name: 'square',
        chance: 100,
        sizes: [
          {size: 5, chance: 10},{size: 4, chance: 35},
          {size: 3, chance: 70},{size: 2, chance: 100}
        ]
      }
    ]
  }
];

const ROOMTYPES = [
  'normal','dispersion','water islands','water island walkways',
  'water island','water pool'
];
const ROOMTYPES_NONWATER = ROOMTYPES.filter(r=>!r.includes('water'));

const N = 0;
const S = 1;
const E = 2;
const W = 3;

// rf stands for random number floored
// it takes an optional second param which means we need a random
// number between the range of num1 and num2
function rf(num1,num2){
  let result;

  if(num2){
    result = num1+Math.floor(Math.random()*num2);
  }else{
    result = Math.floor(Math.random()*num1);
  } //end if
  return result;
} //end rf()

// given a certain procedural type randomly select the room shape
function getRoomShape(proceduralType){
  let d100 = rf(100), roomShape;

  //eslint-disable-next-line no-return-assign
  proceduralType.roomShape.some(s=>roomShape=d100<s.chance?s.name:false);
  return roomShape;
} //end getRoomShape()

// given a certain procedural type and shape randomly select a room size
function getRoomSize(proceduralType,shapeName){
  let d100 = rf(100),
      roomShape =  proceduralType.roomShape.find(s=>s.name===shapeName),
      roomSize;

  //eslint-disable-next-line no-return-assign
  roomShape.sizes.some(s=> roomSize = d100<s.chance?s.size:false);
  return roomSize;
} //end getRoomSize()

// eslint-disable-next-line complexity
export function pcg(map){
  let size = map.width,
      cx = Math.floor(map.width/2),
      cy = Math.floor(map.height/2),
      roomDirection, //room direction to build
      roomSize, //room size of which to try to build.
      roomShape, //room type of which to build
      step=0, //number of times of which we've iterated.
      next, //this holds the next set of information pulled from the todo array
      successfulRooms=1, //this is used for the roomNum as well as debugging
      todo=[], //holds the list of directions that need to be searched and tried
      proceduralType=MAPTYPES[rf(MAPTYPES.length)];

  do{
    step++; //increase the number of times we've iterated by one.

    // First see if it's the first round, if so then we will start out
    // by creating a room in the center of the entire map, else we will use
    // one of the starting points our last room left for us
    if(step!==1){
      for (let i = todo.length,j,x; i; i -= 1) { //shuffle the array
        j = rf(i);
        x = todo[i - 1];
        todo[i - 1] = todo[j];
        todo[j] = x;
      } //end for
      next=todo.pop(); //now it's shuffled, take a todo off list and start
      cx=next.x;
      cy=next.y;
      roomDirection=next.rd;
    } //end if

    roomShape = getRoomShape(proceduralType);
    roomSize = getRoomSize(proceduralType,roomShape);

    // If we are first starting out the generation, then we need to have a
    // starting direction to begin building. Randomly choose that direction
    if(step===1) roomDirection = rf(4);

    // Square and spherical rooms have different size metrics. Depending on
    // which type the room is, acquire the room size
    if(step>=1000){
      todo.length=0;
    }else{
      let useWater = rf(100)<proceduralType.waterChance,
          drawPathway = step===1?false:true,
          roomType;

      if(successfulRooms>=15&&useWater){
        roomType=ROOMTYPES[rf(ROOMTYPES.length)];
      }else if(successfulRooms>=15&&!useWater){
        roomType=ROOMTYPES_NONWATER[rf(ROOMTYPES_NONWATER.length)];
      } //end if
      if(roomShape==='spherical'){
        if(buildSphereRoom(cx,cy,roomSize,roomDirection,drawPathway,roomType)){
          successfulRooms++;
        }else if(!rf(2)){
          roomSize=2;
          roomShape='square'; //try a square room before moving on
        } //end if
      } //end if
      if(roomShape==='square'){
        if(buildSquareRoom(cx,cy,roomSize,roomDirection,drawPathway,roomType)){
          successfulRooms++;
        } //end if
      } //end if
    } //end if
    if(todo.length===0 && successfulRooms<15){
      for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
          map.setEmpty(i,j);
          successfulRooms=1;
        } //end for
      } //end for
      step=0;
      cx = Math.floor(map.width/2);
      cy = Math.floor(map.height/2);
    } //end if
  }while(todo.length>0||step===0);

  // Surround the map with walls
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(sector.isWalkable()){
        if(x>0&&map.isEmpty(x-1,y)) map.setWall(x-1,y);
        if(x>0&&y>0&&map.isEmpty(x-1,y-1)) map.setWall(x-1,y-1);
        if(y>0&&map.isEmpty(x,y-1)) map.setWall(x,y-1);
        if(y>0&&x<map.width-1&&map.isEmpty(x+1,y-1)) map.setWall(x+1,y-1);
        if(x<map.width-1&&map.isEmpty(x+1,y)) map.setWall(x+1,y);
        if(x<map.width-1&&y<map.height-1&&map.isEmpty(x+1,y+1)) map.setWall(x+1,y+1);
        if(y<map.height-1&&map.isEmpty(x,y+1)) map.setWall(x,y+1);
        if(y<map.height-1&&x>0&&map.isEmpty(x-1,y+1)) map.setWall(x-1,y+1);

        // remove stranded floors caused by dispersion rooms
        if(y<map.height-1&&x<map.width-1&&x>0&&y>0&&
          !map.isWalkable(x-1,y)&&!map.isWalkable(x+1,y)&&
          !map.isWalkable(x,y-1)&&!map.isWalkable(x,y+1)){
          map.setWall(x,y);
        } //end if
      } //end if
      if(sector.isDoor()){
        let valid = false;

        if(x>0&&x<map.width-1&&map.isWall(x-1,y)&&map.isWall(x+1,y)){
          valid = true;
        }else if(y>0&&y<map.height-1&&map.isWall(x,y-1)&&map.isWall(x,y+1)){
          valid = true;
        } //end if
        if(!valid) sector.setFloor();
      }
    });
  });
  return true;

  // Check to see if a selection of area is empty
  function checkSpaceEmpty(x,y,x2,y2){
    for(let yi=y;yi<=y2;yi++){
      for(let xi=x;xi<=x2;xi++){
        if(xi<0||yi<0||xi>=map.width||yi>=map.height||!map.isEmpty(xi,yi)){
          return false;
        } //end for
      } //end for
    } //end for
    return true;
  } //end checkSpaceEmpty()

  //eslint-disable-next-line complexity
  function drawSpecialty(x,y,sx,sy,ex,ey,type){
    let halfX = (ex-sx)/2,
        halfY = (ey-sy)/2;

    if(type==='dispersion'){
      map.setFloor(x,y);
      if(ey-sy>2&&ex-sx>2&&(x===sx||x===ex||y===sy||y===ey)&&!rf(2)){
        map.setEmpty(x,y);
      } //end if
    }else if(type==='water islands'){
      if(!rf(2)){ //50% chance
        map.setFloor(x,y);
      }else{
        map.setWater(x,y);
      } //end if
    }else if(type==='water island walkways'){
      let n=!rf(2),s=!rf(2),e=!rf(2),w=!rf(2),
          na = x>=sx+halfX-1&&x<=ex-halfX&&y<=ey-halfY,
          sa = x>=sx+halfX-1&&x<=ex-halfX&&y>=sy+halfY-1,
          wa = x<=ex-halfX&&y>=sy+halfY-1&&y<=ey-halfY,
          ea = x>=sx+halfX-1&&y>=sy+halfY-1&&y<=ey-halfY;

      if(n&&na||s&&sa||w&&wa||e&&ea){
        map.setFloor(x,y);
        if(!rf(3))if(map.isWater(x-1,y-1))map.setFloor(x-1,y-1);
        if(!rf(3))if(map.isWater(x+1,y-1))map.setFloor(x+1,y-1);
        if(!rf(3))if(map.isWater(x-1,y+1))map.setFloor(x-1,y+1);
        if(!rf(3))if(map.isWater(x+1,y+1))map.setFloor(x+1,y+1);
      }else{
        map.setWater(x,y);
      } //end if
    }else if(type==='water island'){
      if(x>=sx+halfX/2&&x<=ex-halfX/2&&y>=sy+halfY/2&&y<=ey-halfY/2){
        let bend = !rf(2);

        if(bend&&x===sx+(halfX/2)|0||bend&&x===ex-(halfX/2)|0||
           bend&&y===sy+(halfY/2)|0||bend&&y===ey-(halfY/2)|0){
          map.setWater(x,y);
        }else{
          map.setFloor(x,y);
        } //end if
      }else{
        map.setWater(x,y);
      } //end if
    }else if(type==='water pool'){
      if(x>=sx+halfX/2&&x<=ex-halfX/2&&y>=sy+halfY/2&&y<=ey-halfY/2){
        let bend = !rf(2);

        if(bend&&x===sx+(halfX/2)|0||bend&&x===ex-(halfX/2)|0||
           bend&&y===sy+(halfY/2)|0||bend&&y===ey-(halfY/2)|0){
          map.setFloor(x,y);
        }else{
          map.setWater(x,y);
        } //end if
      }else{
        map.setFloor(x,y);
      } //end if
    }else{ // type==='normal'
      map.setFloor(x,y);
    } //end if
    return true;
  } //end drawSpecialty()

  // given a specified x and y coordinate, roomsize, direction and type
  // we will draw a spherical room
  // eslint-disable-next-line complexity
  function buildSphereRoom(x,y,roomSize,roomDirection,drawPathway,type){
    let i,j,sx,sy,ex,ey,
        r = roomSize/2,
        offset = roomSize%2===0?2:1,
        lx = x-(r)|0-offset>=0,
        ly = y-(r)|0-offset>=0,
        rn = lx && x+Math.ceil(r)+offset<size&&y-roomSize-offset>=0,
        re = ly && y+Math.ceil(r)+offset<size&&x+roomSize+offset<size,
        rs = lx && x+Math.ceil(r)+offset<size&&y+roomSize+offset<size,
        rw = ly && y+Math.ceil(r)+offset<size&&x-roomSize-offset>=0;

    if(roomSize===5){
      if(roomDirection===N && rn){
        if(!checkSpaceEmpty(x-3,y-6,x+3,y))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-2; sy=y-5; ex = x+2; ey=y-1;
        /*eslint-disable */
        [
                              [x,y-5],
                    [x-1,y-4],[x,y-4],[x+1,y-4],
          [x-2,y-3],[x-1,y-3],[x,y-3],[x+1,y-3],[x+2,y-3],
                    [x-1,y-2],[x,y-2],[x+1,y-2],
                              [x,y-1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x,y-1); //we enforce floors on either side of doors
        map.setFloor(x,y+1); //we enforce floors on either side of doors
        todo.push({rd: N,x: x,y: y-6});
        todo.push({rd: W,x: x-3,y: y-3});
        todo.push({rd: E,x: x+3,y: y-3});
      }else if(roomDirection===E && re){
        if(!checkSpaceEmpty(x,y-3,x+6,y+3))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x+1; ex = x+5; sy = y-2; ey = y+2;
        /*eslint-disable */
        [
                              [x+3,y-2],
                    [x+2,y-1],[x+3,y-1],[x+4,y-1],
          [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],[x+5,y  ],
                    [x+2,y+1],[x+3,y+1],[x+4,y+1],
                              [x+3,y+2]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x-1,y); //we enforce floors on either side of doors
        map.setFloor(x+1,y); //we enforce floors on either side of doors
        todo.push({rd: N,x: x+3,y: y-3});
        todo.push({rd: E,x: x+6,y: y});
        todo.push({rd: S,x: x+3,y: y+3});
      }else if(roomDirection===S && rs){
        if(!checkSpaceEmpty(x-3,y,x+3,y+6))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-2; sy = y+1; ex = x+2; ey = y+5;
        /*eslint-disable */
        [
                              [x  ,y+1],
                    [x-1,y+2],[x  ,y+2],[x+1,y+2],
          [x-2,y+3],[x-1,y+3],[x  ,y+3],[x+1,y+3],[x+2,y+3],
                    [x-1,y+4],[x  ,y+4],[x+1,y+4],
                              [x  ,y+5]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x,y-1); //we enforce floors on either side of doors
        map.setFloor(x,y+1); //we enforce floors on either side of doors
        todo.push({rd: S,x: x,y: y+6});
        todo.push({rd: W,x: x-3,y: y+3});
        todo.push({rd: E,x: x+3,y: y+3});
      }else if(roomDirection===W && rw){
        if(!checkSpaceEmpty(x-6,y-3,x,y+3))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-5; ex = x-1; sy = y-2; ey = y+2;
        /*eslint-disable */
        [
                              [x-3,y-2],
                    [x-4,y-1],[x-3,y-1],[x-2,y-1],
          [x-5,y  ],[x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
                    [x-4,y+1],[x-3,y+1],[x-2,y+1],
                              [x-3,y+2]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x-1,y); //we enforce floors on either side of doors
        map.setFloor(x+1,y); //we enforce floors on either side of doors
        todo.push({rd: N,x: x-3,y: y-3});
        todo.push({rd: W,x: x-6,y: y});
        todo.push({rd: S,x: x-3,y: y+3});
      } //end if
    }else if(roomSize===4){
      if(roomDirection===N && rn){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y-5,x+3,y))return false;
          if(drawPathway) map.setDoor(x,y);
          sx = x-1; ex = x+2; sy = y-4; ey = y-1;
          /*eslint-disable */
          [
                      [x,y-4],[x+1,y-4],
            [x-1,y-3],[x,y-3],[x+1,y-3],[x+2,y-3],
            [x-1,y-2],[x,y-2],[x+1,y-2],[x+2,y-2],
                      [x,y-1],[x+1,y-1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x,y-1); //we enforce floors on either side of doors
          map.setFloor(x,y+1); //we enforce floors on either side of doors
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
          if(drawPathway) map.setDoor(x,y);
          sx = x-2; sy = y-4; ex = x+1; ey= y-1;
          /*eslint-disable */
          [
                      [x-1,y-4],[x,y-4],
            [x-2,y-3],[x-1,y-3],[x,y-3],[x+1,y-3],
            [x-2,y-2],[x-1,y-2],[x,y-2],[x+1,y-2],
                      [x-1,y-1],[x,y-1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x,y-1); //we enforce floors on either side of doors
          map.setFloor(x,y+1); //we enforce floors on either side of doors
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
      }else if(roomDirection===E && re){
        if(!rf(2)){
          if(!checkSpaceEmpty(x,y-2,x+5,y+3))return false;
          if(drawPathway) map.setDoor(x,y);
          sx = x+1; ex = x+4; sy = y-1; ey = y+2;
          /*eslint-disable */
          [
                      [x+2,y-1],[x+3,y-1],
            [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],
            [x+1,y+1],[x+2,y+1],[x+3,y+1],[x+4,y+1],
                      [x+2,y+2],[x+3,y+2]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x+1,y); //we enforce floors on either side of doors
          map.setFloor(x-1,y); //we enforce floors on either side of doors
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
          if(drawPathway) map.setDoor(x,y);
          sx = x+1; ex = x+4; sy = y-2; ey = y+1;
          /*eslint-disable */
          [
                      [x+2,y-2],[x+3,y-2],
            [x+1,y-1],[x+2,y-1],[x+3,y-1],[x+4,y-1],
            [x+1,y  ],[x+2,y  ],[x+3,y  ],[x+4,y  ],
                      [x+2,y+1],[x+3,y+1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x+1,y); //we enforce floors on either side of doors
          map.setFloor(x-1,y); //we enforce floors on either side of doors
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
      }else if(roomDirection===S && rs){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y,x+3,y+5))return false;
          if(drawPathway) map.setDoor(x,y);
          sx = x-1; sy = y+1; ex = x+2; ey = y+4;
          /*eslint-disable */
          [
                      [x  ,y+1],[x+1,y+1],
            [x-1,y+2],[x  ,y+2],[x+1,y+2],[x+2,y+2],
            [x-1,y+3],[x  ,y+3],[x+1,y+3],[x+2,y+3],
                      [x  ,y+4],[x+1,y+4]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x,y-1); //we enforce floors on either side of doors
          map.setFloor(x,y+1); //we enforce floors on either side of doors
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
          if(drawPathway) map.setDoor(x,y);
          sx = x-2; sy = y+1; ex = x+1; ey = y+4;
          /*eslint-disable */
          [
                      [x-1,y+1],[x  ,y+1],
            [x-2,y+2],[x-1,y+2],[x  ,y+2],[x+1,y+2],
            [x-2,y+3],[x-1,y+3],[x  ,y+3],[x+1,y+3],
                      [x-1,y+4],[x  ,y+4]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x,y-1); //we enforce floors on either side of doors
          map.setFloor(x,y+1); //we enforce floors on either side of doors
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
      }else if(roomDirection===W && rw){
        if(!rf(2)){
          if(!checkSpaceEmpty(x-5,y-2,x,y+3))return false;
          if(drawPathway) map.setDoor(x,y);
          sx = x-4; sy = y-1; ex = x-1; ey = y+2;
          /*eslint-disable */
          [
                      [x-3,y-1],[x-2,y-1],
            [x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
            [x-4,y+1],[x-3,y+1],[x-2,y+1],[x-1,y+1],
                      [x-3,y+2],[x-2,y+2]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x-1,y); //we enforce floors on either side of doors
          map.setFloor(x+1,y); //we enforce floors on either side of doors
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
          if(drawPathway) map.setDoor(x,y);
          sx = x-4; sy = y-2; ex = x-1; ey = y+1;
          /*eslint-disable */
          [
                      [x-3,y-2],[x-2,y-2],
            [x-4,y-1],[x-3,y-1],[x-2,y-1],[x-1,y-1],
            [x-4,y  ],[x-3,y  ],[x-2,y  ],[x-1,y  ],
                      [x-3,y+1],[x-2,y+1]
          ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
          /*eslint-enable */
          map.setFloor(x-1,y); //we enforce floors on either side of doors
          map.setFloor(x+1,y); //we enforce floors on either side of doors
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
      if(roomDirection===N && rn){
        if(!checkSpaceEmpty(x-2,y-4,x+2,y))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-1; ex = x+1; sy = y-3; ey = y-1;
        /*eslint-disable */
        [
                    [x,y-3],
          [x-1,y-2],[x,y-2],[x+1,y-2],
                    [x,y-1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x,y-1); //we enforce floors on either side of doors
        map.setFloor(x,y+1); //we enforce floors on either side of doors
        todo.push({rd: E,x: x+2,y: y-2});
        todo.push({rd: W,x: x-2,y: y-2});
        todo.push({rd: N,x: x,y: y-4});
      }else if(roomDirection===E && re){
        if(!checkSpaceEmpty(x,y-2,x+4,y+2))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x+1; ex = x+3; sy = y-1; ey = y+1;
        /*eslint-disable */
        [
                    [x+2,y-1],
          [x+1,y  ],[x+2,y  ],[x+3,y  ],
                    [x+2,y+1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x-1,y); //we enforce floors on either side of doors
        map.setFloor(x+1,y); //we enforce floors on either side of doors
        todo.push({rd: E,x: x+4,y: y});
        todo.push({rd: N,x: x+2,y: y-2});
        todo.push({rd: S,x: x+2,y: y+2});
      }else if(roomDirection===S && rs){
        if(!checkSpaceEmpty(x-2,y,x+2,y+4))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-1; ex = x+1; sy = y+1; ey = y+3;
        /*eslint-disable */
        [
                    [x  ,y+1],
          [x-1,y+2],[x  ,y+2],[x+1,y+2],
                    [x  ,y+3]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x,y-1); //we enforce floors on either side of doors
        map.setFloor(x,y+1); //we enforce floors on either side of doors
        todo.push({rd: E,x: x+2,y: y+2});
        todo.push({rd: W,x: x-2,y: y+2});
        todo.push({rd: S,x: x,y: y+4});
      }else if(roomDirection===W && rw){
        if(!checkSpaceEmpty(x-4,y-2,x,y+2))return false;
        if(drawPathway) map.setDoor(x,y);
        sx = x-3; sy = y-1; ex = x-1; ey = y+1;
        /*eslint-disable */
        [
                    [x-2,y-1],
          [x-3,y  ],[x-2,y  ],[x-1,y  ],
                    [x-2,y+1]
        ].forEach(arr=> drawSpecialty(arr[0],arr[1],sx,sy,ex,ey,type));
        /*eslint-enable */
        map.setFloor(x-1,y); //we enforce floors on either side of doors
        map.setFloor(x+1,y); //we enforce floors on either side of doors
        todo.push({rd: W,x: x-4,y: y});
        todo.push({rd: N,x: x-2,y: y-2});
        todo.push({rd: S,x: x-2,y: y+2});
      } //end if
    }else if(roomDirection===N && rn){
      sx=x-Math.floor(r);
      ex=x+Math.ceil(r);
      sy=y-roomSize;
      ey=y;
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      if(drawPathway) map.setDoor(x,y);
      for(i=sx;i<ex;i++){
        for(j=sy;j<ey;j++){
          let cx = sx+(ex-sx)/2, //center x float
              cy = sy+(ey-sy)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(ex-sx)/2, // semi-axis 1
              sa2 = 0.5+(ey-sy)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,sx,sy,ex,ey,type);
          } //end if
        } //end for
      } //end for
      map.setFloor(x,y-1); //we enforce floors on either side of doors
      map.setFloor(x,y+1); //we enforce floors on either side of doors
      todo.push({rd: N,x: x,y: y-roomSize-1});
      todo.push({rd: W,x: x-Math.floor(r)+1,y: y-Math.floor(r)-1});
      todo.push({rd: E,x: x+Math.floor(r)-1,y: y-Math.floor(r)-1});
    }else if(roomDirection===E && re){
      sx=x+1;ex=x+roomSize;
      sy=y-Math.floor(r);
      ey=y+Math.ceil(r);
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      if(drawPathway) map.setDoor(x,y);
      for(i=sx;i<=ex;i++){
        for(j=sy;j<ey;j++){
          let cx = sx+(ex-sx)/2, //center x float
              cy = sy+(ey-sy)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(ex-sx)/2, // semi-axis 1
              sa2 = 0.5+(ey-sy)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,sx,sy,ex,ey,type);
          } //end if
        } //end for
      } //end for
      map.setFloor(x+1,y); //we enforce floors on either side of doors
      map.setFloor(x-1,y); //we enforce floors on either side of doors
      todo.push({rd: E,x: x+roomSize,y: y});
      todo.push({rd: N,x: x+Math.ceil(r),y: y-(r)|0-1});
      todo.push({rd: S,x: x+Math.ceil(r),y: y+Math.ceil(r)-1});
    }else if(roomDirection===S && rs){
      sx=x-Math.floor(r);
      ex=x+Math.ceil(r);
      sy=y+1;
      ey=y+roomSize;
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      if(drawPathway) map.setDoor(x,y);
      for(i=sx;i<ex;i++){
        for(j=sy;j<=ey;j++){
          let cx = sx+(ex-sx)/2, //center x float
              cy = sy+(ey-sy)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(ex-sx)/2, // semi-axis 1
              sa2 = 0.5+(ey-sy)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,sx,sy,ex,ey,type);
          } //end if
        } //end for
      } //end for
      map.setFloor(x,y-1); //we enforce floors on either side of doors
      map.setFloor(x,y+1); //we enforce floors on either side of doors
      todo.push({rd: S,x: x,y: y+roomSize+1});
      todo.push({rd: W,x: x-(r)|0-1,y: y+Math.ceil(r)});
      todo.push({rd: E,x: x+Math.ceil(r),y: y+Math.ceil(r)});
    }else if(roomDirection===W && rw){
      sx=x-roomSize;
      ex=x;
      sy=y-Math.floor(r);
      ey=y+Math.ceil(r);
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      if(drawPathway) map.setDoor(x,y);
      for(i=sx;i<ex;i++){
        for(j=sy;j<ey;j++){
          let cx = sx+(ex-sx)/2, //center x float
              cy = sy+(ey-sy)/2, //center y float
              w = Math.abs(i-cx), //comparison width
              h = Math.abs(j-cy), //comparison height
              sa1 = 0.5+(ex-sx)/2, // semi-axis 1
              sa2 = 0.5+(ey-sy)/2, // semi-axis 2
              hypotenuse = Math.sqrt(Math.pow(w,2)+Math.pow(h,2)),
              theta = Math.asin(h / hypotenuse),
              p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2),
              p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2),
              foci = (sa1*sa2)/Math.sqrt(p1+p2);

          if(hypotenuse<foci){
            drawSpecialty(i,j,sx,sy,ex,ey,type);
          } //end if
        } //end for
      } //end for
      map.setFloor(x-1,y); //we enforce floors on etiher side of doors
      map.setFloor(x+1,y); //we enforce floors on either side of doors
      todo.push({rd: W,x: x-roomSize-1,y: y});
      todo.push({rd: N,x: x-(r)|0-1,y: y-(r)|0-1});
      todo.push({rd: S,x: x-(r)|0-1,y: y+Math.ceil(r)});
    }else{
      return false; //went off side of map
    } //end if
    return true;
  } //end buildSphereRoom()

  // Given a specified x and y coordinate, roomsize, direction and type
  // we will draw a square room.
  //eslint-disable-next-line complexity
  function buildSquareRoom(x,y,roomSize,roomDirection,drawPathway,type){
    let i,j,sx,sy,ex,ey,
        r = roomSize / 2,
        lx = x-(r|0)-1>=0,
        ly = y-(r|0)-1>=0,
        rn = lx && x+Math.ceil(r)+1<size&&y-roomSize-1>=0,
        re = ly && y+Math.ceil(r)+1<size&&x+roomSize+1<size,
        rs = lx && x+Math.ceil(r)+1<size&&y+roomSize+1<size,
        rw = ly && y+Math.ceil(r)+1<size&&x-roomSize-1>=0;

    if(roomDirection===N && rn){
      sx=x-Math.floor(r);
      ex=x+Math.ceil(r);
      sy=y-roomSize;
      ey=y-1;
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      for(i=sx;i<=ex;i++){
        for(j=sy;j<=ey;j++){
          drawSpecialty(i,j,sx,sy,ex,ey,type);
        } //end for
      } //end for
      if(drawPathway) map.setDoor(x,y);
      map.setFloor(x,y-1); //we enforce floors on either side of doors
      map.setFloor(x,y+1); //we enforce floors on either side of doors
      todo.push({rd: N,x: x,y: sy-1});
      todo.push({rd: W,x: sx-1,y: sy+(r|0)});
      todo.push({rd: E,x: ex+1,y: sy+(r|0)});
    }else if(roomDirection===E && re){
      sx=x+1;
      ex=x+roomSize;
      sy=y-Math.floor(r);
      ey=y+Math.ceil(r);
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      for(i=sx;i<=ex;i++){
        for(j=sy;j<=ey;j++){
          drawSpecialty(i,j,sx,sy,ex,ey,type);
        } //end for
      } //end for
      if(drawPathway) map.setDoor(x,y);
      map.setFloor(x-1,y); //we enforce floors on either side of doors
      map.setFloor(x+1,y); //we enforce floors on either side of doors
      todo.push({rd: E,x: ex+1,y: y});
      todo.push({rd: N,x: sx+(r|0),y: sy-1});
      todo.push({rd: S,x: sx+(r|0),y: ey+1});
    }else if(roomDirection===S && rs){
      sx=x-Math.floor(r);
      ex=x+Math.ceil(r);
      sy=y+1;
      ey=y+roomSize;
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      for(i=sx;i<=ex;i++){
        for(j=sy;j<=ey;j++){
          drawSpecialty(i,j,sx,sy,ex,ey,type);
        } //end for
      } //end for
      if(drawPathway) map.setDoor(x,y);
      map.setFloor(x,y-1); //we enforce floors on either side of doors
      map.setFloor(x,y+1); //we enforce floors on either side of doors
      todo.push({rd: S,x: x,y: ey+1});
      todo.push({rd: W,x: sx-1,y: sy+(r|0)});
      todo.push({rd: E,x: ex+1,y: sy+(r|0)});
    }else if(roomDirection===W && rw){
      sx=x-roomSize;
      ex=x-1;
      sy=y-Math.floor(r);
      ey=y+Math.ceil(r);
      if(!checkSpaceEmpty(sx-1,sy-1,ex+1,ey+1))return false;
      for(i=sx;i<=ex;i++){
        for(j=sy;j<=ey;j++){
          drawSpecialty(i,j,sx,sy,ex,ey,type);
        } //end for
      } //end for
      if(drawPathway) map.setDoor(x,y);
      map.setFloor(x-1,y); //we enforce floors on either side of doors
      map.setFloor(x+1,y); //we enforce floors on either side of doors
      todo.push({rd: W,x: sx-1,y: y});
      todo.push({rd: N,x: sx+(r|0),y: sy-1});
      todo.push({rd: S,x: sx+(r|0),y: ey+1});
    } //end if
    return true;
  } //end buildSquareRoom()
} //end function
