var map=(function(){
  var map=[];
  for(var i=0;i<v.h;i++){
    map[i]=[];
    for(var j=0;j<v.w;j++){
      if(i==v.h-1){
        map[i][j]=true;
        ctx.fillRect(j,i,1,1);
      }else{
        map[i][j]=false;
      }//end if
    } //end for
  } //end for
  return map;
})();
easel.onDraw = function(highestY){
  ctx.fillStyle='#FFF';
  var walker=function(x,y){
    var percent=r(100,0,1);
    if(x-1>=0&&percent<20){
      ctx.fillRect(x-1,y,1,1);
      map[y][x-1]=true;walker(x-1,y);
    }else if(y-1>=0&&percent<70){
      ctx.fillRect(x,y-1,1,1);
      map[y-1][x]=true;walker(x,y-1);
    }else if(x+1<v.w&&percent<90){
      ctx.fillRect(x+1,y,1,1);
      map[y][x+1]=true;walker(x+1,y);
    }else{
      return y;
    } //end if    
  };
  for(iter=0;iter<100;iter++){
    var x=r(v.w,0,1),y=r(highestY>50?50:highestY,v.h-highestY-1,1),worked=false,n;
    if(y+1<v.h&&map[y+1][x]==true||
       x+1<v.w&&map[y][x+1]==true||
       x-1>=0&& map[y][x-1]==true)worked=true;
    if(worked){
      if(v.h-y>highestY)highestY=v.h-y;
      map[y][x]=true;
      ctx.fillRect(x,y,1,1);
      n=walker(x,y)
      if(v.h-n>highestY)highestY=v.h-n;
      if(highestY==v.h)return;
    }//end if
  } //end for
  easel.redraw(highestY);
};
easel.redraw();
