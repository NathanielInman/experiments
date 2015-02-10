/*
 * ┏━━━┳┓      ┏┓      ┏┳┓ ┏┳━━━┳━━━┓
 * ┃┏━┓┃┃      ┃┃      ┃┃┃ ┃┃┏━┓┃┏━┓┃
 * ┃┗━━┫┃┏┓┏┳━━┫┗━┓    ┃┃┃ ┃┃┃ ┗┫┗━━┓
 * ┗━━┓┃┃┃┃┃┃━━┫┏┓┃  ┏┓┃┃┃ ┃┃┃┏━╋━━┓┃
 * ┃┗━┛┃┗┫┗┛┣━━┃┃┃┃  ┃┗┛┃┗━┛┃┗┻━┃┗━┛┃
 * ┗━━━┻━┻━━┻━━┻┛┗┛  ┗━━┻━━━┻━━━┻━━━┛
 * The following few lines are to help jshint linting
 **********************************/

// JSHint Linting supplications
var ctx = ctx || function() {};
var v = v || {
  w: 0,
  h: 0
};
var r = r || function() {};
var Ion = Ion || function() {};
var outputCache=[];
var fontHeight = 16;
ctx.font = fontHeight + "px Courier New";

/**
 * The tick function is the main recursive function that continues until one of the
 * creatures is dead.
 *
 * @return {VOID} tick returns no value, but recurses until a creature is dead.
 */
function tick(c1,c2) {
  "use strict";

  if(r(0,2,1)===0){ //c1 -> c2
    outputCache.push(c1.default(c2));
    outputCache.push(c2.default(c1));
  }else{ //c2 -> c1
    outputCache.push(c2.default(c1));
    outputCache.push(c1.default(c2));
  } //end if
  if (c1.health > 0 && c2.health > 0) {
    setTimeout(function() {
      tick(c1,c2);
    }, 1000);
  }else{
    if(c1.health<=0){
      outputCache.push('|w|'+c1.name+' dies.');
    }else if(c2.health<=0){
      outputCache.push('|w|'+c2.name+' dies.');
    } //end if
  } //end if
}

/**
 * prettyPrint is a function that giving text and a location to print it will abstract colors
 * out of it and print it to the screen
 * 
 * @param  {String} text The string of text that needs to be displayed to the screen pretty printed
 * @return {VOID}   prettyPrint returns no value
 */
function prettyPrint(text,x,y){
  if(typeof text=='object')text=text.join();
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
/**
 * The printCreatures function is a utility function that prints the creatures
 *
 * @return {VOID} the printCreatures function returns no value
 */
function printCreatures(c1,c2) {
  "use strict";

  // Variable Initialization and Dimensioning
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, v.w, v.h);
  var top = 100;
  var left = 100;
  var right = v.w - left;

  // Display center messaging if there are any messages in the cache
  ctx.textAlign = 'center';
  for(var i=0,j=0;i<outputCache.length;i++){
    if(outputCache[i] instanceof Array){
      for(var k=0;k<outputCache[i].length;k++){
        prettyPrint(outputCache[i][k],v.w/4,18+fontHeight*i+fontHeight*j);
        j++;
      } //end for
      j--;
    }else{
      prettyPrint(outputCache[i],v.w/4,18+fontHeight*i+fontHeight*j);
    }
  } //end for

  // Display Creature One
  ctx.textAlign = 'left';
  ctx.fillText(c1.name, left, top);
  ctx.fillText('Weight: ' + c1.weight, left, top + fontHeight);
  ctx.fillText('Height: ' + c1.height, left, top + fontHeight * 2);
  ctx.fillText('Health: ' + c1.health, left, top + fontHeight * 3);
  ctx.fillText('Damage: ' + c1.damage, left, top + fontHeight * 4);
  ctx.fillText('Symbol: ' + c1.symbol, left, top + fontHeight * 5);

  // Display Creature Two
  ctx.textAlign = 'right';
  ctx.fillText(c2.name, right, top);
  ctx.fillText('Weight: ' + c2.weight, right, top + fontHeight);
  ctx.fillText('Height: ' + c2.height, right, top + fontHeight * 2);
  ctx.fillText('Health: ' + c2.health, right, top + fontHeight * 3);
  ctx.fillText('Damage: ' + c2.damage, right, top + fontHeight * 4);
  ctx.fillText('Symbol: ' + c2.symbol, right, top + fontHeight * 5);
  setTimeout(function(){printCreatures(c1,c2);},500);
} //end printCreatures()

/**
 * The main application function
 *
 * @type {VOID} Function returns no value
 */
function app() {
  "use strict";

  //Setup the two creatures that will attack each other
  var c1 = new Database.Creature();
  var c2 = new Database.Creature();
  tick(c1,c2);
  printCreatures(c1,c2); //begin updating of the view
} //end app()