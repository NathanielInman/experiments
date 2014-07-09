var Phaser=function(interval,state,color,context,properties,makeGradient){
	interval=interval||100; //handle undefined or incorrect interval
	color=color||[{current:{r:0,g:0,b:0},first:{r:50,g:50,b:50},last:{r:255,g:255,b:255}}]; //handle empty color error
	if(!makeGradient||!context||!properties){console.log('Phaser improperly installed.');return;}
	
	var _=this;
	_.colorD=[];
	_.frame=interval;
	//Dynamically Pulls the next state name regardless of the size of the prime color tags
	_.getNextState=function(){
		var found=0,newState="";
		for(key in color[0]){
			if(found){newState=key;break;}
			if(key==state)found=1;
		} //end for
		if(newState.length==0)for(key in color[0]){if(found==2)return key;found++;}
		for(stops in color){
			color[stops].current.r=color[stops][state].r;
			color[stops].current.g=color[stops][state].g;
			color[stops].current.b=color[stops][state].b;
		} //end for
		return newState;
	};

	//Main Loop
	_.drawNext=function(redraw){
		var grd=makeGradient();
		var p=properties();
		for(stops in color){
			grd.addColorStop(stops,'rgb('+(color[stops].current.r|0)+','+(color[stops].current.g|0)+','+(color[stops].current.b|0)+')');
		} //end for
		context.fillStyle=grd;
		context.fillRect(p[0],p[1],p[2],p[3]);
		if(_.frame==interval){_.frame=-1;state=_.getNextState();}
		for(stops in color){
			color[stops].current.r+=_.colorD[stops][state].r/interval;
			color[stops].current.g+=_.colorD[stops][state].g/interval;
			color[stops].current.b+=_.colorD[stops][state].b/interval;
		} //end for
		if(!redraw)_.frame++;
	};

	//Initialize by dynamically building matrices regardless of color object tag names or the number thereof
	(function(){
		var colorDif,curColor,first,iter,firstName;
		for(stops in color){
			colorDif={},curColor={r:0,g:0,b:0},iter=0,first=0;
			for(element in color[stops]){
				if(iter==1){
					first={r:color[stops][element].r-curColor.r,g:color[stops][element].g-curColor.g,b:color[stops][element].b-curColor.b};firstName=element;
				}else if(iter>1){
					colorDif[element]={r:color[stops][element].r-curColor.r,g:color[stops][element].g-curColor.g,b:color[stops][element].b-curColor.b};
				} //end if
				iter++;
				curColor={r:color[stops][element].r,g:color[stops][element].g,b:color[stops][element].b};
				if(element==state)color[stops].current=curColor; //initialize the current if it's at this state
			} //end for
			colorDif[firstName]={r:first.r-curColor.r,g:first.g-curColor.g,b:first.b-curColor.b};
			_.colorD[stops]=colorDif;
		} //end for
		_.drawNext();
	})();
};