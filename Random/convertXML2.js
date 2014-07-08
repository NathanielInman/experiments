var data=
'	<habitat number="1" name="Abada Grove">'+
/* This program will simply ignore errored objects */
var template=function(){return {
	name:'',
	reqLevel:'',
	maxLevel:'',
	population:'',
	environments:'',
	spawns:[], // {type:'',chance:'',archetype:'',rank:'',id:''}
	loot:[] //{type:'',chance:'',id:''}
}};
var P=0,S=false,MS=false,IS=false,output=[],CO=template(),name=false,
    type=false,typeS='';chance=false,chanceS='',archetype=false,
	archetypeS='',rank=false,rankS='';
for(var i=0;i<data.length;i++){
	if(data.substring(i,i+5)=="name="&&!S){ //attribute
		S=true;P=i+6;i+=5;name=true; //always first obj, clear last obj
	}else if(data.substring(i,i+5)=="type="&&!S){ //attribute
		S=true;P=i+6;i+=5;type=true;
	}else if(data.substring(i,i+7)=="chance="&&!S){ //attribute
		S=true;P=i+8;i+=8;chance=true;
	}else if(data.substring(i,i+10)=="archetype="&&!S){ //attribute
		S=true;P=i+11;i+=10;archetype=true;
	}else if(data.substring(i,i+5)=="rank="&&!S){ //attribute
		S=true;P=i+6;i+=5;rank=true;
	}else if(data[i]=='"'&&S){ //end attribute
		if(name)CO.name=data.substring(P,i);
		if(type)typeS=data.substring(P,i);
		if(archetype)archetypeS=data.substring(P,i);
		if(chance&&!IS)chanceS=data.substring(P,i);
		if(rank&&MS){
			rankS=data.substring(P,i);
			P=i+2; //start the inner value
		}else if(chance&&IS){
			chanceS=data.substring(P,i);
			P=i+2; //start the inner value
		}else{S=false;}
		name=false;type=false;chance=false,archetype=false,rank=false;
	}else if(data.substring(i,i+4)=="<mob"&&!MS){ //start field
		MS=true;P=i+5;i+=4;
	}else if(data.substring(i,i+5)=="</mob"&&MS){ //end field
		MS=false;S=false;
		CO.spawns.push("{id:'"+data.substring(P,i)+"',type:'"+typeS+"',archetype:'"+archetypeS+"',rank:'"+rankS+"',chance:'"+chanceS+"'}");
		typeS='';chanceS='';archetypeS='';rankS='';
	}else if(data.substring(i,i+5)=="<item"&&!IS){ //start field
		IS=true;P=i+6;i+=5;
	}else if(data.substring(i,i+6)=="</item"&&IS){ //end field
		IS=false;S=false;
		CO.loot.push("{id:'"+(data.substring(P,i)||'?')+"',type:'"+typeS+"',chance:'"+chanceS+"'}");
		typeS='';chanceS='';
	}else if(data.substring(i,i+10)=="<req_level"&&!S){ //start field
		S=true;P=i+11;i+=10;
	}else if(data.substring(i,i+11)=="</req_level"&&S){ //end field
		CO.reqLevel=data.substring(P,i);S=false;
	}else if(data.substring(i,i+10)=="<max_level"&&!S){ //start field
		S=true;P=i+11;i+=10;
	}else if(data.substring(i,i+11)=="</max_level"&&S){ //end field
		CO.maxLevel=data.substring(P,i);S=false;
	}else if(data.substring(i,i+11)=="<population"&&!S){ //start field
		S=true;P=i+12;i+=11;
	}else if(data.substring(i,i+12)=="</population"&&S){ //end field
		CO.population=data.substring(P,i);S=false;
	}else if(data.substring(i,i+13)=="<environments"&&!S){ //start field
		S=true;P=i+14;i+=13;
	}else if(data.substring(i,i+14)=="</environments"&&S){ //end field
		CO.environments=data.substring(P,i);S=false;
	}else if(data.substring(i,i+9)=="</habitat"){ //end item
		output.push(CO);
		CO=template(); //indicate that the object was completed successfully
	} //end if
} //end for
/* Display */
var outputData=""
for(entry in output){
	outputData+="{name:\""+output[entry].name+"\",<br/>"+
	            "&nbsp;reqLevel:\""+output[entry].reqLevel+"\",<br/>"+
				"&nbsp;maxLevel:\""+output[entry].maxLevel+"\",<br/>"+
				"&nbsp;population:\""+output[entry].population+"\",<br/>"+
				"&nbsp;environments:["+output[entry].environments+"],<br/>"+
				"&nbsp;spawns:[<br/>&nbsp;&nbsp;"+output[entry].spawns.join(",<br/>&nbsp;&nbsp;")+"<br/>&nbsp;],<br/>"+
			    "&nbsp;loot:[<br/>&nbsp;&nbsp;"+output[entry].loot.join(",<br/>&nbsp;&nbsp;")+"<br/>&nbsp;]<br/>"+
			    "}";
	if(entry<output.length-1)outputData+=",<br/>";
} //end for
document.getElementById('pad').innerHTML=outputData;