import {Easel} from 'ion-cloud';
import {PHG} from './pigeonHoleGeneration';
import {Map} from './Map';

let noscript = document.querySelector('noscript'),
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

  PHG(map); //perform pigeon hole generation
  easel.onDraw = function(){
    let rh = easel.viewport.h/map.height, rw = easel.viewport.w/map.width;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          easel.ctx.fillStyle='#000';
        }else if(sector.isWall()){
          easel.ctx.fillStyle='#333';
        }else if(sector.isDoor()){
          easel.ctx.fillStyle='#b94';
        }else if(sector.isCorridor()){
          easel.ctx.fillStyle='#774';
        }else if(sector.isRemoved()){
          easel.ctx.fillStyle='#833';
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
