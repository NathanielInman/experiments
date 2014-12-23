
var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();core.map.draw();};
var r=function(n,m){return (m||0)+Math.random()*n|0;};
var core=new (function(){ //call new so we're not building on the window scope
	var _=this; //retain core scope through the underscore
	_.sector=function(x,y){
		this.wall= Math.random()<0.05?1:0;
		this.floor=Math.random()<1?1:0;
		this.active=false;
		if(this.floor==0){
			(function(){
				var startColor=100+r(105);
				_.water.push({x:x,y:y,cur:startColor,max:startColor,dir:r(2)});
			})();
		} //end if
	};
	_.water=[];
	_.map={
		width:300,
		height:250,
		sector:[],
		generate:function(){
			for(var i=0;i<_.map.width;i++){
				_.map.sector[i]=[];
				for(var j=0;j<_.map.height;j++){
					_.map.sector[i][j]=new _.sector(i,j);
				} //end for
			} //end for
		}, //end generate()
		draw:function(i,j){
			var ci=i,cj=j;i=i||0,j=j||0; //initialize if necessary
			for(;j<_.map.height-1&&j<cj+_.map.height+1;j++){
				if(i==0&&j==0){ctx.fillStyle="#070";ctx.fillRect(0,0,v.w,v.h);}
				if(_.map.sector[i][j].wall){ctx.fillStyle="#333";
				}else if(_.map.sector[i][j].floor){ctx.fillStyle="#0"+parseInt(r(3,6),16)+"0";
				}else{ctx.fillStyle="#00F";}
				if(ctx.fillStyle!='#070'&&ctx.fillStyle!="#00F"){
					ctx.fillRect(i*v.w/_.map.width,j*v.h/_.map.height,v.w/_.map.width+1,v.h/_.map.height+1);
					if(_.map.sector[i][j].wall){
						ctx.fillStyle="#888";
						ctx.fillRect(i*v.w/_.map.width+v.w/_.map.width*.1,j*v.h/_.map.height+v.h/_.map.height*.1,v.w/_.map.width*.8,v.h/_.map.height*.8);
					} //end if
				} //end if
				_.map.sector[i][j].active=true;
			} //end for
			if(i<_.map.width-1){
				if(j<_.map.height-1){
					setTimeout("core.map.draw("+i+","+j+")",1);
				}else{
					setTimeout("core.map.draw("+(i+1)+")",1);
				} //end if
			}else if(j<_.map.height-1){
				setTimeout("core.map.draw("+i+","+(j+1)+")",1);
			}//end if
		} //end draw()
	}; //end map
	return this;
})();
(function(){
	core.map.generate();
	core.map.draw();
	setInterval(function(){
		var water=core.water; //grab an easier reference to the water
		for(var i=0;i<water.length;i++){
			if(!core.map.sector[water[i].x][water[i].y].active)continue;
			if(water[i].dir==0){water[i].cur--;}else{water[i].cur++;}
			if(water[i].max-50==water[i].cur||water[i].max+50==water[i].cur)water[i].dir^=1;
			ctx.fillStyle="rgb(0,0,"+water[i].cur+')';
			ctx.fillRect(water[i].x*v.w/core.map.width,water[i].y*v.h/core.map.height,v.w/core.map.width+1,v.h/core.map.height+1);
		} //end for
	},10);
})();