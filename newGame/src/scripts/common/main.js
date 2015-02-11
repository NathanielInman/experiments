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
var heightOffset = 0;
ctx.font = fontHeight + "px Courier New";
ctx.textAlign = 'center';

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
  for(var i=0,j=0;i<outputCache.length;i++){
    if(outputCache[i] instanceof Array){
      for(var k=0;k<outputCache[i].length;k++){
        prettyPrint(outputCache[i][k],fontHeight,10+fontHeight+fontHeight*i+fontHeight*j-heightOffset);
        j++;
      } //end for
      j--;
    }else{
      prettyPrint(outputCache[i],fontHeight,10+fontHeight+fontHeight*i+fontHeight*j-heightOffset);
    }
  } //end for
  if(10+fontHeight+fontHeight*i+fontHeight*j-heightOffset>v.h/2)heightOffset+=fontHeight;

  ctx.fillStyle='#333';
  ctx.fillRect(v.w/4*3,0,10,v.h); //vertical separator
  ctx.fillRect(v.w/4*3,v.h/2,v.w/4,10); //horizontal separator
  // Display Creature One
  ctx.fillStyle='#400';
  ctx.fillRect(v.w/4*3+10,fontHeight+10,v.w/4,fontHeight);
  ctx.fillRect(v.w/4*3+10,fontHeight+20+v.h/2,v.w/4,fontHeight);
  ctx.fillStyle='#F00';
  ctx.fillRect(v.w/4*3+10,fontHeight+10,      v.w/4/c1.healthMax*(c1.health<0?0:c1.health),fontHeight);
  ctx.fillRect(v.w/4*3+10,fontHeight+20+v.h/2,v.w/4/c2.healthMax*(c2.health<0?0:c2.health),fontHeight);
  ctx.fillStyle='#FFF';
  
  ctx.fillText(c1.name, v.w-v.w/8, fontHeight);

  prettyPrint('|w|Weight|C|: |W|' + c1.weight, v.w-v.w/4+20, 10 + fontHeight * 3);
  prettyPrint('|w|Height|C|: |W|' + c1.height, v.w-v.w/4+20, 10 + fontHeight * 4);
  prettyPrint('|w|Health|C|: |W|' + c1.health+'/'+c1.healthMax, v.w-v.w/4+20, 10 + fontHeight * 5);
  prettyPrint('|w|Damage|C|: |W|' + c1.damage, v.w-v.w/4+20, 10 + fontHeight * 6);
  prettyPrint('|w|Symbol|C|: |W|' + c1.symbol, v.w-v.w/4+20, 10 + fontHeight * 7);

  // Display Creature Two
  ctx.fillText(c2.name, v.w-v.w/8, v.h/2+10+fontHeight);
  prettyPrint('|w|Weight|C|: |W|' + c2.weight, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 3);
  prettyPrint('|w|Height|C|: |W|' + c2.height, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 4);
  prettyPrint('|w|Health|C|: |W|' + c2.health+'/'+c2.healthMax, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 5);
  prettyPrint('|w|Damage|C|: |W|' + c2.damage, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 6);
  prettyPrint('|w|Symbol|C|: |W|' + c2.symbol, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 7);
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