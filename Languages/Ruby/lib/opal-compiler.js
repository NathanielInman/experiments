/* *****************************************************************************
Copyright (c) Nathaniel Inman. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0 
 
THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
///This library gives support to the opal parser to grab libraries from external
///sources instead of relying on innerHTML.
/******************************************************************************/
(function(){
	//Keep track of the number of scripts to be pulled and fire the parser
	//after the number of loaded reaches the total
	var scripts={
		total:0,
		loaded:0,
		data:[]
	};
	
	//Function loads each script and pushes its content into scripts.data
	var load = function(url){
		var xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
		xhr.open('GET',url,true);
		if('overrideMimeType' in xhr)xhr.overrideMimeType('text/plain');
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4)return;
			if(xhr.status===0||xhr.status===200){
				scripts.loaded++;
				scripts.data.push(xhr.responseText);
				if(scripts.loaded===scripts.total)compile(scripts.data);
				return xhr.responseText;
			}else{
				console.log('Could not load '+url);
			}
		};
		return xhr.send(null);
	};
	
	//Compiles each of the scripts found within scripts.data
	var compile = function(src){
		if(!src.length)return; //no reason to compile when there are no scripts
		var elem,body=document.getElementsByTagName('body')[0];
		var hashCode=function(s){
			var hsh=0,chr,i;
			if(s.length==0){
				return hsh;
			}
			for(i=0;i<s.length;i++){
				chr=s.charCodeAt(i);
				hsh=(hsh<<5)-hsh+chr;
				hsh=hsh&hsh; //Convert to 32bit integer
			}
			return hsh;
		};
		var outfile={
			source:'',
			write:function(s){
				this.source+=s;
			},
			writeLine:function(s){
				this.source+=s+'\n';
			},
			close:function(){}
		};
		if(window.sessionStorage&&sessionStorage.getItem('ruby'+hashCode(src.join('')))){
			outfile.source=sessionStorage.getItem('ruby'+hashCode(src.join('')));
		}else{
			outfile.source=src.join('');
		}
		elem=document.createElement('script');
		elem.type='text/ruby';
		elem.innerHTML=outfile.source;
		body.appendChild(elem);
	};
	(function(){
		//Polyfill for older browsers
		if(!window.console)window.console={log:function(){}};
		var script=document.getElementsByTagName('script');
		var i,src=[];
		for(i=0;i<script.length;i++){
			if(script[i].type=='text/ruby'){
				if(script[i].src){
					scripts.total++;
					load(script[i].src);
				}else{
					scripts.data.push(script[i].innerHTML);
				}
			}
		}
	})();
})();