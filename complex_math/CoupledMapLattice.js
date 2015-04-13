var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);
/* Constants */
var systemSize=60,kTimeStep=1,alpha=1.5,epsilon=0.3,
    kTimeStepOnScreen=100,totalTimeStep=1000000,
	processing=true;
// Initialize map
var map1=(function(){
	var map=[];
	for(var i=0;i<systemSize;i++){
		map[i]=2*Math.random()-1;
	} //end for
	return map;
})();
// Assistant function for mapping
var logMap=function(amp,alp){
	return 1-amp*amp*alp;
};
var draw=function(){
	ctx.fillColor="#000";
	ctx.fillRect(0,0,v.w,v.h);
	ctx.strokeStyle="#F00";
	ctx.lineWidth=3;
	ctx.beginPath();
	ctx.moveTo(0,v.h/2);
	for(var i=0;i<systemSize;i++){
		ctx.lineTo(v.w/60*(i+1),(1+map1[i])/2*v.h);
	} //end for
	ctx.stroke();
};
var mainLoop=function(i){
	if(i>=(totalTimeStep/(kTimeStep*kTimeStepOnScreen)))return; //done
	for(var j=0;j<kTimeStepOnScreen;j++){
		//process CML for kTimeStep
		var map2=[]
		for(var k=0;k<kTimeStep;k++){
			//Calculations for Coupling/Diffusion
			map2[0]=(1-epsilon)*logMap(map1[0],alpha)+(epsilon/2)*(logMap(map1[1],alpha));
			map2[systemSize-1]=(1-epsilon)*(logMap(map1[systemSize-1],alpha))+(epsilon/2)*(logMap(map1[systemSize-2],alpha));
			for(var m=1;m<map1.length-1;m++)
				map2[m]=(1-epsilon)*(logMap(map1[m],alpha))+(epsilon/2)*(logMap(map1[m-1],alpha)+logMap(map1[m+1],alpha));
			for(var m=0;m<map1.length;m++)
				map1[m]=map2[m];
		} //end for
		//
	} //end for
	draw();
	setTimeout("mainLoop("+(i+1)+")",100);
};
mainLoop(0);