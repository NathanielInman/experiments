import {ink,Easel} from 'ion-cloud';
import {PHG} from './pigeonHoleGeneration';
import {Map} from './Map';
import {environments} from './environments';

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
  let map = new Map(50,50),
      environmentIndex = Math.floor(Math.random()*environments.length),
      environment = environments[environmentIndex];

  PHG(map); //perform pigeon hole generation
  easel.onDraw = function(){
    let rh = easel.viewport.h/map.height,
        rw = easel.viewport.w/map.width,
        rs = rh<rw?rh:rw;

    // start by cleaning the map
    easel.ctx.fillStyle=environment.color;
    easel.ctx.fillRect(0,0,easel.viewport.w,easel.viewport.h);

    // now draw the sectors
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        if(sector.isEmpty()){
          easel.ctx.fillStyle=environment.color;
        }else if(sector.isWall()){
          easel.ctx.fillStyle=ink('#333',{a:0.5});
        }else if(sector.isDoor()){
          easel.ctx.fillStyle=ink('#b94',{a:0.5});
        }else if(sector.isCorridor()){
          easel.ctx.fillStyle=ink('#774',{a:0.5});
        }else if(sector.isRemoved()){
          easel.ctx.fillStyle=ink('#833',{a:0.5});
        }else{ //floor
          easel.ctx.fillStyle=ink('#383',{a:0.5});
        } //end if
        easel.ctx.fillRect(x*rs,y*rs,rs,rs);
      });
    });
  };
  easel.redraw();
} //end if
