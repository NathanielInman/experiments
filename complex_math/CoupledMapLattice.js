/* Constants */
var systemSize=60,
    kTimeStep=1,
    alpha=1.5,
    epsilon=0.3,
    kTimeStepOnScreen=100,
    totalTimeStep=1000000,
    processing=true;

// Initialize map
var map1=(function(){
  var map=[];
  for(var i=0;i<systemSize;i++){
    map[i]=2*Math.random()-1;
  } //end for
  return map;
})();

// Assistant function for mapping
function logMap(amp,alp){
  return 1-amp*amp*alp;
} //end logMap()

function draw(){
  ctx.fillColor="#000";
  ctx.fillRect(0,0,v.w,v.h);
  ctx.strokeStyle="#F00";
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(0,v.h/2);
  for(var i=0;i<systemSize;i++){
    ctx.lineTo(v.w/60*(i+1),(1+map1[i])/2*v.h);
  } //end for
  ctx.stroke();
} //end draw()

easel.onDraw = function process(i){
  var j,k,m;

  if(i>=(totalTimeStep/(kTimeStep*kTimeStepOnScreen)))return; //done
  for(j=0;j<kTimeStepOnScreen;j++){
    //process CML for kTimeStep
    var map2=[]
    for(k=0;k<kTimeStep;k++){
      //Calculations for Coupling/Diffusion
      map2[0]=(1-epsilon)*logMap(map1[0],alpha)+(epsilon/2)*(logMap(map1[1],alpha));
      map2[systemSize-1]=(1-epsilon)*(logMap(map1[systemSize-1],alpha))+(epsilon/2)*(logMap(map1[systemSize-2],alpha));
      for(m=1;m<map1.length-1;m++)
        map2[m]=(1-epsilon)*(logMap(map1[m],alpha))+(epsilon/2)*(logMap(map1[m-1],alpha)+logMap(map1[m+1],alpha));
      for(m=0;m<map1.length;m++)
        map1[m]=map2[m];
    } //end for
    //
  } //end for
  draw();
  easel.redraw();
};
easel.redraw();
