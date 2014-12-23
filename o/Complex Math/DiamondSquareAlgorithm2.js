var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
var random=function(n,p){return (p||0)+Math.random()*n|0;};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);
var map=[],SIZE=200;
var giveSpot=function(i,j){
	map[i-1][j-1]+=5;map[i  ][j-1]+=5;map[i+1][j-1]+=5;
	map[i  ][j  ]+=5;map[i  ][j  ]+=9;map[i+1][j  ]+=5;
	map[i-1][j+1]+=5;map[i  ][j+1]+=5;map[i+1][j+1]+=5;
}; //end giveSpot()
(function(){
	for(var i=0;i<SIZE;i++){map[i]=[];for(var j=0;j<SIZE;j++){map[i][j]=0;}}
	for(var i=0;i<SIZE*SIZE;i++){
		giveSpot(1+random(SIZE-2),1+random(SIZE-2));
	} //end for
	for(var i=0;i<SIZE;i++){for(var j=0;j<SIZE;j++){
		var amt=0,num=0;
		if(i-1>=0){  amt+=map[i-1][j];num++;}
		if(i+1<SIZE){amt+=map[i+1][j];num++;}
		if(j-1>=0){  amt+=map[i][j-1];num++;}
		if(j+1<SIZE){amt+=map[i][j+1];num++;}
		if(i-1>=0  &&j-1>=0  ){amt+=map[i-1][j-1]/2;num+=0.5;}
		if(i+1<SIZE&&j-1>=0  ){amt+=map[i+1][j-1]/2;num+=0.5;}
		if(i-1>=0  &&j+1<SIZE){amt+=map[i-1][j+1]/2;num+=0.5;}
		if(i+1<SIZE&&j+1<SIZE){amt+=map[i+1][j+1]/2;num+=0.5;}
		map[i][j]=Math.floor(amt/num);
	}} //end for*2
	for(var i=0;i<SIZE;i++){for(var j=0;j<SIZE;j++){
		ctx.fillStyle='rgb('+map[i][j]+','+map[i][j]+','+(map[i][j]*2)+')';
		ctx.fillRect(i*v.w/SIZE,j*v.h/SIZE,v.w/SIZE+1,v.h/SIZE+1);
	}} //end for*2
})();