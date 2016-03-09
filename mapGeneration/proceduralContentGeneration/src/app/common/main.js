 /*************************************************************\
 * This function was created by Nathaniel Inman of The Other  *
 * Experiment Studio for use in the 2013 7DRL Three.RL. This  *
 * function performs Diffusion Limited Aggregation on a map   *
 * while saving the variables to the multidimensional map and *
 * returning a boolean on whether the map was made            *
 * successfully or not.                                       *
 *------------------------------------------------------------*
 *           R E Q U I R E D      C O N S T A N T S           *
 *------------------------------------------------------------*
 * tileUnused - specifies which value is default unused       *
 * tileDirtFloor - specifies what value to set the floor to   *
 * tileDirtWall - specifies which value is the wall           *
 *------------------------------------------------------------*
 *              P A S S E D       V A R I A B L E S           *
 *------------------------------------------------------------*
 * map  - the main 2 dimensional array                        *
 *  | .type - contains the type at the coordinate specifies   *
 *  | ...   - other variables won't be affected
 * size - the max size of x and y coordinates                 *
 * cx   - the x coordinate of the player                      *
 * cy   - the y coordinate of the player                      *
 *------------------------------------------------------------*
 *           R E T U R N E D      V A R I A B L E S           *
 *------------------------------------------------------------*
 * map.type  - Alters from intial value to tileDirtFloor      *
 * generateMap_DLA - returns true if successful, false if not *
\**************************************************************/
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

  debugger;
  if(proceduralType==CRYPT_STANDARD||
     proceduralType==CRYPT_ANCIENT||
     proceduralType==CRYPT_CATACOMBS||
     proceduralType==MARSHY_DREDGE||
     proceduralType==WIDE_PASSAGES) useWater = false;

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

  // set floor of x,y location
  function sf(x,y,type){
    if(type==3){
      map[x][y].setWater();
    }else if(proceduralType==MARSHY_DREDGE){
      if(Math.floor(Math.random()*2)===0){
        map[x][y].setFloor();
      }else{
        map[x][y].setWater();
      } //end if
    }else{
      map[x][y].setFloor();
    } //end if
    map[x][y].loc=rd;
    map[x][y].roomNum=successfulRooms;
  } //end sf()

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

  function buildSphereRoom(){
    var x = arguments[0],
        y = arguments[1],
        roomSize = arguments[2],
        direction = arguments[3],
        drawPathway = arguments[4],
        type = arguments[5],
        floorType = arguments[6],
        CorridorType = arguments[7],
        i,j,startX,startY,endX,endY,
        centerX,centerY,radius=roomSize/2;

    function drawSpecialty(startX,startY,endX,endY,centerX,centerY){

      // island with random dispersion that always touches
      if(type===1){
        for(i=startX+(radius|0)-((radius/3)|0);i<endX-(radius|0)+((radius/3)|0);i++){
          for(j=startY+(radius|0)-((radius/3)|0);j<endY-(radius|0)+((radius/3)|0);j++){
            map[i][j].setFloor();
            if(Math.floor(Math.random()*2)===0){
              if(Math.floor(Math.random()*2)===0)map[i-1][j-1].setFloor();
              if(Math.floor(Math.random()*2)===0)map[i+1][j-1].setFloor();
              if(Math.floor(Math.random()*2)===0)map[i-1][j+1].setFloor();
              if(Math.floor(Math.random()*2)===0)map[i+1][j+1].setFloor();
            } //end if
          } //end for
        } //end for

      // Completely random dispersion islands
      }else if(type===2){
        for(i=startX+Math.floor(radius)-Math.floor(radius/2);i<=endX-Math.floor(radius)+Math.floor(radius/2);i++){
          for(j=startY+Math.floor(radius)-Math.floor(radius/2);j<=endY-Math.floor(radius)+Math.floor(radius/2);j++){
            if(Math.floor(Math.random()*2)===0)map[i][j].setFloor();
          } //end for
        } //end for

      // Walkways to all cardinal directions with dispersed dirt nearby touching
      }else if(type==3){
        for(i=startX;i<endX;i++){
          for(j=startY;j<=endY;j++){
            if(i>=startX+Math.floor(radius)-Math.floor(radius/3)&&i<endX-Math.floor(radius)+Math.floor(radius/3)&&
                            j>=startY+Math.floor(radius)-Math.floor(radius/3)&&j<endY-Math.floor(radius)+Math.floor(radius/3)||
                            i==centerX||j==centerY){
              map[i][j].setFloor();
              if(Math.floor(Math.random()*3)===0)if(map[i-1][j-1].isWater())map[i-1][j-1].type=floorType;
              if(Math.floor(Math.random()*3)===0)if(map[i+1][j-1].type==tileWater)map[i+1][j-1].type=floorType;
              if(Math.floor(Math.random()*3)===0)if(map[i-1][j+1].type==tileWater)map[i-1][j+1].type=floorType;
              if(Math.floor(Math.random()*3)===0)if(map[i+1][j+1].type==tileWater)map[i+1][j+1].type=floorType;
            } //end if
          } //end for
        } //end for
      }else if(type==4){ //-------------dispersed pool of water in the center of the room
        for(i=startX+Math.floor(radius)-Math.floor(radius/3);i<endX-Math.floor(radius)+Math.floor(radius/3);i++){
          for(j=startY+Math.floor(radius)-Math.floor(radius/3);j<endY-Math.floor(radius)+Math.floor(radius/3);j++){
            map[i][j].type=tileWater;
            if(Math.floor(Math.random()*2)===0){
              if(Math.floor(Math.random()*2)===0)map[i-1][j-1].type=tileWater;
              if(Math.floor(Math.random()*2)===0)map[i+1][j-1].type=tileWater;
              if(Math.floor(Math.random()*2)===0)map[i-1][j+1].type=tileWater;
              if(Math.floor(Math.random()*2)===0)map[i+1][j+1].type=tileWater;
            } //end if
          } //end for
        } //end for
      } //end if
    };
    if(roomSize==5){
      if(rd==N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
        /* Make sure that the area is available before writing to it */
        if(!checkSpaceEmpty(x-3,y-6,x+3,y))return false;
        if(drawPathway)sc(x,y);
        sf(x,y-1,type);sf(x-1,y-2,type);sf(x,y-2,type);sf(x+1,y-2,type);sf(x-2,y-3,type);sf(x-1,y-3,type);sf(x,y-3,type);
        sf(x+1,y-3,type);sf(x+2,y-3,type);sf(x-1,y-4,type);sf(x,y-4,type);sf(x+1,y-4,type);sf(x,y-5,type);
        todo.push({rd:N,x:x,y:y-6});
        todo.push({rd:W,x:x-3,y:y-3});
        todo.push({rd:E,x:x+3,y:y-3});
        return true; //we don't do speciality on small rooms
      }else if(rd==E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
        /* Make sure that the area is available before writing to it */
        if(!checkSpaceEmpty(x,y-3,x+6,y+3))return false;
        if(drawPathway)sc(x,y);
        sf(x+1,y,type);sf(x+2,y-1,type);sf(x+2,y+1,type);sf(x+2,y,type);sf(x+3,y-2,type);sf(x+3,y-1,type);sf(x+3,y,type);
        sf(x+3,y+1,type);sf(x+3,y+2,type);sf(x+4,y-1,type);sf(x+4,y,type);sf(x+4,y+1,type);sf(x+5,y,type);
        todo.push({rd:N,x:x+3,y:y-3});
        todo.push({rd:E,x:x+6,y:y});
        todo.push({rd:S,x:x+3,y:y+3});
        return true; //we don't do speciality on small rooms
      }else if(rd==S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
        /* Make sure that the area is available before writing to it */
        if(!checkSpaceEmpty(x-3,y,x+3,y+6))return false;
        if(drawPathway)sc(x,y);
        sf(x,y+1,type);sf(x-1,y+2,type);sf(x,y+2,type);sf(x+1,y+2,type);sf(x-2,y+3,type);sf(x-1,y+3,type);sf(x,y+3,type);
        sf(x+1,y+3,type);sf(x+2,y+3,type);sf(x-1,y+4,type);sf(x,y+4,type);sf(x+1,y+4,type);sf(x,y+5,type);
        todo.push({rd:S,x:x,y:y+6});
        todo.push({rd:W,x:x-3,y:y+3});
        todo.push({rd:E,x:x+3,y:y+3});
        return true; //we don't do speciality on small rooms
      }else if(rd==W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
        /* Make sure that the area is available before writing to it */
        if(!checkSpaceEmpty(x-6,y-3,x,y+3))return false;
        if(drawPathway)sc(x,y);
        sf(x-1,y,type);sf(x-2,y-1,type);sf(x-2,y+1,type);sf(x-2,y,type);sf(x-3,y-2,type);sf(x-3,y-1,type);sf(x-3,y,type);
        sf(x-3,y+1,type);sf(x-3,y+2,type);sf(x-4,y-1,type);sf(x-4,y,type);sf(x-4,y+1,type);sf(x-5,y,type);
        todo.push({rd:N,x:x-3,y:y-3});
        todo.push({rd:W,x:x-6,y:y});
        todo.push({rd:S,x:x-3,y:y+3});
        return true; //we don't do speciality on small rooms
      } //end if      
    }else if(roomSize==4){
      if(rd==N && x-Math.floor(roomSize/2)-2>=0 && x+Math.ceil(roomSize/2)+2<size&&y-roomSize-2>=0){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y-5,x+3,y))return false;
          if(drawPathway)sc(x,y);
          sf(x,y-1,type);sf(x+1,y-1,type);sf(x-1,y-2,type);sf(x,y-2,type);sf(x+1,y-2,type);sf(x+2,y-2,type);
          sf(x-1,y-3,type);sf(x,y-3,type);sf(x+1,y-3,type);sf(x+2,y-3,type);sf(x,y-4,type);sf(x+1,y-4,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+3,y:y-2});}else{todo.push({rd:E,x:x+3,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-2,y:y-2});}else{todo.push({rd:W,x:x-2,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x,y:y-5});}else{todo.push({rd:S,x:x+1,y:y-5});}
          return true; //we don't do speciality on small rooms
        }else{
          if(!checkSpaceEmpty(x-3,y-5,x+2,y))return false;
          if(drawPathway)sc(x,y);
          sf(x-1,y-1,type);sf(x,y-1,type);sf(x-2,y-2,type);sf(x-1,y-2,type);sf(x,y-2,type);sf(x+1,y-2,type);
          sf(x-2,y-3,type);sf(x-1,y-3,type);sf(x,y-3,type);sf(x+1,y-3,type);sf(x-1,y-4,type);sf(x,y-4,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+2,y:y-2});}else{todo.push({rd:E,x:x+2,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-3,y:y-2});}else{todo.push({rd:W,x:x-3,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x-1,y:y-5});}else{todo.push({rd:S,x:x,y:y-5});}
          return true; //we don't do speciality on small rooms
        } //end if
      }else if(rd==E && y-Math.floor(roomSize/2)-2>=0 && y+Math.ceil(roomSize/2)+2<size&&x+roomSize+2<size){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x,y-2,x+5,y+3))return false;
          if(drawPathway)sc(x,y);
          sf(x+1,y,type);sf(x+1,y+1,type);sf(x+2,y-1,type);sf(x+2,y,type);sf(x+2,y+1,type);sf(x+2,y+2,type);
          sf(x+3,y-1,type);sf(x+3,y,type);sf(x+3,y+1,type);sf(x+3,y+2,type);sf(x+4,y,type);sf(x+4,y+1,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x+2,y:y-2});}else{todo.push({rd:N,x:x+3,y:y-2});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+5,y:y});}else{todo.push({rd:W,x:x+5,y:y+1});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x+2,y:y+3});}else{todo.push({rd:S,x:x+3,y:y+3});}
          return true; //we don't do speciality on small rooms
        }else{
          if(!checkSpaceEmpty(x,y-3,x+5,y+2))return false;
          if(drawPathway)sc(x,y);
          sf(x+1,y-1,type);sf(x+1,y,type);sf(x+2,y-2,type);sf(x+2,y-1,type);sf(x+2,y,type);sf(x+2,y+1,type);
          sf(x+3,y-2,type);sf(x+3,y-1,type);sf(x+3,y,type);sf(x+3,y+1,type);sf(x+4,y-1,type);sf(x+4,y,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x+2,y:y-3});}else{todo.push({rd:N,x:x+3,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+5,y:y-1});}else{todo.push({rd:W,x:x+5,y:y});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x+2,y:y+2});}else{todo.push({rd:S,x:x+3,y:y+2});}
          return true; //we don't do speciality on small rooms
        } //end if
      }else if(rd==S && x-Math.floor(roomSize/2)-2>=0 && x+Math.ceil(roomSize/2)+2<size&&y+roomSize+2<size){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-2,y,x+3,y+5))return false;
          if(drawPathway)sc(x,y);
          sf(x,y+1,type);sf(x+1,y+1,type);sf(x-1,y+2,type);sf(x,y+2,type);sf(x+1,y+2,type);sf(x+2,y+2,type);
          sf(x-1,y+3,type);sf(x,y+3,type);sf(x+1,y+3,type);sf(x+2,y+3,type);sf(x,y+4,type);sf(x+1,y+4,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+3,y:y+2});}else{todo.push({rd:E,x:x+3,y:y+3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-2,y:y+2});}else{todo.push({rd:W,x:x-2,y:y+3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x,y:y+5});}else{todo.push({rd:S,x:x+1,y:y+5});}
          return true; //we don't do speciality on small rooms
        }else{
          if(!checkSpaceEmpty(x-3,y,x+2,y+5))return false;
          if(drawPathway)sc(x,y);
          sf(x-1,y+1,type);sf(x,y+1,type);sf(x-2,y+2,type);sf(x-1,y+2,type);sf(x,y+2,type);sf(x+1,y+2,type);
          sf(x-2,y+3,type);sf(x-1,y+3,type);sf(x,y+3,type);sf(x+1,y+3,type);sf(x-1,y+4,type);sf(x,y+4,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:E,x:x+2,y:y+2});}else{todo.push({rd:E,x:x+2,y:y+3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-3,y:y+2});}else{todo.push({rd:W,x:x-3,y:y+3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x-1,y:y+5});}else{todo.push({rd:S,x:x,y:y+5});}
          return true; //we don't do speciality on small rooms
        } //end if
      }else if(rd==W && y-Math.floor(roomSize/2)-2>=0 && y+Math.ceil(roomSize/2)+2<size&&x-roomSize-2>=0){
        if(Math.floor(Math.random()*2)===0){
          if(!checkSpaceEmpty(x-5,y-2,x,y+3))return false;
          if(drawPathway)sc(x,y);
          sf(x-1,y,type);sf(x-1,y+1,type);sf(x-2,y-1,type);sf(x-2,y,type);sf(x-2,y+1,type);sf(x-2,y+2,type);
          sf(x-3,y-1,type);sf(x-3,y,type);sf(x-3,y+1,type);sf(x-3,y+2,type);sf(x-4,y,type);sf(x-4,y+1,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x-2,y:y-2});}else{todo.push({rd:N,x:x-3,y:y-2});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-5,y:y});}else{todo.push({rd:W,x:x-5,y:y+1});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x-2,y:y+3});}else{todo.push({rd:S,x:x-3,y:y+3});}
          return true; //we don't do speciality on small rooms
        }else{
          if(!checkSpaceEmpty(x-5,y-3,x,y+2))return false;
          if(drawPathway)sc(x,y);
          sf(x-1,y-1,type);sf(x-1,y,type);sf(x-2,y-2,type);sf(x-2,y-1,type);sf(x-2,y,type);sf(x-2,y+1,type);
          sf(x-3,y-2,type);sf(x-3,y-1,type);sf(x-3,y,type);sf(x-3,y+1,type);sf(x-4,y-1,type);sf(x-4,y,type);
          if(Math.floor(Math.random()*2)===0){todo.push({rd:N,x:x-2,y:y-3});}else{todo.push({rd:N,x:x-3,y:y-3});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:W,x:x-5,y:y-1});}else{todo.push({rd:W,x:x-5,y:y});}
          if(Math.floor(Math.random()*2)===0){todo.push({rd:S,x:x-2,y:y+2});}else{todo.push({rd:S,x:x-3,y:y+2});}
          return true; //we don't do speciality on small rooms
        } //end if
      } //end if
    }else if(roomSize==3){
      if(rd==N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
        if(!checkSpaceEmpty(x-2,y-4,x+2,y))return false;
        if(drawPathway)sc(x,y);
        sf(x,y-1,type);sf(x,y-3,type);sf(x-1,y-2,type);sf(x,y-2,type);sf(x+1,y-2,type);
        todo.push({rd:E,x:x+2,y:y-2});
        todo.push({rd:W,x:x-2,y:y-2});
        todo.push({rd:N,x:x,y:y-4});
        return true; //we don't do speciality on small rooms
      }else if(rd==E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
        if(!checkSpaceEmpty(x,y-2,x+4,y+2))return false;
        if(drawPathway)sc(x,y);
        sf(x+1,y,type);sf(x+3,y,type);sf(x+2,y-1,type);sf(x+2,y,type);sf(x+2,y+1,type);
        todo.push({rd:E,x:x+4,y:y});
        todo.push({rd:N,x:x+2,y:y-2});
        todo.push({rd:S,x:x+2,y:y+2});
        return true; //we don't do speciality on small rooms
      }else if(rd==S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
        if(!checkSpaceEmpty(x-2,y,x+2,y+4))return false;
        if(drawPathway)sc(x,y);
        sf(x,y+1,type);sf(x,y+3,type);sf(x-1,y+2,type);sf(x,y+2,type);sf(x+1,y+2,type);
        todo.push({rd:E,x:x+2,y:y+2});
        todo.push({rd:W,x:x-2,y:y+2});
        todo.push({rd:S,x:x,y:y+4});
        return true; //we don't do speciality on small rooms
      }else if(rd==W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
        if(!checkSpaceEmpty(x-4,y-2,x,y+2))return false;
        if(drawPathway)sc(x,y);
        sf(x-1,y,type);sf(x-3,y,type);sf(x-2,y-1,type);sf(x-2,y,type);sf(x-2,y+1,type);
        todo.push({rd:W,x:x-4,y:y});
        todo.push({rd:N,x:x-2,y:y-2});
        todo.push({rd:S,x:x-2,y:y+2});
        return true; //we don't do speciality on small rooms
      } //end if
    } //end if
    if(rd==N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
      centerX=x;centerY=y-Math.floor(radius);
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y-roomSize;endY=y;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(i>centerX+Math.ceil(Math.cos((j-y-Math.floor(radius))/(Math.PI*roomSize/10))*radius)-1&&
                        i<centerX-Math.ceil(Math.cos((j-y-Math.floor(radius))/(Math.PI*roomSize/10))*radius)+1||
                        j==startY&&i==centerX){
            if(drawPathway)sc(x,y);
            if(type===0){if(Math.floor(Math.random()*2)===0){map[i][j].type=tileWater;}else{sf(i,j);}
            }else if(type<=3){map[i][j].type=tileWater;}else{sf(i,j);}
          } //end if
        } //end for
      } //end for
      todo.push({rd:N,x:x,y:y-roomSize-1});
      todo.push({rd:W,x:x-Math.floor(radius)+1,y:y-Math.floor(radius)-1});
      todo.push({rd:E,x:x+Math.floor(radius)-1,y:y-Math.floor(radius)-1});
    }else if(rd==E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
      centerX=x+Math.floor(roomSize/2);centerY=y;
      startX=x+1;endX=x+roomSize;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<=endX;i++){
        for(j=startY;j<endY;j++){
          if(i>centerX+Math.ceil(Math.cos((j-y-Math.floor(radius*2))/(Math.PI*roomSize/10))*radius)-1&&
                        i<centerX-Math.ceil(Math.cos((j-y-Math.floor(radius*2))/(Math.PI*roomSize/10))*radius)+2||
                        i==centerX){
            if(drawPathway)sc(x,y);
            if(type===0){if(Math.floor(Math.random()*2)===0){map[i][j].type=tileWater;}else{sf(i,j);}
            }else if(type<=3){map[i][j].type=tileWater;}else{sf(i,j);}
          } //end if
        } //end for
      } //end for
      todo.push({rd:E,x:x+roomSize,y:y});
      todo.push({rd:N,x:x+Math.ceil(roomSize/2),y:y-Math.floor(roomSize/2)-1});
      todo.push({rd:S,x:x+Math.ceil(roomSize/2),y:y+Math.ceil(roomSize/2)-1});
    }else if(rd==S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
      centerX=x;centerY=y+Math.floor(roomSize/2);
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y+1;endY=y+roomSize;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<=endY;j++){
          if(i>centerX+Math.ceil(Math.cos((j-y-Math.floor(radius*3))/(Math.PI*roomSize/10))*radius)-2&&
                        i<centerX-Math.ceil(Math.cos((j-y-Math.floor(radius*3))/(Math.PI*roomSize/10))*radius)+1||
                        j==y-Math.floor(roomSize/2)&&i==centerX){
            if(drawPathway)sc(x,y);
            if(type===0){if(Math.floor(Math.random()*2)===0){map[i][j].type=tileWater;}else{sf(i,j);}
            }else if(type<=3){map[i][j].type=tileWater;}else{sf(i,j);}
          } //end if
        } //end for
      } //end for
      todo.push({rd:S,x:x,y:y+roomSize+1});
      todo.push({rd:W,x:x-Math.floor(roomSize/2)-1,y:y+Math.ceil(roomSize/2)});
      todo.push({rd:E,x:x+Math.ceil(roomSize/2),y:y+Math.ceil(roomSize/2)});
    }else if(rd==W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
      centerX=x-Math.floor(roomSize/2);centerY=y;
      startX=x-roomSize;endX=x;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(i>centerX+Math.ceil(Math.cos((j-y-Math.floor(radius*2))/(Math.PI*roomSize/10))*radius)-3&&
                        i<centerX-Math.ceil(Math.cos((j-y-Math.floor(radius*2))/(Math.PI*roomSize/10))*radius)+1||
                        j==y-Math.floor(roomSize/2)&&i==centerX){
            if(drawPathway)sc(x,y);
            if(type===0){if(Math.floor(Math.random()*2)===0){map[i][j].type=tileWater;}else{sf(i,j);}
            }else if(type<=3){map[i][j].type=tileWater;}else{sf(i,j);}
          } //end if
        } //end for
      } //end for
      todo.push({rd:W,x:x-roomSize-1,y:y});
      todo.push({rd:N,x:x-Math.floor(roomSize/2)-1,y:y-Math.floor(roomSize/2)-1});
      todo.push({rd:S,x:x-Math.floor(roomSize/2)-1,y:y+Math.ceil(roomSize/2)});
    }else{
      return false; //went off side of map
    } //end if
    drawSpecialty(startX,startY,endX,endY,centerX,centerY);
    return true;
  }; //end function
  var buildSquareRoom=function(x,y,roomSize,direction,drawPathway,floorType,corridorType){
    var i,j,startX,startY,endX,endY; //i and j are used as temporary iterators
    if(rd==N && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y-roomSize-1>=0){
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y-roomSize;endY=y;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          sf(i,j);
        } //end for
      } //end for
      todo.push({rd:N,x:x,y:y-roomSize-1});
      todo.push({rd:W,x:x-Math.floor(roomSize/2)-1,y:y-Math.floor(roomSize/2)-1});
      todo.push({rd:E,x:x+Math.ceil(roomSize/2),y:y-Math.floor(roomSize/2)-1});
    }else if(rd==E && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x+roomSize+1<size){
      startX=x+1;endX=x+roomSize;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<=endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          sf(i,j);
        } //end for
      } //end for      
      todo.push({rd:E,x:x+roomSize+1,y:y});
      todo.push({rd:N,x:x+Math.ceil(roomSize/2),y:y-Math.floor(roomSize/2)-1});
      todo.push({rd:S,x:x+Math.ceil(roomSize/2),y:y+Math.ceil(roomSize/2)});
    }else if(rd==S && x-Math.floor(roomSize/2)-1>=0 && x+Math.ceil(roomSize/2)+1<size&&y+roomSize+1<size){
      startX=x-Math.floor(roomSize/2);endX=x+Math.ceil(roomSize/2);
      startY=y+1;endY=y+roomSize;
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<=endY;j++){
          if(drawPathway)sc(x,y);
          sf(i,j);
        } //end for
      } //end for
      todo.push({rd:S,x:x,y:y+roomSize+1});
      todo.push({rd:W,x:x-Math.floor(roomSize/2)-1,y:y+Math.ceil(roomSize/2)});
      todo.push({rd:E,x:x+Math.ceil(roomSize/2),y:y+Math.ceil(roomSize/2)});
    }else if(rd==W && y-Math.floor(roomSize/2)-1>=0 && y+Math.ceil(roomSize/2)+1<size&&x-roomSize-1>=0){
      startX=x-roomSize;endX=x;
      startY=y-Math.floor(roomSize/2);endY=y+Math.ceil(roomSize/2);
      if(!checkSpaceEmpty(startX-1,startY-1,endX+1,endY+1))return false;
      for(i=startX;i<endX;i++){
        for(j=startY;j<endY;j++){
          if(drawPathway)sc(x,y);
          sf(i,j);
        } //end for
      } //end for
      todo.push({rd:W,x:x-roomSize-1,y:y});
      todo.push({rd:N,x:x-Math.floor(roomSize/2)-1,y:y-Math.floor(roomSize/2)-1});
      todo.push({rd:S,x:x-Math.floor(roomSize/2)-1,y:y+Math.ceil(roomSize/2)});
    }else{
      return false; //went off side of map
    } //end if
    return true;
  }; //end function
  do{
    step++; //increase the number of times we've iterated by one.
    rs=Math.floor(Math.random()*100); //roll a percentage dice.
    rt=Math.floor(Math.random()*100); //randomly choose a room type
    if(step!=1){
      next=todo.pop();
      cx=next.x;cy=next.y;rd=next.rd;
    }else{
      cx=Math.floor(size/6);cy=Math.floor(size/6);
    } //end if
    if(proceduralType==DEEP_PASSAGES){
      rt=1; //100% sphere
    }else{
      if(rt<50){
        rt=0;
      }else{
        rt=1;
      }
    } //end if
    if(step==1){ //highest chance for the highest room sizes
      rd=Math.floor(Math.random()*4); //choose a random direction to build a room into
      if(rt===0){
        if(rs<40){rs=5; //room size of 7x7 including walls
        }else if(rs<80){rs=4; //room size of 6x6 including walls
        }else if(rs<90){rs=3; //room size of 5x5 including walls
        }else{rs=2;} //room size of 4x4 including walls
      }else if(rt==1){ //initial room if sphere is likely very large
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
        if(proceduralType==CRYPT_STANDARD||proceduralType==CRYPT_ANCIENT||proceduralType==CRYPT_CATACOMBS){
          rs=3;
        }else if(proceduralType==MARSHY_DREDGE||proceduralType==WIDE_PASSAGES){
          rs=4;
        }//end if
      } //end if  
    }else if(step>=2){ //second highest chance for the highest room sizes
      if(rt===0){
        if(rs<10){rs=5; //room size of 7x7 including walls
        }else if(rs<35){rs=4; //room size of 6x6 including walls
        }else if(rs<70){rs=3; //room size of 5x5 including walls
        }else{rs=2;} //room size of 4x4 including walls
      }else if(rt==1){
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
        if(proceduralType==CRYPT_STANDARD||proceduralType==CRYPT_ANCIENT||proceduralType==CRYPT_CATACOMBS){
          rs=3;
        }else if(proceduralType==MARSHY_DREDGE||proceduralType==WIDE_PASSAGES){
          rs=4;
        } //end if
      } //end if
    } //end if
    if(step>=500){
      todo.length=0;
    }else{
      if(bossSpawned===false&&Math.floor(Math.random()*100)<20){
        bossSpawned=true;floorType=tileBossFloor;
      }else if(lootSpawned===false&&Math.floor(Math.random()*100)<10||lootSpawned===true&&Math.floor(Math.random()*100)<5){
        lootSpawned=true;floorType=tileLootFloor;
      }else{
        floorType=tileDirtFloor;
      }//end if
      if(rt==1){
        if(buildSphereRoom(cx,cy,rs,rd,step==1?false:true,useWater===true?Math.floor(Math.random()*5):5,floorType,tileCorridor)){ //only draw a door after the first iteration
        }else{
          if(Math.floor(Math.random()*2)===0){rs=2;rt=0;} //sphere room failed, try a square room before moving on
        } //end if
      } //end if
      if(rt===0){
        if(buildSquareRoom(cx,cy,rs,rd,step==1?false:true,floorType,tileCorridor)){  //only draw a door after the first iteration
        } //end if
      } //end if
    } //end if
    if(todo.length===0 && successfulRooms<15){
      for(var i=0;i<size;i++){for(var j=0;j<size;j++){cs(i,j);successfulRooms=1;}}
      step=0;
    } //end if
  }while(todo.length>0||step===0);
    /*  Fix the error I can't adjust for - There is a corridor offshoot of large spherical rooms that isn't connected
        Also make the corridors have a chance to be interesting. */
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(map[i][j].type==tileUnused&&j>0&&j<size){
        if(map[i][j-1].type!=tileUnused&&map[i][j+1].type==tileCorridor){
          map[i][j].type=tileDirtFloor;
        } //end if
      }else if(map[i][j].type==tileCorridor){
        if(proceduralType==CRYPT_STANDARD||proceduralType==CRYPT_ANCIENT||proceduralType==CRYPT_CATACOMBS){
          rs=3;
        } //end if
        if(proceduralType==CRYPT_STANDARD||proceduralType==CRYPT_ANCIENT||proceduralType==DEEP_PASSAGES||proceduralType==MARSHY_DREDGE||proceduralType==WIDE_PASSAGES){
          if(i>0)if(      map[i-1][j].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                    map[i-1][j].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i-1][j].type=tileDirtFloor;
          if(i<size)if(   map[i+1][j].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                    map[i+1][j].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i+1][j].type=tileDirtFloor;
          if(j>0)if(      map[i][j-1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                    map[i][j-1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i][j-1].type=tileDirtFloor;
          if(j<size)if(   map[i][j+1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                    map[i][j+1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i][j+1].type=tileDirtFloor;
        } //end if
        if(proceduralType==CRYPT_CATACOMBS||proceduralType==CRYPT_ANCIENT||proceduralType==DEEP_PASSAGES||proceduralType==MARSHY_DREDGE||proceduralType==WIDE_PASSAGES){
          if(i>0&&j>0)if(         map[i-1][j-1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                            map[i-1][j-1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i-1][j-1].type=tileDirtFloor;
          if(i<size&&j<size)if(   map[i+1][j+1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                            map[i+1][j+1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i+1][j+1].type=tileDirtFloor;
          if(i>0&&j<size)if(      map[i-1][j+1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                            map[i-1][j+1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i-1][j+1].type=tileDirtFloor;
          if(i<size&&j>0)if(      map[i+1][j-1].type==tileUnused&&Math.floor(Math.random()*2)===0||
                                            map[i+1][j-1].type==tileUnused&&proceduralType==WIDE_PASSAGES)map[i+1][j-1].type=tileDirtFloor;
        } //end if
        map[i][j].type=tileDirtFloor;
      }//end if
    } //end for
  } //end for
  /* Surround the map with visible walls */
  for(i=0;i<size;i++){
    for(j=0;j<size;j++){
      if(engine.isMapWalkable(map[i][j].type)){
        if(i>0            ){if(map[i-1][j  ].type==tileUnused)map[i-1][j  ].type=tileDirtWall;} //to the left
        if(i<size         ){if(map[i+1][j  ].type==tileUnused)map[i+1][j  ].type=tileDirtWall;} //to the right
        if(j>0            ){if(map[i  ][j-1].type==tileUnused)map[i  ][j-1].type=tileDirtWall;} //top
        if(j<size         ){if(map[i  ][j+1].type==tileUnused)map[i  ][j+1].type=tileDirtWall;} //bottom
        if(i>0&&j>0       ){if(map[i-1][j-1].type==tileUnused)map[i-1][j-1].type=tileDirtWall;} //topleft
        if(i<size&&j<size ){if(map[i+1][j+1].type==tileUnused)map[i+1][j+1].type=tileDirtWall;} //bottomright
        if(i>0&&j<size    ){if(map[i-1][j+1].type==tileUnused)map[i-1][j+1].type=tileDirtWall;} //bottomleft
        if(i<size&&j>0    ){if(map[i+1][j-1].type==tileUnused)map[i+1][j-1].type=tileDirtWall;} //topright
      } //end if
    } //end for
  } //end for
  /* Spawn the stairs */
  var ux,uy,dx,dy;
  do{
    ux=Math.floor(Math.random()*size);
    uy=Math.floor(Math.random()*size);
    dx=Math.floor(Math.random()*size);
    dy=Math.floor(Math.random()*size);
  }while(map[ux][uy].type!=tileDirtFloor||map[dx][dy].type!=tileDirtFloor||Math.abs(ux-dx)+Math.abs(uy-dy)<10);
  map[ux][uy].type=tileUpStairs;
  map[dx][dy].type=tileDownStairs;
  return true;
} //end function      
