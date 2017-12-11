import {Easel} from 'ion-cloud';
import {AGC} from './automataGeneratedCaverns';
import {Map} from './Map';

let noscript = document.getElementById('noscript'),
    easel = new Easel();

if(!easel.activated){
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  let map = new Map(50,50);

  AGC(map); //perform automata generated caverns
  easel.onDraw = function(){
    let rh = easel.viewport.h/map.height, rw = easel.viewport.w/map.width;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          easel.ctx.fillStyle='#000';
        }else if(sector.isWall()){
          easel.ctx.fillStyle='#333';
        }else if(sector.isRemoved()){
          easel.ctx.fillStyle='#f00';
        }else{ //floor
          easel.ctx.fillStyle='#383';
        } //end if

        // the -0.4 & +0.8 is to remove sub-pixel issues
        // that might cause lines to appear between cells
        easel.ctx.fillRect(x*rw-0.4,y*rh-0.4,rw+0.8,rh+0.8);
      });
    });
  };
  easel.redraw();
} //end if
