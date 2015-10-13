/* BASIC DECLARATIONS */
var totalPoints=10000;
var pen={x:0,y:0};

/* AFFINE TRANSFORMATIONS */
var fp=[1,85,92]; //probability
var f1=function(){pen={x:0,y:0.16*pen.y};};
var f2=function(){pen={x:(0.85*pen.x)+(0.04*pen.y),y:(-0.04*pen.x)+(0.85*pen.y)+1.6};};
var f3=function(){pen={x:0.2*pen.x+-0.26*pen.y,y:0.23*pen.x+0.22*pen.y+1.6};};
var f4=function(){pen={x:-0.15*pen.x+0.28*pen.y,y:0.26*pen.x+0.24*pen.y+0.44};};

/* GENERATE POINTS */
easel.onDraw = function draw(cur){
  cur=cur||0;
  ctx.fillStyle='#0F0';
  for(var i=cur,k=0;i<totalPoints&&i<cur+1000;i++){
    k=r(100);
    if(k<=fp[0]){f1();}else if(k<=fp[1]){f2();}else if(k<=fp[2]){f3();}else{f4();}
    ctx.fillRect(pen.x*v.w/10+v.w/4,pen.y*v.h/10,2,2);
  } //end for
  if(cur<totalPoints)setTimeout(function(){draw(++cur)},1);
};
easel.redraw();
//mainLoop(0); //initialize
