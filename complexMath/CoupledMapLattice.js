/* Constants */
const systemSize=v.w,
      kTimeStep=3, //Number, affects dispersion
      alpha=1.5,
      epsilon=0.9, //0 - 1, affects wavelength
      kTimeStepOnScreen=500; //Number, affects detail

// Initialize map
let map1=(()=>{
  let map=[];

  // start with some noise
  for(let i=0;i<systemSize;i++) map[i]=2*Math.random()-1;
  return map;
})();

// Assistant function for mapping
function logMap(amp){
  return 1-amp*amp*alpha;
} //end logMap()

function getColorFromHue(h){
  let r,g,b,
      s = 0.5,
      l = 0.5,
      C = (1-Math.abs(2*l-1))*s,
      X = C*(1-Math.abs(h/60%2-1)),
      m = l-C/2,
      loc = type=>{
        if(h<60) return Math.round(([C,X,0][type]+m)*255);
        if(h<120) return Math.round(([X,C,0][type]+m)*255);
        if(h<180) return Math.round(([0,C,X][type]+m)*255);
        if(h<240) return Math.round(([0,X,C][type]+m)*255);
        if(h<300) return Math.round(([X,0,C][type]+m)*255);
        return Math.round(([C,0,X][type]+m)*255);
      };

  [r,g,b] = [loc(0),loc(1),loc(2)];
  return `rgb(${r},${g},${b})`;
} //end getColorFromHue()

ctx.fillColor='#000';
ctx.fillRect(0,0,v.w,v.h);
easel.onDraw = function process(i){
  for(let j=0;j<kTimeStepOnScreen;j++){

    //process CML for kTimeStep
    var map2=[]
    for(let k=0;k<kTimeStep;k++){

      //Calculations for Coupling/Diffusion
      map2[0]=(1-epsilon)*logMap(map1[0])+(epsilon/2)*(logMap(map1[1]));
      map2[systemSize-1]=(1-epsilon)*(logMap(map1[systemSize-1]))+(epsilon/2)*(logMap(map1[systemSize-2]));
      for(let m=1;m<map1.length-1;m++)
        map2[m]=(1-epsilon)*(logMap(map1[m]))+(epsilon/2)*(logMap(map1[m-1])+logMap(map1[m+1]));
      for(let m=0;m<map1.length;m++) map1[m]=map2[m];
    } //end for
  } //end for
  let map = map1.map(o=> Math.floor(255*(1+o)/2)),
      pw = v.w/map.length, ph = 1;

  map.forEach((hue,x)=>{
    ctx.fillStyle=getColorFromHue(hue);
    ctx.fillRect(x*pw,i,pw,ph);
  }) //end for
  if(i<v.h) easel.redraw(++i);
};
easel.redraw(0);
