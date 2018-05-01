import './app.styl';
import {Easel} from 'ion-cloud';
import {prepareMap} from './prepareMap';
import {applyErosion} from './applyErosion';
import {normalize} from './normalize';
export let easel = new Easel();

const mapWidth = 150, mapHeight = 150;

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
  let map = prepareMap(mapWidth,mapHeight);

  normalize(map);
  applyErosion(map);
  normalize(map);
  easel.onDraw = ()=>{
    let v = easel.viewport,
        ctx = easel.ctx,
        pw = v.w/mapWidth, //pixel width
        ph = v.h/mapHeight; //pixel height

    for(let y=0;y<mapHeight;y++){
      for(let x=0,c;x<mapWidth;x++){
        c = Math.floor(255*map[y][x].height).toString(16).padStart(2,0);
        ctx.fillStyle=`#${c}${c}${c}`;
        ctx.fillRect(x*pw-0.3,y*ph-0.3,pw+0.6,ph+0.6);
      } //end for
    } //end for
  };
  easel.redraw();
} //end if
