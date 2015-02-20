/**
 * prettyPrint is a function that giving text and a location to print it will abstract colors
 * out of it and print it to the screen
 * 
 * @param  {String} text The string of text that needs to be displayed to the screen pretty printed
 * @return {VOID}   prettyPrint returns no value
 */
function prettyPrint(text,x,y){
  if(typeof text=='object')text=text.join();
  if(!text){ console.log('FAILED');return;}
  for(var i=0;i<=text.length;++i){
    ch=text.charAt(i);
    if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='R'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#F00";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='r'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#800";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='G'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#0F0";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='g'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#080";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='C'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#0FF";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='c'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#088";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='B'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#00F";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='b'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#008";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='M'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#F0F";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='m'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#808";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='Y'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#FF0";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='y'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#880";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='X'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#FFF";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='x'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#333";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='W'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#AAA";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='w'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#777";
      ch=text.charAt(i+3);i+=3;
    }else if(i<text.length-3&&ch=='|'&&text.charAt(i+1)=='x'&&text.charAt(i+2)=='|'){
      ctx.fillStyle="#333";
      ch=text.charAt(i+3);i+=3;
    }
    ctx.fillText(ch,x,y);
    x+=ctx.measureText(ch).width;
  }
  ctx.fillStyle="#FFF";
}