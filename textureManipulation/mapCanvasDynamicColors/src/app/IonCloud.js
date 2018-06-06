import * as clouds from './clouds/';

// Ion Cloud is a library of ion preconfigured clouds. These help in creating
// particle effects common in many applications
export class IonCloud{
  constructor(easel,Ion){
    this.easel = easel;
    this.Ion = Ion;
    this.camera = {
      x: easel.viewport.w/2,
      y: easel.viewport.h/2,
      dx: 0, //direction x
      dy: 0 //direction y
    };
    this.collection=[];
    this.beforeDraw={};
    this.clouds = clouds;
    this.state = 'initial';
  }
  animate(type,parameters){
    let ion = this.collection.find(ion=> !ion.active); //inactive

    if(!ion){
      this.collection.push(this.clouds[type].call(this,parameters));
    }else{
      this.clouds[type].call(this,{ion,...parameters})
    } //end if
  }
  makeState(state,beforeDraw){
    this.beforeDraw[state]=beforeDraw; //mapper
  }
  clearScene(){
    if(this.background){
      this.easel.ctx.putImageData(this.background,0,0);
    }else{
      this.easel.ctx.fillStyle='#000';
      this.easel.ctx.fillRect(0,0,this.easel.viewport.w,this.easel.viewport.h);
    } //end if
  }
  clean(){

    //eslint-disable-next-line no-return-assign
    this.collection.forEach(ion=> ion.active = false);
  }
  draw(){
    this.clearScene();
    if(this.beforeDraw[this.state]) this.beforeDraw[this.state]();
    this.collection.forEach((animation,index,collection)=>{
      if(animation.states.includes(this.state)){ //only render if its in current state
        if(animation.finished){
          if(typeof animation.onFinished === 'function') animation.onFinished();
          collection.splice(index,1);
        }else if(animation.active){
          animation.getFrame();
        } //end if
      } //end if
    });
    requestAnimationFrame(()=> this.draw());
  }
}
