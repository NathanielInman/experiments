import {Easel} from './vendor/easel';
import {AGC} from './common/main';

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
{
  let noscript = document.getElementById('noscript');

  if(!Easel.activated){
    noscript.innerHTML = `
    <p class="browsehappy">
      You are using an outdated browser. Please
      <a href="http://browsehappy.com/"> upgrade your browser</a>
      to improve your experience.
      <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
    </p>`;
  }else{
    var size = 41,
        map = new Array(size);

    for (let i=0;i<=size;i++){
      map[i] = new Array(size);
      for(let j=0;j<=size;j++){
        map[i][j]={type:0};
      } //end for
    } //end for
    if(AGC(map,size,3)){
      let rw = v.w/size,
          rh = v.h/size;

      for(let i=0;i<size;i++){
        for(let j=0;j<=size;j++){
          if(map[i][j].type===0){
            ctx.fillStyle='#000';
          }else if(map[i][j].type===2){
            ctx.fillStyle='#333';
          }else{
            ctx.fillStyle='#383';
          } //end if
          ctx.fillRect(i*rw,j*rh,rw,rh);
        } //end for
      } //end for
    } //end if
    noscript.style.visibility='hidden';
  } //end if
}
