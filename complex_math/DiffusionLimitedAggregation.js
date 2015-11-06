var map=(function(){
  var map=[];
  for(var i=0;i<v.h;i++){
    map[i]=[];
    for(var j=0;j<v.w;j++){
      if(i>v.h-10){
        map[i][j]=true;
      }else{
        map[i][j]=false;
      }//end if
    } //end for
  } //end for
  return map;
})();
var d=1;
easel.onDraw = function(highestY){
  var worked = false;
  highestY=highestY||0;
  if(d){
    ctx.fillStyle='rgba(255,0,0,0.2)';
  }else{
    ctx.fillStyle='rgba(0,0,0,0.2)';
  } //end if
  var walker=function(x,y){
    var percent=r(100,0,1);
    if(x-1>=0&&percent<20){
      ctx.fillRect(x-1,y,1,1);
      map[y][x-1]=true;walker(x-1,y);
    }else if(y-1>=0&&percent<70){
      // going upwards or downwards
      if(d){
        ctx.fillRect(x,y-1,1,1);
        map[y-1][x]=true;walker(x,y-1);
      }else if(y+1<v.h){
        ctx.fillRect(x,y+1,1,1);
        map[y+1][x]=true;walker(x,y+1);
      } //end if
    }else if(x+1<v.w&&percent<90){
      ctx.fillRect(x+1,y,1,1);
      map[y][x+1]=true;walker(x+1,y);
    }else{
      return y;
    } //end if    
  };
  for(iter=0;iter<200;iter++){
    var x=r(v.w,0,1),y=v.h-highestY-1,n;
    if(y+1<v.h&&map[y+1][x]==true||
       x+1<v.w&&map[y][x+1]==true||
       x-1>=0&& map[y][x-1]==true){
      worked=true;
      map[y][x]=true;
      ctx.fillRect(x,y,1,1);
      n=walker(x,y);
    } //end ifworked=true;
  } //end for

  // Only keep drawing if we aren't at the top
  if(worked&&highestY<v.h-1&&d){
    highestY++;
    d=highestY<v.h-1?d:0;
  }else{
    highestY--;
    d=highestY>0?0:1;
  }//end if
  easel.redraw(highestY);
};
easel.redraw();
