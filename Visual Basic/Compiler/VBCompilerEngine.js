var compile=function(data){
	var output='',oLine='';
	var comment=0,instring=0,w,tw,i,tabsc=0,tabs=0,dTab=0,then=0;
	var conditions=function(){return !comment&&!instring;};
	var addTabs=function(){
		for(var i=0;i<tabsc;i++){
			output+="&nbsp;&nbsp;&nbsp;&nbsp;";
		} //end for
		tabsc=tabs;
	};
	var testKeywords=function(w){
		var db=[{o:vbaAdditionalKeywords,color:'#39F'},
		        {o:reservedKeywords,color:'#94F'}];
		for(var i=0;i<db.length;i++){
			if(db[i].o[w.trim()]){
				if(db[i].o[w.trim()].tab&&!dTab)tabs+=db[i].o[w.trim()].tab;
				if(db[i].o[w.trim()].dTab)dTab=1;
				if(db[i].o[w.trim()].iTab&&!dTab)tabs=tabsc+=db[i].o[w.trim()].iTab;
				if(db[i].o[w.trim()].rTab&&!dTab)tabs=tabsc---2;
				if(db[i].o[w.trim()].nTab&&!dTab)tabsc+=db[i].o[w.trim()].nTab;
				if(w.trim()=='Then')then=1;
				oLine+='<span style="color:'+db[i].color+'"> '+w+' </span>';
				return true;
			} //end if
		} //end for
		return false;
	};
	//escape all html tags, consolidate line returns, and add spaces to parenthesis before beginning
	data.replace(/[<>]/g,function(s){return entityMap[s];}).replace(/\n\r\r/g,'\r').replace(/\(/g,' ( ').replace(/\)/g,' ) ').split('\r');
	//Main block
	for(line in data){
		oLine='';
		data[line]=data[line].split(' ');
		for(word in data[line]){
			w=data[line][word];
			if(!instring&&!comment&&w.trim()[0]=="'"){
				comment=1;oLine+='<span style="color:#0F0;">';
			}else if(!comment&&w.indexOf('"')>-1){ //comment 1+ string is inside the word
				tw='';
				for(i=0;i<w.length;i++){
					if(w[i]=='"'){
						if(!instring){
							tw+='<span style="color:#A95;">"';
						}else{
							tw+='"</span>';
						} //end if
						instring^=1;
					}else{
						tw+=w[i];
					} //end if
				} //end for
				w=tw;
			} //end if
			if(conditions()&&operators[w]){
				oLine+='<span style="color:#FF0">'+w+'</span> ';
			}else if(!(conditions()&&testKeywords(w.trim()))){
				oLine+=w+' ';
				if(then&&!comment&&w.trim()!==''){tabs--;then=0;}
			} //end if
		} //end for
		if(comment){
			oLine+='</span>';
			comment=0;
		}
		addTabs();
		output+=oLine+'<br/>';
		dTab=0;then=0;
	} //end for
	return output;
};