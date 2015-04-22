// Begin the actual module by importing it's requriements
import { map        } from 'engine/data-model/map';
import { sector     } from 'engine/controllers/components/sector';
import { hex2rgba   } from 'engine/controllers/draw/hex2rgba';

// Notate the loading of the module and it's imports in the debugger
$('.debug').append('<br/>loading controllers/components/mapper.js [::map,sector,hex2rgba]');

// Export the main mapper module
export var mapper = {
  draw(options,activeSector){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||100,
        h = options.h||100,
        n = options.n||15, //default to 15x15 sectors
        k = w/n; //same as h/n

    for(let i in map.sector){
      if(map.sector[i].enabled){
        sector.draw(map.sector[i],{s:k});
      } //end if
    } //end for
    // Draw the outlines and then draw the selected squares
    ctx.strokeStyle=hex2rgba(map.environment.color.value,{r:1.3,g:1.3,b:1.3});
    ctx.beginPath();ctx.lineWidth=1;
    for(let i=0,z=0;i<v.w&&z<=n;i+=k,z++){ ctx.moveTo(i,0);ctx.lineTo(i,n*k); }
    for(let i=0,z=0;i<v.h&&z<=n;i+=k,z++){ ctx.moveTo(0,i);ctx.lineTo(n*k,i); }
    ctx.stroke();
    sector.outline(activeSector,{s:k});
  }
};
