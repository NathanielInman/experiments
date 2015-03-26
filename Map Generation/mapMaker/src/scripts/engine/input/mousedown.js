import { location } from 'engine/input/mouselocation';

export function mousedown(e){
  location.x = Math.floor(e.x/50);
  location.y = Math.floor(e.y/50);
}
