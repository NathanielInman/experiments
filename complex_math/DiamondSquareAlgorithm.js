// Public Constants
var mapWidth,mapHeight,map=[];

// Variable Configuration
easel.config = function(){
  var color;

  map=[];
  mapWidth=70;
  mapHeight=50;
  for(var i=0;i<mapHeight;i++){
    map[i]=[];
    for(var j=0;j<mapWidth;j++){      
      color=r(235,0,1);
      map[i][j]=color;
    } //end for
  } //end for
} //end easel.config()

easel.onDraw = function main(x,y){
  var cd1,cd2,cd3,cd4, //corner distance
      cw1,cw2,cw3,cw4, //corner weight
      cc1,cc2,cc3,cc4, //corner color
      cellWidth=Math.ceil(v.w/mapWidth),cellHeight=Math.ceil(v.h/mapHeight),
      totalWeight,color;

  x=x||0;y=y||0; //catch-all, and on inits
  for(var j=0;j<cellHeight;j++){
    for(var i=0;i<cellWidth;i++){
      cd1=Math.sqrt(Math.pow(i,2)+Math.pow(j,2));
      cd2=Math.sqrt(Math.pow(cellWidth-i,2)+Math.pow(j,2));
      cd3=Math.sqrt(Math.pow(i,2)+Math.pow(cellHeight-j,2));
      cd4=Math.sqrt(Math.pow(cellWidth-i,2)+Math.pow(cellHeight-j,2));
      totalWeight=cd1+cd2+cd3+cd4;
      cw4=cd1/totalWeight;
      cw3=cd2/totalWeight;
      cw2=cd3/totalWeight;
      cw1=cd4/totalWeight;
      cc1=map[y][x];
      cc2=x<mapWidth-1?map[y][x+1]:0;
      cc3=y<mapHeight-1?map[y+1][x]:0;
      cc4=x<mapWidth-1&&y<mapHeight-1?map[y+1][x+1]:0;
      color=Math.floor(cc1*cw1+
        cc2*cw2+
        cc3*cw3+
        cc4*cw4);
      ctx.fillStyle='rgb('+color+','+color+','+color+')';
      ctx.fillRect(v.w/mapWidth*x+i,v.h/mapHeight*y+j,1,1);
    } //end for
  } //end for
  ctx.fillStyle='rgb('+map[y][x]+','+map[y][x]+','+map[y][x]+')';
  if(x<mapWidth-1&&y<=mapHeight-1){
    easel.redraw(++x,y);
  }else if(y<mapHeight-1){
    easel.redraw(0,++y);
  } //end if
};
easel.redraw();
