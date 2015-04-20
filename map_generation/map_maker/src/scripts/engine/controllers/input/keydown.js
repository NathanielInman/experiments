console.log('loading controllers/input/keydown.js');
console.log('>> draw');
console.log('>> map');
import { draw       } from 'engine/controllers/draw/main';
import { map        } from 'engine/data-model/map';
export function keydown(e){
  var sector = map.getActiveSector(),
      x = sector.x,
      y = sector.y,
      n = 15,
      linking = window.toggledLink;

  switch(e.which){
    case 13: // enter key
      map.addSector(x,y);
      break;
    case 32: // space bar
      window.toggledLink = linking ? false : sector;
      break;
    case 37: // left arrow key
      if(x > 0){ //don't bother if going outside map
        if(linking){
          map.linkSector(x,y,x-1,y);
        }else{
          map.setActiveSector(x-1,y);
        } //end if
      } //en dif
      break;
    case 38: // up arrow key
      if(y>0){ //don't bother if going outside map
        if(linking){
          map.linkSector(x,y,x,y-1);
        }else{
          map.setActiveSector(x,y-1);
        } //end if
      } //end if
      break;
    case 39: // right arrow key
      if(x<n-1){ //don't bother if going outside map
        if(linking){
          map.linkSector(x,y,x+1,y);
        }else{
          map.setActiveSector(x+1,y);
        } //end if
      } //end if
      break;
    case 40: // down arrow key
      if(y<n-1){ //dont' bother if oging outside map
        if(linking){
          map.linkSector(x,y,x,y+1);
        }else{
          map.setActiveSector(x,y+1);
        } //end if
      } //end if
      break;
    default:
      console.log(e.which);
  } //end if

  e.preventDefault(); //after performing actions on page, prevent fall-through
  draw(); //draw the updated results of the ui after actions performed
} //end if
