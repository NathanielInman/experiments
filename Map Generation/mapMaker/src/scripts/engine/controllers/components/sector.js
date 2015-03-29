export var sector = {
    draw:function(sector,options){
      var x = sector.x    ||0,
          y = sector.y    ||0,
          f = sector.floor||0, //floor type
          w = sector.wall ||0, //wall type
          v = sector.vnum ||0, //verification number (ID) of room
          s = options.s   ||10, //size of cell
          a = options.a   ||5, //radius of arrow head
          p = options.p   ||2; //padding size

      // fill square background
      mapper.sector.base(map.sector[i],{s:k});
      ctx.fillStyle=floor[f].background;
      ctx.fillRect(x*s,y*s,s,s);
      ctx.fillStyle=hex2rgba(map.environment.background.value,map.environment.background.strength);
      ctx.fillRect(x*s,y*s,s,s);

      // draw exit arrows
      ctx.strokeStyle = wall[w].color;
      ctx.beginPath();
      if(map.sector[i].south){
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s/2,y*s+s-p);
        ctx.lineTo(x*s+s/2-a,y*s+s-p-a);
        ctx.moveTo(x*s+s/2,y*s+s-p);
        ctx.lineTo(x*s+s/2+a,y*s+s-p-a);
      } //end if
      if(map.sector[i].north){
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s/2,y*s+p);
        ctx.lineTo(x*s+s/2-a,y*s+a+p);
        ctx.moveTo(x*s+s/2,y*s+p);
        ctx.lineTo(x*s+s/2+a,y*s+a+p);
      } //end if
      if(map.sector[i].west){
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+p,y*s+s/2);
        ctx.lineTo(x*s+a+p,y*s+s/2-a);
        ctx.moveTo(x*s+p,y*s+s/2);
        ctx.lineTo(x*s+a+p,y*s+s/2+a);
      } //end if
      if(map.sector[i].east){
        ctx.moveTo(x*s+s/2,y*s+s/2);
        ctx.lineTo(x*s+s-p,y*s+s/2);
        ctx.lineTo(x*s+s-p-a,y*s+s/2-a);
        ctx.moveTo(x*s+s-p,y*s+s/2);
        ctx.lineTo(x*s+s-p-a,y*s+s/2+a);
      } //end if
      ctx.stroke();

      // draw the vnum on the bottom left of the square
      ctx.font = '10px Courier New';
      ctx.textAlign = 'left';
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
    }
}
