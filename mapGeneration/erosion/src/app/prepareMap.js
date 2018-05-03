import {noise} from './noise';
import {settings} from './settings';

export function prepareMap(){
  let map = [];

  noise.seed(Math.random());
  for(let y=0;y<settings.map.height;y++){
    map[y]=[];
    for(let x=0;x<settings.map.width;x++){
      map[y][x] = prepareHeight(map,{x,y,height: 0});
    } //end for
  } //end for
  return map;
} //end prepareMap()

function prepareHeight(map,sector){
  let {x,y} = sector;

  // layer 1: Perlin Wide Noise
  // Weight: 2
  sector.height = 1+noise.perlin2(x/settings.map.depth.max,
    y/settings.map.depth.max);

  // layer 2: Central Weight up to sea level
  // Weight: 4
  let distanceWeight = (
    1-Math.sqrt(Math.pow(settings.map.width/2-x,2)+
      Math.pow(settings.map.height/2-y,2))
    /
    Math.sqrt(Math.pow(settings.map.width/2,2)+
      Math.pow(settings.map.height/2,2))
  );

  if(distanceWeight>0.5) distanceWeight=0.5; //limit to sea level
  sector.height += 4*distanceWeight;

  // layer 3: Perlin Medium Noise
  // Weight: 2
  sector.height += 1+noise.perlin2(x/settings.map.depth.mid,
    y/settings.map.depth.mid);

  // layer 4: Perlin Small Noise
  // Weight: 2
  sector.height += 1+noise.perlin2(x/settings.map.depth.min,
    y/settings.map.depth.min);

  // Normalize layers (average the weights so we're between 0 and 1)
  sector.height = sector.height/10;
  return sector;
} //end prepareHeight()
