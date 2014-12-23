var v,w=function(){var e=window,a='inner';if(!(e.innerWidth)){a='client';e=document.documentElement||document.body;}return {w:e[a+'Width'],h:e[a+'Height']};},v=w();
var $=function(o){return document.getElementById(o);};
var sa=function(o,a){for(var i=0;i<a.length;i++){$(o).setAttribute(a[i][0],a[i][1]);}};
var ctx,r=function(){ctx=$('canvas').getContext("2d");},q=function(){sa('canvas',[['width',v.w+'px'],['height',v.h+'px']]);};q();r();
window.onresize=function(){v=w();r();q();core.map.draw();};
var r=function(n,m){return Math.random()*n|0+(m||0);};
var core=new (function(){
	var that=this; //retain the scope of core
	this.sector={
		type:{
			wall: {color:function() {return '#'+r(3,3)+r(3,5)+r(3)}},
			floor:{color:function(i){if(!i)i=0;return '#'+(1+r(2,i))+(i+1+r(3))+r(1);}},
			water:{color:function(i){if(!i)i=0;return '#'+r(3)+r(3)+r(3,5+i);}},
		},
		generate:function(){
			this.wall=r(100)<15?1:0; //true or false indicates wall 
			this.wallColor=that.sector.type.wall.color();
			this.floor=r(100)<99?1:0; //true or false indicates floor
			this.floorColor=this.floor?that.sector.type.floor.color():that.sector.type.water.color(); 
			this.actor=0; //this is the actor identification number (0=player)
		}
	};

	this.actor=function(actorID){
		var thisActor=this; //retain the scope of this actor
		this.x=0;
		this.y=0;
		this.id=actorID;
		(function(){ //scope in the activation block
			do{
				thisActor.x=r(that.map.width);
				thisActor.y=r(that.map.height);
			}while(that.map.sector[thisActor.x][thisActor.y].wall);
			that.map.sector[thisActor.x][thisActor.y].actor=actorID||0;
		})();
	};
	this.actor.prototype.move=function(direction){
		var n=function(x,y){return x>=0&&y>=0&&x<that.map.width&&y<that.map.height&&np(x,y)?that.map.sector[x][y]:{wall:1};};
		var np=function(x,y){return !(x==that.player.x&&y==that.player.y);},s,m=that.map.sector;
		if(this.id){
			that.ui.draw.actor(this.id-1,m[this.x][this.y].floorColor);
		}else{
			that.ui.draw.player(m[this.x][this.y].floorColor);
		} //end if
		m[this.x][this.y].actor=0;		
		if(direction=='north'){
			s=n(this.x,this.y-1);this.y-=!s.wall&&s.floor&&!s.actor?1:0;
		}else if(direction=='east'){
			s=n(this.x+1,this.y);this.x+=!s.wall&&s.floor&&!s.actor?1:0;
		}else if(direction=='south'){
			s=n(this.x,this.y+1);this.y+=!s.wall&&s.floor&&!s.actor?1:0;
		}else if(direction=='west'){
			s=n(this.x-1,this.y);this.x-=!s.wall&&s.floor&&!s.actor?1:0;
		} //end if
		m[this.x][this.y].actor=this.id-1;
		if(this.id){
			that.ui.draw.actor(this.id-1);
			console.log('Actor '+this.id+' moved '+direction);
		}else{
			that.ui.draw.player();
			console.log('Player moved '+direction);
		} //end if
	};
	this.mob = {
		list: [], //holds all of the actors that are mobs
		intialize: function(n){ //initialize the mobs with a specified number
			for(var i=0;i<n;i++){
				that.mob.list.push(new that.actor(i+1));
			}
		},
		move:function(){
			for(var i=0,d=r(4),o=that.mob.list;i<o.length;i++,d=r(4)){
				if(d==0){o[i].move('north');
				}else if(d==1){o[i].move('east');
				}else if(d==2){o[i].move('south');
				}else if(d==3){o[i].move('west');
				} //end if
			} //end for
		}
	};
	this.tick=function(){
		that.mob.move();
		core.map.draw(0.3);
		setTimeout("core.tick()",1000);
	};
	this.ui={
		draw:{
			actor:function(i,overrideColor){
				ctx.fillStyle=overrideColor||"#833";
				if(!overrideColor){
					ctx.fillRect(1+that.mob.list[i].x*v.w/that.map.width,1+that.mob.list[i].y*v.h/that.map.height,v.w/that.map.width-2,v.h/that.map.height-2);
				}else{
					ctx.fillRect(that.mob.list[i].x*v.w/that.map.width,that.mob.list[i].y*v.h/that.map.height,v.w/that.map.width,v.h/that.map.height);
				} //end if
			},
			player:function(overrideColor){
				ctx.fillStyle=overrideColor||"#0F0";
				ctx.fillRect(2+that.player.x*v.w/that.map.width,2+that.player.y*v.h/that.map.height,v.w/that.map.width-4,v.h/that.map.height-4);
			}
		}
	};
	this.trees=[];
	this.map={
		width:15,
		height:9,
		sector:[], //this is a multidimensional array holding all sectors
		generate:function(){
			for(var x=0;x<that.map.width;x++){
				that.map.sector[x]=[];
				for(var y=0;y<that.map.height;y++){
					that.map.sector[x][y]=new that.sector.generate();
				}
			}
		},
		draw: function(alpha){
			for(var x=0;x<that.map.width;x++){
				for(var y=0,type=that.sector.type;y<that.map.height;y++){
					if(that.map.sector[x][y].floor){
						ctx.fillStyle=that.map.sector[x][y].floorColor;
					}else{ // water
						ctx.fillStyle=that.map.sector[x][y].floorColor;
					}
					ctx.fillRect(x*v.w/that.map.width,y*v.h/that.map.height,v.w/that.map.width+1,v.h/that.map.height+1);
					if(that.map.sector[x][y].wall){
						that.trees.push({x:x,y:y});
					} //end if
				} //end for
			} //end for
			ctx.globalAlpha=alpha;
			for(var x=0;x<that.map.width;x++){
				for(var y=0;y<that.map.height;y++){
					if(x+1<that.map.width){
						ctx.strokeStyle=that.map.sector[x+1][y].floorColor;
					}else{
						ctx.strokeStyle=that.map.sector[x-1][y].floorColor;
					} //end if
					ctx.beginPath();ctx.lineWidth=5;
					ctx.moveTo(x*v.w/that.map.width+v.w/that.map.width-5,
							   y*v.h/that.map.height+5);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-5,
							   y*v.h/that.map.height+v.h/that.map.height-5);
					ctx.stroke();ctx.lineWidth=3;
					ctx.moveTo(x*v.w/that.map.width+v.w/that.map.width-13,
							   y*v.h/that.map.height+13);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-13,
							   y*v.h/that.map.height+v.h/that.map.height-13);		   
					ctx.stroke();
					if(x-1>=0){
						ctx.strokeStyle=that.map.sector[x-1][y].floorColor;
					}else{
						ctx.strokeStyle=that.map.sector[x+1][y].floorColor;
					} //end if
					ctx.beginPath();ctx.lineWidth=5;
					ctx.moveTo(x*v.w/that.map.width+5,
							   y*v.h/that.map.height+5);
					ctx.lineTo(x*v.w/that.map.width+5,
							   y*v.h/that.map.height+v.h/that.map.height-5);
					ctx.stroke();ctx.lineWidth=3;
					ctx.moveTo(x*v.w/that.map.width+13,
							   y*v.h/that.map.height+13);
					ctx.lineTo(x*v.w/that.map.width+13,
							   y*v.h/that.map.height+v.h/that.map.height-13);
					ctx.stroke();
					if(y+1<that.map.height){
						ctx.strokeStyle=that.map.sector[x][y+1].floorColor;
					}else{
						ctx.strokeStyle=that.map.sector[x][y-1].floorColor;
					} //end if
					ctx.beginPath();ctx.lineWidth=5;
					ctx.moveTo(x*v.w/that.map.width+5,
							   y*v.h/that.map.height+v.h/that.map.height-5);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-5,
							   y*v.h/that.map.height+v.h/that.map.height-5);
					ctx.stroke();ctx.lineWidth=3;
					ctx.moveTo(x*v.w/that.map.width+13,
							   y*v.h/that.map.height+v.h/that.map.height-13);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-13,
							   y*v.h/that.map.height+v.h/that.map.height-13);		   
					ctx.stroke();
					if(y-1>=0){
						ctx.strokeStyle=that.map.sector[x][y-1].floorColor;
					}else{
						ctx.strokeStyle=that.map.sector[x][y+1].floorColor;
					} //end if
					ctx.beginPath();ctx.lineWidth=5;
					ctx.moveTo(x*v.w/that.map.width+5,
							   y*v.h/that.map.height+5);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-5,
							   y*v.h/that.map.height+5);
					ctx.stroke();ctx.lineWidth=3;
					ctx.moveTo(x*v.w/that.map.width+13,
							   y*v.h/that.map.height+13);
					ctx.lineTo(x*v.w/that.map.width+v.w/that.map.width-13,
							   y*v.h/that.map.height+13);
					ctx.stroke();
				} //end for
			} //end for
			ctx.globalAlpha=1;
			ctx.fillStyle="rgba(40,70,30,0.2)";
			ctx.fillRect(0,0,v.w,v.h);
			for(var i=0;i<that.trees.length;i++){
				ctx.fillStyle=that.map.sector[that.trees[i].x][that.trees[i].y].wallColor;
				ctx.beginPath();
				ctx.arc(that.trees[i].x*v.w/that.map.width+v.w/that.map.width/2,that.trees[i].y*v.h/that.map.height+v.h/that.map.height/2,v.w/that.map.width/2.5,0,2*Math.PI);
				ctx.fill();
				ctx.strokeStyle="#010";
				ctx.stroke();
			} //end for
			that.ui.draw.player();
			for(var i=0;i<that.mob.list.length;i++){
				that.ui.draw.actor(i);
			} //end for
		} //end draw
	}; //end map
	this.events={
		keypress:function(e){
			if(e.keyCode=='119'||e.keyCode=='56'){ //north
				that.player.move('north');
			}else if(e.keyCode=='100'||e.keyCode=='54'){ //east
				that.player.move('east');
			}else if(e.keyCode=='115'||e.keyCode=='50'||e.keyCode=='120'){ //south
				that.player.move('south');
			}else if(e.keyCode=='97'||e.keyCode=='52'){ //west
				that.player.move('west');
			} //end if
			console.log('key:'+e.keyCode);
		}
	};
})();
// ignition
(function(){
	core.map.generate();
	core.player = new core.actor();
	core.mob.intialize(1);
	setTimeout("core.map.draw(1.0)",0);
	setTimeout("core.map.draw(0.9)",100);
	setTimeout("core.map.draw(0.8)",200);
	setTimeout("core.map.draw(0.7)",300);
	setTimeout("core.map.draw(0.6)",400);
	setTimeout("core.map.draw(0.5)",500);
	setTimeout("core.map.draw(0.4)",600);
	setTimeout("core.map.draw(0.3)",700);
	document.onkeypress=core.events.keypress;
	core.tick();
})();