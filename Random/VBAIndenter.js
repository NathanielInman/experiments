var contentArea=document.getElementById('content');
contentArea.onkeydown=function(e){
	if(e.key=="Enter"){compile();}
};
var compile=function(){
	var olddata=contentArea.innerHTML.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/<br\/>/g,'/n').replace(/<br>/g,'&lt;br&gt;');
	var newdata='',tabOrder=0,comment=false,string=false,then=false,length;
	for(var i=0;i<olddata.length;i++){
		if(!comment && !string && olddata[i]==' ')continue;
		if(!comment && !string && olddata[i]=='_'){i++;continue;}
		if(olddata[i]=='\n'||olddata[i]=='\r'){
			newdata+="<br/>";then=false;length=i;
			if(string){string=false;newdata+="</span>";}
			if(comment){comment=false;newdata+="</span>";}
			for(var j=0;j<tabOrder;j++){
				newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
			}
			for(j=i+1;j<olddata.length;j++){
				if(olddata[j]=='\n'||olddata[j]=='\r'||olddata[j]==' '){
					i++;
				}else{
					break;
				} //end if
			}
		}else if(!string && !comment && olddata[i]=='O' && i+23<olddata.length && olddata.substring(i,i+23)=='Option Compare Database'){
			newdata+="<span style='color:#F53'>Option Compare Database</span>";i+=22;
		}else if(!string && !comment && olddata[i]=='O' && i+15<olddata.length && olddata.substring(i,i+15)=='Option Explicit'){
			newdata+="<span style='color:#F53'>Option Explicit</span>";i+=14;
		}else if(!string && !comment && olddata[i]=='P' && i+25<olddata.length && olddata.substring(i,i+25)=='Private Declare Function '){
			newdata+="<span style='color:#FF5'>Private Declare Function </span>";i+=24;
		}else if(!string && !comment && olddata[i]=='P' && i+24<olddata.length && olddata.substring(i,i+24)=='Public Declare Function '){
			newdata+="<span style='color:#FF5'>Public Declare Function </span>";i+=23;
		}else if(!string && !comment && olddata[i]=='D' && i+17<olddata.length && olddata.substring(i,i+17)=='Declare Function '){
			newdata+="<span style='color:#F9F'>Declare Function </span>";i+=16;
		}else if(!string && !comment && olddata[i]=='P' && i+17<olddata.length && olddata.substring(i,i+17)=='Private Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Private Function </span>";i+=16;tabOrder++;
		}else if(!string && !comment && olddata[i]=='P' && i+16<olddata.length && olddata.substring(i,i+16)=='Public Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Public Function </span>";i+=15;tabOrder++;
		}else if(!string && !comment && olddata[i]=='G' && i+13<olddata.length && olddata.substring(i,i+13)=='Global Const '){
			newdata+="<span style='color:#FFF'>Global Const </span>";i+=12;
		}else if(!string && !comment && olddata[i]=='P' && i+13<olddata.length && olddata.substring(i,i+13)=='Public Const '){
			newdata+="<span style='color:#FFF'>Public Const </span>";i+=12;
		}else if(!string && !comment && olddata[i]=='P' && i+12<olddata.length && olddata.substring(i,i+12)=='Private Sub '){
			newdata+="&nbsp;<br/><span style='color:#9FF'>Private Sub </span>";i+=11;tabOrder++;
		}else if(!string && !comment && olddata[i]=='P' && i+11<olddata.length && olddata.substring(i,i+11)=='Public Sub '){
			newdata+="&nbsp;<br/><span style='color:#9FF'>Public Sub </span>";i+=10;tabOrder++;
		}else if(!string && !comment && olddata[i]=='F' && i+9<olddata.length && olddata.substring(i,i+9)=='Function '){
			newdata+="&nbsp;<br/><span style='color:#99F'>Function </span>";i+=8;tabOrder++;
		}else if(!string && !comment && olddata[i]=='E' && i+13<olddata.length && olddata.substring(i,i+13)=='Exit Function'){
			newdata+="<span style='color:#99F'>Exit Function</span>";i+=12;
		}else if(!string && !comment && olddata[i]=='E' && i+8<olddata.length && olddata.substring(i,i+8)=='Exit For'){
			newdata+="<span style='color:#0FF'>Exit For</span>";i+=7;
		}else if(!string && !comment && olddata[i]=='E' && i+12<olddata.length && olddata.substring(i,i+12)=='End Function'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#99F'>End Function</span>";i+=11;tabOrder--;
		}else if(!string && !comment && olddata[i]=='E' && i+7<olddata.length && olddata.substring(i,i+7)=='End Sub'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#9FF'>End Sub</span>";i+=6;tabOrder--;
		}else if(!string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='If '){
			newdata+="<span style='color:#0FF'>If </span>";i+=2;tabOrder++;
		}else if(!string && !comment && olddata[i]=='E' && i+6<olddata.length && olddata.substring(i,i+6)=='End If'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>End If</span>";i+=5;tabOrder--;
		}else if(!string && !comment && olddata[i]=='E' && i+8<olddata.length && olddata.substring(i,i+8)=='End With'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>End With</span>";i+=7;tabOrder--;
		}else if(!string && !comment && olddata[i]=='E' && i+7<olddata.length && olddata.substring(i,i+7)=='ElseIf '){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>ElseIf </span>";i+=6;
		}else if(!string && !comment && olddata[i]=='E' && i+4<olddata.length && olddata.substring(i,i+4)=='Else'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>Else</span>";i+=3;
		}else if(!string && !comment && olddata[i]=='C' && i+5<olddata.length && olddata.substring(i,i+5)=='Case '){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>Case </span>";i+=4;
		}else if(!string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Loop'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>Loop</span>";i+=3;tabOrder--;
		}else if(!string && !comment && olddata[i]=='N' && i+4<olddata.length && olddata.substring(i,i+4)=='Next'){
			newdata=newdata.substring(0,newdata.length-24);
			newdata+="<span style='color:#0FF'>Next</span>";i+=3;tabOrder--;
		}else if(!string && !comment && olddata[i]=='E' && i+10<olddata.length && olddata.substring(i,i+10)=='End Select'){
			newdata=newdata.substring(0,newdata.length-48);
			newdata+="<span style='color:#0FF'>End Select</span>";i+=9;tabOrder-=2;
		}else if(!string && !comment && olddata[i]=='O' && i+14<olddata.length && olddata.substring(i,i+14)=='On Error GoTo '){
			newdata+="<span style='color:#0FF'>On Error Goto </span>";i+=13;
		}else if(!string && !comment && olddata[i]=='O' && i+20<olddata.length && olddata.substring(i,i+20)=='On Error Resume Next'){
			newdata+="<span style='color:#0FF'>On Error Resume Next </span>";i+=19;
		}else if(!string && !comment && olddata[i]=='D' && i+4<olddata.length && olddata.substring(i,i+4)=='Dim '){
			newdata+="<span style='color:#0FF'>Dim </span>";i+=3;
		}else if(!string && !comment && olddata[i]=='R' && i+11<olddata.length && olddata.substring(i,i+11)=='Resume Next'){
			newdata+="<span style='color:#0FF'>Resume Next</span>";i+=10;
		}else if(!string && !comment && olddata[i]=='R' && i+6<olddata.length && olddata.substring(i,i+6)=='Resume'){
			newdata+="<span style='color:#0FF'>Resume </span>";i+=5;
		}else if(!string && !comment && olddata[i]=='A' && i+6<olddata.length && olddata.substring(i,i+6)=='Alias '){
			newdata+="<span style='color:#0FF'>Alias </span>";i+=5;
		}else if(!string && !comment && olddata[i]=='B' && i+6<olddata.length && olddata.substring(i,i+6)=='ByRef '){
			newdata+="<span style='color:#0FF'> ByRef </span>";i+=5;
		}else if(!string && !comment && olddata[i]=='B' && i+6<olddata.length && olddata.substring(i,i+6)=='ByVal '){
			newdata+="<span style='color:#0FF'> ByVal </span>";i+=5;
		}else if(!string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Lib '){
			newdata+="<span style='color:#0FF'> Lib </span>";i+=3;
		}else if(!string && !comment && olddata[i]=='T' && i+4<olddata.length && olddata.substring(i,i+4)=='Then'){
			newdata+="<span style='color:#0FF'> Then </span>";i+=3;then=true;
		}else if(!string && !comment && olddata[i]=='T' && i+3<olddata.length && olddata.substring(i,i+3)=='To '){
			newdata+="<span style='color:#0FF'> To </span>";i+=2;
		}else if(!string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='In '){
			newdata+="<span style='color:#0FF'> In </span>";i+=2;
		}else if(!string && !comment && olddata[i]=='O' && i+3<olddata.length && olddata.substring(i,i+3)=='Or '){
			newdata+="<span style='color:#0FF'> Or </span>";i+=2;
		}else if(!string && !comment && olddata[i]=='A' && i+4<olddata.length && olddata.substring(i,i+4)=='And '){
			newdata+="<span style='color:#0FF'> And </span>";i+=3;
		}else if(!string && !comment && olddata[i]=='A' && i+3<olddata.length && olddata.substring(i,i+3)=='As '){
			newdata+="<span style='color:#0FF'> As </span>";i+=2;
		}else if(!string && !comment && olddata[i]=='S' && i+4<olddata.length && olddata.substring(i,i+4)=='Set '){
			newdata+="<span style='color:#0FF'>Set </span>";i+=3;
		}else if(!string && !comment && olddata[i]=='W' && i+5<olddata.length && olddata.substring(i,i+5)=='With '){
			newdata+="<span style='color:#0FF'>With </span>";i+=4;tabOrder++;
		}else if(!string && !comment && olddata[i]=='F' && i+9<olddata.length && olddata.substring(i,i+9)=='For Each '){
			newdata+="<span style='color:#0FF'>For Each </span>";i+=8;tabOrder++;
		}else if(!string && !comment && olddata[i]=='F' && i+4<olddata.length && olddata.substring(i,i+4)=='For '){
			newdata+="<span style='color:#0FF'>For </span>";i+=3;tabOrder++;
		}else if(!string && !comment && olddata[i]=='D' && i+9<olddata.length && olddata.substring(i,i+9)=='Do Until '){
			newdata+="<span style='color:#0FF'>Do Until </span>";i+=8;tabOrder++;
		}else if(!string && !comment && olddata[i]=='D' && i+9<olddata.length && olddata.substring(i,i+9)=='Do While '){
			newdata+="<span style='color:#0FF'>Do While </span>";i+=8;tabOrder++;
		}else if(!string && !comment && olddata[i]=='S' && i+12<olddata.length && olddata.substring(i,i+12)=='Select Case '){
			newdata+="<span style='color:#0FF'>Select Case </span>";i+=11;tabOrder+=2;
		}else if(!string && !comment && olddata[i]=='C' && i+3<olddata.length && olddata.substring(i,i+3)=='Chr'){
			newdata+="<span style='color:#0FF'>Chr</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='E' && i+4<olddata.length && olddata.substring(i,i+4)=='Err.'){
			newdata+="<span style='color:#0FF'>Err</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='R' && i+7<olddata.length && olddata.substring(i,i+7)=='Replace'){
			newdata+="<span style='color:#0FF'>Replace</span>";i+=6;
		}else if(!string && !comment && olddata[i]=='T' && i+4<olddata.length && olddata.substring(i,i+4)=='True'){
			newdata+="<span style='color:#0FF'>True</span>";i+=3;
		}else if(!string && !comment && olddata[i]=='F' && i+6<olddata.length && olddata.substring(i,i+6)=='False'){
			newdata+="<span style='color:#0FF'>False</span>";i+=4;
		}else if(!string && !comment && olddata[i]=='D' && i+5<olddata.length && olddata.substring(i,i+5)=='Debug'){
			newdata+="<span style='color:#0FF'>Debug</span>";i+=4;
		}else if(!string && !comment && olddata[i]=='P' && i+6<olddata.length && olddata.substring(i,i+6)=='Print '){
			newdata+="<span style='color:#0FF'>Print </span>";i+=5;
		}else if(!string && !comment && olddata[i]=='O' && i+9<olddata.length && olddata.substring(i,i+9)=='Optional '){
			newdata+="<span style='color:#0FF'>Optional </span>";i+=8;
		}else if(!string && !comment && olddata[i]=='M' && i+7<olddata.length && olddata.substring(i,i+7)=='MsgBox '){
			newdata+="<span style='color:#0FF'>MsgBox </span>";i+=6;
		}else if(!string && !comment && olddata[i]=='M' && i+5<olddata.length && olddata.substring(i,i+5)=='MkDir'){
			newdata+="<span style='color:#0FF'>MkDir</span>";i+=4;
		}else if(!string && !comment && olddata[i]=='D' && i+3<olddata.length && olddata.substring(i,i+3)=='Dir'){
			newdata+="<span style='color:#0FF'>Dir</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='L' && i+3<olddata.length && olddata.substring(i,i+3)=='Len'){
			newdata+="<span style='color:#0FF'>Len</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='M' && i+3<olddata.length && olddata.substring(i,i+3)=='Mid'){
			newdata+="<span style='color:#0FF'>Mid</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='I' && i+3<olddata.length && olddata.substring(i,i+3)=='IIf'){
			newdata+="<span style='color:#0FF'>IIf</span>";i+=2;
		}else if(!string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Left'){
			newdata+="<span style='color:#0FF'>Left</span>";i+=3;
		}else if(!string && !comment && olddata[i]=='R' && i+5<olddata.length && olddata.substring(i,i+5)=='Right'){
			newdata+="<span style='color:#0FF'>Right</span>";i+=4;
		}else if(!string && !comment && olddata[i]=='I' && i+7<olddata.length && olddata.substring(i,i+7)=='Integer'){
			newdata+="<span style='color:#099'>Integer</span>";i+=6;
		}else if(!string && !comment && olddata[i]=='S' && i+6<olddata.length && olddata.substring(i,i+6)=='String'){
			newdata+="<span style='color:#099'>String</span>";i+=5;
		}else if(!string && !comment && olddata[i]=='B' && i+4<olddata.length && olddata.substring(i,i+4)=='Byte'){
			newdata+="<span style='color:#099'>Byte</span>";i+=3;
		}else if(!string && !comment && olddata[i]=='L' && i+4<olddata.length && olddata.substring(i,i+4)=='Long'){
			newdata+="<span style='color:#099'>Long</span>";i+=3;
		}else if(!string && !comment && olddata[i]=='D' && i+6<olddata.length && olddata.substring(i,i+6)=='Double'){
			newdata+="<span style='color:#099'>Double</span>";i+=5;
		}else if(!string && !comment && olddata[i]=='S' && i+5<olddata.length && olddata.substring(i,i+5)=='Short'){
			newdata+="<span style='color:#099'>Short</span>";i+=4;
		}else if(!string && !comment && olddata[i]=='O' && i+6<olddata.length && olddata.substring(i,i+6)=='Object'){
			newdata+="<span style='color:#099'>Object</span>";i+=5;
		}else if(!string && !comment && olddata[i]=='O' && i+7<olddata.length && olddata.substring(i,i+7)=='Variant'){
			newdata+="<span style='color:#099'>Variant</span>";i+=6;
		}else if(!string && !comment && olddata[i]=='('){
			newdata+="<span style='color:#57C'>(</span>";
		}else if(!string && !comment && olddata[i]==')'){
			newdata+="<span style='color:#57C'>)</span>";
		}else if(!string && !comment && olddata[i]=='*'){
			newdata+="<span style='color:#57C'>*</span>";
		}else if(!string && !comment && olddata[i]=='-'){
			newdata+="<span style='color:#57C'>-</span>";
		}else if(!string && !comment && olddata[i]=='+'){
			newdata+="<span style='color:#57C'>+</span>";
		}else if(!string && !comment && olddata[i]=='.'){
			newdata+="<span style='color:#57C'>.</span>";
		}else if(!string && !comment && olddata[i]=='['){
			newdata+="<span style='color:#57C'>[</span>";
		}else if(!string && !comment && olddata[i]==']'){
			newdata+="<span style='color:#57C'>]</span>";
		}else if(!string && !comment && olddata[i]=='!'){
			newdata+="<span style='color:#57C'>!</span>";
		}else if(!string && !comment && olddata[i]=='/'){
			newdata+="<span style='color:#57C'>/</span>";
		}else if(!string && !comment && olddata[i]=='='){
			newdata+="<span style='color:#57C'> = </span>";
		}else if(!string && !comment && olddata[i]==','){
			newdata+="<span style='color:#57C'>, </span>";
			if(i-length>100){
				length=i;
				newdata+="<span style='color:#F00'>_</span><br/>";
				for(j=0;j<=tabOrder;j++){
					newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
				}
			}
		}else if(!string && !comment && olddata[i]=='&'){
			if(!isNaN(olddata[i-1])&&olddata[i-1]!=' '){
				newdata+="<span style='color:#57C'>&amp; </span>";
			}else{
				newdata+="<span style='color:#57C'> &amp; </span>";
			}
			if(i-length>100){
				length=i;
				newdata+="<span style='color:#F00'>_</span><br/>";
				for(j=0;j<=tabOrder;j++){
					newdata+='&nbsp;&nbsp;&nbsp;&nbsp;'; //4 space tabs
				}
			}
		}else if(!string && !comment && olddata[i]=='>'){
			newdata+="<span style='color:#57C'> &gt; </span>";
		}else if(!string && !comment && olddata[i]=='<'){
			newdata+="<span style='color:#57C'> &lt; </span>";
		}else if(!string && !comment && olddata[i]=="'"){
			comment=true;then=false;
			newdata+="<span style='color:#0F0'>'";
		}else if(olddata[i]=='"'){
			string^=1;
			if(string){
				newdata+="<span style='color:#396'> \"";
			}else{
				newdata+="\" </span>";
			} //end if
		}else if(!string && !comment && !isNaN(olddata[i])){
			newdata+="<span style='color:#F80'>"+olddata[i]+"</span>";
		}else{
			newdata+=olddata[i];
			if(then){tabOrder--;then=false;}
		}
	}
	var result=document.getElementById('result');
	result.innerHTML=newdata;
	contentArea.style.visibility='hidden';
	result.style.visibility='visible';
};