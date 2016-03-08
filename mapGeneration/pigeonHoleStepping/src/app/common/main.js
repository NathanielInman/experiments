const tileUnused = 0;
const tileDirtFloor = 1;
const tileDirtWall = 2;
const tileError = 3;
const tileCorridor = 4;
const tileDoor = 5;
export function PHS(map,osize,deviation){
  var cx=Math.floor(size/2),cy=Math.floor(size/2),
      size=osize-Math.floor(Math.random()*deviation),
      fail=0,win=0,val=0,roomNum;

  if(size%2==0)size++;
  var roomNum={
    num:1,
    done:[true], //add index 0 because num starts at 1
    topLeftX:[0], //add index 0 because num starts at 1
    topLeftY:[0], //add index 0 because num starts at 1
    bottomRightX:[0], //add index 0 because num starts at 1
    bottomRightY:[0] //add index 0 because num starts at 1
  };
  var direction=0;
  /* functions */
  var isRoomEqual=function(x,y,x2,y2){return map[x][y].roomNum==map[x2][y2].roomNum;};
  var isRoom=function(x,y){return map[x][y].roomNum>0;};
  var istileEmpty=function(x,y){return map[x][y].type==tileUnused||map[x][y].type==tileError;};
  var istileCorridor=function(x,y){return map[x][y].type==tileCorridor;};
  var istileDoor=function(x,y){return map[x][y].type==tileDoor;};
  var istileDirtWall=function(x,y){return map[x][y].type==tileDirtWall;};
  var isEmpty=function(x,y){return map[x][y].type==tileUnused;};
  var setRoom=function(x,y,room){map[x][y].roomNum=room;map[x][y].type=tileDirtFloor;};
  var setRoomType=function(x,y,type){map[x][y].name=type;};
  var settileCorridor=function(x,y){map[x][y].type=tileCorridor;map[x][y].roomNum=0;};
  var settileDoor=function(x,y){map[x][y].type=tileDoor;map[x][y].roomNum=0;};
  var settileDirtWall=function(x,y){map[x][y].type=tileDirtWall;map[x][y].roomNum=0;};
  var settileUnused=function(x,y){map[x][y].type=tileUnused;map[x][y].roomNum=0;};
  var setEmpty=function(x,y){map[x][y].type=tileUnused;};
  var getRoom=function(x,y){return map[x][y].roomNum;};
  /* This function checks to see if the tileCorridors will create a square (we can't allow this, so we
   * return true if they will, and prevent it in the move function */
  var blocked=function(direction){
    if(direction==NORTH||direction==SOUTH){
      if(cx-6>=0){ //westward block
        if(istileCorridor(cx-1,cy)&&istileCorridor(cx-6,cy+(direction==NORTH?-1:1))&&istileCorridor(cx-1,cy+(direction==NORTH?-6:6)))return true;
      } //end if
      if(cx+6<size){ //eastward block
        if(istileCorridor(cx+1,cy)&&istileCorridor(cx+6,cy+(direction==NORTH?-1:1))&&istileCorridor(cx+1,cy+(direction==NORTH?-6:6)))return true;
      } //end if
    }else if(direction==EAST||direction==WEST){
      if(cy-6>=0){ //northward block
        if(istileCorridor(cx,cy-1)&&istileCorridor(cx+(direction==WEST?-1:1),cy-6)&&istileCorridor(cx+(direction==WEST?-6:6),cy-1))return true;
      } //end if
      if(cy+6<size){ //southward block
        if(istileCorridor(cx,cy+1)&&istileCorridor(cx+(direction==WEST?-1:1),cy+6)&&istileCorridor(cx+(direction==WEST?-6:6),cy+1))return true;
      } //end if
    } //end if
    return false;
  }; //end function
  /* Carve out a path for the player in the direction specified*/
  var move=function(direction){
    if(direction==NORTH && !blocked(NORTH)){
      if(istileCorridor(cx,cy-6)){
        cy-=6;
        return 2;
      }else{
        for(var i=cy;i>=cy-5;i--){
          settileCorridor(cx,i);
        } //end for
        cy=i;
      }return 1;
    }else if(direction==EAST && !blocked(EAST)){
      if(istileCorridor(cx+6,cy)){
        cx+=6;
        return 2;
      }else{
        for(var i=cx;i<=cx+5;i++){
          settileCorridor(i,cy);
        } //end for
        cx=i;
      }return 1;
    }else if(direction==SOUTH && !blocked(SOUTH)){
      if(istileCorridor(cx,cy+6)){
        cy+=6;
        return 2;
      }else{
        for(var i=cy;i<=cy+5;i++){
          settileCorridor(cx,i);
        } //end for
        cy=i;
      }return 1;
    }else if(direction==WEST && !blocked(WEST)){
      if(istileCorridor(cx-6,cy)){
        cx-=6;
        return 2;
      }else{
        for(var i=cx;i>=cx-5;i--){
          settileCorridor(i,cy);
        } //end for
        cx=i;
      }return 1;
    } //end function
    return 0;
  }; //end move function
  var generateRoomType=function(){
    var roomType=Math.floor(Math.random()*25);
    if(roomType==0){return "Bedroom";
    }else if(roomType==1){return "Bathroom";
    }else if(roomType==2){return "Lavatory";
    }else if(roomType==3){return "Prison<br/>Block";
    }else if(roomType==4){return "Kitchen";
    }else if(roomType==5){return "Meat<br/>Hall";
    }else if(roomType==6){return "Armory";
    }else if(roomType==7){return "Barracks";
    }else if(roomType==8){return "Library";
    }else if(roomType==9){return "Storage";
    }else if(roomType==10){return "Meeting<br/>Room";
    }else if(roomType==11){return "Great<br/>Hall";
    }else if(roomType==12){return "Cellar";
    }else if(roomType==13){return "Pantry";
    }else if(roomType==14){return "Larder";
    }else if(roomType==15){return "Buttery";
    }else if(roomType==16){return "Linen<br/>Room";
    }else if(roomType==17){return "Wine<br/>Cellar";
    }else if(roomType==18){return "Bar";
    }else if(roomType==19){return "Servant<br/>Quarters";
    }else if(roomType==20){return "Cooks<br/>Quarters";
    }else if(roomType==21){return "Scullions<br/>Quarters";
    }else if(roomType==22){return "Lauderer<br/>Quarters";
    }else if(roomType==23){return "Cellerer<br/>Quarters";
    }else if(roomType==24){return "Chapel";
    }else{return "Unknown";}
  }; //end generateRoomType function
  var nextTotileCorridor=function(x,y){
    if(x>0){if(istileCorridor(x-1,y))return true;}
    if(y>0){if(istileCorridor(x,y-1))return true;}
    if(x<size-1){if(istileCorridor(x+1,y))return true;}
    if(y<size-1){if(istileCorridor(x,y+1))return true;}
    if(x>0&&y>0){if(istileCorridor(x-1,y-1))return true;}
    if(x>0&&y<size-1){if(istileCorridor(x-1,y+1))return true;}
    if(x<size-1&&y>0){if(istileCorridor(x+1,y-1))return true;}
    if(x<size-1&&y<size-1){if(istileCorridor(x+1,y+1))return true;}
    return false;
  }; //end nextToTileCorridor function
  var drawtileDirtWalls=function(){
    for(var i=0;i<size;i++){
      for(var j=0;j<size;j++){
        if(i==0&&!istileCorridor(i,j)){settileDirtWall(i,j);
        }else if(j==0&&!istileCorridor(i,j)){settileDirtWall(i,j);
        }else if(i==size-1&&!istileCorridor(i,j)){settileDirtWall(i,j);
        }else if(j==size-1&&!istileCorridor(i,j)){settileDirtWall(i,j);
        }else if(isEmpty(i,j)&&nextTotileCorridor(i,j)){settileDirtWall(i,j);}
      } //end for
    } //end for
  }; //end drawtileDirtWalls function
  var fillRoom=function(x,y,x2,y2){
    var fail=false;
    var drawn=false;
    var roomName=generateRoomType();
    for(var j=y;j<=y2;j++){
      for(var i=x;i<=x2;i++){
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
  }; //end fillRoom function
  var allocateRooms=function(){
    var minWidth=0,minHeight=0;
    var maxWidth=5,maxHeight=5;
    for(var i=0;i<size;i++){
      for(var j=0;j<size;j++){
        if(isEmpty(i,j)){
          minWidth=0;minHeight=0;
          main:
          for(var y=i;y<size;y++){
            for(var x=j;x<size;x++){
              if(!isEmpty(y,x)){
                if(y==i){
                  if(x-j<3){
                    break main;
                  }else{
                    minWidth=x-j;
                  } //end if
                }else if(x-j<minWidth&&y-i>=3){
                  fillRoom(i,j,y-1,j+minWidth-1);
                  break main;
                }else{
                  break main;
                } //end if
                break;
              }else if(y-i>maxHeight){
                fillRoom(i,j,y-1,j+minWidth-1);
                break main;
              }else if(x>minWidth&&minWidth!=0){ //out of bounds
                break;
              }else if(x-j>maxWidth && y==i){
                minWidth=maxWidth-1;
                break;
              }//end if
            } //end for
          } //end for
        } //end if
      } //end for
    } //end for
  }; //end allocateRooms function
  var partitionRooms=function(){
    for(var i=1;i<size-1;i++){
      for(var j=1;j<size-1;j++){
        if(isRoom(i,j)&&isRoom(i,j-1)&&!isRoomEqual(i,j,i,j-1)){
          settileDirtWall(i,j-1); //set the previous rooms tile to a wall instead
        } //end if
        if(isRoom(i,j)&&isRoom(i-1,j)&&!isRoomEqual(i,j,i-1,j)){
          settileDirtWall(i-1,j); //set the previous rooms tile to a wall instead
        } //end if
        if(isRoom(i,j)&&isRoom(i+1,j+1)&&!isRoomEqual(i,j,i+1,j+1)){
          settileDirtWall(i,j);
        } //end if
        if(isRoom(i,j-1)&&isRoom(i-1,j)&&!isRoom(i,j)&&!isRoomEqual(i,j-1,i-1,j)){
          settileDirtWall(i-1,j);
        } //end if
        if(isEmpty(i,j)){
          settileDirtWall(i,j); //set the to a wall
        } //end if
      } //end for
    } //end for
  }; //end partitionRooms function
  var drawtileDoors=function(){
    var chance;
    for(var i=1;i<size-1;i++){
      for(var j=1;j<size-1;j++){
        if(istileCorridor(i,j)){
          if(i<size-2)if(istileDirtWall(i+1,j)&&isRoom(i+2,j)){ //South tileDirtWall room
            /* check to see if there's another place for the tileDoor, and give *
             * it a chance to be spawned instead of at the current location */
            if(istileCorridor(i,j+1)&&istileDirtWall(i+1,j+1)&&isRoomEqual(i+2,j+1,i+2,j)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=0;
            }//end if
            /* The tileDoor will be spawned here at a 50% chance if there's another *
             * location for the tileDoor, elseif there is no other location for the *
             * tileDoor, then it will be spawned here with a 100% chance            */
            if(chance>80){
              if(roomNum.done[getRoom(i+2,j)]==false){
                roomNum.done[getRoom(i+2,j)]=true;
                settileDoor(i+1,j);
              } //end if
            } //end if
          } //end if
          if(j<size-2)if(istileDirtWall(i,j+1)&&isRoom(i,j+2)){ //East tileDirtWall room
            /* check to see if there's another place for the tileDoor, and give *
             * it a chance to be spawned instead of at the current location */
            if(istileCorridor(i+1,j)&&istileDirtWall(i+1,j+1)&&isRoomEqual(i+1,j+2,i,j+2)){
              chance=Math.floor(Math.random()*100);
            }else{
              chance=100;
            }//end if
            /* The tileDoor will be spawned here at a 50% chance if there's another *
             * location for the tileDoor, elseif there is no other location for the *
             * tileDoor, then it will be spawned here with a 100% chance            */
            if(chance>60){
              if(roomNum.done[getRoom(i,j+2)]==false){
                roomNum.done[getRoom(i,j+2)]=true;
                settileDoor(i,j+1);
              } //end if
            }//end if
          } //end if
          if(i>2)if(istileDirtWall(i-1,j)&&isRoom(i-2,j)){ //west tileDirtWall room
            /* check to see if there's another place for the tileDoor, and give *
             * it a chance to be spawned instead of at the current location */
            if(roomNum.done[getRoom(i-2,j)]==false){
              roomNum.done[getRoom(i-2,j)]=true;
              settileDoor(i-1,j);
            } //end if
          } //end if
          if(j>2)if(istileDirtWall(i,j-1)&&isRoom(i,j-2)){ //north tileDirtWall room
            if(roomNum.done[getRoom(i,j-2)]==false){
              roomNum.done[getRoom(i,j-2)]=true;
              settileDoor(i,j-1);
            } //end if
          } //end if
        } //end if
      } //end for
    } //end for
  }; //end drawtileDoors function
  var cleanMap=function(){
    var isAbandoned=false;
    
    for(var q=1;q<roomNum.num;q++){
      if(roomNum.done[q]==false){ //room was a failure, remove it
        for(var i=roomNum.topLeftX[q];i<=roomNum.bottomRightX[q];i++){
          for(var j=roomNum.topLeftY[q];j<=roomNum.bottomRightY[q];j++){
            isAbandoned=true;
            if(istileDirtWall(i,j)){
              if(i>0)if(!istileDirtWall(i-1,j)&&!istileEmpty(i-1,j))isAbandoned=false; //check west
              if(j>0)if(!istileDirtWall(i,j-1)&&!istileEmpty(i,j-1))isAbandoned=false; //check north
              if(i<size-1)if(!istileDirtWall(i+1,j)&&!istileEmpty(i+1,j))isAbandoned=false; //check east
              if(j<size-1)if(!istileDirtWall(i,j+1)&&!istileEmpty(i,j+1))isAbandoned=false; //check south
              if(i>0&&j>0)if(!istileDirtWall(i-1,j-1)&&!istileEmpty(i-1,j-1))isAbandoned=false; //check northwest
              if(i>0&&j<size-1)if(!istileDirtWall(i-1,j+1)&&!istileEmpty(i-1,j+1))isAbandoned=false; //check southwest
              if(i<size-1&&j>0)if(!istileDirtWall(i+1,j-1)&&!istileEmpty(i+1,j-1))isAbandoned=false; //check northeast
              if(i<size-1&&j<size-1)if(!istileDirtWall(i+1,j+1)&&!istileEmpty(i+1,j+1))isAbandoned=false; //check southeast
            } //end if
            if(map[i][j].type==tileDoor||map){map[i][j].type=tileDirtWall;isAbandoned=false;}
            if(isAbandoned)map[i][j].type=tileError; //clear the current tile
          } //end for
        } //end for
      }//end if
    } //end if 
    for(var i=0;i<size;i++){
      for(var j=0;j<size;j++){
        isAbandoned=true;
        if(i>0)if(!istileDirtWall(i-1,j)&&!istileEmpty(i-1,j))isAbandoned=false; //check west
        if(j>0)if(!istileDirtWall(i,j-1)&&!istileEmpty(i,j-1))isAbandoned=false; //check north
        if(i<size-1)if(!istileDirtWall(i+1,j)&&!istileEmpty(i+1,j))isAbandoned=false; //check east
        if(j<size-1)if(!istileDirtWall(i,j+1)&&!istileEmpty(i,j+1))isAbandoned=false; //check south
        if(i>0&&j>0)if(!istileDirtWall(i-1,j-1)&&!istileEmpty(i-1,j-1))isAbandoned=false; //check northwest
        if(i>0&&j<size-1)if(!istileDirtWall(i-1,j+1)&&!istileEmpty(i-1,j+1))isAbandoned=false; //check southwest
        if(i<size-1&&j>0)if(!istileDirtWall(i+1,j-1)&&!istileEmpty(i+1,j-1))isAbandoned=false; //check northeast
        if(i<size-1&&j<size-1)if(!istileDirtWall(i+1,j+1)&&!istileEmpty(i+1,j+1))isAbandoned=false; //check southeast
        if(isAbandoned)settileUnused(i,j); //clear the current tile
      } //end for
    } //end for 
  }; //end cleanMap function
  var print=function(str){
    if(str.length==1){return "0"+str;}else{return str;}
  }; //end print function
  var createCorridors=function(){
    var carveDeadEnds=function(){
      for(var i=1;i<size-1;i++){
        for(var j=1;j<size-1;j++){
          if(isEmpty(i,j) && istileCorridor(i-1,j) && istileCorridor(i+1,j)||
          isEmpty(i,j) && istileCorridor(i,j-1) && istileCorridor(i,j+1)||
          isEmpty(i,j) && istileCorridor(i-1,j) && istileCorridor(i,j+1) && istileCorridor(i-2,j) && istileCorridor(i,j+2)||
          isEmpty(i,j) && istileCorridor(i,j+1) && istileCorridor(i+1,j) && istileCorridor(i,j+2) && istileCorridor(i+2,j)||
          isEmpty(i,j) && istileCorridor(i+1,j) && istileCorridor(i,j-1) && istileCorridor(i+2,j) && istileCorridor(i,j-2)||
          isEmpty(i,j) && istileCorridor(i,j-1) && istileCorridor(i-1,j) && istileCorridor(i,j-2) && istileCorridor(i-2,j)){
            setEmpty(i-1,j);setEmpty(i-1,j-1);setEmpty(i-1,j+1);
            setEmpty(i,j+1);setEmpty(i+1,j+1);setEmpty(i+1,j);
            setEmpty(i+1,j-1);setEmpty(i,j-1);
          } //end if
        } //end for
      } //end for
    }; //end carveDeadEnds function
    while(fail<75&&win<size*3){
      direction=Math.floor(Math.random()*4);
      if(direction==0){//north
        if(cy-7>=0){val=move(NORTH);if(val==0){fail++}else if(val==1){win++;}
        }else{fail++;}
      }else if(direction==1){//east
        if(cx+7<size){val=move(EAST);if(val==0){fail++}else if(val==1){win++;}
        }else{fail++;}
      }else if(direction==2){//south
        if(cy+7<size){val=move(SOUTH);if(val==0){fail++}else if(val==1){win++;}
        }else{fail++;}
      }else if(direction==3){//west
        if(cx-7>=0){val=move(WEST);if(val==0){fail++}else if(val==1){win++;}
        }else{fail++;}
      } //end if
    } //end while
    carveDeadEnds();
  } //end if
  createCorridors();
  drawtileDirtWalls();
  allocateRooms();
  partitionRooms();
  drawtileDoors();
  cleanMap();
  return true;
} //end function
