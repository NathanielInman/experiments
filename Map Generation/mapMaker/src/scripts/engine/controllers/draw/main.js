// Main import statements required for this module
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';
import { sector   } from 'engine/controllers/draw/sector';
import { sizes    } from 'engine/controllers/draw/sizes';
import { map      } from 'engine/controllers/map/collection';

// Main draw function that calls all the other draw functions
export function draw(){
  ctx.font = '10px Courier New';
  ctx.textAlign = 'left';

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

  // Draw side panel information
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.fillRect(sizes.sideBar.left,0,sizes.sideBar.width,v.h);
  ctx.strokeStyle='#333';ctx.fillStyle='#222';
  ctx.roundRect(sizes.sideBar.left+sizes.sideBar.padding,sizes.sideBar.padding,sizes.sideBar.width-sizes.sideBar.padding*2, v.h-sizes.sideBar.padding*2, sizes.sideBar.borderRadius, true);
  ctx.fillStyle=(function(y2,h){
    ctx.strokeStyle='#000';
    var color = map.environment.background.value;
    var grd = ctx.createLinearGradient(0, y2, 0, h+y2);
    grd.addColorStop('0.00', hex2rgba(color,{r:1.5,g:1.5,b:1.5}));
    grd.addColorStop('0.30', color);
    grd.addColorStop('0.60', hex2rgba(color,{r:0.6,g:0.6,b:0.5}));
    return grd
  })(sizes.sideBar.title.top,sizes.sideBar.title.height);
  ctx.roundRect(sizes.sideBar.left+sizes.sideBar.padding*2-2,
    sizes.sideBar.title.top+sizes.sideBar.padding,
    200,
    sizes.sideBar.title.height,sizes.sideBar.borderRadius,true)
  ctx.fillStyle="#000";
  ctx.textAlign = 'center';
  ctx.font = '30px Courier New';
  ctx.fillText('Testing',100+sizes.sideBar.left+sizes.sideBar.padding,sizes.sideBar.title.height-2);

  // Draw actively selected sector
  ctx.beginPath();
  let activeSector = map.getActiveSector();
  sector.outline(activeSector);
  ctx.stroke();
} //end function
