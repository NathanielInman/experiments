var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.strokeStyle='#FFF';
/***************         Dragon Curve        ********************\
|* LINDENMAYER SYSTEM : G=({"XY","F+-"},FX,{x->X+YF,Y->FX-Y}    *|
\****************************************************************/
var EAST=0,SOUTHEAST=1,SOUTH=2,SOUTHWEST=3,WEST=4,NORTHWEST=5,
    NORTH=6,NORTHEAST=7,LINEWIDTH=3;
var GRAMMAR='FX',o={x:0,y:0};ctx.translate(v.w/4,v.h/5*3);
var mainLoop=function(n){
	ctx.fillRect(-v.w/4,-v.h/5*3,v.w,v.h);
	var NEWGRAMMAR='';
	//n+1, next iteration
	for(var i=0;i<GRAMMAR.length;i++){
		if(GRAMMAR[i]=="X"){
			NEWGRAMMAR+="X+YF";
		}else if(GRAMMAR[i]=="Y"){
			NEWGRAMMAR+="FX-Y";
		}else{
			NEWGRAMMAR+=GRAMMAR[i];
		} //end if
	} //end for
	GRAMMAR=NEWGRAMMAR; //append updated string
	//draw through iteration
	ctx.save();
	ctx.beginPath();ctx.moveTo(o.x,o.y);
	for(var i=0;i<GRAMMAR.length;i++){
		if(GRAMMAR[i]=="-"){ //turn left angle
			ctx.translate(LINEWIDTH,0);ctx.rotate(-1.57079633);
		}else if(GRAMMAR[i]=="+"){ //turn right angle
			ctx.translate(LINEWIDTH,0);ctx.rotate(1.57079633);
		}else if(GRAMMAR[i]=="F"){ //it's drawing that's left
			ctx.lineTo(LINEWIDTH,0);
		} //end if
	} //end for
	ctx.stroke();o={x:0,y:0};
	ctx.restore();
	if(n<15){
		setTimeout("mainLoop("+(++n)+")",1);
	} //end if
};
mainLoop(0);