var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#A74';ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle='#000';
var d=0,r=8;
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
	var walker=function(x,y,recur){
		var percent=random(100);
		if(recur>150)return;
		if(x-1>=0&&percent<30){
			ctx.fillRect(x-1,y,1,1);
			map[y][x-1]=true;walker(x-1,y,recur+1);
			return y;
		}else if(y-1>=0&&percent<40&&percent>29){
			ctx.fillRect(x,y-1,1,1);
			map[y-1][x]=true;walker(x,y-1,recur+1);
			return y;
		}else if(x+1<v.w&&percent<70&&percent>39){
			ctx.fillRect(x+1,y,1,1);
			map[y][x+1]=true;walker(x+1,y,recur+1);
			return y;
		}else if(y+1<v.h&&recur>69&&percent<100){
			ctx.fillRect(x,y+1,1,1);
			map[y+1][x]=true;walker(x,y+1,recur+1);
		}else{
			walker(x,y,recur+1);
		} //end if		
	};
	var walker2=function(x,y,recur){
		var percent=random(100);
		if(recur>150)return;
		if(x-1>=0&&percent<40){
			ctx.fillRect(x-1,y,1,1);
			map[y][x-1]=true;walker2(x-1,y,recur+1);
			return y;
		}else if(x+1<v.w&&percent<80&&percent>39){
			ctx.fillRect(x+1,y,1,1);
			map[y][x+1]=true;walker2(x+1,y,recur+1);
			return y;
		}else if(y+1<v.h&&recur>50){
			ctx.fillRect(x,y+1,1,1);
			map[y+1][x]=true;walker2(x,y+1,recur+1);
		}else{
			walker2(x,y,recur+1);
		} //end if		
	};
	for(iter=0;iter<100;iter++){
		var x=random(v.w),
		    y=random(highestY>5?5:highestY,v.h-highestY-1),
			worked=false,n;
		if(d==1)y=random(highestY>50?50:highestY,v.h-highestY-1);
		if(y+1<v.h&&map[y][x]==false&&map[y+1][x]==true||
		   x+1<v.w&&map[y][x]==false&&map[y][x+1]==true||
		   x-1>=0&& map[y][x]==false&&map[y][x-1]==true)worked=true;
		if(worked){
			if(v.h-y>highestY)highestY=v.h-y;
			map[y][x]=true;
			ctx.fillRect(x,y,1,1);
			if(highestY<v.h/2&&d==0){
				n=walker(x,y,0);
			}else{
				n=walker2(x,y,0);highestY--;d=1;
				if(highestY<v.h/4&&r>0){
					highestY=Math.floor(v.h/2);r--
					if(r==0){
						for(var j=0;j<v.w;j++){
							r=random(15,20);
							ctx.fillRect(j,v.h-r,1,r);
							r=0;
						} //end for
					} //end if
				}
			} //end if
			if(v.h-n>highestY)highestY=v.h-n;
			if(highestY<2){
				return;
			} //end if
		}//end if
	} //end for
	setTimeout("mainLoop("+highestY+")",1);
};
mainLoop(1);