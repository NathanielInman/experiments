/**
 * Ion Collection is a library of Ion preconfigured templates. These help in creating
 * particle effects common in many applications.
 * 
 * @type {Class} Utilizes the Ion class library ion.js
 * @type {Class} Utilizes the Easel class library easel.js
 */
var IonCollection=function(){
	var _=this;
	_.camera={
		x:v.w/2,
		y:v.h/2,
		dx:0,dy:0
	};
	_.template={
		fire:function(name,x,y,width,height,color,quality){
		 	x=x||0;
		 	y=y||0;
		 	width=width||20;
		 	height=height||100;
		 	quality=quality||100;
		 	var flame            = new Ion(2*quality);
		 	flame.clear          = false;
			flame.color          = color||'rgba(250,170,0,0.2)';
			flame.sx             = function(){return _.camera.x+x+r(0,width)-width/2;};
			flame.sy             = function(){return _.camera.y+y;};
			flame.dx             = function(){return _.camera.x+x;};
			flame.dy             = function(){return _.camera.y+y-height;};
			flame.wx             = function(){return r(0,0.5)-0.25;};
			flame.wy             = function(){return r(0,2)-2;};
			flame.tween_type     = function(){return r(10,20,false);};
			flame.tween_duration = function(){return r(300,600,false);};
			flame.onEscape       = function(atom){this.onEnd(atom);};
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
		vortex:function(name,sx,sy,size,callback){
			sx=sx||0;
			sy=sy||0;
			size=size||300;
			var status=200;
			var cloud = new Ion(status);
			cloud.clear=false;
			cloud.color='rgba(200,200,255,0.7)';
			cloud.sx=function(){return _.camera.x+r(-1*size/2,size/2)+sx;};
			cloud.sy=function(){return _.camera.y+r(-1*size/2,size/2)+sy;};
			cloud.dx=function(){return _.camera.x+sx;};
			cloud.dy=function(){return _.camera.y+sy;};
			cloud.size=function(){return r(1,5);};
			cloud.tween_type=function(){return r(19,19,false);};
			cloud.tween_duration=function(){return r(100,200,false);};
			cloud.onEnd=function(atom){status--;
				status--;
				if(status<20&&status>0){
					callback();
					status=-1;
				}else if(status>20){
					this.particle[atom].c--;
				} //end if
			};
			cloud.m=function(atom){
				this.particle[atom].dx=cloud.dx();
				this.particle[atom].dy=cloud.dy();
			};
			cloud.onCreate=function(){};
			cloud.populate();
			return cloud;
		},
		laser:function(name,sx,sy,dx,dy,size){
			sx=sx||0;
			sy=sy||0;
			dx=dx||100;
			dy=dy||100;
			size=size||10;
			var status=200;
			var beam = new Ion(status);
			beam.clear=false;
			beam.color='rgba(250,250,150,0.5)';
			beam.sx=function(){return _.camera.x+dx;};
			beam.sy=function(){return _.camera.y+dy;};
			beam.dx=function(){return _.camera.x+dx-size/2+r(size);};
			beam.dy=function(){return _.camera.y+dy-size/2+r(size);};
			beam.wx=function(){return r(0,1.5)-0.75;};
			beam.wy=function(){return r(0,1.5)-0.75;};
			beam.size=function(){return r(2,4);};
			beam.tween_type=function(){return r(10,15,false);};
			beam.tween_duration=function(){return r(100,150,false);};
			beam.onEscape=function(atom){this.onEnd(atom);};
			beam.onEnd=function(){};
			beam.onCreate=function(){status--;};
			beam.m=function(atom){};
			beam.populate();
			return {getFrame:function(){
				ctx.strokeStyle='rgba(100,100,250,'+0.1/200*status+')';
				ctx.lineWidth=17;
				if(status>0){
					ctx.beginPath();
					ctx.moveTo(_.camera.x+sx+3,_.camera.y+sy);
					ctx.lineTo(_.camera.x+dx+3,_.camera.y+dy);
					ctx.stroke();
					ctx.strokeStyle='#DDF';
					ctx.lineWidth=2;
					ctx.beginPath();
					ctx.moveTo(_.camera.x+sx+3,_.camera.y+sy);
					ctx.lineTo(_.camera.x+dx+3,_.camera.y+dy);
					ctx.stroke();
				}
				beam.getFrame();
			}};
		}
	};
	_.objects=[];
	_.make=function(type){
		_.objects.push(_.template[type].apply(this,arguments));
	};
	_.clearScene=function(){
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,v.w,v.h);
	};
	_.activate=function activate(){
		_.clearScene();
		for(ion in _.objects){
			_.objects[ion].getFrame();
		}
		setTimeout(function(){
			activate();
		},1);
	};
};