export var arrow = {
  west:function(x,y){
    ctx.moveTo(x*50+25,y*50+25);
    ctx.lineTo(x*50+ 2,y*50+25);
    ctx.lineTo(x*50+ 7,y*50+20);
    ctx.moveTo(x*50+ 2,y*50+25);
    ctx.lineTo(x*50+ 7,y*50+30);
  },
  east:function(x,y){
    ctx.moveTo(x*50+25,y*50+25);
    ctx.lineTo(x*50+48,y*50+25);
    ctx.lineTo(x*50+43,y*50+20);
    ctx.moveTo(x*50+48,y*50+25);
    ctx.lineTo(x*50+43,y*50+30);
  },
  north:function(x,y){
    ctx.moveTo(x*50+25,y*50+25);
    ctx.lineTo(x*50+25,y*50+ 2);
    ctx.lineTo(x*50+20,y*50+ 7);
    ctx.moveTo(x*50+25,y*50+ 2);
    ctx.lineTo(x*50+30,y*50+ 7);
  },
  south:function(x,y){
    ctx.moveTo(x*50+25,y*50+25);
    ctx.lineTo(x*50+25,y*50+48);
    ctx.lineTo(x*50+20,y*50+43);
    ctx.moveTo(x*50+25,y*50+48);
    ctx.lineTo(x*50+30,y*50+43);
  }
};
