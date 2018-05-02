import './app.styl';
import {Easel} from 'ion-cloud';
import {ink} from 'ion-cloud/src/lib/ink';
import {prepareMap} from './prepareMap';
import {applyErosion} from './applyErosion';
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
  let map = prepareMap(); //creates map and applies height & biomes

  normalize(map);
  applyErosion(map);
  normalize(map);
  easel.onDraw = ()=>{
    let v = easel.viewport,
        ctx = easel.ctx,
        pw = v.w/settings.map.width, //pixel width
        ph = v.h/settings.map.height; //pixel height

    for(let y=0;y<settings.map.height;y++){
      for(let x=0,lightness;x<settings.map.width;x++){
        lightness = map[y][x].height>1?1:map[y][x].height;
        if(map[y][x].height<=settings.levels.water){
          ctx.fillStyle=ink('#004',{lightness});
        }else if(map[y][x].height<=settings.levels.sand){
          ctx.fillStyle=ink('#440',{lightness: lightness/4});
        }else if(map[y][x].height>settings.levels.mountain){
          ctx.fillStyle=ink('#444',{lightness: lightness/4*3});
        }else if(map[y][x].biome<=settings.levels.grass){
          ctx.fillStyle=ink('#442',{lightness: lightness/2});
        }else if(map[y][x].biome<=settings.levels.trees){
          ctx.fillStyle=ink('#141',{lightness: lightness/2});
        }else if(map[y][x].biome>settings.levels.trees){
          ctx.fillStyle=ink('#243',{lightness: lightness/2});
        } //end if
        ctx.fillRect(x*pw-0.3,y*ph-0.3,pw+0.6,ph+0.6);
      } //end for
    } //end for
  };
  easel.redraw();
} //end if
