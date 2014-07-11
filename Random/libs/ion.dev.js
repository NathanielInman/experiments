var ion=function(x,y,dx,dy,s,q){
	this.particle=[];
	this.quantity=q||1;
	this.sx=x||0;
	this.sy=y||0;
	this.dx=dx||1;
	this.dy=dy||1;
	this.color='#48F';
	this.size=s||1;
	this.tween_type=30;
	this.tween_current=0;
	this.tween_duration=500;
	this.populate();
	this.process()
};
ion.prototype.ease=function(b,c,t,d,o){
	var t=t||this.tween_current; 
	var d=d||this.tween_duration;
	o=o||0.3;
	if(this.tween_type==0){
		return c*t/d+b;
	}else if(this.tween_type==1){ //ease-in quad
		return c*(t/=d)*t+b;
	}else if(this.tween_type==2){ //ease-out quad
		return -c*(t/=d)*(t-2)+b;
	}else if(this.tween_type==3){ //ease-in-out quad
		return (t/=d/2)<1?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;
	}else if(this.tween_type==4){ //ease-in cubic
		return c*(t/=d)*t*t+b;
	}else if(this.tween_type==5){ //ease-out cubic
		return c*((t=t/d-1)*t*t+1)+b;
	}else if(this.tween_type==6){ //ease-in-out cubic
		return ((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b;
	}else if(this.tween_type==7){ //ease-in quart
		return c*(t/=d)*t*t*t+b;
	}else if(this.tween_type==8){ //ease-out quart
		return -c*((t=t/d-1)*t*t*t-1)+b;
	}else if(this.tween_type==9){ //ease-in-out quart
		return ((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;
	}else if(this.tween_type==10){ //ease-in quint
		return c*(t/=d)*t*t*t*t+b;
	}else if(this.tween_type==11){ //ease-out quint
		return c*((t=t/d-1)*t*t*t*t+1)+b;
	}else if(this.tween_type==12){ //ease-in-out quint
		return ((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b;
	}else if(this.tween_type==13){ //ease-in sine
		return -c*Math.cos(t/d*(Math.PI/2))+c+b;
	}else if(this.tween_type==14){ //ease-out sine
		return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
	}else if(this.tween_type==15){ //ease-in exponential
		return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
	}else if(this.tween_type==16){ //ease-out exponential
		return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
	}else if(this.tween_type==17){ //ease-in-out exponential
		return (t==0)?b:((t==d)?b+c:(((t/=d/2)<1)?c/2*Math.pow(2,10*(t-1))+b:(c/2*(-Math.pow(2,-10*--t)+2)+b)));
	}else if(this.tween_type==18){ //ease-in circular
		return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
	}else if(this.tween_type==19){ //ease-out circular
		return c*Math.sqrt(1-(t=t/d-1)*t)+b;
	}else if(this.tween_type==20){ //ease-in-out circular
		return ((t/=d/2)<1)?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
	}else if(this.tween_type==21){ //ease-in elastic loose
		this.tween_type=22;var result=ion.prototype.ease.call(this,b,c,t,d,0.5);
		this.tween_type=21;return result;
	}else if(this.tween_type==22){ //ease-in elastic normal
	    var s=1.70158;var p=0;var a=c;
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p) p=d*o;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	}else if(this.tween_type==23){ //ease-in elastic strong
		this.tween_type=22;var result=ion.prototype.ease.call(this,b,c,t,d,0.1);
		this.tween_type=23;return result;
	}else if(this.tween_type==24){ //ease-out elastic loose
		this.tween_type=25;var result=ion.prototype.ease.call(this,b,c,t,d,0.5);
		this.tween_type=24;return result;
	}else if(this.tween_type==25){ //ease-out elastic normal
		var s=1.70158,p=0,a=c;
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p) p=d*o;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}else if(this.tween_type==26){ //ease-out elastic strong
		this.tween_type=25;var result=ion.prototype.ease.call(this,b,c,t,d,0.1);
		this.tween_type=26;return result;
	}else if(this.tween_type==27){ //ease-in-out elastic loose
		this.tween_type=28;var result=ion.prototype.ease.call(this,b,c,t,d,0.5);
		this.tween_type=27;return result;
	}else if(this.tween_type==28){ //ease-in-out elastic normal
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;
		if ((t/=d/2)==2) return b+c;
		if (!p) p=d*(o*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}else if(this.tween_type==29){ //ease-in-out elastic strong
		this.tween_type=28;var result=ion.prototype.ease.call(this,b,c,t,d,0.1);
		this.tween_type=27;return result;
	}else if(this.tween_type==30){ //ease-in back
		return c*(t/=d)*t*((1.70158+1)*t - 1.70158) + b;
	}else if(this.tween_type==31){ //ease-out back
		return c*((t=t/d-1)*t*((1.70158+1)*t + 1.70158) + 1) + b;
	}else if(this.tween_type==32){ //ease-in-out back
		var s=1.70158;
		return ((t/=d/2) < 1)?c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	}else if(this.tween_type==33){ //ease-in bounce
		this.tween_type=34;var result=ion.prototype.ease.call(this,0,c,d-t,d);
		this.tween_type=33;return c-result+b;
	}else if(this.tween_type==34){ //ease-out bounce
		if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {	
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;		}
	}else if(this.tween_type==35){ //ease-in-out bounce
		if(t<d/2){
			this.tween_type=33;var result=ion.prototype.ease.call(this,0,c,t*2,d)*.5+b;
			this.tween_type=35;return result;
		}else{
			this.tween_type=34;var result=ion.prototype.ease.call(this,0,c,t*2-d,d)*.5+c*.5+b;
			this.tween_type=35;return result;
		} //end if
	}//end if
};
ion.prototype.populate=function(){
	var that=this;
	this.particle.push({x:this.sx,y:this.sy,c:this.tween_current,d:this.tween_duration,w:r(0,3)-1.5});
	if(this.particle.length<this.quantity)setTimeout(function(){that.populate();},1);
};
ion.prototype.wind=function(element){
	this.particle[element].x+=this.particle[element].w;
};
ion.prototype.draw=function(element){
	ctx.fillRect(this.particle[element].x,this.particle[element].y,this.size,this.size);
};
ion.prototype.process=function(){
	var that=this;
	ctx.fillStyle='#000';
	ctx.fillRect(0,0,v.w,v.h);
	ctx.fillStyle=this.color;
	for(element in this.particle){
		this.particle[element].c++;
		this.wind(element);
		//this.particle[element].x=M.floor(this.particle[element].x)==M.floor(this.dx)?this.particle[element].x:this.ease(this.sx,this.dx-this.sx,this.particle[element].c,this.particle[element].d);
		this.particle[element].y=M.floor(this.particle[element].y)==M.floor(this.dy)?this.particle[element].y:this.ease(this.sy,this.dy-this.sy,this.particle[element].c,this.particle[element].d);
		this.draw(element);
	} //end for
	if(this.particle[this.particle.length-1].c<this.tween_duration)setTimeout(function(){that.process();},1);
};

new ion(v.w/2,v.h/10,v.w/2,v.h/10*9,3,1000);
