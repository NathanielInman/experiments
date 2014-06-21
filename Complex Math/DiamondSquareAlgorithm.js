var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);
var mapWidth=70,mapHeight=50;
var map=(function(){
	var map=[],color;
	for(var i=0;i<mapHeight;i++){
		map[i]=[];
		for(var j=0;j<mapWidth;j++){			
			color=random(235);
			map[i][j]=color;
		} //end for
	} //end for
	return map;
})();
var mainLoop=function(x,y){
	var cornerDistance1,cornerDistance2,cornerDistance3,cornerDistance4,
	    cornerWeight1,cornerWeight2,cornerWeight3,cornerWeight4,
		cornerColor1,cornerColor2,cornerColor3,cornerColor4,
		cellWidth=Math.ceil(v.w/mapWidth),cellHeight=Math.ceil(v.h/mapHeight),
		totalWeight,color;
	for(var j=0;j<cellHeight;j++){
		for(var i=0;i<cellWidth;i++){
			cornerDistance1=Math.sqrt(Math.pow(i,2)+Math.pow(j,2));
			cornerDistance2=Math.sqrt(Math.pow(cellWidth-i,2)+Math.pow(j,2));
			cornerDistance3=Math.sqrt(Math.pow(i,2)+Math.pow(cellHeight-j,2));
			cornerDistance4=Math.sqrt(Math.pow(cellWidth-i,2)+Math.pow(cellHeight-j,2));
			totalWeight=cornerDistance1+cornerDistance2+cornerDistance3+cornerDistance4;
			cornerWeight4=cornerDistance1/totalWeight;
			cornerWeight3=cornerDistance2/totalWeight;
			cornerWeight2=cornerDistance3/totalWeight;
			cornerWeight1=cornerDistance4/totalWeight;
			cornerColor1=map[y][x];
			cornerColor2=x<mapWidth-1?map[y][x+1]:0;
			cornerColor3=y<mapHeight-1?map[y+1][x]:0;
			cornerColor4=x<mapWidth-1&&y<mapHeight-1?map[y+1][x+1]:0;
			color=Math.floor(cornerColor1*cornerWeight1+
			      cornerColor2*cornerWeight2+
				  cornerColor3*cornerWeight3+
				  cornerColor4*cornerWeight4);
			ctx.fillStyle='rgb('+color+','+color+','+color+')';
			ctx.fillRect(v.w/mapWidth*x+i,v.h/mapHeight*y+j,1,1);
		} //end for
	} //end for
	ctx.fillStyle='rgb('+map[y][x]+','+map[y][x]+','+map[y][x]+')';
	//ctx.fillRect(v.w/mapWidth*x,v.h/mapHeight*y,5,5);
	if(x<mapWidth-1&&y<=mapHeight-1){
		setTimeout("mainLoop("+(++x)+","+(y)+")",1);
	}else if(y<mapHeight-1){
		setTimeout("mainLoop(0,"+(++y)+")",1);
	} //end if
};
mainLoop(0,0);