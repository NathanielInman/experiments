var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#161";
var map=(function(){
	var map=[];
	for(var i=0;i<v.h;i++){
		map[i]=[];
		for(var j=0;j<v.w;j++){
			if(i==v.h-1){
				map[i][j]=true;
				ctx.fillRect(j,i,1,1);
			}else{
				map[i][j]=false;
			}//end if
		} //end for
	} //end for
	return map;
})();
var mainLoop=function(highestY){
	var walker=function(x,y){
		var percent=random(100);
		if(x-1>=0&&percent<20){
			ctx.fillRect(x-1,y,1,1);
			map[y][x-1]=true;walker(x-1,y);
		}else if(y-1>=0&&percent<70){
			ctx.fillRect(x,y-1,1,1);
			map[y-1][x]=true;walker(x,y-1);
		}else if(x+1<v.w&&percent<90){
			ctx.fillRect(x+1,y,1,1);
			map[y][x+1]=true;walker(x+1,y);
		}else{
			return y;
		} //end if		
	};
	for(iter=0;iter<100;iter++){
		var x=random(v.w),y=random(highestY>50?50:highestY,v.h-highestY-1),worked=false,n;
		if(y+1<v.h&&map[y+1][x]==true||
		   x+1<v.w&&map[y][x+1]==true||
		   x-1>=0&& map[y][x-1]==true)worked=true;
		if(worked){
			if(v.h-y>highestY)highestY=v.h-y;
			map[y][x]=true;
			ctx.fillRect(x,y,1,1);
			n=walker(x,y)
			if(v.h-n>highestY)highestY=v.h-n;
			if(highestY==v.h)return;
		}//end if
	} //end for
	setTimeout("mainLoop("+highestY+")",1);
};
mainLoop(0);