export var sector{
  base:function(x,y){
    ctx.fillStyle="#222";
    ctx.fillRect(x*50,y*50,50,50);
  },
  vnum:function(vnum,x,y){
    ctx.fillStyle="#fff";
    ctx.fillText(vnum,3+x*50,(1+y)*50-3);
  }
};
