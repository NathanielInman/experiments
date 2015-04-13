var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);};
var ds=function(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*v.w/size,y*v.h/size,v.w/size,v.h/size);};
ctx.fillStyle='#000';ctx.fillRect(0,0,v.w,v.h);
/* Constants */
var north=0,east=1,south=2,west=3;
var speed = 50;
var size = 50;
var ants = 10;

/* Variables and declarations */
var ant = [],map = [],mapColor = [];
for(var i=0;i<ants;i++){
	ant[i]={
		facing:north, 
		x:(size/2)|0, //place it in the center x
		y:(size/2)|0  //place it in the center y
	}; //end ant
} //end for
for(var i=0;i<size;i++){
	map[i]=[];mapColor[i]=[];
	for(var j=0;j<size;j++){
		/* starting conditions random */
		map[i][j]=0;mapColor[i][j]=0;
	} //end for
} //end for
/* Move Ant Forward 1 Unit */
var moveAnt=function(i){
	var worked=false;
	if(      ant[i].facing==north){
		if(ant[i].y>0){   ant[i].y--;  worked=true;}
	}else if(ant[i].facing==east ){
		if(ant[i].x<size-1){ant[i].x++;worked=true;}
	}else if(ant[i].facing==south){
		if(ant[i].y<size-1){ant[i].y++;worked=true;}
	}else if(ant[i].facing==west ){
		if(ant[i].x>0){   ant[i].x--;  worked=true;}
	} //end if
	return worked;
} //end function
var turnLeft=function(i){
	if(      ant[i].facing==north){ant[i].facing=west;
	}else if(ant[i].facing==west ){ant[i].facing=south;
	}else if(ant[i].facing==south){ant[i].facing=east;
	}else if(ant[i].facing==east ){ant[i].facing=north;}
} //end function
var turnRight=function(i){
	if(      ant[i].facing==north){ant[i].facing=east;
	}else if(ant[i].facing==west ){ant[i].facing=north;
	}else if(ant[i].facing==south){ant[i].facing=west;
	}else if(ant[i].facing==east ){ant[i].facing=south;}
} //end function
/* Timer *TICK */
var tick=function(){
	var t=setTimeout("tick()",speed),color=0
	/* Drawing Directives */
	for(var i=0;i<ants;i++){
		if(map[ant[i].x][ant[i].y]==1){ //90 deg to LEFT, flip square, move forward 1 unit
			turnLeft(i);
			map[ant[i].x][ant[i].y]=0; //flip square
			ds(ant[i].x,ant[i].y,"rgb("+(mapColor[ant[i].x][ant[i].y]+25)+",25,25)");
			if(!moveAnt(i))turnRight(i); //couldn't move ant, turn it again
		}else{ //90 deg to RIGHT, flip square, move forward 1 unit
			turnRight(i);
			map[ant[i].x][ant[i].y]=1; //flip square
			mapColor[ant[i].x][ant[i].y]<155?mapColor[ant[i].x][ant[i].y]+=5:mapColor[ant[i].x][ant[i].y]=255;
			color=mapColor[ant[i].x][ant[i].y]+50						
			ds(ant[i].x,ant[i].y,"rgb("+color+","+color+","+color+")");
			if(!moveAnt(i))turnLeft(i); //couldn't move ant, turn it again
		} //end if
		ds(ant[i].x,ant[i].y,"rgb(50,100,50)");
	} //end for
} //end function
tick();