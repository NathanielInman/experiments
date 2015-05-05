/**
 * Ion Collection is a library of Ion preconfigured templates. These help in creating
 * particle effects common in many applications.
 *
 * @type {Class} Utilizes the Ion class library ion.js
 * @type {Class} Utilizes the Easel class library easel.js
 */
class IonCollection{
  constructor(){
    this.camera = {
      x:v.w/2,
      y:v.h/2,
      dx:0,dy:0
    };
    this.objects=[];
    this.template={
      fire(name,x,y,width,height,color,quality){
        x=x||0;
        y=y||0;
        width=width||20;
        height=height||100;
        quality=quality||100;
        var
        flame                = new Ion(2*quality);
        flame.clear          = false;
        flame.color          = color||'rgba(250,170,0,0.2)';
        flame.sx             = ()=> this.camera.x+x+r(0,width)-width/2;
        flame.sy             = ()=> this.camera.y+y;
        flame.dx             = ()=> this.camera.x+x;
        flame.dy             = ()=> this.camera.y+y-height;
        flame.wx             = ()=> r(0,0.5)-0.25;
        flame.wy             = ()=> r(0,2)-2;
        flame.tween_type     = ()=> r(10,20,false);
        flame.tween_duration = ()=> r(300,600,false);
        flame.onEscape       = function(){ this.onEnd(atom); }
        flame.onEnd          = function(atom){
          this.particle[atom].x  = this.particle[atom].sx= flame.sx();
          this.particle[atom].y  = this.particle[atom].sy= flame.sy();
          this.particle[atom].dx = flame.dx();
          this.particle[atom].dy = flame.dy();
          this.particle[atom].c  = 0;
        };
        flame.m              = function(atom){
          var p=this.particle[atom];
          var size=(height+width)/4;
          if(p.c>p.d*0.15){ //reset after we reach 15%
            this.onEnd(atom);
          }else{
            p.s=size-size/p.d*p.c;
          } //end if
        };
        flame.populate();
        return flame;
      },
      vortex(name,sx,sy,size,callback){
        sx=sx||0;
        sy=sy||0;
        size=size||300;
        var status            = 200,
        cloud                 = new Ion(status);
        cloud.clear           = false;
        cloud.color           = 'rgba(200,200,255,0.7)';
        cloud.sx              = ()=> this.camera.x+r(-1*size/2,size/2)+sx;
        cloud.sy              = ()=> this.camera.y+r(-1*size/2,size/2)+sy;
        cloud.dx              = ()=> this.camera.x+sx;
        cloud.dy              = ()=> this.camera.y+sy;
        cloud.size            = ()=> r(1,5);
        cloud.tween_type      = ()=> r(19,19,false);
        cloud.tween_duration  = ()=> r(100,200,false);
        cloud.onEnd           = function(atom){
          status--;
          if(status<20&&status>0){
            callback();
            status=-1;
          }else if(status>20){
            this.particle[atom].c--;
          } //end if
        };
        cloud.m               = function(atom){
          this.particle[atom].dx=cloud.dx();
          this.particle[atom].dy=cloud.dy();
        };
        cloud.onCreate        = function(){};
        cloud.populate();
        return cloud;
      },
      laser(name,sx,sy,dx,dy,size){
        var that = this;
        sx=sx||0;
        sy=sy||0;
        dx=dx||100;
        dy=dy||100;
        size=size||10;
        var status          = 200,
        beam                = new Ion(status);
        beam.clear          = false;
        beam.color          = 'rgba(250,250,150,0.5)';
        beam.sx             = ()=> this.camera.x+dx;
        beam.sy             = ()=> this.camera.y+dy;
        beam.dx             = ()=> this.camera.x+dx-size/2+r(size);
        beam.dy             = ()=> this.camera.y+dy-size/2+r(size);
        beam.wx             = ()=> r(0,1.5)-0.75;
        beam.wy             = ()=> r(0,1.5)-0.75;
        beam.size           = ()=> r(2,4);
        beam.tween_type     = ()=> r(10,15,false);
        beam.tween_duration = ()=> r(100,150,false);
        beam.onEscape       = function(atom){ this.onEnd(atom); }
        beam.onEnd          = function(){};
        beam.onCreate       = ()=>status--;
        beam.populate();
        return {
          getFrame(){
            ctx.strokeStyle='rgba(100,100,250,'+0.1/200*status+')';
            ctx.lineWidth=17;
            if(status>0){
              ctx.beginPath();
              ctx.moveTo(that.camera.x+sx+3,that.camera.y+sy);
              ctx.lineTo(that.camera.x+dx+3,that.camera.y+dy);
              ctx.stroke();
              ctx.strokeStyle='#DDF';
              ctx.lineWidth=2;
              ctx.beginPath();
              ctx.moveTo(that.camera.x+sx+3,that.camera.y+sy);
              ctx.lineTo(that.camera.x+dx+3,that.camera.y+dy);
              ctx.stroke();
            } //end if
            beam.getFrame();
          } //end getFrame()
        }; //end return;
      }
    }; //end this.templates
  }
  make(type){
    this.objects.push(this.template[type].apply(this,arguments));
  }
  clearScene(){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
  }
  draw(){
    this.clearScene();
    for(let ion in this.objects){
      this.objects[ion].getFrame();
    } //end for
    setTimeout(()=>{this.draw();},16);
  }
}
