import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import {easel} from 'ion-cloud';
import {Map} from './Map';
import {bsp} from './binarySpacePartitioning';

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
let noscript = document.getElementById('noscript');

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
  let map = new Map(50,50);
  
  bsp(map);
  easel.onDraw = ()=>{
    // Clear Screen
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);

    // Refresh drawing the map when window requires it
    map.redraw();
  };
  easel.redraw();
  window.map=map;
  window.easel=easel;
} //end if

