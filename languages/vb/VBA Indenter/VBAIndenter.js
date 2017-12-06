var contentArea=document.getElementById('content');
var entityMap ={
	'<':'&lt;',
	'>':'&gt;'
};
var prefixOperatorAccepted={
	'a':1,'b':1,'c':1,'d':1,'e':1,'f':1,'g':1,'h':1,'i':1,'j':1,'h':1,'i':1,'j':1,'k':1,'l':1,'m':1,'n':1,'o':1,'p':1,'q':1,'r':1,'s':1,'t':1,'u':1,'v':1,'w':1,'x':1,'y':1,'z':1,
	'1':1,'2':1,'3':1,'4':1,'5':1,'6':1,'7':1,'8':1,'9':1,'0':1
};
var isNumber={
	'1':1,'2':1,'3':1,'4':1,'5':1,'6':1,'7':1,'8':1,'9':1,'0':1
};
var isLetter={
	'a':1,'b':1,'c':1,'d':1,'e':1,'f':1,'g':1,'h':1,'i':1,'j':1,'h':1,'i':1,'j':1,'k':1,'l':1,'m':1,'n':1,'o':1,'p':1,'q':1,'r':1,'s':1,'t':1,'u':1,'v':1,'w':1,'x':1,'y':1,'z':1
};
var escapeHtml=function(o){
	return String(o).replace(/[<>]/g,function(s){return entityMap[s];});
};
contentArea.onkeydown=function(e){
	var data='';
	if(!e){
		document.getElementById('content').innerHTML="Your browser is too old, or you're emulating an old browser. Please update";
	}else if(e.key=="Enter"){
		data=contentArea.innerHTML;
		data=escapeHtml(data);
		compile(data);
	} //end if
};
var compile=function(olddata){
	var newdata='',tabOrder=0,comment=false,string=false,then=false,length,dotOperator=false,notNumber=false,keyed=false;
	var addDebugger=false,highlightName=false,debuggerSet=false,hadError=false,drawNextErrorHeader=false;functionName='';
	var addTabs=function(returnInstead){
		myString='';
		for(var i=0;i<tabOrder;i++){
			myString+="&nbsp;&nbsp;&nbsp;&nbsp;"; //4 space tabs
		} //end for
		if(returnInstead){
			return myString;
		}else{
			newdata+=myString;
			return myString;
		} //end if
	};
	var addNewLine=function(){
		if(newdata.substring(newdata.length-5-addTabs(true).length,newdata.length)!=='<br/>'+addTabs(true)){
			newdata+="<br/>";
			addTabs();
		} //end if
	};
	for(var i=0;i<olddata.length;i++){
		if(!comment && !string && !dotOperator && olddata[i]==' '){notNumber=false;continue;}
		if(!comment && !string && olddata[i]=='_'){
			if(i>0&&olddata[i-1]==' '||i===0){ //variable names can't start with a _ so it must be a line return
				i++;
				continue;
			} //end if
		} //end if
		if(olddata[i]=='\n'||olddata[i]=='\r'){
			then=false;length=i;dotOperator=false;notNumber=false;keyed=false;
			if(comment){comment=false;newdata+="</span>";}
			addNewLine();
			if(drawNextErrorHeader){
				drawNextErrorHeader=false;
				newdata+="<span style='color:#F00;background-color:#300;'>On Error Goto Err_"+functionName+"</span>";
				addNewLine();
				continue;
			} //end if
			if(addDebugger){
				newdata+='<span style="color:#F00;background-color:#300;">debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""</span><br/>';
				addTabs();
				addDebugger=false;debuggerSet=true;
				continue;
			} //end if
			for(j=i+1;j<olddata.length;j++){
				if(olddata[j]=='\n'||olddata[j]=='\r'||olddata[j]==' '){
					i++;
				}else{
					break;
				} //end if
			}
		}else if(!debuggerSet && !string && !comment && olddata[i]=='d' && i+17<olddata.length && olddata.substring(i,i+17)=='debugger.Process '){
			for(j=i;j<olddata.length;j++){
				if(olddata[j]=='\n'||olddata[j]=='\r'){
					break;
				} //end if
			} //end for
			i=j+1;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+23<olddata.length && olddata.substring(i,i+23)=='Option Compare Database'){
			newdata+="<span style='color:#F53'>Option Compare Database</span>";i+=22;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+15<olddata.length && olddata.substring(i,i+15)=='Option Explicit'){
			newdata+="<span style='color:#F53'>Option Explicit</span>";i+=14;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+25<olddata.length && olddata.substring(i,i+25)=='Private Declare Function '){
			newdata+="<span style='color:#FF5'>Private Declare Function </span>";i+=24;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+24<olddata.length && olddata.substring(i,i+24)=='Public Declare Function '){
			newdata+="<span style='color:#FF5'>Public Declare Function </span>";i+=23;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+17<olddata.length && olddata.substring(i,i+17)=='Declare Function '){
			newdata+="<span style='color:#F9F'>Declare Function </span>";i+=16;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+17<olddata.length && olddata.substring(i,i+17)=='Private Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Private Function </span>";i+=16;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+16<olddata.length && olddata.substring(i,i+16)=='Public Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Public Function </span>";i+=15;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='G' && i+13<olddata.length && olddata.substring(i,i+13)=='Global Const '){
			newdata+="<span style='color:#FFF'>Global Const </span>";i+=12;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+13<olddata.length && olddata.substring(i,i+13)=='Public Const '){
			newdata+="<span style='color:#FFF'>Public Const </span>";i+=12;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='G' && i+7<olddata.length && olddata.substring(i,i+7)=='Global '){
			newdata+="<span style='color:#FFF'>Global </span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='C' && i+6<olddata.length && olddata.substring(i,i+6)=='Const '){
			newdata+="<span style='color:#FFF'>Const </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+12<olddata.length && olddata.substring(i,i+12)=='Private Sub '){
			newdata+="&nbsp;<br/><span style='color:#9FF'>Private Sub </span>";i+=11;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+11<olddata.length && olddata.substring(i,i+11)=='Public Sub '){
			newdata+="&nbsp;<br/><span style='color:#9FF'>Public Sub </span>";i+=10;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='F' && i+9<olddata.length && olddata.substring(i,i+9)=='Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Function </span>";i+=8;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+4<olddata.length && olddata.substring(i,i+4)=='Sub '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Sub </span>";i+=3;tabOrder++;highlightName=true;functionName='';newdata+="<span style='background-color:#135;color:#7AF;'>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+13<olddata.length && olddata.substring(i,i+13)=='Exit Function'){
			newdata+="<span style='color:#99F'>Exit Function</span>";i+=12;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+8<olddata.length && olddata.substring(i,i+8)=='Exit For'){
			newdata+="<span style='color:#0FF'>Exit For</span>";i+=7;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+7<olddata.length && olddata.substring(i,i+7)=='Exit Do'){
			newdata+="<span style='color:#0FF'>Exit Do</span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+8<olddata.length && olddata.substring(i,i+8)=='Exit Sub'){
			newdata+="<span style='color:#0FF'>Exit Sub</span>";i+=7;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='T' && i+17<olddata.length && olddata.substring(i,i+17)=='TransferDatabase '){
			newdata+="<span style='color:#0FF'>TransferDatabase </span>";i+=16;keyed=true;
		}else if(!string && !comment && olddata[i]=='E' && i+12<olddata.length && olddata.substring(i,i+12)=='End Function'){
			debuggerSet=false;keyed=true;
			if(!hadError){
				newdata+="<span style='color:#F00;background-color:#300;'>Err_"+functionName+":</span><br/>";
				addTabs();
				newdata+='<span style="color:#F00;background-color:#300;">debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""</span><br/>';
			}else{
				newdata=newdata.substring(0,newdata.length-addTabs(true).length);
			} //end if
			newdata+="<span style='color:#99F'>End Function</span>";i+=11;tabOrder--;hadError=false;
		}else if(!string && !comment && olddata[i]=='E' && i+7<olddata.length && olddata.substring(i,i+7)=='End Sub'){
			debuggerSet=false;keyed=true;
			if(!hadError){
				newdata+="<span style='color:#F00;background-color:#300;'>Err_"+functionName+":</span><br/>";
				addTabs();
				newdata+='<span style="color:#F00;background-color:#300;">debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""</span><br/>';
			}else{
				newdata=newdata.substring(0,newdata.length-addTabs(true).length);
			} //end if
			newdata+="<span style='color:#9FF'>End Sub</span>";i+=6;tabOrder--;hadError=false;
		}else if(!string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='If '){
			newdata+="<span style='color:#0FF'>If </span>";i+=2;tabOrder++;debuggerSet=false;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='N' && i+4<olddata.length && olddata.substring(i,i+4)=='New ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>New </span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+6<olddata.length && olddata.substring(i,i+6)=='End If' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>End If</span>";i+=5;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+8<olddata.length && olddata.substring(i,i+8)=='End With' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>End With</span>";i+=7;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='W' && i+4<olddata.length && olddata.substring(i,i+4)=='Wend' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Wend</span>";i+=3;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+7<olddata.length && olddata.substring(i,i+7)=='ElseIf ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>ElseIf </span>";i+=6;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+4<olddata.length && olddata.substring(i,i+4)=='Else' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Else</span>";i+=3;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='C' && i+9<olddata.length && olddata.substring(i,i+9)=='Case Else' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Case Else</span>";i+=8;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='C' && i+5<olddata.length && olddata.substring(i,i+5)=='Case ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Case </span>";i+=4;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+11<olddata.length && olddata.substring(i,i+11)=='Loop Until '){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Loop Until </span>";i+=10;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Loop' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Loop</span>";i+=3;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='N' && i+4<olddata.length && olddata.substring(i,i+4)=='Next' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-24);keyed=true;
			newdata+="<span style='color:#0FF'>Next </span>";i+=3;tabOrder--;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+10<olddata.length && olddata.substring(i,i+10)=='End Select' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata=newdata.substring(0,newdata.length-48);keyed=true;
			newdata+="<span style='color:#0FF'>End Select</span>";i+=9;tabOrder-=2;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+14<olddata.length && olddata.substring(i,i+14)=='On Error GoTo '){
			for(j=i;j<olddata.length;j++){
				if(olddata[j]=='\n'||olddata[j]=='\r'){
					i=j;break;
				} //end if
			} //end for
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+20<olddata.length && olddata.substring(i,i+20)=='On Error Resume Next'){
			newdata+="<span style='color:#0FF'>On Error Resume Next </span>";i+=19;keyed=true;
		}else if(!string && !comment && olddata[i]=='D' && i+5<olddata.length && olddata.substring(i,i+5)=='DoCmd'){
			newdata+="<span style='color:#0FF'>DoCmd</span>";i+=4;debuggerSet=false;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+4<olddata.length && olddata.substring(i,i+4)=='Dim '){
			if(!tabOrder){
				newdata+="<span style='color:#0FF'>Private </span>";i+=3;keyed=true;
			}else{
				newdata+="<span style='color:#0FF'>Dim </span>";i+=3;keyed=true;
			} //end if
		}else if(!debuggerSet && !string && !comment && olddata[i]=='R' && i+6<olddata.length && olddata.substring(i,i+6)=='ReDim ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>ReDim </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+9<olddata.length && olddata.substring(i,i+9)=='Preserve ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Preserve </span>";i+=8;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+5<olddata.length && olddata.substring(i,i+5)=='Open ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Open </span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='R' && i+11<olddata.length && olddata.substring(i,i+11)=='Resume Next'){
			newdata+="<span style='color:#0FF'>Resume Next</span>";i+=10;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='R' && i+7<olddata.length && olddata.substring(i,i+7)=='Resume ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Resume </span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='A' && i+6<olddata.length && olddata.substring(i,i+6)=='Alias ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Alias </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='B' && i+6<olddata.length && olddata.substring(i,i+6)=='ByRef ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> ByRef </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='B' && i+6<olddata.length && olddata.substring(i,i+6)=='ByVal ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> ByVal </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Lib ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Lib </span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='T' && i+4<olddata.length && olddata.substring(i,i+4)=='Then' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Then </span>";i+=3;then=true;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='T' && i+3<olddata.length && olddata.substring(i,i+3)=='To ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> To </span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='M' && i+4<olddata.length && olddata.substring(i,i+4)=='Mod ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Mod </span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+5<olddata.length && olddata.substring(i,i+5)=='Step ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Step </span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='In ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> In </span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+3<olddata.length && olddata.substring(i,i+3)=='Or ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> Or </span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='A' && i+4<olddata.length && olddata.substring(i,i+4)=='And ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> And </span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='A' && i+3<olddata.length && olddata.substring(i,i+3)=='As ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> As </span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+4<olddata.length && olddata.substring(i,i+4)=='Set ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Set </span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='W' && i+5<olddata.length && olddata.substring(i,i+5)=='With ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>With </span>";i+=4;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='F' && i+9<olddata.length && olddata.substring(i,i+9)=='For Each ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>For Each </span>";i+=8;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='F' && i+4<olddata.length && olddata.substring(i,i+4)=='For ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'> For </span>";i+=3;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='W' && i+6<olddata.length && olddata.substring(i,i+6)=='While ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>While </span>";i+=5;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+9<olddata.length && olddata.substring(i,i+9)=='Do Until ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Do Until </span>";i+=8;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+9<olddata.length && olddata.substring(i,i+9)=='Do While ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Do While </span>";i+=8;tabOrder++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+12<olddata.length && olddata.substring(i,i+12)=='Select Case ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Select Case </span>";i+=11;tabOrder+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='C' && i+3<olddata.length && olddata.substring(i,i+3)=='Chr' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Chr</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+4<olddata.length && olddata.substring(i,i+4)=='Err.' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Err</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='R' && i+7<olddata.length && olddata.substring(i,i+7)=='Replace' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Replace</span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='T' && i+4<olddata.length && olddata.substring(i,i+4)=='True' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>True</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='F' && i+5<olddata.length && olddata.substring(i,i+5)=='False' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>False</span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='C' && i+4<olddata.length && olddata.substring(i,i+4)=='Call' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Call</span>";i+=3;keyed=true;dotOperator=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+5<olddata.length && olddata.substring(i,i+5)=='Debug' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Debug</span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='P' && i+6<olddata.length && olddata.substring(i,i+6)=='Print ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Print </span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='G' && i+5<olddata.length && olddata.substring(i,i+5)=='GoTo ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>GoTo </span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+9<olddata.length && olddata.substring(i,i+9)=='Optional ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Optional </span>";i+=8;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='M' && i+7<olddata.length && olddata.substring(i,i+7)=='MsgBox ' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>MsgBox </span>";i+=6;keyed=true;dotOperator=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='M' && i+5<olddata.length && olddata.substring(i,i+5)=='MkDir' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>MkDir</span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+3<olddata.length && olddata.substring(i,i+3)=='Dir' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Dir</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+3<olddata.length && olddata.substring(i,i+3)=='Len' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Len</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='M' && i+3<olddata.length && olddata.substring(i,i+3)=='Mid' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Mid</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='IIf' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>IIf</span>";i+=2;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Left' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Left</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='R' && i+5<olddata.length && olddata.substring(i,i+5)=='Right' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#0FF'>Right</span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='I' && i+7<olddata.length && olddata.substring(i,i+7)=='Integer' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Integer</span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+6<olddata.length && olddata.substring(i,i+6)=='String' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>String</span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='B' && i+4<olddata.length && olddata.substring(i,i+4)=='Byte' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Byte</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='B' && i+7<olddata.length && olddata.substring(i,i+7)=='Boolean' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Boolean</span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Long' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Long</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='D' && i+6<olddata.length && olddata.substring(i,i+6)=='Double' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Double</span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='S' && i+5<olddata.length && olddata.substring(i,i+5)=='Short' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Short</span>";i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='O' && i+6<olddata.length && olddata.substring(i,i+6)=='Object' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Object</span>";i+=5;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='V' && i+7<olddata.length && olddata.substring(i,i+7)=='Variant' && !prefixOperatorAccepted[olddata[i-1]]){
			newdata+="<span style='color:#099'>Variant</span>";i+=6;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]==':' && i+2<olddata.length && olddata.substring(i,i+2)==':='){
			newdata+="<span style='color:#57C'>:=</span>";i++;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='&' && i+8<olddata.length && olddata.substring(i,i+8)=='&lt;&gt;'){
			newdata+="<span style='color:#57C'>&nbsp;&lt;&gt;&nbsp;</span>";i+=7;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='&' && i+4<olddata.length && olddata.substring(i,i+4)=='&lt;'){
			newdata+="<span style='color:#57C'>&nbsp;&lt;&nbsp;</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='&' && i+4<olddata.length && olddata.substring(i,i+4)=='&gt;'){
			newdata+="<span style='color:#57C'>&nbsp;&gt;&nbsp;</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='"' && i+3<olddata.length && olddata.substring(i,i+3)=='"""'){
			string^=1;keyed=true;i+=2;
			if(string){
				newdata+="<span style='color:#396'>\"\"\"";
			}else{
				newdata+="\" </span>";
			} //end if
		}else if(!debuggerSet && !string && !comment && olddata[i]=='"' && i+4<olddata.length && olddata.substring(i,i+4)=='""""'){
			newdata+="<span style='color:#FFF'>\"\"\"\"</span>";i+=3;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='&' && i+5<olddata.length && olddata.substring(i,i+5)=='&amp;'){
			if(!isNaN(olddata[i-1])&&olddata[i-1]!=' '){
				newdata+="<span style='color:#57C'>&amp;&nbsp;</span>"; //used as a pointer
			}else{
				newdata+="<span style='color:#57C'>&nbsp;&amp;&nbsp;</span>"; //used as concatentation
			} //end if
			if(i-length>100){
				length=i;
				newdata+="<span style='color:#F00'>_</span><br/>";
				for(j=0;j<=tabOrder;j++){
					newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
				} //end for
			} //end if
			i+=4;keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+5<olddata.length && olddata.substring(i,i+5)=='Exit_'||
				 !debuggerSet && !string && !comment && olddata[i]=='e' && i+5<olddata.length && olddata.substring(i,i+5)=='exit_'){
			//check to make sure it's a label
			for(j=i;j<olddata.length;j++){
				if(olddata[j]==':'){ //this was the exit label remove the line
					i=j;break;
				}else if(olddata[j]=='\n'||olddata[j]=='\r'){ //not a label
					i+=4;break;
				} //end if
			} //end if
			keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='E' && i+4<olddata.length && olddata.substring(i,i+4)=='Err_'||
			     !debuggerSet && !string && !comment && olddata[i]=='e' && i+4<olddata.length && olddata.substring(i,i+4)=='err_'){
			//check to make sure it's a label
			for(j=i;j<olddata.length;j++){
				if(olddata[j]==':'){ //this was the exit label, add debugger on the next line
					hadError=true;addDebugger=true;break;
				}else if(olddata[j]=='\n'||olddata[j]=='\r'){ //not a label
					i+=3;break;
				}
			} //end for
			keyed=true;
			if(addDebugger){
				newdata+="<span style='color:#F00;background-color:#300;'>Err_"+functionName+":</span>";
				i=j;
			} //end if
		}else if(!debuggerSet && !string && !comment && olddata[i]=='('){
			if(highlightName){highlightName=false;drawNextErrorHeader=true;newdata+="</span>";}
			newdata+="<span style='color:#57C'>(</span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]==')'){
			newdata+="<span style='color:#57C'>)</span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='*'){
			newdata+="<span style='color:#57C'> * </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='-'){
			newdata+="<span style='color:#57C'> - </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='+'){
			newdata+="<span style='color:#57C'> + </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='.'){
			newdata+="<span style='color:#57C'>.</span>";dotOperator=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='['){
			newdata+="<span style='color:#57C'> [ </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]==']'){
			newdata+="<span style='color:#57C'> ] </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='!'){
			newdata+="<span style='color:#57C'>!</span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='/'){
			newdata+="<span style='color:#57C'> / </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]=='='){
			newdata+="<span style='color:#57C'> = </span>";keyed=true;
		}else if(!debuggerSet && !string && !comment && olddata[i]==','){
			newdata+="<span style='color:#57C'>, </span>";keyed=true;
			if(i-length>100){
				length=i;
				newdata+="<span style='color:#F00'>_</span><br/>";
				for(j=0;j<=tabOrder;j++){
					newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
				}
			}
		}else if(!debuggerSet && !string && !comment && olddata[i]=="'"){
			comment=true;then=false;keyed=true;
			newdata+="<span style='color:#0F0'>'";
		}else if(!debuggerSet && !comment && olddata[i]=='"' && olddata.length>i+1 && olddata[i+1]=='"'){
			newdata+='""';i++;keyed=true;
		}else if(!debuggerSet && !comment && olddata[i]=='"'){
			string^=1;keyed=true;
			if(string){
				newdata+="<span style='color:#396'> \"";
			}else{
				newdata+="\" </span>";
			} //end if
		}else if(!debuggerSet && !string && !comment && isNumber[olddata[i]]){
			keyed=true;
			if(notNumber||isLetter[olddata[i-1]]){ //number is a suffix of a variable name, don't highlight it
				notNumber=true;
				newdata+=olddata[i];
			}else{
				newdata+="<span style='color:#F80'>"+olddata[i]+"</span>";
			} //end if
		}else if(!debuggerSet){
			if(highlightName){functionName+=olddata[i];}
			newdata+=olddata[i];
			if(then&&olddata[i]!=' '&&!comment){tabOrder--;then=false;}
			if(!keyed){
				keyed=true;
				dotOperator=true;
			} //end if
			if(i-length>100&&string){
				length=i;
				if(string)newdata+="\"</span> ";
				newdata+="<span style='color:#57C'>&amp; </span><span style='color:#F00'>_</span><br/>";
				for(j=0;j<tabOrder;j++){
					newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
				}
				if(string){newdata+="<span style='color:#396'>\"";}
			}
		} //end if
	} //end for
	var result=document.getElementById('result');
	result.innerHTML=newdata;
	contentArea.style.visibility='hidden';
	result.style.visibility='visible';
};