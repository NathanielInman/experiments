import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import {Easel} from 'ion-cloud';
import {main} from './main';
export let easel = new Easel();

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
  let t1, t2;

  noscript.style.visibility='hidden';
  t1 = performance.now();
  main();
  t2 = performance.now();
  console.info(`Total execution took: ${t2-t1} ms`);
} //end if

