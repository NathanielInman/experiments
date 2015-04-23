// Begin the actual module by importing it's requirements
import { map        } from 'engine/data-model/map';
import { floor      } from 'engine/data-model/floor';
import { wall       } from 'engine/data-model/wall';
import { hex2rgba   } from 'engine/controllers/draw/hex2rgba';

// Notate the loading of the module in the debugger
$('.rollbar').append('<br/>loading controllers/components/sector.js [::map,floor,wall,hex2rgba]');

// Export the main part of this module, sector
export var sector = {
    draw(sector,options){
      var x = sector.x    ||0,
          y = sector.y    ||0,
          f = sector.floor||0, //floor type
          w = sector.wall ||0, //wall type
          v = sector.vnum ||0, //verification number (ID) of room
          s = options.s   ||10, //size of cell
          a = options.a   ||5, //radius of arrow head
          p = options.p   ||4; //padding size

      // fill square background
      ctx.fillStyle=floor.data[f].background;
      ctx.fillRect(x*s,y*s,s,s);
      ctx.fillStyle=hex2rgba(map.environment.color.value,map.environment.color.strength);
      ctx.fillRect(x*s,y*s,s,s);

      // draw exit arrows
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; //background of black
      ctx.lineWidth=5;
      ctx.lineCap="round";
      for(let i=0;i<2;i++){
        ctx.beginPath();
        if(sector.south){
          ctx.moveTo(x*s+s/2,y*s+s/2);
          ctx.lineTo(x*s+s/2,y*s+s-p);
          ctx.moveTo(x*s+s/2-a,y*s+s-p-a);
          ctx.lineTo(x*s+s/2,y*s+s-p);
          ctx.lineTo(x*s+s/2+a,y*s+s-p-a);
        } //end if
        if(sector.north){
          ctx.moveTo(x*s+s/2,y*s+s/2);
          ctx.lineTo(x*s+s/2,y*s+p);
          ctx.moveTo(x*s+s/2-a,y*s+a+p);
          ctx.lineTo(x*s+s/2,y*s+p);
          ctx.lineTo(x*s+s/2+a,y*s+a+p);
        } //end if
        if(sector.west){
          ctx.moveTo(x*s+s/2,y*s+s/2);
          ctx.lineTo(x*s+p,y*s+s/2);
          ctx.moveTo(x*s+a+p,y*s+s/2-a);
          ctx.lineTo(x*s+p,y*s+s/2);
          ctx.lineTo(x*s+a+p,y*s+s/2+a);
        } //end if
        if(sector.east){
          ctx.moveTo(x*s+s/2,y*s+s/2);
          ctx.lineTo(x*s+s-p,y*s+s/2);
          ctx.moveTo(x*s+s-p-a,y*s+s/2-a);
          ctx.lineTo(x*s+s-p,y*s+s/2);
          ctx.lineTo(x*s+s-p-a,y*s+s/2+a);
        } //end if
        ctx.stroke();
        ctx.strokeStyle = hex2rgba(wall.data[w].color,1,0.5);
        ctx.lineWidth=3;
      } //end for

      // draw the vnum on the bottom left of the square
      ctx.strokeStyle='rgba(0,0,0,0.8)';
      ctx.fillStyle=hex2rgba(wall.data[w].color,1,0.6,0.8);
      ctx.font = '900 10px Arial';
      ctx.textAlign = 'left';
      ctx.strokeText(v,3+x*s,(1+y)*s-3);
      ctx.fillText(v,3+x*s,(1+y)*s-3);

      // draw the safe status if it's true
      if(sector.safe){
        ctx.strokeText("S",3+x*s,y*s+10);
        ctx.fillText("S",3+x*s,y*s+10);
      } //end if

      ctx.textAlign = 'right';
      if(sector.down){
        ctx.strokeText('D',(1+x)*s-3,(1+y)*s-3);
        ctx.fillText('D',(1+x)*s-3,(1+y)*s-3);
      } //end if
      if(sector.up){
        ctx.strokeText('U',(1+x)*s-3,y*s+10);
        ctx.fillText('U',(1+x)*s-3,y*s+10);
      } //end if
    },
    outline(sector,options){
      var x = sector.x   ||0,
          y = sector.y   ||0,
          s = options.s  ||10; // size of cell

      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; //background of black
      ctx.lineWidth=5;
      for(let i=0;i<2;i++){
        ctx.beginPath();
        ctx.rect(x*s,y*s,s,s);
        ctx.stroke();
        ctx.strokeStyle = ctx.strokeStyle=hex2rgba(map.environment.color.value,{r:2,g:2,b:2});
        ctx.lineWidth=3;
      } //end for
    }
};
