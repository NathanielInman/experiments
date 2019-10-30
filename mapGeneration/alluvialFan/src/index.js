import './index.styl';
import {Easel,Map,Sector} from '@ion-cloud/core';
import {alluvialFan} from './alluvialFan';
export const easel = new Easel();

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
const noscript = document.querySelector('noscript');

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
  const map = new Map();

  for(let y=0;y<map.height;y++){
    map.sectors[y]=[];
    for(let x=0;x<map.width;x++){
      map.sectors[y][x]=new Sector({x,y,map});
    } //end for
  } //end for
  alluvialFan({map});
  easel.onDraw = function(){
    const rh = easel.viewport.h/map.height, rw = easel.viewport.w/map.width;

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          easel.ctx.fillStyle='#000';
        }else if(sector.isRemoved()){
          easel.ctx.fillStyle='#833';
        }else if(sector.isDoor()){
          easel.ctx.fillStyle='#b94';
        }else if(sector.isWallSpecial()){
          easel.ctx.fillStyle='#445';
        }else if(sector.isWall()){
          easel.ctx.fillStyle='#334';
        }else if(sector.isWaterSpecial()){
          easel.ctx.fillStyle='#339';
        }else if(sector.isWater()){
          easel.ctx.fillStyle='#33b';
        }else if(sector.isFloorSpecial()){
          easel.ctx.fillStyle='#563';
        }else if(sector.isFloor()){
          easel.ctx.fillStyle='#373';
        }else{ //unknown
          easel.ctx.fillStyle='#f00';
        } //end if

        // the -0.4 & +0.8 is to remove sub-pixel issues
        // that might cause lines to appear between cells
        easel.ctx.fillRect(x*rw+0.4,y*rh+0.4,rw+0.8,rh+0.8);
      });
    });
  };
  easel.redraw();
} //end if

