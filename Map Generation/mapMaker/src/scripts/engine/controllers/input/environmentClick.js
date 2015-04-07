import { map } from 'engine/data-model/map';
import { draw } from 'engine/controllers/draw/main';

export function environmentClick(){
  if(window.location.hash){
    map.setEnvironment(window.location.hash.replace('#',''));
  }else{
    window.location.hash = '#'+map.getEnvironmentIndex();
    map.setEnvironment(window.location.hash.replace('#',''));
  } //end if
  draw();
}
