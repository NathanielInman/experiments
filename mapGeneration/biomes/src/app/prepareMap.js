import {noise} from './noise';
import {settings} from './settings';
import {applyHeight} from './applyHeight';
import {applyBiomes} from './applyBiomes';

export function prepareMap(){
  let map = [];

  noise.seed(Math.random());
  for(let y=0;y<settings.map.height;y++){
    map[y]=[];
    for(let x=0;x<settings.map.width;x++){
      map[y][x] = applyBiomes(applyHeight(map,{x,y,height: 0}));
    } //end for
  } //end for
  return map;
} //end prepareMap()
