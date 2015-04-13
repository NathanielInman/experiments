var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#F00";
var height=10;
var draw=[{x:0,y:0,w:v.w}];
var pull=function(){ //pull a visible block to draw
	var c=draw.pop();
	ctx.fillRect(c.x,c.y,c.w,height); //draw cur
	if(c.w/3>0.01){ //don't bother drawing if less than 1 pixel
		draw.push({x:c.x,        y:c.y+height+2,w:c.w/3}); //add left next
		draw.push({x:c.x+c.w/3*2,y:c.y+height+2,w:c.w/3}); //add right next
	} //end if
	if(draw.length!=0)setTimeout("pull()",1);
};
pull();