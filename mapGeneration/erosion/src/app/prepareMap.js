import {noise} from './noise';

const mapMaxDepth = 30;
const mapMidDepth = 15;
const mapMinDepth = 9;

export function prepareMap(mapWidth,mapHeight){
  let map = [];

  noise.seed(Math.random());
  for(let y=0;y<mapHeight;y++){
    map[y]=[];
    for(let x=0;x<mapWidth;x++){
      map[y][x] = prepareHeight(map,{x,y,height: 0});
    } //end for
  } //end for
  return map;
} //end prepareMap()

function prepareHeight(map,sector){
  let {x,y} = sector,
      mapHeight = map.length,
      mapWidth = map[0].length;

  // layer 1: Perlin Wide Noise
  // Weight: 2
  sector.height = 1+noise.perlin2(x/mapMaxDepth,y/mapMaxDepth);

  // layer 2: Central Weight
  // Weight: 3
  sector.height += 3*(
    1-Math.sqrt(Math.pow(mapWidth/2-x,2)+Math.pow(mapHeight/2-y,2))
    /
    Math.sqrt(Math.pow(mapWidth/2,2)+Math.pow(mapHeight/2,2))
  );

  // layer 3: Perlin Medium Noise
  // Weight: 2
  sector.height += 1+noise.perlin2(x/mapMidDepth,y/mapMidDepth);

  // layer 4: Perlin Small Noise
  // Weight: 2
  sector.height += 1+noise.perlin2(x/mapMinDepth,y/mapMinDepth);

  // Normalize layers (average the weights so we're between 0 and 1)
  sector.height = sector.height/9;
  return sector;
} //end prepareHeight()
