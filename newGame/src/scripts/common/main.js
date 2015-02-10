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
  } //end if
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
  ctx.font = fontHeight + "px Courier New";
  ctx.fillStyle = "#FFF";
  var fontHeight = 18;
  var top = 100;
  var left = 100;
  var right = v.w - left;

  // Display center messaging if there are any messages in the cache
  ctx.textAlign = 'center';
  for(var i=0;i<outputCache.length;i++){
    ctx.fillText(outputCache[i], v.w/2, 18+fontHeight*i);
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
  setTimeout(function(){printCreatures(c1,c2);},100);
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