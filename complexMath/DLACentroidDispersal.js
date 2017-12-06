var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#161";
curColor=255;
var map=(function(){
	var map=[];
	for(var i=0;i<v.h;i++){
		map[i]=[];
		for(var j=0;j<v.w;j++){
			if(i>v.h/2-2&&i<v.h/2+2&&j>v.w/2-2&&j<v.w/2+2){
				map[i][j]=true;
				ctx.fillRect(j,i,1,1);
			}else{
				map[i][j]=false;
			}//end if
		} //end for
	} //end for
	return map;
})();
var mainLoop=function(highestX,highestY){
	if(curColor>200){curColor-=0.8;
	}else if(curColor>150){curColor-=0.6;
	}else if(curColor>50){curColor-=0.2;
	}else{curColor-=0.05}
	if(curColor<=0)return;
	ctx.fillStyle="rgb("+Math.floor(curColor)+","+Math.floor(curColor)+","+Math.floor(curColor)+")";
	var walker=function(x,y,recur){
		if(recur>200)return;
		var percent=random(100);
		if(x-1>=0&&percent<25&&map[y][x-1]==false){
			ctx.fillRect(x-1,y,1,1);
			map[y][x-1]=true;walker(x-1,y,recur);
		}else if(y+1<v.h&&percent<50&&percent>24&&map[y+1][x]==false){
			ctx.fillRect(x,y+1,1,1);
			map[y+1][x]=true;walker(x,y+1,recur);
		}else if(y-1>=0&&percent<75&&percent>49&&map[y-1][x]==false){
			ctx.fillRect(x,y-1,1,1);
			map[y-1][x]=true;walker(x,y-1,recur);
		}else if(x+1<v.w&&percent<100&&percent>74&&map[y][x+1]==false){
			ctx.fillRect(x+1,y,1,1);
			map[y][x+1]=true;walker(x+1,y,recur);
		}else{
			walker(x,y,recur+1);
		} //end if		
	};
	for(iter=0;iter<400;iter++){
		var x=random(2*(highestX+10),Math.floor(v.w/2-highestX-10)),
		    y=random(2*(highestY+10),Math.floor(v.h/2-highestY-10)),
		    worked=false,n;
		if(y>=0&&x>=0&&x<v.w&&y<v.h&&y+1<v.h&&map[y][x]==false&&map[y+1][x]==true||
		   y>=0&&x>=0&&x<v.w&&y<v.h&&y-1>=0&& map[y][x]==false&&map[y-1][x]==true||
		   y>=0&&x>=0&&x<v.w&&y<v.h&&x+1<v.w&&map[y][x]==false&&map[y][x+1]==true||
		   y>=0&&x>=0&&x<v.w&&y<v.h&&x-1>=0&& map[y][x]==false&&map[y][x-1]==true)worked=true;
		if(worked){
			map[y][x]=true;ctx.fillRect(x,y,1,1);n=walker(x,y,0)
			if(Math.abs(v.h/2-y)>highestY)highestY=Math.floor(Math.abs(v.h/2-y));
			if(Math.abs(v.w/2-x)>highestX)highestX=Math.floor(Math.abs(v.w/2-y));
			//if(highestY==v.h)return;
		}//end if
	} //end for
	setTimeout("mainLoop("+highestX+","+highestY+")",1);
};
mainLoop(0,0);