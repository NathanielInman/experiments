var Interceptor;
(function(Interceptor){
	/* Utility Functions */
	var $=function(o){return document.getElementById(o);};

	/* Custom plugin for VBC that will replace error handling with a custom routine */
	VBC.plugin={};
	VBC.plugin.errorControl=function(){
	};

	/* This keeps track of the state of the module loading */
	var progress={
		modules:[],
		finished:[],
		current:0,
		databases:[],
		state:2, //0 = accepting input, 1 = processing output, 2 preperatory database selector
		fadeOut:function(control,i,callback){
			control.style.opacity=1/100*i;i--;
			if(i>0){
				setTimeout(function(){Interceptor.progress.fadeOut(control,i,callback);},10);
			}else{
				control.style.visibility='hidden';
				callback?callback():0;
			} //end if
		}
	};
	Interceptor.progress=progress;

	/* This will toggle the checkbox of a selected database */
	var databaseToggled=function(database){
		if($('d'+database).innerHTML=='X'){
			$('d'+database).innerHTML='';
		}else{
			$('d'+database).innerHTML='X';
		} //end if
	};
	Interceptor.databaseToggled=databaseToggled;

	/* This will toggle all of the databases in the list to opposite of what they currently are */
	var databaseToggleAll=function(){
		for(var i=0;i<Interceptor.progress.databases.length;i++){
			databaseToggled(i);
		} //end for
	};
	Interceptor.databaseToggleAll=databaseToggleAll;

	/* This will fade out the database selection pane and launch the initialization of VBC Interceptor */
	var startProcess=function(){
		var returnString='',i=0;
		for(;i<Interceptor.progress.databases.length;i++){
			if($('d'+i).innerHTML=='X'){
				if(returnString!=='')returnString+=',';
				returnString+="'"+Interceptor.progress.databases[i]+"'";
			} //end if
		} //end for
		Interceptor.progress.fadeOut($('databaseSelector'),100);
		Interceptor.progress.fadeOut($('ds1'),100);
		Interceptor.progress.fadeOut($('ds2'),100);
		Interceptor.progress.fadeOut($('ds3'),100);
		Interceptor.progress.fadeOut($('ds4'),100,function(){
			Interceptor.progress.state=0;
			$('importFrame').innerHTML=returnString;
		});
	};
	Interceptor.startProcess=startProcess;

	/* This code acquires the data sent from the access database, processes it using VBC and sends data back */
	Interceptor.handle=setInterval(function(){
		if(Interceptor.progress.state===2){ //we're pulling in a list of databases that we should populate the selector with
			if($('exportFrame').innerHTML.length>0){
				(function(header){ //format = dbName1,dbName2,dbName3,dbName4,...
					var output='';
					Interceptor.progress.databases=header.split(',');
					output=""+
						"<div id='ds1' class='control-title'>Select Databases To Process</div>"+
						"<div id='ds2' class='list-outerFrame'></div>"+
						"<div id='ds3' class='list-innerFrame' onselectstart='arguments[0].preventDefault();'>";
					for(var i=0;i<Interceptor.progress.databases.length;i++){
						output+="<div class='list-object'><div class='checkbox' id='d"+i+"'  onmousedown=\"Interceptor.databaseToggled("+i+");\"></div>"+Interceptor.progress.databases[i]+"</div>";
					} //end for
					output+=""+
						"</div>"+
						"<div id='ds4' class='control-box' onselectstart='arguments[0].preventDefault();'>"+
						"	<div class='control-box-button' onmousedown='Interceptor.databaseToggleAll()'>Toggle All</div>"+
						"	<div class='control-box-button' style='right:0;' onmousedown='Interceptor.startProcess()'>Start</div>"+
						"</div>";
					$('databaseSelector').innerHTML=output;
				})($('exportFrame').innerHTML);
				$('exportFrame').innerHTML='';
			} //end if
		}else if(Interceptor.progress.state===0){ //we're pullin input from a database during this state
			if($('exportFrame').innerHTML.length>0){
				if($('exportFrame').innerHTML=="DONE"){
					Interceptor.progress.state=1;
					$('label').innerHTML='DEPLOYING';
				}else if($('exportFrame').innerHTML.substring(0,1)!='{'){
					$('resultFrame').innerHTML=VBC.highlight($('exportFrame').innerHTML);
					Interceptor.progress.finished.push($('result').textContent);
					Interceptor.progress.current++;
					$('progressBar_progress').style.width=(100/Interceptor.progress.modules.length*Interceptor.progress.current)+'%';
				}else{
					(function(header){ //format = {FormName:FormType:LineNumber} where formType=5:Module,2:Form,3:Report
						var i,j=1,step=0;
						var formName='',formType='',lineNumber='';
						for(i=j;i<header.length;i++){
							if(header[i]==':'){
								if(step===0){
									formName=header.substring(j,i);j=i+1;step++;
								}else if(step==1){
									formType=header.substring(j,i);j=i+1;step++;
								} //end if
							}else if(header[i]==','||header[i]=='}'){
								formType=header.substring(j,i);j=i+1;step=0;
								Interceptor.progress.modules.push({name:formName,type:formType,size:lineNumber});
							} //end if
						} //end for
					})($('exportFrame').innerHTML);
				} //end if
				$('exportFrame').innerHTML="";
			} //end if
		}else{ //we're pushing output back to the database at this point
			if($('importFrame').innerHTML.length===0 && Interceptor.progress.current>0){
				$('importFrame').innerHTML=Interceptor.progress.finished.shift(); //shift the oldest module onto the transfer
				Interceptor.progress.modules.shift(); //no longer need that part of the header
				Interceptor.progress.current--; //decrement the current
			}else if(Interceptor.progress.current===0){
				Interceptor.progress.state=0; //reset back to normal
				Interceptor.progress.fadeOut($('progressBar'),100);
			} //end if
		} //end if
	},1);
})(Interceptor||(Interceptor={}));
