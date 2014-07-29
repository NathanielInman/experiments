var VB=(function(compileType){
	//Keep track of the number of scripts to be pulled, and fire the compiler
	//after the number of loaded reaches the total
	var scripts={
		total:0,  //total number of scripts to be loaded
		loaded:0, //current number of loaded scripts
		data:[],  //file data
		name:[]   //file name
	}; //end scripts{}
	
	//Function loads each script and pushes its content into scripts.data
    var load = function(url) {
        var xhr= window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
        xhr.open('GET', url, true);
        if('overrideMimeType' in xhr)xhr.overrideMimeType('text/plain');
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4)return;
			if(xhr.status===0||xhr.status===200){
				scripts.loaded++;
				scripts.data.push(xhr.responseText);
				scripts.name.push(url);
				if(scripts.loaded===scripts.total)compile();
				return xhr.responseText;
			}else{
				console.log('Could not load '+url);
			} //end if
		}; //end xhr.onreadystatechange()
        return xhr.send(null);
    }; //end load()

	//Compiles each of the scripts found within scripts.data
    var compile = function() {
		if(scripts.data.length==0||scripts.data.length!=scripts.name.length)return; //no reason to compile when there are no scripts
		var elem,source='',body = document.getElementsByTagName('body')[0];
		scripts.total=0; //clear the 'queue' incase the xhr response was super quick and happened before the initializer finished
		source=scripts.data.join();
		if(compileType==true){ //return the result as a string
			VB=source;
		}else{ //append the data to it's own script frame and run it
        	elem = document.createElement('script');
        	elem.type = 'text/javascript';
        	elem.innerHTML = "//Compiled Visual Basic\n\n" + source;
        	body.appendChild(elem);
        } //end if
    };
	
    (function(){
	    //Polyfill for older browsers
		if(!window.console)window.console={log:function(){}};
		var script = document.getElementsByTagName('script');
        var i, src = [];
        for(i = 0; i < script.length; i++) {
            if(script[i].type == 'text/visualbasic') {
                if(script[i].src) {
					scripts.total++
                    load(script[i].src);
                }else{
                    scripts.cur.push(script[i].innerHTML);
                } //end if
            } //end if
        } //end for
		if(scripts.loaded===scripts.total)compile(); //only fires if all scripts are innerHTML, else this is fired on XHR response
	})();	
})(true); 