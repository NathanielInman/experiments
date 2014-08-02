var DLP;
(function(DLP){
	DLP.process=function(data){
		var isLetter={'a':1,'b':1,'c':1,'d':1,'e':1,'f':1,'g':1,'h':1,'i':1,'j':1,'h':1,'i':1,'j':1,'k':1,'l':1,'m':1,'n':1,'o':1,'p':1,'q':1,'r':1,'s':1,'t':1,'u':1,'v':1,'w':1,'x':1,'y':1,'z':1};
		var splitData=data.split(/[\s,.]+/),word,letter;
		var output='';
		var $1='<span class="color_base">',$2='</span>',$3='<br/>';
		var $4=function(n){return '<span class="color_'+n+'">';};
		var tryCapture=function(page,word){
			var result=DLP.dictionary[page][word];
			var joinDiction=function(o){
				var i=0,s='';
				if(typeof o !== 'number'){
					for(var i=0;i<o.length;i++){
						s+=$4(o[i])+DLP.types[o[i]]+$2;
						if(i<o.length-1)s+=' / ';
					} //end for
					return s;
				}else{
					return $4(o)+DLP.types[o]+$2;
				} //end if
			};
			if(result){
				return $1+' ( '+joinDiction(result)+' ) '+$2+$3;
			}else{
				//didn't return a result, lets see if it's because they capitalized the first character
				result=DLP.dictionary[page][word.toLowerCase()];
				if(result){
					return $1+' ( '+joinDiction(result)+$4(14)+'?'+$2+' ) '+$2+$3; 
				}else{
					return $3;
				} //end if
			}
		};
		for(index in splitData){
			word=splitData[index]; //Store each word separated by space
			letter=word.substring(0,1).toLowerCase(); //grab the very first letter so see what dictionary the word might reside in
			if(!isLetter[letter]){
				output+=$4('head')+word+$2+tryCapture('_',word);
			}else{
				output+=$4('head')+word+$2+tryCapture(letter,word);
			} //end if
		} //end for
		return data+'<br/>'+output;	
	};
})(DLP||(DLP={}));