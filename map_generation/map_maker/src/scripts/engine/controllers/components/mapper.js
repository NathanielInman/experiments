console.log('loading controllers/components/mapper.js');
console.log('>> map');
console.log('>> sector');
import { map        } from 'engine/data-model/map';
import { sector     } from 'engine/controllers/components/sector';
export var mapper = {
  draw:function(options,activeSector){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||100,
        h = options.h||100,
        n = options.n||15, //default to 15x15 sectors
        k = w/n; //same as h/n

    for(let i in Engine.map.sector){
      if(Engine.map.sector[i].enabled){
        sector.draw(Engine.map.sector[i],{s:k});
      } //end if
    } //end for
    // Draw the outlines and then draw the selected squares
    ctx.strokeStyle=map.environment.visited.floor;
    ctx.beginPath();ctx.lineWidth=1;
    for(let i=0,z=0;i<v.w&&z<=n;i+=k,z++){ ctx.moveTo(i,0);ctx.lineTo(i,n*k); }
    for(let i=0,z=0;i<v.h&&z<=n;i+=k,z++){ ctx.moveTo(0,i);ctx.lineTo(n*k,i); }
    ctx.stroke();
    sector.outline(activeSector,{s:k});
  }
};
