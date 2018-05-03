import {Easel} from 'ion-cloud';
import {Map} from './Map';
import {bsp} from './binarySpacePartitioning';
import {applyGaussianBlur} from './applyGaussianBlur';
import {normalize} from './normalize';
import {settings} from './settings';

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
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
  let map = new Map(settings.map.width,settings.map.height);

  bsp(map);
  applyGaussianBlur(map);
  normalize(map);
  easel.onDraw = ()=>{
    let ph = easel.viewport.h/map.height, pw = easel.viewport.w/map.width,
        c,c2; //represents color

    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        c = Math.floor(Math.abs(256*map.getSector(x,y).depth)).toString(16);
        c = c.padStart(2,'0');
        if(map.getSector(x,y).depth<=settings.levels.water){
          c2 = 255/settings.levels.water*map.getSector(x,y).depth;
          c2 = Math.floor(c2<0?0:c2).toString(16);
          c2 = c2.padStart(2,'0');
          easel.ctx.fillStyle=`#00${c}${c2}`;
        }else if(map.getSector(x,y).depth<=settings.levels.mountain){
          c2 = 255/(settings.levels.mountain-settings.levels.water)*
            (map.getSector(x,y).depth-settings.levels.water);
          c2 = Math.floor(c2<0?0:c2).toString(16);
          c2 = c2.padStart(2,'0');
          easel.ctx.fillStyle=`#${c2}${c}${c2}`;
        }else{
          c2 = 255/(1-settings.levels.mountain)*
            (map.getSector(x,y).depth-settings.levels.water);
          c2 = Math.floor(c2+200>255?255:c2+200).toString(16);
          c2 = c2.padStart(2,'0');
          easel.ctx.fillStyle=`#${c2}${c2}${c2}`
        } //end if
        easel.ctx.fillRect(x*pw-0.3,y*ph-0.3,pw+0.6,ph+0.6);
      });
    });
  };
  easel.redraw();
} //end if
