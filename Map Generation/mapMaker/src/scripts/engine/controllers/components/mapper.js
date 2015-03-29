import { map } from 'engine/data-model/map';

// For sector stuff
import { floor } from 'engine/data-model/floor';
import { wall } from 'engine/data-model/wall';
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

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
    ctx.font = '10px Courier New';
    ctx.textAlign = 'left';
    ctx.strokeStyle=map.environment.visited.floor;
    ctx.beginPath();ctx.lineWidth=1;
    for(let x=1,z=0;x<v.w&&z<=n;x+=k,z++){ ctx.moveTo(x,0);ctx.lineTo(x,n*k); }
    for(let y=1,z=0;y<v.h&&z<=n;y+=k,z++){ ctx.moveTo(0,y);ctx.lineTo(n*k,y); }
    ctx.stroke();
    ctx.lineWidth=3;
    for(let i in map.sector){
      if(map.sector[i].enabled){
        // fill square background
        mapper.sector.base(map.sector[i],{s:k});

        // draw exit arrows
        if(map.sector[i].south)mapper.sector.arrow.south(map.sector[i],{s:k});
        if(map.sector[i].north)mapper.sector.arrow.north(map.sector[i],{s:k});
        if(map.sector[i].west)mapper.sector.arrow.west(map.sector[i],{s:k});
        if(map.sector[i].east)mapper.sector.arrow.east(map.sector[i],{s:k});

        // draw the vnum on the bottom left of the square
        mapper.sector.vnum(map.sector[i],{s:k});
      } //end if
    } //end for
    mapper.sector.outline(activeSector,{s:k});
  },
  sector:{
    base:function(sector,options){
      var x = sector.x    ||0,
          y = sector.y    ||0,
          f = sector.floor||0, //floor type
          s = options.s   ||10; //size of cell

      ctx.fillStyle=floor[f].background;
      ctx.fillRect(x*s,y*s,s,s);
      ctx.fillStyle=hex2rgba(map.environment.background.value,map.environment.background.strength);
      ctx.fillRect(x*s,y*s,s,s);
    },
    vnum:function(sector,options){
      var x = sector.x   ||0,
          y = sector.y   ||0,
          w = sector.wall||0, //wall type
          v = sector.vnum||0, //verification number for the cell
          s = options.s  ||10; //size of cell

      ctx.fillStyle=wall[w].color;
      ctx.fillText(v,3+x*s,(1+y)*s-3);
    },
    outline:function(sector,options){
      var x = sector.x   ||0,
          y = sector.y   ||0,
          s = options.s  ||10; //size of cell

      ctx.strokeStyle='#000';
      ctx.beginPath();
      ctx.rect(x*s,y*s,s,s);
      ctx.stroke();
    },
    arrow:{
      west:function(sector, options){
        var x = sector.x   ||0,
            y = sector.y   ||0,
            w = sector.wall||0, //wall type
            s = options.s  ||10, //size of cell
            a = options.a  ||5, //radius of arrow head
            p = options.p  ||2; //padding size

        ctx.strokeStyle = wall[w].color;
        ctx.beginPath();
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+p,y*s+s/2);
        ctx.lineTo(x*s+a+p,y*s+s/2-a);
        ctx.moveTo(x*s+p,y*s+s/2);
        ctx.lineTo(x*s+a+p,y*s+s/2+a);
        ctx.stroke();
      },
      east:function(sector, options){
        var x = sector.x   ||0,
            y = sector.y   ||0,
            w = sector.wall||0, //wall type
            s = options.s  ||10, //size of cell
            a = options.a  ||5, //radius of arrow head
            p = options.p  ||2; //padding size

        ctx.strokeStyle = wall[w].color;
        ctx.beginPath();
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s-p,y*s+s/2);
        ctx.lineTo(x*s+s-p-a,y*s+s/2-a);
        ctx.moveTo(x*s+s-p,y*s+s/2);
        ctx.lineTo(x*s+s-p-a,y*s+s/2+a);
        ctx.stroke();
      },
      north:function(sector,options){
        var x = sector.x   ||0,
            y = sector.y   ||0,
            w = sector.wall||0, //wall type
            s = options.s  ||10, //size of cell
            a = options.a  ||5, //radius of arrow head
            p = options.p  ||2; //padding size

        ctx.strokeStyle = wall[w].color;
        ctx.beginPath();
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s/2,y*s+p);
        ctx.lineTo(x*s+s/2-a,y*s+a+p);
        ctx.moveTo(x*s+s/2,y*s+p);
        ctx.lineTo(x*s+s/2+a,y*s+a+p);
        ctx.stroke();
      },
      south:function(sector,options){
        var x = sector.x   ||0,
            y = sector.y   ||0,
            w = sector.wall||0, //wall type
            s = options.s  ||10, //size of cell
            a = options.a  ||5, //radius of arrow head
            p = options.p  ||2; //padding size

        ctx.strokeStyle = wall[w].color;
        ctx.beginPath();
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s/2,y*s+s-p);
        ctx.lineTo(x*s+s/2-a,y*s+s-p-a);
        ctx.moveTo(x*s+s/2,y*s+s-p);
        ctx.lineTo(x*s+s/2+a,y*s+s-p-a);
        ctx.stroke();
      }
    }
  }
}
