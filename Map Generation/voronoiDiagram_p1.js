var $=function(e){return document.getElementById(e);};
var v=(function(){var e=window,a='inner';if(!('innerWidth' in window)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};})();
var ctx = $('canvas').getContext("2d");
$('canvas').setAttribute("width",v.w+'px');$('canvas').setAttribute("height",v.h+'px');
ctx.font="900 20px Courier New";var ctx = $('canvas').getContext("2d");
var particle={
	max:{
		row:10,
		col:10
	},
	size:5
};
loop=function(){
	var dots=[];
	ctx.fillStyle="#000";ctx.fillRect(0,0,v.w,v.h);ctx.fillStyle="#FFF";
	var rx,ry;
	for(var j=0;j<particle.max.col;j++){	
		for(var i=0;i<particle.max.row;i++){
			rx=1/particle.max.col*i+Math.random()/particle.max.col;
			ry=1/particle.max.row*j+Math.random()/particle.max.row;
			dots.push({x:rx,y:ry,c:false,f:-1,c2:false,f2:-1});
			ctx.fillRect(rx*v.w,ry*v.h,particle.size,particle.size);
		} //end for
	} //end for
	/* Iterate through dots and connect them together p1*/
	ctx.strokeStyle="#0F0";
	for(var i=0,lowestId,lowestAmt,curAmt,empty=particle.max.row*particle.max.col+1;
	    i<dots.length;
		i++
		){ 
		lowestId=empty;lowestAmt=100;
		for(var j=0;j<dots.length;j++){
			curAmt=Math.sqrt(Math.pow(dots[j].x-dots[i].x,2)+Math.pow(dots[j].y-dots[i].y,2));
			/* Ensure that the closest neighbor isn't itself */
			if(j!=i&&j!=dots[i].f&&curAmt<0.15){
				if(curAmt<lowestAmt&&!dots[j].c||
				   lowestId==empty&&!dots[j].c){
					lowestAmt=curAmt;lowestId=j;
				} //end if
			} //end if
		} //end for
		if(lowestId!=empty){
			console.log(lowestAmt);
			ctx.beginPath();
			ctx.moveTo(dots[i].x*v.w|0,dots[i].y*v.h|0);
			ctx.lineTo(dots[lowestId].x*v.w|0,dots[lowestId].y*v.h|0);
			ctx.stroke();
			dots[lowestId].c=true; //dot is connected already
			dots[lowestId].f=i; //apply imprint of who marked it
		} //end if
	} //end for
	/* Iterate through dots and connect them together p2*/
	ctx.strokeStyle="#00F";
	for(var i=0,lowestId,lowestAmt,curAmt,empty=particle.max.row*particle.max.col+1;
	    i<dots.length;
		i++
		){ 
		lowestId=empty;lowestAmt=100;
		for(var j=0;j<dots.length;j++){
			curAmt=Math.sqrt(Math.pow(dots[j].x-dots[i].x,2)+Math.pow(dots[j].y-dots[i].y,2));
			/* Ensure that the closest neighbor isn't itself */
			if(j!=i&&i!=dots[j].f&&i!=dots[j].f2
			   &&j!=dots[i].f
			   &&curAmt<0.15){
				if(curAmt<lowestAmt&&!dots[j].c2||
				   lowestId==empty&&!dots[j].c2){
					lowestAmt=curAmt;lowestId=j;
				} //end if
			} //end if
		} //end for
		if(lowestId!=empty){
			console.log(lowestAmt);
			ctx.beginPath();
			ctx.moveTo(dots[i].x*v.w|0,dots[i].y*v.h|0);
			ctx.lineTo(dots[lowestId].x*v.w|0,dots[lowestId].y*v.h|0);
			ctx.stroke();
			dots[lowestId].c2=true; //dot is connected already
			dots[lowestId].f2=i; //apply imprint of who marked it
		} //end if
	} //end for
	setTimeout("loop()",500);
};
window.addEventListener('resize',function(){
	v=(function(){var e=window,a='inner';if(!('innerWidth' in window)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};})();
	$('canvas').setAttribute("width",v.w+'px');$('canvas').setAttribute("height",v.h+'px');
	ctx.fillStyle="#FFF";ctx.lineWidth=2; //when canvas is resized, all context variables are lost
});
loop();