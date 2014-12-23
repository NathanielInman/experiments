var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
var star=[],MAX=800;
var mainLoop=function(){
	ctx.fillStyle="#000";ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#FFF";
	if(star.length<800){
		star.push({x:v.w/2,y:v.h/2,d:Math.random()*Math.PI,t:random(2),s:Math.random()*3});
	} //end if
	for(var i=0;i<star.length;i++){
		if(star[i].t==0){
			star[i].x+=Math.cos(star[i].d);star[i].y+=Math.sin(star[i].d);
		}else{
			star[i].x+=Math.cos(-star[i].d);star[i].y+=Math.sin(-star[i].d);
		} //end if
		if(star[i].x<=0||star[i].x>=v.w){star[i].x=v.w/2;star[i].y=v.h/2;}
		if(star[i].y<=0||star[i].y>=v.h){star[i].x=v.w/2;star[i].y=v.h/2;}
		ctx.fillRect(star[i].x,star[i].y,star[i].s,star[i].s);
	} //end for
	setTimeout("mainLoop()",1);
};
mainLoop();