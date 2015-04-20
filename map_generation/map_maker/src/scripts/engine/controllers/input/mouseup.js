console.log('loading controllers/input/mouseup.js');
console.log('>> map');
console.log('>> components');
console.log('>> draw');
console.log('>> location');
console.log('>> button');
console.log('>> combobox');
import { map        } from 'engine/data-model/map';
import { components } from 'engine/data-model/components';
import { draw       } from 'engine/controllers/draw/main';
import { location   } from 'engine/controllers/input/mouselocation';
import { button     } from 'engine/controllers/components/button';
import { combobox   } from 'engine/controllers/components/combobox';
export function mouseup(e){
  e.x = e.x || e.clientX || e.offsetX;
  e.y = e.y || e.clientY || e.offsetY;
  // initialize variables
  var dX = location.x; //mouse down x
  var dY = location.y; //mouse down y
  var uX = Math.floor(e.x/50);   //mouse up x
  var uY = Math.floor(e.y/50);   //mouse up y

  components.forEach(function(c,i){
    var r=c(); //acquire the dynamic component's variables
    if(c.d){ //if there is a downstate that's currently initiated, we need to undo it now
      c.d=r.d=false; //set the downstate to false
      r.v=c.v; //ensure the temporary acquired component variables
      if(r.type=='button')button.draw(r); //redraw the button now that the state has changed
      if(r.type=='combobox')combobox.draw(r); //redraw the combobox now that the state has changed
    } //end if
  });

  draw();

  // main logic
  if(uX>=15||uY>=15||dX>=15||dY>=15){
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
}
