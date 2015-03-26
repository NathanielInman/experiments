import { location } from 'engine/input/mouselocation';

export function mouseup(e){
  var dX = location.x; //mouse down x
  var dY = location.y; //mouse down y
  var uX = Math.floor(e.x/50);   //mouse up x
  var uY = Math.floor(e.y/50);   //mouse up y

  var linkSector = function(dir){
    var keyA = dX+":"+dY;
    var keyB = uX+":"+uY;
    var collection = window.engine.enabled;
    if(collection[keyA]&&collection[keyB]){ //only link sectors that exist
      if(dir=='north'){
        collection[keyA].north=true;collection[keyB].south=true;
      }else if(dir=='south'){
        collection[keyA].south=true;collection[keyB].north=true;
      }else if(dir=='east'){
        collection[keyA].east=true;collection[keyB].west=true;
      }else if(dir=='west'){
        collection[keyA].west=true;collection[keyB].east=true;
      } //end if
    } //end if
  };

  var addSector = function(dir){
    var key = uX+":"+uY;
    var collection = window.engine.enabled;
    if(collection[key]&&collection[key].enabled){
      collection[key].enabled=false;
      if(collection[key].north){
        collection[key].north=false;
        collection[uX+":"+(uY-1)].south=false;
      } //end if
      if(collection[key].south){
        collection[key].south=false;
        collection[uX+":"+(uY+1)].north=false;
      } //end if
      if(collection[key].west){
        collection[key].west=false;
        collection[(uX-1)+":"+uY].east=false;
      } //end if
      if(collection[key].east){
        collection[key].east=false;
        collection[(uX+1)+":"+uY].west=false;
      } //end if
    }else{
      if(!collection[key]){ //not created yet, make it now
        collection.totalVnums++;
        collection[key]={
          c: uX,
          r: uY,
          enabled: true,
          north: dir=='north'?true:false,
          south: dir=='south'?true:false,
          east: dir=='east'?true:false,
          west: dir=='west'?true:false,
          vnum: collection.totalVnums
        };
      }else{ //created previously but disabled, re-enable it
        collection[key].enabled=true;
      } //end if
    } //end if
  };

  if(uX == dX && uY == dY){
    addSector();
  }else if(uX == dX +1 && uY == dY){
    linkSector('east');
  }else if(uX == dX -1 && uY == dY){
    linkSector('west');
  }else if(uX == dX && uY == dY +1){
    linkSector('south');
  }else if(uX == dX && uY == dY -1){
    linkSector('north');
  } //end if
  Easel.redraw();
}
