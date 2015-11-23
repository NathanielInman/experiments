function cmdKeyDown(){
  if(event.keyCode==13){
    var message=document.getElementById("cmd").value;
    document.getElementById("cmd").value="";
    core.process(message);
  } //end if
} //end cmdKeyDown()
function enterKeyDown(){
  var message=document.getElementById("cmd").value;
  document.getElementById("cmd").value=""; 
  core.process(message);
} //end enterKeyDown(){

