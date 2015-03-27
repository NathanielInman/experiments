import { draw     } from 'engine/controllers/draw/main';
import { sizes    } from 'engine/controllers/draw/sizes';
import { location } from 'engine/controllers/input/mouselocation';
import { map      } from 'engine/controllers/map/collection';

export function mouseup(e){
  "use strict";

  // initialize variables
  var dX = location.x; //mouse down x
  var dY = location.y; //mouse down y
  var uX = Math.floor(e.x/50);   //mouse up x
  var uY = Math.floor(e.y/50);   //mouse up y

  // main logic
  if(uX>=sizes.number||uY>=sizes.number||dX>=sizes.number||dY>=sizes.number){
    return;
  }else if(uX == dX && uY == dY){
    map.addSector(uX,uY);
  }else if(uX == dX +1 && uY == dY){
    map.linkSector(dX,dY,uX,uY);
  }else if(uX == dX -1 && uY == dY){
    map.linkSector(dX,dY,uX,uY);
  }else if(uX == dX && uY == dY +1){
    map.linkSector(dX,dY,uX,uY);
  }else if(uX == dX && uY == dY -1){
    map.linkSector(dX,dY,uX,uY);
  } //end if
  draw();
}
