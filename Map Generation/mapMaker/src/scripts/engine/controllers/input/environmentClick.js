import { map } from 'engine/data-model/map';
import { draw } from 'engine/controllers/draw/main';

export function environmentClick(){
  map.setEnvironment(window.location.hash.replace('#',''));
  draw();
};
