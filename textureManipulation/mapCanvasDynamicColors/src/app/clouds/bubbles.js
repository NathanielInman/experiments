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
  bubbles.color = color||'rgba(250,170,0,0.2)';
  bubbles.startX = ()=> this.camera.x+startX+Math.random()*width;
  bubbles.startY = ()=> this.camera.y+startY+Math.random()*height;
  bubbles.endX = startX=> startX;
  bubbles.endY = startY=> startY-distance;
  bubbles.size = ()=> Math.random()*2;
  bubbles.color = atom=>{
    let alpha, halfTween = bubbles.tweenDuration/2;

    if(atom.tweenCurrent<=halfTween){
      alpha = atom.tweenCurrent/halfTween;
    }else{
      alpha = (halfTween-Math.abs(halfTween-atom.tweenCurrent))/halfTween;
    } //end if
    return `rgba(25,150,255,${alpha})`;
  };
  bubbles.tweenType = 6;
  bubbles.onEscape = function onEscape(p){ this.onParticleEnd(p); };
  bubbles.onParticleEnd =  bubbles.reevaluate;
  if(ion){
    bubbles.collection.forEach(particle => bubbles.reevaluate(particle));
    bubbles.active = true;
  }else{
    bubbles.populate();
  } //end if
  return bubbles;
} //end bubbles()

