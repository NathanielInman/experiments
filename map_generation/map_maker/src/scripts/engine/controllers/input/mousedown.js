// Begin the actual module by importing its requirements
import { location   } from 'engine/controllers/input/mouselocation';
import { button     } from 'engine/controllers/components/button';
import { combobox   } from 'engine/controllers/components/combobox';
import { components } from 'engine/data-model/components';

// Declare that the module loaded and its requirements
$('.debug').append('<br/>loading controllers/input/mousedown.js [::location,button,combobox,components]');

// The mousedown event on the canvas exports
export function mousedown(e){
  e.x = e.x || e.clientX || e.offsetX;
  e.y = e.y || e.clientY || e.offsetY;
  components.forEach(function(c,i){
    var r=c();
    if(e.x>r.x&&e.y>r.y&&e.x<r.x+r.w&&e.y<r.y+r.h){
      if(!c.d){
        c.d=r.d=true;
        if(r.type=='button')button.draw(r);
        if(r.type=='combobox')combobox.draw(r);
      } //end if
    }else if(c.d){
      c.d=r.d=false;
      if(r.type=='button')button.draw(r);
      if(r.type=='combobox')combobox.draw(r);
    } //end if
  });

  // Store the down location for the map
  location.x = Math.floor(e.x/50);
  location.y = Math.floor(e.y/50);
}
