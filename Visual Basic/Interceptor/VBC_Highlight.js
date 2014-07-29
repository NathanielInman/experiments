var VBC;
(function(VBC){
	//Collection of color themes
	var themes={
		none:0,
		solarized:{
			comments:'#586e75',
			content:'#839496',
			background:'#002b36',
			highlight:'#073642',
			highlight1:'#b58900',
			highlight2:'#cb4b16',
			highlight3:'#dc322f',
			highlight4:'#d33682',
			highlight5:'#6c71c4',
			highlight6:'#268bd2',
			highlight7:'#2aa198',
			highlight8:'#859900'
		},
		boron:{
			comments:'#888888',
			content:'#3838d3',
			background:'#151515',
			highlight:'#404040',
			highlight1:'#99ad6a',
			highlight2:'#556633',
			highlight3:'#7697d6',
			highlight4:'#dd0093',
			highlight5:'#ffb964',
			highlight6:'#cf6a4c',
			highlight7:'#ffb964',
			highlight8:'#8fbfdc'
		},
		heroku:{
			comments:'#62548b',
			content:'#8584ae',
			background:'#1b1b24',
			highlight:'#c13333',
			highlight1:'#09afed',
			highlight2:'#6dba09',
			highlight3:'#ffa500',
			highlight4:'#1a921c',
			highlight5:'#0c450d',
			highlight6:'#6dba09',
			highlight7:'#62548b',
			highlight8:'#a292ff'
		}
	};
	VBC.themes=themes;
	VBC.themes.current=themes.heroku;
})(VBC||(VBC={}));
var VBC;
(function(VBC){
	//Get the character pixel length on the client browser for default font
	var characterLength=(function(){
		var width=0,elem=document.createElement('div'),body = document.getElementsByTagName('body')[0];
		elem.setAttribute('id','testWidth');
		elem.setAttribute('style',"position:absolute;visibility:hidden;font-family:'Courier New';font-size:1em;font-weight:800;background-color:#FFF;");
		elem.innerHTML = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		body.appendChild(elem);
		width=elem.offsetWidth;
		body.removeChild(elem);
		return width/52;
	})();

	//Acquire the viewport size of the client
	var viewportSize=(function(e,a){
		if(!('innerWidth' in e)){
			a='client';
			e=document.documentElement||document.body;
		} //end if
		return {width:e[a+'Width'],height:e[a+'Height']};
	})(window,'inner');

	//Acquire the line occupy pixel width
	var lineWidth=(function(e){
		return e.width-75;
	})(viewportSize);

	//Acquire how many characters that would be able to fit on a line
	var maxCharactersPerLine=(function(e,a){
		return (e/a|0)-2;
	})(lineWidth,characterLength);

	//Throw the metrics into a globally accessible object
	VBC.metric={
		characterLength:characterLength,
		viewportSize:viewportSize,
		lineWidth:lineWidth,
		maxCharactersPerLine:maxCharactersPerLine
	};
	
	//The main highlight function
	var highlight=function(data){
		var output='',linenum='',oLine='',pLine='',functionNames={};
		var comment=0,instring=0,w,tw,i,tabsc=0,tabs=0,dTab=0,then=0,capture=0;
		var conditions=function(){return !comment&&!instring;};
		var addTabs=function(){
			for(var i=0;i<tabsc;i++){
				output+=VBC.themes.current?"&nbsp;&nbsp;&nbsp;&nbsp;":'    ';
			} //end for
			tabsc=tabs;
		};
		var print=function(txt,format,skipTag){
			if(VBC.themes.current===0){
				oLine+=txt;
			}else{
				oLine+=format+txt+(skipTag?'':'</span>');
			} //end if
		};
		var printFunctionNames=function(){
			var data='';
			for(element in functionNames){
				data+='<span style="float:left;">'+element+'</span><span style="float:right;padding-right:30px;">: '+functionNames[element]+'</span><br/>';
			} //end for
			return data;
		};
		var testKeywords=function(w){
			var i,db=[{o:VBC.vbaAdditionalKeywords,color:VBC.themes.current.highlight1},
			          {o:VBC.reservedKeywords,color:VBC.themes.current.highlight2},
			          {o:VBC.isNumber,color:VBC.themes.current.highlight3}]; //keep isNumber on the end
			for(i=0;i<db.length-1;i++){
				if(db[i].o[w.trim()]){
					if(db[i].o[w.trim()].tab&&!dTab)tabs+=db[i].o[w.trim()].tab;
					if(db[i].o[w.trim()].dTab)dTab=1;
					if(db[i].o[w.trim()].iTab&&!dTab)tabs=tabsc+=db[i].o[w.trim()].iTab;
					if(db[i].o[w.trim()].rTab&&!dTab)tabs=tabsc---2;
					if(db[i].o[w.trim()].nTab&&!dTab)tabsc+=db[i].o[w.trim()].nTab;
					if(db[i].o[w.trim()].capture)capture=1;
					if(w.trim()=='Then')then=1;
					print(w+' ','<span style="color:'+db[i].color+'">');
					return true;
				} //end if
			} //end for
			//test to see if it's just numbers
			w=w.trim();
			for(i=0;i<w.length;i++){
				if(!db[db.length-1].o[w[i]]&&w[i]!='&')return false; //& is allowed is numbers for addresses
			} //end for
			print(VBC.themes.current?w.replace('&','<span style="color:'+VBC.themes.current.highlight1+';">&</span>'):w+' ','<span style="color:'+db[2].color+'">');
			return true;
		};
		//escape all html tags, consolidate line returns, and add spaces to parenthesis before beginning
		data=data.replace(/[<>]/g,function(s){return VBC.entityMap.toMarkup[s];}).replace(/\n\r\r/g,'\n').replace(/\(/g,' ( ').replace(/\)/g,' ) ').split('\r');
		//Main block
		for(line in data){
			oLine='';pLine=data[line].replace(/(&gt;|&lt;)/gi,function(s){return VBC.entityMap.fromMarkup[s];});
			data[line]=data[line].split(' ');
			for(word in data[line]){
				w=data[line][word];
				if(!instring&&!comment&&w.trim()[0]=="'"){
					comment=1;
					print("",'<span style="color:'+VBC.themes.current.comments+';">',true);
				}else if(!comment&&w.indexOf('"')>-1){ //comment 1+ string is inside the word
					tw='';
					for(i=0;i<w.length;i++){
						if(w[i]=='"'){
							if(!instring){
								tw+=VBC.themes.current?'<span style="color:#A95;">"':'"';
							}else{
								tw+=VBC.themes.current?'"</span>':'"';
							} //end if
							instring^=1;
						}else{
							tw+=w[i];
						} //end if
					} //end for
					w=tw;
				} //end if
				if(conditions()&&VBC.operators[w]){
					print(w+' ','<span style="color:'+VBC.themes.current.highlight8+';">');
				}else if(!(conditions()&&testKeywords(w.trim()))){
					oLine+=w+' ';
					if(functionNames[w.trim()])functionNames[w.trim()]++;
					if(capture){functionNames[w.trim()]=1;capture=0;}
					if(then&&!comment&&w.trim()!==''){tabs--;then=0;}
				} //end if
			} //end for
			if(comment){
				if(VBC.themes.current)oLine+='</span>';
				comment=0;
			}
			addTabs();
			output+=oLine.replace(/\s+[()]\s+/g,function(){return arguments[0].replace(/^\s+|\s+$/gm,'');})+(VBC.themes.current?'<br/>':'\n');
			linenum+=line+'<br/>';
			if(pLine.length>VBC.metric.maxCharactersPerLine)linenum+=VBC.themes.current?'<br/>':'/n';
			dTab=0;then=0;capture=0;
		} //end for
		return '<div style="position:absolute;left:0;top:0;right:0;bottom:0;min-width:'+VBC.metric.viewportSize+'px;'+
			   'max-width:'+VBC.metric.viewportSize+'px;color:'+VBC.themes.current.content+';background-color:'+VBC.themes.current.background+
		       ";overflow-y:scroll;font-family:'Courier New';font-size:1em;overflow:hidden;"+
		       'font-weight:800;"><div style="position:absolute;text-align:right;padding-right:10px;'+
		       'width:50px;">'+linenum+'</div><div style="padding-left:75px;min-width:'+VBC.metric.lineWidth+'px;'+
		       'max-width:'+VBC.metric.lineWidth+'px;">'+output+'</div></div>'+
		       '<div style="position:absolute;left:60px;top:0;bottom:0;width:60px;border-left:5px solid '+VBC.themes.current.highlight+';"></div>'+
		       '<div style="position:absolute;right:5%;top:0;width:300px;bottom:0;border:15px solid #000;background-color:#000;opacity:0.3;"></div>'+
		       '<div style="position:absolute;right:5%;top:5%;width:300px;bottom:5%;color:'+VBC.themes.current.content+';">'+printFunctionNames()+'</div>';
	};
	VBC.highlight=highlight;
})(VBC||(VBC={}));
