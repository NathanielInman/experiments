import { map        } from 'engine/data-model/map';
import { floor      } from 'engine/data-model/floor';
import { wall       } from 'engine/data-model/wall';
import { hex2rgba   } from 'engine/controllers/draw/hex2rgba';

export var sector = {
    draw:function(sector,options){
      var x = sector.x    ||0,
          y = sector.y    ||0,
          f = sector.floor||0, //floor type
          w = sector.wall ||0, //wall type
          v = sector.vnum ||0, //verification number (ID) of room
          s = options.s   ||10, //size of cell
          a = options.a   ||5, //radius of arrow head
          p = options.p   ||4; //padding size

      // fill square background
      ctx.fillStyle=floor[f].background;
      ctx.fillRect(x*s,y*s,s,s);
      ctx.fillStyle=hex2rgba(map.environment.background.value,map.environment.background.strength);
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
        ctx.strokeStyle = hex2rgba(wall[w].color,1,0.5);
        ctx.lineWidth=3;
      } //end for

      // draw the vnum on the bottom left of the square
      ctx.strokeStyle='rgba(0,0,0,0.8)';
      ctx.fillStyle=hex2rgba(wall[w].color,1,0.6,0.8);
      ctx.font = '900 10px Arial';
      ctx.textAlign = 'left';
      ctx.strokeText(v,3+x*s,(1+y)*s-3);
      ctx.fillText(v,3+x*s,(1+y)*s-3);
    },
    outline:function(sector,options){
      var x = sector.x   ||0,
          y = sector.y   ||0,
          s = options.s  ||10; // size of cell

      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; //background of black
      ctx.lineWidth=5;
      for(let i=0;i<2;i++){
        ctx.beginPath();
        ctx.rect(x*s,y*s,s,s);
        ctx.stroke();
        ctx.strokeStyle = hex2rgba(map.environment.visited.wall);
        ctx.lineWidth=3;
      } //end for
    }
};
