var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.strokeStyle='#FFF';
/**************     SIERPINSKI TRIANGLE     *******************\
|* LINDENMAYER SYSTEM : G=({"AB","+-"},A,{A->B-A-B,B->A+B+A}) *|
\**************************************************************/
var EAST=0,SOUTHEAST=1,SOUTH=2,SOUTHWEST=3,WEST=4,NORTHWEST=5,
    NORTH=6,NORTHEAST=7,LINEWIDTH=2;
var GRAMMAR='A',o={x:0,y:0};ctx.translate(20,v.h-20);
var mainLoop=function(n){
	ctx.fillRect(-20,-v.h+20,v.w,v.h);
	var NEWGRAMMAR='';
	//n+1, next iteration
	for(var i=0;i<GRAMMAR.length;i++){
		if(GRAMMAR[i]=="A"){
			NEWGRAMMAR+="B-A-B";
		}else if(GRAMMAR[i]=="B"){
			NEWGRAMMAR+="A+B+A";
		}else{
			NEWGRAMMAR+=GRAMMAR[i];
		} //end if
	} //end for
	GRAMMAR=NEWGRAMMAR; //append updated string
	//draw through iteration
	ctx.save();
	ctx.beginPath();ctx.moveTo(o.x,o.y);
	for(var i=0;i<GRAMMAR.length;i++){
		if(GRAMMAR[i]=="+"){ //turn left angle
			ctx.translate(LINEWIDTH,0);ctx.rotate(-1.04719755);
		}else if(GRAMMAR[i]=="-"){ //turn right angle
			ctx.translate(LINEWIDTH,0);ctx.rotate(1.04719755);
		}else{ //it's drawing that's left
			ctx.lineTo(LINEWIDTH,0);
		} //end if
	} //end for
	ctx.stroke();o={x:0,y:0};
	ctx.restore();
	if(n<9){
		setTimeout("mainLoop("+(++n)+")",1);
	} //end if
};
mainLoop(0);