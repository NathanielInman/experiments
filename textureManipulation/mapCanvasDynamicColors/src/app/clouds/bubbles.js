import {ink} from 'ion-cloud';

export function bubbles(parameters){
  let {
        startX,startY,width,height,
        color,quantity,distance,duration,
        ion
      } = parameters,
      bubbles = ion ||  new this.Ion(this.easel);

  startX = startX||0;
  startY = startY||0;
  width = width||100;
  height = height||100;
  bubbles.tweenDuration = duration||1000;
  bubbles.tweenCurrent = ()=> Math.floor(Math.random()*bubbles.tweenDuration);
  bubbles.quantity = quantity;
  bubbles.states = ['initial'];
  bubbles.clear = false;
  bubbles.startX = ()=> this.camera.x+startX+Math.random()*width;
  bubbles.startY = ()=> this.camera.y+startY+Math.random()*height;
  bubbles.endX = startX=> startX;
  bubbles.endY = startY=> startY-distance;
  bubbles.size = ()=> Math.random()*2;
  bubbles.color = atom=>{
    let a, halfTween = bubbles.tweenDuration/2;

    if(atom.tweenCurrent<=halfTween){
      a = atom.tweenCurrent/halfTween;
    }else{
      a = (halfTween-Math.abs(halfTween-atom.tweenCurrent))/halfTween;
    } //end if
    let {r,g,b} = ink(color,{format: 'object'});
    return `rgba(${r},${g},${b},${a})`;
  };
  bubbles.tweenType = 6;
  bubbles.onParticleEnd = bubbles.reevaluate;
  if(ion){
    bubbles.collection.forEach(particle =>{
      bubbles.reevaluate(particle);
      particle.tweenCurrent = bubbles.tweenCurrent();
    });
    bubbles.active = true;
  }else{
    bubbles.populate();
  } //end if
  return bubbles;
} //end bubbles()
