import './app.styl';
import {Easel} from 'ion-cloud';
import {prepareMap} from './prepareMap';
import {applyErosion} from './applyErosion';
import {applyBiomes} from './applyBiomes';
import {normalize} from './normalize';
import {settings} from './settings';
export let easel = new Easel();

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
let noscript = document.querySelector('app');

if(!easel.activated){
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  noscript.style.visibility='hidden';
  let map = prepareMap(); //creates map and applies height

  normalize(map);
  applyErosion(map);
  applyBiomes(map);
  normalize(map);
  easel.onDraw = ()=>{
    let v = easel.viewport,
        ctx = easel.ctx,
        pw = v.w/settings.map.width, //pixel width
        ph = v.h/settings.map.height; //pixel height

    for(let y=0;y<settings.map.height;y++){
      for(let x=0,c,c2;x<settings.map.width;x++){
        c = Math.floor(Math.abs(256*map[y][x].height)).toString(16);
        c = c.padStart(2,'0');
        if(map[y][x].height<=settings.levels.water){
          c2 = 255/settings.levels.water*map[y][x].height;
          c2 = Math.floor(c2<0?0:c2).toString(16);
          c2 = c2.padStart(2,'0');
          ctx.fillStyle=`#00${c}${c2}`;
        }else if(map[y][x].height<=settings.levels.mountain){
          c2 = 255/(settings.levels.mountain-settings.levels.water)*
            (map[y][x].height-settings.levels.water);
          c2 = Math.floor(c2<0?0:c2).toString(16);
          c2 = c2.padStart(2,'0');
          ctx.fillStyle=`#${c2}${c}${c2}`;
        }else{
          c2 = 255/(1-settings.levels.mountain)*
            (map[y][x].height-settings.levels.water);
          c2 = Math.floor(c2+200>255?255:c2+200).toString(16);
          c2 = c2.padStart(2,'0');
          ctx.fillStyle=`#${c2}${c2}${c2}`
        } //end if
        ctx.fillRect(x*pw-0.3,y*ph-0.3,pw+0.6,ph+0.6);
      } //end for
    } //end for
  };
  easel.redraw();
} //end if
