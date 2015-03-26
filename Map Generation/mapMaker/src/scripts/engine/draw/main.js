// Main import statements required for this module
import { sector } from 'engine/draw/sector';
import { arrow } from 'engine/draw/arrows';
import { map } from 'engine/map/collection';

// Main draw function that calls all the other draw functions
export function draw(){
  // Clean the canvas
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,v.w,v.h);

  // Draw the outlines and then draw the selected squares
  ctx.strokeStyle="#555";ctx.beginPath();
  for(let x = 1; x< v.w;x+=50){ ctx.moveTo(x,0);ctx.lineTo(x,v.h); }
  for(let y = 1; y< v.h;y+=50){ ctx.moveTo(0,y);ctx.lineTo(v.w,y); }
  ctx.stroke();
  for(let i in map){
    if(map[i].enabled){
      // fill square background
      sector.base(map[i].c,map[i].r);

      // draw exit arrows
      if(o[i].south)arrow.south(map[i].c,map[i].r);
      if(o[i].north)arrow.north(map[i].c,map[i].r);
      if(o[i].west)arrow.west(map[i].c,map[i].r);
      if(o[i].east)arrow.east(map[i].c,map[i].r);

      // draw the vnum on the bottom left of the square
      sector.vnum(o[i].vnum,o[i].c,o[i].r);
    } //end if
  } //end for
  ctx.stroke();
} //end function
