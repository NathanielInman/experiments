var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);
var a=3.1,D=0,nmax=20;

var points={
	max:500,
	step:20,
	atom:[],
	grid:(function(){
		var grid=[];
		for(var i=0;i<10;i++){grid[i]=[];
		for(var j=0;j<10;j++){grid[i][j]=0;}}
		return grid;
	})(),
	initialize:function(){
		var rx,ry;
		for(var i=0;i<points.max;i++){
			rx=random(100);ry=random(100);
			points.atom.push({x:rx,y:ry});
			points.grid[(ry/10)|0][(rx/10)|0]++;
		} //end for
	},
	draw:function(){
		colors=['#100','#200','#300','#400','#500','#600','#700','#900','#B00','#D00'];
		for(var y=0;y<10;y++){
			for(var x=0;x<10;x++){
				if(points.grid[y][x]<10)ctx.fillStyle=colors[points.grid[y][x]];
				else{ctx.fillStyle='#F00';}
				ctx.fillRect(v.w/10*x,v.h/10*y,v.w/10,v.h/10);
			} //end for
		} //end for
		ctx.fillStyle="rgba(0,0,0,0.3)";
		for(var i=0;i<points.atom.length;i++){
			ctx.fillRect(v.w/100*points.atom[i].x,v.h/100*points.atom[i].y,v.w/100,v.h/100);
		} //end for
	}
};
var nextWave=function(){
	for(var i=0;i<points.step;i++){
		points.grid[(points.atom[0].y/10)|0][(points.atom[0].x/10)|0]--;
		points.atom.shift();
		rx=random(100);ry=random(100);
		points.atom.push({x:rx,y:ry});
		points.grid[(ry/10)|0][(rx/10)|0]++;
	} //end for
	points.draw();
	setTimeout("nextWave()",100);
};
(function(){
	var rx,ry;
	points.initialize();
	points.draw();
	nextWave();
})();