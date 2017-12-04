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
    let size = 41,
        map = [];

    const tileRemoved = 3;
    const tileDirtWall = 2;
    const tileDirtFloor = 1;
    const tileUnused = 0;

    class Sector{
      constructor(){
        this.type = 0;
        this.loc = 0;
      }
      isFloor(){
        return this.type === tileDirtFloor;
      }
      isEmpty(){
        return this.type === tileUnused;
      }
    }
    for (let i=0;i<=size;i++){
      map[i] = [];
      for(let j=0;j<=size;j++){
        map[i][j]= new Sector();
      } //end for
    } //end for
    if(AGC(map,size,3)){
      let rw = v.w/size,
          rh = v.h/size;

      for(let i=0;i<size;i++){
        for(let j=0;j<=size;j++){
          if(map[i][j].type===tileUnused){
            ctx.fillStyle='#000';
          }else if(map[i][j].type===tileDirtWall){
            ctx.fillStyle='#333';
          }else if(map[i][j].type===tileRemoved){
            ctx.fillStyle='#F00';
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
