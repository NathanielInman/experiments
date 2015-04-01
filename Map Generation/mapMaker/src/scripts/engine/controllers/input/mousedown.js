import { location   } from 'engine/controllers/input/mouselocation';
import { button     } from 'engine/controllers/components/button';
import { combobox   } from 'engine/controllers/components/combobox';
import { components } from 'engine/data-model/components';

export function mousedown(e){
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
