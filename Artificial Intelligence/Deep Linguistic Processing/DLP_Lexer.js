var DLP;
(function(DLP){
	DLP.words=[]; //holds the contextual data types as one word per entry. Contractions merge together all data

	/*
	   This function prints the structure of the processed string with each word being on a line by itself
	   with it's grammar types being to the right pretty-printed. This gives a good analytical view of how
	   the grammar pre-processor analyzes the sentence structure before performing more interesting analysis
	   on the sentence as a whole 
	*/
	DLP.printStructure=function(frame){
		//The following 4 items are common markup to be used in the innerHTML of the passed frame
		var $1='<span class="color_base">',
		    $2='</span>',
		    $3='</br>',
		    $4=function(n){return '<span class="color_'+n+'">';};
		var output='',word; //output holds all the data that will be sent to the innerHTML, word holds each word

		//This utility function helps by dissecting array of types and giving each of those grammar
		//types their own formatting. This occurs in dictionary words that can be conveyed as multiple types
		//such as noun / verb depending on how that word is used. The later grammar analyzers will detect the
		//proper type that is being conveyed by the sentence
		var joinDiction=function(o){
			var i,s=''; //temporary variables : i is an iterator that moves through the DLP.types array and s is the end string
			if(isNaN(o)){ //therefor it must be an array holding multiple type entries
				for(i=0;i<o.length;i++){
					s+=$4(o[i])+DLP.types[o[i]]+$2;
					if(i<o.length-1)s+=' / ';
				} //end for
				return s; //return the finished string after building each type entry
			}else{
				return $4(o)+DLP.types[o]+$2; //was a single entry, simply return it's formatted result
			} //end if
		};
		//This is the main loop for this function. It iterates through each of the words and outputs their
		//identified types by using the utility function joinDiction() and returns the final result
		//into the passed frame.innerHTML to achieve a pretty-printed indication of how the grammar stands
		//at the pre-processor identification level
		for(index in DLP.words){
			word=DLP.words[index];
			if(word.ft===0){ //word format type of zero : the standard format type
				output+=$4('head')+word.w+$2+$1+' ( '+joinDiction(word.bt)+' ) '+$2+$3;
			}else if(word.ft===1){ //word format type of 1 : this word could have multiple types, add question mark
				output+=$4('head')+word.w+$2+$1+' ( '+joinDiction(word.bt,$4(0)+'?'+$2)+' ) '+$2+$3;
			}else if(word.ft===2){ //the Conjunction word format type
				output+=$4('head')+word.w+$2+$1+' ( '+joinDiction(word.bt[0])+' ::';
				(function(types){
					/*for(var i=0;i<types.length;i++){
						joinDic
					} //end for
					for(var i=0;i<result.length;i++){
						words.push(tryCapture(result[i].substring(0,1).toLowerCase(),result[i],true));
					}//end for */
				})(word.bt[1]);
				output+=' ) '+$3;
			} //end if
		} //end for
		frame.innerHTML=output;
	};
	DLP.process=function(data){
		var isLetter={'a':1,'b':1,'c':1,'d':1,'e':1,'f':1,'g':1,'h':1,'i':1,'j':1,'h':1,'i':1,'j':1,'k':1,'l':1,'m':1,'n':1,'o':1,'p':1,'q':1,'r':1,'s':1,'t':1,'u':1,'v':1,'w':1,'x':1,'y':1,'z':1};
		var splitData=(function(data){
			data=data.replace(/[,\.;']+/g,function(c){return ' '+c+' ';});
			data=data.trim();
			data=data.split(/[\s]+/);
		    return data;
		})(data);
		var word,letter;
		var output=[]; //holds the contextual output as one line per index
		var passin=DLP.words; //holds the contextual data types as one word per entry. Contractions merge together all data
		var getIndex=function(map,lookup){
			for(var i=0;i<map.length;i++){
				if(map[i]==lookup)return i;
			} //end for
			return -1;
		};
		var tryCapture=function(page,word,nb){ //nb = no break, prevents from going to next line
			var result=DLP.dictionary[page][word];
			if(result){
				return passin.push({bt:result,ft:0,w:word});
			}else{
				//didn't return a result, lets see if it's because they capitalized the first character
				result=DLP.dictionary[page][word.toLowerCase()];
				if(result){
					return passin.push({bt:result,ft:1,w:word});  //highlight the question mark as unknown
				}else{
					if(!~~isNaN(word)){ //highlight numbers
						return passin.push({bt:getIndex(DLP.types,'Number'),ft:0,w:word});
					}else{
						return passin.push({bt:getIndex(DLP.types,'Unknown'),ft:0,w:word});
					} //end if
				} //end if
			}
		};
		for(index in splitData){
			word=splitData[index]; //Store each word separated by space
			letter=word.substring(0,1).toLowerCase(); //grab the very first letter so see what dictionary the word might reside in
			if(!isLetter[letter]){
				tryCapture('_',word);
			}else{
				tryCapture(letter,word);
			} //end if
			if(index>1&&splitData[index-1]=="'"){ //see if there's a contraction to decipher
				(function(result){
					if(!result)return;
					passin.pop();passin.pop();passin.pop();
					passin.push({bt:[getIndex(DLP.types,'Contraction'),result],ft:2,w:splitData[index-2]+"'"+splitData[index]});
				})(DLP.rules.Contraction(splitData[index-2],splitData[index]));
			} //end if
		} //end for
	};
})(DLP||(DLP={}));