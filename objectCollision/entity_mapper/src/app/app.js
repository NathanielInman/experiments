import {Easel} from 'ion-cloud';
import {EntityMapper} from './main';

let noscript = document.getElementByTagName('noscript'),
    easel = new Easel(),
    scene;

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
  scene = new EntityMapper();
} //end if
