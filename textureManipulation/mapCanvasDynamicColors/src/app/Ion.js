export class Ion{
  constructor(easel){
    this.active = true;
    this.easel = easel;
    this.ctx = easel.ctx;
    this.viewport = easel.viewport;
    this.collection = [];
    this.quantity = 1;
    this.size = 1;
    this.startX = 0;
    this.startY = 0;
    this.endX = 1;
    this.endY = 1;
    this.windX = 0;
    this.windY = 0;
    this.color = '#48F';
    this.clearColor = '#000';
    this.tweenType = 0;
    this.tweenCurrent = 0;
    this.tweenDuration = 1000;
    this.tweenSpeed = 1;
    this.background = null; //if set, will re-apply before each frame
    if(!this.ctx) throw new Error('Ion initialized without easel.');
  }

  // Ease is a tweening function using Robert Penner's equations to identify
  // the values of an axis in respect to it's start location, destination,
  // and the normalization of the transition between the two with respect to
  // starting time, a given duration, and the function to impose upon the
  // transition from that start position to it's destination.
  // eslint-disable-next-line complexity
  tween(particle,axis,optionalOrientation,optionalType,optionalTime){
    let result, //returns the current x or y location
        t = optionalTime||particle.tweenCurrent,
        d = particle.tweenDuration,
        o = optionalOrientation||0.3, //modification orientation strength
        type = optionalType||particle.tweenType,
        b,c; //beginning position and change in position

    if(axis==='x'){
      b = particle.startX;
      c = particle.endX-particle.startX;
    }else{
      b = particle.startY;
      c = particle.endY-particle.startY;
    } //end if
    if(type===0||type==='linear'){
      result = c*t/d+b;
    }else if(type===1||type==='ease-in-quad'){
      result = c*(t/=d)*t+b;
    }else if(type===2||type==='ease-out-quad'){
      result = -c*(t/=d)*(t-2)+b;
    }else if(type===3||type==='ease-in-out-quad'){
      result = (t/=d/2)<1?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;
    }else if(type===4||type==='ease-in-cubic'){
      result = c*(t/=d)*t*t+b;
    }else if(type===5||type==='ease-out-cubic'){
      result = c*((t=t/d-1)*t*t+1)+b;
    }else if(type===6||type==='ease-in-out-cubic'){
      result = ((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b;
    }else if(type===7||type==='ease-in-quart'){
      result = c*(t/=d)*t*t*t+b;
    }else if(type===8||type==='ease-out-quart'){
      result = -c*((t=t/d-1)*t*t*t-1)+b;
    }else if(type===9||type==='ease-in-out-quart'){
      result = ((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;
    }else if(type===10||type==='ease-in-quint'){
      result = c*(t/=d)*t*t*t*t+b;
    }else if(type===11||type==='ease-out-quint'){
      result = c*((t=t/d-1)*t*t*t*t+1)+b;
    }else if(type===12||type==='ease-in-out-quint'){
      result = ((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b;
    }else if(type===13||type==='ease-in-sine'){
      result = -c*Math.cos(t/d*(Math.PI/2))+c+b;
    }else if(type===14||type==='ease-out-sine'){
      result = -c/2*(Math.cos(Math.PI*t/d)-1)+b;
    }else if(type===15||type==='ease-in-exponential'){
      result = (t===0)?b:c*Math.pow(2,10*(t/d-1))+b;
    }else if(type===16||type==='ease-out-exponential'){
      result = (t===d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
    }else if(type===17||type==='ease-in-out-exponential'){
      if(t===0){
        result = b;
      }else if(t===d){
        result = b+c;
      }else if((t/=d/2)<1){
        result = c/2*Math.pow(2,10*(t-1))+b;
      }else{
        result = c/2*(Math.pow(2,-10*--t)+2)+b;
      } //end if
    }else if(type===18||type==='ease-in-circular'){
      result = -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
    }else if(type===19||type==='ease-out-circular'){
      result = c*Math.sqrt(1-(t=t/d-1)*t)+b;
    }else if(type===20||type==='ease-in-out-circular'){
      result = ((t/=d/2)<1)?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
    }else if(type===21||type==='ease-in-elastic-loose'){
      result = this.tween(particle,axis,0.5,'ease-in-elastic-normal');
    }else if(type===22||type==='ease-in-elastic-normal'){
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if(t===0) return b;
        if((t/=d)===1) return b+c;
        if(!p) p=d*o;
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      })();
    }else if(type===23||type==='ease-in-elastic-string'){
      result = this.tween(particle,axis,0.1,'ease-in-elastic-normal');
    }else if(type===24||type==='ease-out-elastic-loose'){
      result = this.tween(particle,axis,0.5,'ease-out-elastic-normal');
    }else if(type===25||type==='ease-out-elastic-normal'){
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if (t===0) return b;
        if ((t/=d)===1) return b+c;
        if (!p) p=d*o;
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
      })();
    }else if(type===26||type==='ease-out-elastic-strong'){
      result = this.tween(particle,axis,0.1,'ease-out-elastic-normal');
    }else if(type===27||type==='ease-in-out-elastic-loose'){
      result = this.tween(particle,axis,0.5,'ease-in-out-elastic-normal');
    }else if(type===28||type==='ease-in-out-elastic-normal'){
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if(t===0) return b;
        if((t/=d/2)===2) return b+c;
        if(!p) p=d*(o*1.5);
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
      })();
    }else if(type===29||type==='ease-in-out-elastic-strong'){
      result = this.tween(particle,axis,0.1,'ease-in-out-elastic-normal');
    }else if(type===30||type==='ease-in-back'){
      result = c*(t/=d)*t*((1.70158+1)*t - 1.70158) + b;
    }else if(type===31||type==='ease-out-back'){
      result = c*((t=t/d-1)*t*((1.70158+1)*t + 1.70158) + 1) + b;
    }else if(type===32||type==='ease-in-out-back'){
      let s = 1.70158;

      if((t/=d/2)<1){
        result = c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      }else{
        result = c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      } //end if
    }else if(type===33||type==='ease-in-bounce'){
      result = c-this.tween(particle,axis,0,'ease-out-bounce')+b;
    }else if(type===34||type==='ease-out-bounce'){
      if ((t/=d) < (1/2.75)) {
        result = c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        result = c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
      } else if (t < (2.5/2.75)) {
        result = c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
      } else {
        result = c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
      } //end if
    }else if(type===35||type==='ease-in-out-bounce'){
      if(t<d/2){
        result = this.tween(particle,axis,0,'ease-in-bounce',t*2)*0.5+b;
      }else{
        result = this.tween(particle,axis,0,'ease-out-bounce',t*2-d)*0.5+c*0.5+b;
      } //end if
    }//end if
    return result;
  }

  // getNew will create a new particle and return that result. It's possible
  // to override the function to develop a custom particle generator for more
  // specific applications.
  getNew(id){
    let sx = typeof this.startX==='function'?this.startX():this.startX,
        sy = typeof this.startY==='function'?this.startY():this.startY,
        dx = typeof this.endX==='function'?this.endX(sx):this.endX,
        dy = typeof this.endY==='function'?this.endY(sy):this.endY,
        ttc = this.tweenCurrent, //shorten reference
        c = typeof ttc==='function'?ttc():ttc,
        ttd = this.tweenDuration, //shorten reference
        d = typeof ttd==='function'?ttd():ttd,
        tt = typeof this.tweenType==='function'?this.tweenType():this.tweenType,
        s = typeof this.size==='function'?this.size():this.size,
        image = typeof this.image==='function'?this.image(id):this.image,
        particle = {};

    this.onCreate(); //even fired as a new particle is created
    particle.id = id; //for referencing each particle outside library
    particle.startX = sx;
    particle.startY = sy;
    particle.originX = particle.startX;
    particle.originY = particle.startY;
    particle.x = sx;
    particle.y = sy;
    particle.endX = dx;
    particle.endY = dy;
    particle.terminalX = particle.endX; //original destiation x
    particle.terminalY = particle.endY; //original destination y
    particle.tweenCurrent = c;
    particle.tweenDuration = d;
    particle.tweenType = tt;
    particle.onEnd = this.onParticleEnd;
    particle.size = s; //the particle size
    particle.windX = this.windX||0; //wind functions are ran at runtime
    particle.windY = this.windY||0; //wind function are ran at runtime
    particle.color = this.color; //each particle can be rendered with a diff color
    particle.image = image; //can be an image or a bit-array
    particle.imageWidth = this.imageWidth; //width in pixels
    particle.imageHeight = this.imageHeight; //height in pixels
    return particle;
  }

  // Reset will perform a small number of operations to reset a particle back
  // to its starting state instead of actually generating a new particle. This
  // can be helpful if you want to retain it's original starting location.
  static reset(particle){
    particle.x = particle.startX = particle.originX;
    particle.y = particle.startY = particle.originY;
    particle.endX = particle.terminalX; //wind may have corrupted endX
    particle.endY = particle.terminalY; //wind may have corrupted endY
    particle.tweenCurrent = 0;
  }

  // Reevaluate will instead of reseting the particle, reevaluate the starting
  // conditions of the particle; that is, it may only reset if the starting
  // conditions aren't functions
  reevaluate(particle){
    let startX = typeof this.startX==='function'?this.startX():this.startX,
        startY = typeof this.startY==='function'?this.startY():this.startY,
        endX = typeof this.endX==='function'?this.endX(startX):this.endX,
        endY = typeof this.endY==='function'?this.endY(startY):this.endY;

    particle.x = particle.originX = particle.startX = startX;
    particle.y = particle.originY = particle.startY = startY;
    particle.endX = particle.terminalX = endX;
    particle.endY = particle.terminalY = endY;
    particle.tweenCurrent = 0;
  }

  // Populate pushes a new particle into the particles array then checks to see
  // if the specified particle number has been reached, if it hasn't, then it
  // queues up itself asynchronously to create another particle. This recursive
  // action continues until the total particle quantity is reached.
  populate(wait){
    if(!wait){
      this.collection = Array.from(new Array(this.quantity),(ignore,index)=>{
        return this.getNew(index);
      });
    }else{
      this.collection.push(this.getNew(this.collection.length));
      if(this.collection.length<this.quantity){
        if(typeof wait === 'function'){
          setTimeout(()=> this.populate(wait),wait());
        }else if(typeof wait === 'number'){
          setTimeout(()=> this.populate(wait),wait);
        }else{ //assume its boolean or invalid and allow generic wait
          setTimeout(()=> this.populate(),1);
        }//end if
      } //end if
    } //end if
  }

  // Wind applies noise values on the movement patterns of the particles
  // instead of them performing their tweening operations unhindered. This
  // gives a more dynamic feel to their movement. The wind patterns and
  // function can be overridden to be dynamic or conditional as desired.
  static wind(particle){
    if(typeof particle.windX === 'function'){
      particle.endX += particle.windX(particle);
    }else if(particle.windX){
      particle.endX += particle.windX;
    } //end if
    if(typeof particle.windY === 'function'){
      particle.endY += particle.windY(particle);
    }else if(particle.windY){
      particle.endY += particle.windY;
    } //end if
    if(typeof particle.windX === 'function'){
      particle.startX += particle.windX(particle);
    }else if(particle.windX){
      particle.startX += particle.windX;
    } //end if
    if(typeof particle.windY === 'function'){
      particle.startY += particle.windY(particle);
    }else if(particle.windY){
      particle.startY += particle.windY;
    } //end if
  }

  // OnMove function is called right before a particle is moved
  onMove(particle){} //eslint-disable-line

  // Draw simply draws a particle
  draw(particle,isClear){
    let p = particle,
        image = p.image,
        s = p.size||1; //fallback of one if they made it custom & ignored

    if(isClear){
      this.ctx.fillStyle = this.clearColor;
    }else if(typeof particle.color ==='function'){
      this.ctx.fillStyle = particle.color(particle);
    }else{
      this.ctx.fillStyle = particle.color;
    } //end if
    if(image && image instanceof Array && image.length){
      let scaleX = p.imageWidth/image[0].length,
          scaleY = p.imageHeight/image.length;

      image.forEach((yo,y)=>{
        yo.forEach((xo,x)=>{
          if(isClear&&xo){
            this.ctx.fillRect(p.x+x*scaleX-1,p.y+y*scaleY-1,s*scaleX+1,s*scaleY+1);
          }else if(xo){
            this.ctx.fillRect(p.x+x*scaleX,p.y+y*scaleY,s*scaleX,s*scaleY);
          } //end if
        });
      });
    }else if(image){ //image was passed, use it instead of a pixel particle
      let px = p.x-p.imageWidth/2,
          py = p.y-p.imageHeight/2;

      if(p.imageWidth && p.imageHeight){ //sizes given for constrain
        this.ctx.drawImage(image,px,py,p.imageWidth,p.imageHeight);
      }else{ //no sizes given, just allow it to fill with images normal size
        this.ctx.drawImage(image,px,py);
      } //end if
    }else{
      this.ctx.fillRect(p.x,p.y,s,s);
    } //end if
  }

  // Clear simply clears a particle
  clear(particle){
    this.draw(particle,true);
  }

  // OnCreate function is called when a particle is created for the first
  // time. This allows one to keep track of how far into the creation of all
  // the particles one is given the particle total that they already control.
  onCreate(){} //eslint-disable-line

  // OnParticleEnd function is called after a particle finishes its tweening
  // motion. This is merely a template function that is required to be
  // overridden.
  onParticleEnd(){} //eslint-disable-line

  // OnEscape function is called after a particle leaves the view space.
  // This is merely a template function that is required to be overridden.
  onEscape(){} //eslint-disable-line

  // Process is the automatic function that calls the getFrame main
  // function and after updating, queues the next update frame. It will
  // also auto-clear. This function is mostly used for testing a single
  // Ion instance. Most mock-ups of Ion should be done using the getFrame
  process(){
    if(!this.active) return;
    this.clearFrame();
    this.getFrame();
    this.afterDraw();
    if(this.tweenSpeed===1){
      requestAnimationFrame(()=>this.process());
    }else{
      setTimeout(()=>this.process(),this.tweenSpeed);
    } //end if
  }

  // afterDraw function is called after an entire frame has finished rendering
  afterDraw(){} //eslint-disable-line

  // this clears everything on the screen
  clearFrame(){
    if(this.background){
      this.ctx.putImageData(this.background,0,0);
    }else{
      this.ctx.fillStyle=this.clearColor;
      this.ctx.fillRect(0,0,this.viewport.width,this.viewport.height);
    } //end if
  }

  // getFrame is what operates on the tweening functions for the particles,
  // it calls the draw function for each particle after its operations
  getFrame(){
    this.collection.forEach(p=>{
      if(p.imageClear) this.clear(p);
      this.wind(p);
      this.onMove(p);
      if(p.x<0||p.y<0||p.x>this.viewport.width||p.y>this.viewport.height){
        this.onEscape(p);
      } //end if
      if((p.x|0)!==(p.endX|0)) p.x=this.tween(p,'x');
      if((p.y|0)!==(p.endY|0)) p.y=this.tween(p,'y');
      p.tweenCurrent++;
      if(p.tweenCurrent===p.tweenDuration&&p.onEnd)p.onEnd.call(this,p);
      this.draw(p);
    });
  }
} //end class Ion
export default {Ion};


