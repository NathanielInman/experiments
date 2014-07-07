var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#FFF";
//Constants
var a=0.9,b=-0.6013,c=2.0,d=0.5,x=-0.72,y=-0.64,iterations=5000;
var color={cur:255,dir:0};
var dd=0;da=1;db=1;di=1;
var mainLoop=function(cur){
	ctx.fillStyle="rgba(0,0,0,0.05)";ctx.fillRect(0,0,v.w,v.h);
	if(color.dir==0){color.cur--;}else{color.cur++;}
	if(color.cur==255||color.cur==100)color.dir^=1;
	ctx.fillStyle='rgb('+color.cur+','+color.cur+','+color.cur+')'; 
	
	for(var i=cur;i<iterations&&i<cur+5000&&i>=cur-5000;i++){
	if(dd==0){d-=0.0001;}else{d+=0.0001;}
	if(da==0){a-=0.0001;}else{a+=0.0001;}
	if(db==0){b-=0.0001;}else{b+=0.0001;}
	if(d>=0.5||d<=0.1)dd^=1;
	if(a>=0.9||a<=0.3)da^=1;
	if(b<=-0.6013||b>=-0.3)db^=1;
		if(di==0)i-=2;
		var oldX=x,oldY=y;
		x=Math.pow(x,2)-Math.pow(y,2)+a*x+b*y;
		y=2*oldX*y+c*oldX+d*y;
		ctx.fillRect(v.w/2*x+v.w/4*3,v.h/2*y+v.h/4*3,1,1);
	} //end for
	console.log(d+":"+a+":"+b);
	if(i>=iterations||i<=0){di^=1;i--;}
	setTimeout("mainLoop("+i+")",10);
};
mainLoop(0)//start program