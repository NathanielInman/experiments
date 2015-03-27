// Main import statements required for this module
import { sector } from 'engine/draw/sector';
import { map } from 'engine/map/collection';
import { sizes } from 'engine/draw/sizes';

// Main draw function that calls all the other draw functions
export function draw(){
  // Clean the canvas
  ctx.fillStyle=map.environment.background.value;
  ctx.fillRect(0,0,v.w,v.h);

  // Draw the outlines and then draw the selected squares
  ctx.strokeStyle=map.environment.visited.floor;
  ctx.beginPath();ctx.lineWidth=1;
  for(let x=1,n=0;x<v.w&&n<=sizes.number;x+=sizes.sector,n++){ ctx.moveTo(x,0);ctx.lineTo(x,sizes.number*sizes.sector); }
  for(let y=1,n=0;y<v.h&&n<=sizes.number;y+=sizes.sector,n++){ ctx.moveTo(0,y);ctx.lineTo(sizes.number*sizes.sector,y); }
  ctx.stroke();ctx.lineWidth=3;
  for(let i in map.sector){
    if(map.sector[i].enabled){
      // fill square background
      sector.base(map.sector[i]);

      // draw exit arrows
      if(map.sector[i].south)sector.arrow.south(map.sector[i]);
      if(map.sector[i].north)sector.arrow.north(map.sector[i]);
      if(map.sector[i].west)sector.arrow.west(map.sector[i]);
      if(map.sector[i].east)sector.arrow.east(map.sector[i]);

      // draw the vnum on the bottom left of the square
      sector.vnum(map.sector[i]);
    } //end if
  } //end for

  ctx.beginPath();
  let activeSector = map.getActiveSector();
  sector.outline(activeSector);
  ctx.stroke();
} //end function
