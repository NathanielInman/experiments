import {noise} from './noise';
import {settings} from './settings';

export function prepareMap(){
  let map = [];

  noise.seed(Math.random());
  for(let y=0;y<settings.map.height;y++){
    map[y]=[];
    for(let x=0;x<settings.map.width;x++){
      map[y][x] = {x,y,height: Math.random()};
    } //end for
  } //end for
  return map;
} //end prepareMap()