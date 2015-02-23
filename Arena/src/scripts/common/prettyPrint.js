/**
 * prettyPrint is a function that giving text and a location to print it will abstract colors
 * out of it and print it to the screen
 *
 * @param  {String} text The string of text that needs to be displayed to the screen pretty printed
 * @return {VOID}   prettyPrint returns no value
 */
function prettyPrint(text,x,y){
  var lastColor = [];
  if(!text){ return;}
  text='{W|'+text; //apply a default swatch color
  for(var i=0;i<=text.length;++i){
    ch=text.charAt(i);
    if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='R'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#F00");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='r'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#800");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='G'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#0F0");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='g'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#080");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='C'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#0FF");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='c'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#088");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='B'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#00F");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='b'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#008");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='M'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#F0F");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='m'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#808");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='Y'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#FF0");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='y'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#880");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='X'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#FFF");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='x'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#333");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='W'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#AAA");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='w'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#777");i+=2;
    }else if(i<=text.length-3&&ch=='{'&&text.charAt(i+1)=='x'&&text.charAt(i+2)=='|'){
      lastColor.push(ctx.fillStyle="#333");i+=2;
    }else if(i<=text.length-2&&ch=='|'&&text.charAt(i+1)=='}'){
      lastColor.pop();ctx.fillStyle=lastColor[lastColor.length-1];i+=1;
    }else{
      ctx.fillText(ch,x,y);
      x+=ctx.measureText(ch).width;
    } //end if
  }
  ctx.fillStyle="#FFF";
}
