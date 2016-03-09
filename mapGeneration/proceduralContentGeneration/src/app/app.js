import {Easel} from './vendor/easel';
import {PCG} from './common/main';

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

    const tileUnused = 0;
    const tileDirtFloor = 1;
    const tileDirtWall = 2;
    const tileCorridor = 4;
    const tileDoor = 5;
    const tileWater = 6;
    const tileBossFloor = 6;
    const tileLootFloor = 7;

    class Sector{
      constructor(){
        this.type = 0;
        this.loc = 0;
      }
      isEmpty(){
        return this.type === tileUnused;
      }
      isFloor(){
        return this.type === tileDirtFloor;
      }
      isWall(){
        return this.type === tileDirtWall;
      }
      isDoor(){
        return this.type === tileDoor;
      }
      isCorridor(){
        return this.type === tileCorridor;
      }
      isWater(){
        return this.type === tileWater;
      }
      setEmpty(){
        this.type = tileUnused;
      }
      setFloor(){
        this.type = tileDirtFloor;
      }
      setWall(){
        this.type = tileDirtWall;
      }
      setDoor(){
        this.type = tileDoor;
      }
      setCorridor(){
        this.type = tileCorridor;
      }
      setWater(){
        this.type = tileWater;
      }
      isWalkable(){
        var walkable = false;

        if(this.type===tileDirtFloor)walkable = true;
        if(this.type===tileCorridor)walkable = true;
        if(this.type===tileDoor)walkable = true;
        return walkable;
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
    if(PCG(map,size,5)){
      let rw = v.w/size,
          rh = v.h/size;

      for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
          if(map[i][j].isFloor()){
            ctx.fillStyle='#383';
          }else if(map[i][j].isWall()){
            ctx.fillStyle='#333';
          }else if(map[i][j].isDoor()){
            ctx.fillStyle='#F84';
          }else if(map[i][j].isCorridor()){
            ctx.fillStyle='#883';
          }else if(map[i][j].isWater()){
            ctx.fillStyle='#36F';
          }else{
            ctx.fillStyle='#000';
          } //end if
          ctx.fillRect(i*rw,j*rh,rw,rh);
        } //end for
      } //end for
    } //end if
    noscript.style.visibility='hidden';
  } //end if
}
