import {settings} from './settings';

/* Constants */
const systemSize=settings.map.width,
      kTimeStep=1, //Number, affects dispersion
      alpha=2, epsilon=0.3, //fully developed spatiotemporal chaos
      kTimeStepOnScreen=1; //Number, affects detail

// Assistant function for mapping
function logMap(amp){
  return 1-amp*amp*alpha;
} //end logMap()

export function applyHeight(map){

  // apply coupled map lattice to allow a "living" chaos affect
  for(let y=0;y<settings.map.height;y++){
    for(let j=0;j<kTimeStepOnScreen;j++){

      //process CML for kTimeStep
      for(let k=0,map2=[];k<kTimeStep;k++){

        //Calculations for Coupling/Diffusion
        map2[0]=(1-epsilon)*logMap(map[y][0].height)+
          (epsilon/2)*(logMap(map[y][1].height));
        map2[systemSize-1]=(1-epsilon)*(logMap(map[y][systemSize-1].height))+
          (epsilon/2)*(logMap(map[y][systemSize-2].height));
        for(let m=1;m<map.length-1;m++){
          map2[m]=(1-epsilon)*(logMap(map[y][m].height))+
            (epsilon/2)*(logMap(map[y][m-1].height)+logMap(map[y][m+1].height));
        } //end for
        for(let m=0;m<map.length;m++) map[y][m].height=map2[m];
      } //end for
    } //end for
  } //end for

  // the formula results in values with -1 to 1, lets normalize to 0 to 1
  for(let y=0;y<settings.map.height;y++){
    for(let x=0;x<settings.map.width;x++){
      map[y][x].height = (map[y][x].height+1)/2; //normalize
    } //end for
  } //end for
} //end applyHeight()
