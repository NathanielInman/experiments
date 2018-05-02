import {noise} from './noise';
import {settings} from './settings';

export function applyBiomes(map){
  let {x,y} = map;

  // layer 1: Perlin Medium Noise
  // Weight: 2
  map.biome = 1+noise.perlin2(x/settings.map.depth.mid,
    y/settings.map.depth.mid);

  // Layer 2: Perlin Minimum Noise
  // Weight: 2
  map.biome += 1+noise.perlin2(x/settings.map.depth.min,
    y/settings.map.depth.min);

  // Layer 3: Supress biome that further away from center
  // Weight: 2
  map.biome += (
    1-Math.sqrt(Math.pow(settings.map.width/2-x,2)+
      Math.pow(settings.map.height/2-y,2))
    /
    Math.sqrt(Math.pow(settings.map.width/2,2)+
      Math.pow(settings.map.height/2,2))
  );

  // Layer 4: Perlin Wide Noise
  // Weight: 2
  map.biome += 1+noise.perlin2(x/settings.map.depth.max,
    y/settings.map.depth.max);

  // Normalize layers (average the weights so we're between 0 and 1)
  map.biome = map.biome/7;
  return map;
} //end applyBiomes()
