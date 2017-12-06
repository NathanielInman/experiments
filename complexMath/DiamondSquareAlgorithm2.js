// Constants
var map=[],s=200;
var giveSpot=function(i,j){
  map[i-1][j-1]+=5;map[i  ][j-1]+=5;map[i+1][j-1]+=5;
  map[i  ][j  ]+=5;map[i  ][j  ]+=9;map[i+1][j  ]+=5;
  map[i-1][j+1]+=5;map[i  ][j+1]+=5;map[i+1][j+1]+=5;
}; //end giveSpot()

// Set up the main draw function
easel.onDraw = function main(){
  var i,j;

  for(i=0;i<s;i++){map[i]=[];for(j=0;j<s;j++){map[i][j]=0;}}
  for(i=0;i<s*s;i++){
    giveSpot(1+r(s-2,0,1),1+r(s-2,0,1));
  } //end for
  for(i=0;i<s;i++){for(j=0;j<s;j++){
    var amt=0,num=0;
    if(i-1>=0){  amt+=map[i-1][j];num++;}
    if(i+1<s){amt+=map[i+1][j];num++;}
    if(j-1>=0){  amt+=map[i][j-1];num++;}
    if(j+1<s){amt+=map[i][j+1];num++;}
    if(i-1>=0  &&j-1>=0  ){amt+=map[i-1][j-1]/2;num+=0.5;}
    if(i+1<s&&j-1>=0  ){amt+=map[i+1][j-1]/2;num+=0.5;}
    if(i-1>=0  &&j+1<s){amt+=map[i-1][j+1]/2;num+=0.5;}
    if(i+1<s&&j+1<s){amt+=map[i+1][j+1]/2;num+=0.5;}
    map[i][j]=Math.floor(amt/num);
  }} //end for*2
  for(i=0;i<s;i++){for(j=0;j<s;j++){
    ctx.fillStyle='rgb('+map[i][j]+','+map[i][j]+','+(map[i][j]*2)+')';
    ctx.fillRect(i*v.w/s,j*v.h/s,v.w/s+1,v.h/s+1);
  }} //end for*2
} //end easel.onDraw()
easel.redraw();
