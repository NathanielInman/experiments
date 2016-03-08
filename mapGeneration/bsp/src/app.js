/* global ctx, v */

import { easel } from 'lib/easel';
import { Map   } from 'object-model/Map';
import { bsp   } from 'controllers/bsp';

// Create the instance of the map and transform it
var map = new Map(50,50);
bsp(map);

easel.redraw = function(){
  // clear screen
  ctx.fillStyle='black';
  ctx.fillRect(0,0,v.w,v.h);

  // refresh drawing the map when window requires it
  map.redraw();
};

easel.config(); // this is called every time window resizes
easel.redraw(); // this is called every time window resizes

