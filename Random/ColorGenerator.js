//interval amount per cycle
var interval=100,state='dawn';

//prime color objects
var color=[
	{
		current: {r:  0,g:  0,b:  0},
		dawn:    {r:119,g:153,b:187},
		daytime: {r:204,g:238,b:255},
		dusk:    {r:135,g: 51,b: 85},
		midnight:{r:  0,g:  0,b: 17}
	},{
		current: {r:  0,g:  0,b:  0},
		dawn:    {r:153,g: 85,b: 51},
		daytime: {r:170,g: 85,b: 51},
		dusk:    {r:  0,g: 17,b: 34},
		midnight:{r:153,g: 87,b: 22}
	}
],colorD=[];

//Dynamically Builds Matrix's Regardless of color object tag names or number thereof
var getDifferenceMatrix=function(){
	var colorDif,curColor,first,firstName;
	for(stops in color){
		colorDif={},curColor=0,first=0;
		for(element in color[stops]){
			if(curColor!=0){
				colorDif[element]={r:color[stops][element].r-curColor.r,g:color[stops][element].g-curColor.g,b:color[stops][element].b-curColor.b};
				if(first==0){first={r:color[stops][element].r-curColor.r,g:color[stops][element].g-curColor.g,b:color[stops][element].b-curColor.b};firstName=element;}
			} //end if
			curColor={r:color[stops][element].r,g:color[stops][element].g,b:color[stops][element].b};
			if(element==state)color[stops].current=curColor; //initialize the current if it's at this state
		} //end for
		colorDif[firstName]={r:first.r-curColor.r,g:first.g-curColor.g,b:first.b-curColor.b};
		colorD[stops]=colorDif;
	} //end for
};

//Dynamically Pulls the next state name regardless of the size of the prime color tags
var getNextState=function(){
	var found=0;
	for(key in color[0]){
		if(found)return key;
		if(key==state)found=1;
	} //end for
	for(key in color[0]){if(found==2)return key;found++;}
};

//Main Loop
var main=function(cur){
	var grd=ctx.createLinearGradient(0,0,0,v.h/5*4);
	for(stops in color){
		grd.addColorStop(stops,'rgb('+(color[stops].current.r|0)+','+(color[stops].current.g|0)+','+(color[stops].current.b|0)+')');
	} //end for
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,v.w,v.h);
	if(cur==interval){cur=-1;state=getNextState();}
	for(stops in color){
		color[stops].current.r+=colorD[stops][state].r/interval;
		color[stops].current.g+=colorD[stops][state].g/interval;
		color[stops].current.b+=colorD[stops][state].b/interval;
	} //end for
	setTimeout("main("+(++cur)+")",10);
};

//Initializer
(function(){
	getDifferenceMatrix();
	main(0); //start the main loop
})();
