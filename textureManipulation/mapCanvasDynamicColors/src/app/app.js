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

  easel.config = ()=>{
    let s = easel.viewport.w<easel.viewport.h?easel.viewport.w:easel.viewport.h;

    easel.ctx.font = `${s/50}px monospace`;
    easel.ctx.textBaseline = 'middle';
    easel.ctx.textAlign = 'center';
  };
  PHG(map); //perform pigeon hole generation
  easel.onDraw = function(){
    let rh = easel.viewport.h/map.height, //row height
        rw = easel.viewport.w/map.width, //row width
        rs = rh<rw?rh:rw; //row size (takes lesser of width/height)

    // start by cleaning the map
    easel.ctx.fillStyle=environment.color;
    easel.ctx.fillRect(0,0,easel.viewport.w,easel.viewport.h);
    easel.ctx.shadowColor = 'black';

    // now draw the sectors
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        let ox = x*rs, oy = y*rs, mx = ox+rs/2, my = oy+rs/2;

        if(sector.isEmpty()){
        }else if(sector.isWall()){
          easel.ctx.shadowBlur = 10;
          easel.ctx.fillStyle=ink('#333',{a: 0.5});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.fillStyle=ink('#888',{a: 0.5});
          easel.ctx.fillText('#',mx,my);
        }else if(sector.isDoor()){
          easel.ctx.shadowBlur = 10;
          easel.ctx.fillStyle=ink('#b94',{a: 0.5});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.fillStyle=ink('#222',{a: 0.5});
          easel.ctx.fillText('+',mx,my);
        }else if(sector.isCorridor()){
          easel.ctx.shadowBlur = 10;
          easel.ctx.fillStyle=ink('#774',{a: 0.5});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowBlur = 0;
          easel.ctx.fillStyle=ink('#999',{a: 0.5});
          easel.ctx.fillText('.',mx,my);
        }else if(sector.isRemoved()){
          easel.ctx.shadowBlur = 10;
          easel.ctx.fillStyle=ink('#833',{a: 0.5});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowBlur = 0;
          easel.ctx.fillStyle=ink('#999',{a: 0.5});
          easel.ctx.fillText('?',mx,my);
        }else{ //floor
          easel.ctx.shadowBlur = 10;
          easel.ctx.fillStyle=ink('#383',{a: 0.5});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowBlur = 0;
          easel.ctx.fillStyle=ink('#666',{a: 0.5});
          easel.ctx.fillText('.',mx,my);
        } //end if
      });
    });
  };
  easel.redraw();
} //end if
