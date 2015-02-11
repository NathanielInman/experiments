/**
 * The tick function is the main recursive function that continues until one of the
 * creatures is dead.
 *
 * @return {VOID} tick returns no value, but recurses until a creature is dead.
 */
function tick(c1,c2) {
  "use strict";

  if(r(0,2,1)===0){ //c1 -> c2
    outputCache.push(c1.process(c2));
    outputCache.push(c2.process(c1));
  }else{ //c2 -> c1
    outputCache.push(c2.process(c1));
    outputCache.push(c1.process(c2));
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