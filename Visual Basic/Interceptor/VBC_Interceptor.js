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
		state:0, //0 = accepting input, 1 = processing output
		fadeOut:function(control,i){
			control.style.opacity=1/100*i;i--;
			if(i>0){
				setTimeout(function(){Interceptor.progress.fadeOut(control,i);},10);
			}else{
				control.style.visibility='hidden';
			} //end if
		}
	};
	Interceptor.progress=progress;

	/* This code acquires the data sent from the access database, processes it using VBC and sends data back */
	Interceptor.handle=setInterval(function(){
		if(Interceptor.progress.state===0){ //we're pullin input from a database during this state
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
