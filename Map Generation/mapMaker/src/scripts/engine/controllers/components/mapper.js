import { map } from 'engine/data-model/map';
import { sector } from 'engine/controllers/components/sector';

export var mapper = {
  draw:function(options,activeSector){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||100,
        h = options.h||100,
        n = options.n||15, //default to 15x15 sectors
        k = w/n; //same as h/n

    // Draw the outlines and then draw the selected squares
    ctx.strokeStyle=map.environment.visited.floor;
    ctx.beginPath();ctx.lineWidth=1;
    for(let x=1,z=0;x<v.w&&z<=n;x+=k,z++){ ctx.moveTo(x,0);ctx.lineTo(x,n*k); }
    for(let y=1,z=0;y<v.h&&z<=n;y+=k,z++){ ctx.moveTo(0,y);ctx.lineTo(n*k,y); }
    ctx.stroke();
    ctx.lineWidth=3;
    for(let i in map.sector){
      if(map.sector[i].enabled){
        sector.draw(map.sector[i]);
      } //end if
    } //end for
    sector.outline(activeSector,{s:k});
  }
}
