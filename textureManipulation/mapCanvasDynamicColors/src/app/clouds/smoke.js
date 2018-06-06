import {ink} from 'ion-cloud';

export function smoke(parameters){
  let {
        startX,startY,width,height,
        color,quantity,ion
      } = parameters,
      smoke = ion || new this.Ion(this.easel);

  startX = startX||0;
  startY = startY||0;
  width = width||20;
  height = height||100;
  smoke.quantity = quantity;
  smoke.states = ['initial'];
  smoke.clear = false;
  smoke.color = atom=>{
    let a, halfTween = atom.tweenDuration/2;

    if(atom.tweenCurrent<=halfTween){
      a = atom.tweenCurrent/halfTween;
    }else{
      a = (halfTween-Math.abs(halfTween-atom.tweenCurrent))/halfTween;
    } //end if
    let {r,g,b} = ink(color,{format: 'object'});

    return `rgba(${r},${g},${b},${a})`;
  };
  smoke.startX = ()=> this.camera.x+startX+Math.random()*width;
  smoke.startY = ()=> this.camera.y+startY+Math.random()*height;
  smoke.endX = startX=> this.camera.x+startX+Math.random()*width/4-width/8;
  smoke.endY = ()=> this.camera.y+startY;
  smoke.tweenType = ()=> [1,4,7,10,13,15][Math.floor(Math.random()*6)];
  smoke.tweenDuration = ()=> Math.floor(Math.random()*300+300);
  smoke.tweenCurrent = ()=> Math.floor(Math.random()*smoke.tweenDuration());
  smoke.onEscape = function onEscape(p){ this.onParticleEnd(p); };
  smoke.onParticleEnd = smoke.reevaluate;
  smoke.size = ()=> Math.random()*4;
  smoke.onMove = function onMove(particle){
    let size=(height+width)/8;

    // reset after we reach 15%
    if(particle.tweenCurrent>particle.tweenDuration*0.15){
      this.onParticleEnd(particle);
    }else{
      particle.size=size-size/particle.tweenDuration*particle.tweenCurrent;
    } //end if
  };
  if(ion){
    smoke.collection.forEach(particle =>{
      smoke.reevaluate(particle);
      particle.tweenCurrent = smoke.tweenCurrent();
    });
    smoke.active = true;
  }else{
    smoke.populate();
  } //end if
  return smoke;
} //end smoke()
