String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
var $=function(o){return document.getElementById(o);};
setTimeout(function(){$('cmd').value="";$('cmd').focus();},10);
setTimeout(function(){process('+apple@red fruit tastey');},20);
setTimeout(function(){process('+happy@smile alive laugh');},20);
setTimeout(function(){process('+apple@green tree seed grow eat food');},20);
setTimeout(function(){process('+alive@die sleep think grow');},30);
setTimeout(function(){process('+green@tree grass grow');},40);
setTimeout(function(){process('+grow@eat sleep alive food');},40);
setTimeout(function(){process('+eat,hunger@food apple fruit');},40);
var tab=0;
var data=[];
var map=[];
var mind=new function(){
	this.identity={};
	this.identity.version="14.05.14";
	this.identity.self={};
	this.identity.self.name="Penelopy";
	this.identity.self.status=['happy','alive'];
	this.atoms={};
	this.history={};
	this.history.heard=[];
	this.history.said=[];
	return this;
}();
/* PRINT LINE */
var pl=function(txt){
	if(data.length==50)data.shift();
	for(var i=0;i<tab;i++)txt="<span style='float:left;width:75px;'>#</span>"+txt;
	data.push(txt);
	$('output').innerHTML=data.join("<br/>");
};
/* PRINT CLEAR - Clears mapper */
var pc=function(){map=[];};
var getTab=function(n){
	var txt="";for(var i=0;i<tab;i++)txt="<span style='float:left;width:75px;'>#</span>"+txt;return txt;
};
var pm=function(txt){
	if(map.length==50)map.shift();
	txt=getTab()+txt;
	map.push(txt);
	$('map').innerHTML=map.join("<br/>");
};
/* DRAW MAP */
var drawMap=function(){
	pc(); //clear mapper
	var str="";
	var iterateObject=function(obj,suppress){
		for(var element in obj){
			if(obj[element] instanceof Array){
				if(obj[element].length==0){
					pm("<span style='float:left;width:75px;'>"+element+"</span> &lt;NO DATA&gt;");
				}else{
					if(obj[element][0] instanceof Object){
						if(obj[element][0].name){
							str="";
							for(var i=0;i<obj[element].length;i++){
								str+='('+obj[element][i].value+')'+obj[element][i].name+(i==obj[element].length-1?'':', ');
							} //end for
							pm("<span style='float:left;width:75px;'>"+element+"</span> "+str);
						}else{
							pm("<span style='float:left;width:75px;'>"+element+"</span> ["+obj[element].join(']<br/>'+getTab()+"<span style='float:left;width:75px;'>#</span>[").replaceAll(',',' ')+']');
						}//end if
					}else{
						pm("<span style='float:left;width:75px;'>"+element+"</span> "+obj[element].join(', '));
					} //end if
				} //end if
			}else if(obj[element] instanceof Object){
				pm("(START)"+element);tab++;
				iterateObject(obj[element]);
				tab--;pm("(END)"+element);
			}else{
				pm("<span style='float:left;width:75px;'>"+element+"</span> "+obj[element]);
			} //end if
		} //end for
	};
	iterateObject(mind);
};
var process=function(message){
	if(message.substring(0,1)=='+'){ //learn
		message=message.substring(1,message.length);
		pl("<span style='color:#0F0'>LEARN&gt; <span style='color:#090'>"+message+"</span></span>");
		pl("MACHINE&gt;");
		(function(msg){
			var words=[],lastPos=0;
			var associated=[],context=[],contextStarted=false;
			for(var i=0;i<msg.length;i++){
				if(msg.substring(i,i+1)==' '||msg.substring(i,i+1)==','){
					words.push(msg.substring(lastPos,i));
					if(!contextStarted){
						associated.push(msg.substring(lastPos,i));
					}else if(contextStarted){
						context.push(msg.substring(lastPos,i));
					} //end if
					lastPos=i+1;
				}else if(msg.substring(i,i+1)=='@'){
					words.push(msg.substring(lastPos,i));
					associated.push(msg.substring(lastPos,i));
					contextStarted=true;
					lastPos=i+1;
				}//end if
			} //end for
			pl("<span style='float:left;width:75px;'>words</span>["+words.join(" ")+"]");
			mind.history.heard.push(words);
			pl("<span style='float:left;width:75px;'>associated</span>["+associated.join(" ")+"]");
			for(var i=0;i<associated.length;i++){
				if(!mind.atoms[associated[i]]){ //if it doesn't exist make it
					mind.atoms[associated[i]]=[];
					/* push each of the context atoms into the selected associate */
					for(var j=0;j<context.length;j++){
						mind.atoms[associated[i]].push({name:context[j],value:2});
					} //end for
					/* ensure associated atoms are linked to each other too */
					for(var j=0;j<associated.length;j++){
						if(associated[j]!=associated[i]){ 
							for(var k=0;k<mind.atoms[associated[i]].length;k++){
								if(mind.atoms[associated[i]][k].name==associated[j]){
									mind.atoms[associated[i]][k].value++;
									k=-1;break; //don't make duplicates
								} //end if
							} //end for
							if(k!=-1)mind.atoms[associated[i]].push({name:associated[j],value:1});
						} //end if
					} //end for
				}else{
					for(var j=0;j<context.length;j++){
						for(var k=0;k<mind.atoms[associated[i]].length;k++){
							if(mind.atoms[associated[i]][k].name==context[j]){
								mind.atoms[associated[i]][k].value++;
								k=-1;break; //don't make duplicates
							} //end if
						} //end for
						if(k!=-1)mind.atoms[associated[i]].push({name:context[j],value:1});
					} //end for
				} //end if
			} //end for
			pl("<span style='float:left;width:75px;'>context</span>["+context.join(" ")+"]");
			for(var i=0;i<context.length;i++){
				if(!mind.atoms[context[i]]){ //if it doesn't exist make it
					mind.atoms[context[i]]=[];
					for(var j=0;j<associated.length;j++){
						mind.atoms[context[i]].push({name:associated[j],value:1});
					} //end for
				}else{
					for(var j=0;j<associated.length;j++){
						for(var k=0;k<mind.atoms[context[i]].length;k++){
							if(mind.atoms[context[i]][k].name==associated[j]){
								mind.atoms[context[i]][k].value++;
								k=-1;break; //don't make duplicates
							} //end if
						} //end for
						if(k!=-1)mind.atoms[context[i]].push({name:associated[j],value:1});
					} //end for
				} //end if
			} //end for
		})(message+" ");
	}else if(message.substring(0,1)=='-'){ //forget
		message=message.substring(1,message.length);
		p("<span style='color:#F00'>FORGET&gt; <span style='color:#900'>"+message+"</span></span>");
		p("MACHINE&gt; I want to be perfect, please don't let me forget.");
	}else{
		p("<span style='color:#FFF'>???&gt; <span style='color:#999'>"+message+"</span></span>");
	} //end if
	drawMap();
};