import './index.styl';
import {Easel} from '@ion-cloud/core';
import {Map} from './Map';

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
const noscript = document.querySelector('noscript'),
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
  noscript.style.display='none';

  // create canvas, fill screen with it and start main loop
  const template = [
          '####################',
          '#                  #',
          '#     #%%%%%%#  #  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '#               %  #',
          '##############  #  #',
          '#@                 #',
          '####################'
        ],
        map = new Map(template);

  map.player.initialize(easel);
  easel.onDraw = function(){
    const rh = easel.viewport.h/map.height,
          rw = easel.viewport.w/map.width;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          easel.ctx.fillStyle='#000';
        }else if(sector.isWall()){
          easel.ctx.fillStyle='#333';
        }else if(sector.isWindow()){
          easel.ctx.fillStyle='#444';
        }else{
          easel.ctx.fillStyle='#585';
        } //end if

        // the -0.4 & +0.8 is to remove sub-pixel issues
        // that might cause lines to appear between cells
        easel.ctx.fillRect(x*rw-0.4,y*rh-0.4,rw+0.8,rh+.8);
        if(map.player.x===x&&map.player.y===y){
          const size = Math.min(easel.viewport.w,easel.viewport.h);

          easel.ctx.textBaseline = 'top';
          easel.ctx.font = `${Math.floor(size/20)}px Arial`;
          easel.ctx.fillStyle='#fff';
          easel.ctx.fillText('@',x*rw-0.4,y*rh-0.4);
        } //end if
        if(map.player.visible[`${x},${y}`]){
          easel.ctx.fillStyle=`rgba(255,0,0,0.45)`;
          easel.ctx.fillRect(x*rw-0.4,y*rh-0.4,rw+0.8,rh+.8);
        } //end if
      });
    });
  }; //end function()
  easel.redraw();
} //end if
