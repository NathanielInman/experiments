function cmdKeyDown(){
  if(event.keyCode==13){
    enterKeyDown();
  } //end if
} //end cmdKeyDown()
function enterKeyDown(){
  var message=document.getElementById('cmd').value;
  document.getElementById('cmd').value=''; 
  document.getElementById('output').innerHTML='';
  core.outputData=[];
  core.process(message);
} //end enterKeyDown(){

