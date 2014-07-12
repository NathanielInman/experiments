var Ion=function(q,s,x,y,dx,dy){
	this.particle=[];
	this.clear=true;
	this.quantity=q||1;
	this.sx=x||0;
	this.sy=y||0;
	this.dx=dx||1;
	this.dy=dy||1;
	this.wx=0;
	this.wy=0;
	this.color='#48F';
	this.size=s||1;
	this.tween_type=0;
	this.tween_current=0;
	this.tween_duration=1000;
};
Ion.prototype.ease=function(b,c,t,d,o,type){
	if(type==0){
		return c*t/d+b;
	}else if(type==1){ //ease-in quad
		return c*(t/=d)*t+b;
	}else if(type==2){ //ease-out quad
		return -c*(t/=d)*(t-2)+b;
	}else if(type==3){ //ease-in-out quad
		return (t/=d/2)<1?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;
	}else if(type==4){ //ease-in cubic
		return c*(t/=d)*t*t+b;
	}else if(type==5){ //ease-out cubic
		return c*((t=t/d-1)*t*t+1)+b;
	}else if(type==6){ //ease-in-out cubic
		return ((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b;
	}else if(type==7){ //ease-in quart
		return c*(t/=d)*t*t*t+b;
	}else if(type==8){ //ease-out quart
		return -c*((t=t/d-1)*t*t*t-1)+b;
	}else if(type==9){ //ease-in-out quart
		return ((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;
	}else if(type==10){ //ease-in quint
		return c*(t/=d)*t*t*t*t+b;
	}else if(type==11){ //ease-out quint
		return c*((t=t/d-1)*t*t*t*t+1)+b;
	}else if(type==12){ //ease-in-out quint
		return ((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b;
	}else if(type==13){ //ease-in sine
		return -c*Math.cos(t/d*(Math.PI/2))+c+b;
	}else if(type==14){ //ease-out sine
		return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
	}else if(type==15){ //ease-in exponential
		return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
	}else if(type==16){ //ease-out exponential
		return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
	}else if(type==17){ //ease-in-out exponential
		return (t==0)?b:((t==d)?b+c:(((t/=d/2)<1)?c/2*Math.pow(2,10*(t-1))+b:(c/2*(-Math.pow(2,-10*--t)+2)+b)));
	}else if(type==18){ //ease-in circular
		return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
	}else if(type==19){ //ease-out circular
		return c*Math.sqrt(1-(t=t/d-1)*t)+b;
	}else if(type==20){ //ease-in-out circular
		return ((t/=d/2)<1)?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
	}else if(type==21){ //ease-in elastic loose
		return Ion.prototype.ease.call(this,b,c,t,d,0.5,22);
	}else if(type==22){ //ease-in elastic normal
	    var s=1.70158;var p=0;var a=c;
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p) p=d*o;
		if (a < Math.abs(c+0.1)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	}else if(type==23){ //ease-in elastic strong
		return Ion.prototype.ease.call(this,b,c,t,d,0.1,22);
	}else if(type==24){ //ease-out elastic loose
		return Ion.prototype.ease.call(this,b,c,t,d,0.5,25);
	}else if(type==25){ //ease-out elastic normal
		var s=1.70158,p=0,a=c;
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p) p=d*o;
		if (a < Math.abs(c+0.1)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}else if(type==26){ //ease-out elastic strong
		return Ion.prototype.ease.call(this,b,c,t,d,0.1,25);
	}else if(type==27){ //ease-in-out elastic loose
		return Ion.prototype.ease.call(this,b,c,t,d,0.5,28);
	}else if(type==28){ //ease-in-out elastic normal
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;
		if ((t/=d/2)==2) return b+c;
		if (!p) p=d*(o*1.5);
		if (a < Math.abs(c+0.1)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}else if(type==29){ //ease-in-out elastic strong(b,c,t,d,o,type)
		return Ion.prototype.ease.call(this,b,c,t,d,0.1,28);
	}else if(type==30){ //ease-in back
		return c*(t/=d)*t*((1.70158+1)*t - 1.70158) + b;
	}else if(type==31){ //ease-out back
		return c*((t=t/d-1)*t*((1.70158+1)*t + 1.70158) + 1) + b;
	}else if(type==32){ //ease-in-out back
		var s=1.70158;
		return ((t/=d/2) < 1)?c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	}else if(type==33){ //ease-in bounce
		return c-Ion.prototype.ease.call(this,0,c,d-t,d,0,34)+b;
	}else if(type==34){ //ease-out bounce
		if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {	
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;		}
	}else if(type==35){ //ease-in-out bounce
		if(t<d/2){
			return Ion.prototype.ease.call(this,0,c,t*2,d,0,33)*.5+b;
		}else{
			return Ion.prototype.ease.call(this,0,c,t*2-d,d,0,34)*.5+c*.5+b;
		} //end if
	}//end if
};
Ion.prototype.getNew=function(atom){
	return {
		id:atom, //be able to reference each particle individually outside of the class
		sx:typeof this.sx=='function'?this.sx():this.sx,
		sy:typeof this.sy=='function'?this.sy():this.sy,
		x:typeof this.sx=='function'?this.sx():this.sx,
		y:typeof this.sy=='function'?this.sy():this.sy,
		dx:typeof this.dx=='function'?this.dx():this.dx,
		dy:typeof this.dy=='function'?this.dy():this.dy,
		c:typeof this.tween_current=='function'?this.tween_current():this.tween_current,
		d:typeof this.tween_duration=='function'?this.tween_duration():this.tween_duration,
		tt:typeof this.tween_type=='function'?this.tween_type():this.tween_type,
		s:typeof this.size=='function'?this.size():this.size,
		wx:typeof this.wx=='function'?this.wx():this.wx,
		wy:typeof this.wy=='function'?this.wy():this.wy
	};
};
Ion.prototype.reset=function(atom){
	this.particle[atom].x=this.particle[atom].sx=typeof this.sx=='function'?this.sx():this.sx;
	this.particle[atom].y=this.particle[atom].sy=typeof this.sy=='function'?this.sy():this.sy;
	this.particle[atom].dx=typeof this.dx=='function'?this.dx():this.dx;
	this.particle[atom].dy=typeof this.dy=='function'?this.dy():this.dy;
	this.particle[atom].c=0;
};
Ion.prototype.populate=function(){
	var that=this;
	this.particle.push(this.getNew(this.particle.length));
	if(this.particle.length<this.quantity)setTimeout(function(){that.populate();},1);
};
Ion.prototype.wind=function(atom){
	this.particle[atom].dx+=this.particle[atom].wx;
	this.particle[atom].dy+=this.particle[atom].wy;
	this.particle[atom].sx+=this.particle[atom].wx;
	this.particle[atom].sy+=this.particle[atom].wy;
};
Ion.prototype.draw=function(atom){
	ctx.fillRect(this.particle[atom].x,this.particle[atom].y,this.particle[atom].s,this.particle[atom].s);
};
Ion.prototype.onEnd=function(){};
Ion.prototype.onEscape=function(){};
Ion.prototype.process=function(){
	var that=this,p;
	if(this.clear){
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,v.w,v.h);
	} //end if
	ctx.fillStyle=this.color;
	for(atom in this.particle){
		p=this.particle[atom]; //reference to clean up code
		if(p.c==p.d)continue; //skip a done movement process
		this.wind(atom);
		this.draw(atom);
		if(p.x<0||p.y<0||p.x>v.w||p.y>v.h)this.onEscape(atom);
		p.c++; //increment the current iteration of the tween by one
		if(p.c==p.d)this.onEnd(atom); //movement process finished
		if(M.floor(p.x)!==M.floor(p.dx))p.x=this.ease(p.sx,p.dx-p.sx,p.c,p.d,0.3,p.tt);
		if(M.floor(p.y)!==M.floor(p.dy))p.y=this.ease(p.sy,p.dy-p.sy,p.c,p.d,0.3,p.tt);
	} //end for
	setTimeout(function(){that.process();},1);
};