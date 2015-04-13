var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#161";
var xmin=-2,xmax=1,ymin=-1,ymax=1,iterations=1000;
var Mandeliter=function(cx,cy,maxiter){
	var x=0.0,y=0.0,tmp=0;
	for(var i=0;i<maxiter&&x*x+y*y<=4;++i){
		tmp=2*x*y;
		x=x*x-y*y+cx;
		y=tmp+cy;
	} //end for
	return i;
}; 
var mainLoop=function(cur){
	for(var ix=cur;ix<cur+1&&ix<v.w;++ix){
		for(var iy=0;iy<v.h;++iy){
			var x=xmin+(xmax-xmin)*ix/(v.w-1);
			var y=ymin+(ymax-ymin)*iy/(v.h-1);
			var i=Mandeliter(x,y,iterations);
			if(i==iterations){
				ctx.fillStyle="#000";
			}else{
				var c=3*Math.log(i)/Math.log(iterations-1.0);
				if(c<1){
					ctx.fillStyle="rgb(0,0,"+Math.floor(255*c)+")";
				}else if(c<2){
					ctx.fillStyle="rgb(0,"+Math.floor(255*c)+",255)";
				}else{
					ctx.fillStyle="rgb("+Math.floor(255*(c-2))+",255,255)";
				} //end if
			} //end if
			ctx.fillRect(ix,iy,3,3);
		} //end for
	} //end for
	if(ix<v.w)setTimeout("mainLoop("+ix+")",1);
};
mainLoop(0);