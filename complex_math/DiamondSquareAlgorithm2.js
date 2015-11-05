// Constants
var map=[],SIZE=200;
var giveSpot=function(i,j){
  map[i-1][j-1]+=5;map[i  ][j-1]+=5;map[i+1][j-1]+=5;
  map[i  ][j  ]+=5;map[i  ][j  ]+=9;map[i+1][j  ]+=5;
  map[i-1][j+1]+=5;map[i  ][j+1]+=5;map[i+1][j+1]+=5;
}; //end giveSpot()

// Set up the main draw function
easel.onDraw = function(){
  for(var i=0;i<SIZE;i++){map[i]=[];for(var j=0;j<SIZE;j++){map[i][j]=0;}}
  for(var i=0;i<SIZE*SIZE;i++){
    giveSpot(1+r(SIZE-2,0,1),1+r(SIZE-2,0,1));
  } //end for
  for(var i=0;i<SIZE;i++){for(var j=0;j<SIZE;j++){
    var amt=0,num=0;
    if(i-1>=0){  amt+=map[i-1][j];num++;}
    if(i+1<SIZE){amt+=map[i+1][j];num++;}
    if(j-1>=0){  amt+=map[i][j-1];num++;}
    if(j+1<SIZE){amt+=map[i][j+1];num++;}
    if(i-1>=0  &&j-1>=0  ){amt+=map[i-1][j-1]/2;num+=0.5;}
    if(i+1<SIZE&&j-1>=0  ){amt+=map[i+1][j-1]/2;num+=0.5;}
    if(i-1>=0  &&j+1<SIZE){amt+=map[i-1][j+1]/2;num+=0.5;}
    if(i+1<SIZE&&j+1<SIZE){amt+=map[i+1][j+1]/2;num+=0.5;}
    map[i][j]=Math.floor(amt/num);
  }} //end for*2
  for(var i=0;i<SIZE;i++){for(var j=0;j<SIZE;j++){
    ctx.fillStyle='rgb('+map[i][j]+','+map[i][j]+','+(map[i][j]*2)+')';
    ctx.fillRect(i*v.w/SIZE,j*v.h/SIZE,v.w/SIZE+1,v.h/SIZE+1);
  }} //end for*2
} //end easel.onDraw()
easel.redraw();
