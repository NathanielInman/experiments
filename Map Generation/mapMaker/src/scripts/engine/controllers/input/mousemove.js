import { components } from 'engine/data-model/components';
import { button } from 'engine/controllers/components/button';

export function mousemove(e){
  components.forEach(function(c,i){
    var r=c();
    if(e.x>r.x&&e.y>r.y&&e.x<r.x+r.w&&e.y<r.y+r.h){
      if(!c.v){
        c.v=r.v=true;
        if(r.type=='button')button.draw(r);
      } //end if
    }else if(c.v){
      c.v=r.v=false;
      if(r.type=='button')button.draw(r);
    }
  });
}
