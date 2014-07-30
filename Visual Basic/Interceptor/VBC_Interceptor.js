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
		current:0,
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
		if($('exportFrame').innerHTML.length>0){
			if($('exportFrame').innerHTML=="DONE"){
				$('importFrame').innerHTML+="Finished Database.";
				Interceptor.progress.fadeOut($('progressBar'),100);
			}else if($('exportFrame').innerHTML.substring(0,1)!='{'){
				$('result').innerHTML=VBC.highlight($('exportFrame').innerHTML);
				$('importFrame').innerHTML+="Processed a module.";
				Interceptor.progress.current++;
				$('progressBar_progress').style.width=(6.67/Interceptor.progress.modules.length*Interceptor.progress.current)+'%';
			}else{
				(function(header){ //format = {FormName:FormType:LineNumber} where formType=0:Module,1:Form,2:Report
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
				$('importFrame').innerHTML+="Processed the header.";
			} //end if
			$('exportFrame').innerHTML="";
		} //end if
	},1);
})(Interceptor||(Interceptor={}));
