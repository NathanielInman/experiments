export function laser(name,parameters){
  let {startX,startY,endX,endY,size} = parameters,
      status = 200,
      laser = new this.Ion(1);

  startX = startX || 0;
  startY = startY || 0;
  endX = endX || 0;
  endY = endY || 0;
  size = size || 10;
  laser.states = ['initial'];
  laser.clear = false;
  laser.color = 'rgba(250,250,150,0.5)';
  laser.startX = ()=> this.camera.x+endX;
  laser.startY = ()=> this.camera.y+endY;
  laser.endX = ()=> this.camera.x+endX-size/2+r(size);
  laser.endY = ()=> this.camera.y+endY-size/2+r(size);
  laser.windX = ()=> r(0,1.5)-0.75;
  laser.windY = ()=> r(0,1.5)-0.75;
  laser.size = ()=> r(2,4,true);
  laser.tweenType = ()=> r(10,15,true);
  laser.tweenDuration = ()=> r(100,150,true);
  laser.onParticleEnd = function onParticleEnd(particle){
    this.collection.splice(particle.id,1);
    this.collection.forEach((p,i)=>p.id=i); //re-index array
  };
  laser.onCreate = ()=> status--;
  laser.populate();
  laser.draw = (particle)=>{
    ctx.strokeStyle='rgba(100,100,250,'+0.1/200*status+')';
    ctx.lineWidth=17;
    if(status>0){
      ctx.beginPath();
      ctx.moveTo(this.camera.x+startX+3,this.camera.y+startY);
      ctx.lineTo(this.camera.x+endX+3,this.camera.y+endY);
      ctx.stroke();
      ctx.strokeStyle='#DDF';
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(this.camera.x+startX+3,this.camera.y+startY);
      ctx.lineTo(this.camera.x+endX+3,this.camera.y+endY);
      ctx.stroke();
    } //end if
  };
  return laser;
} //end laser()
