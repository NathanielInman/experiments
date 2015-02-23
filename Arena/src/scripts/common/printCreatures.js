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
  if(10+fontHeight+fontHeight*i+fontHeight*j-heightOffset>v.h/5*4)heightOffset+=fontHeight;

  ctx.fillStyle='#000';
  ctx.fillRect(v.w/4*3,0,v.w/4,v.h); //clean the right side so text doesn't accidentally flow into characters
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

  prettyPrint('|w|Weight    |C|: |W|' + c1.weight, v.w-v.w/4+20, 10 + fontHeight * 3);
  prettyPrint('|w|Height    |C|: |W|' + c1.height, v.w-v.w/4+20, 10 + fontHeight * 4);
  prettyPrint('|w|Health    |C|: |W|' + c1.health+'/'+c1.healthMax, v.w-v.w/4+20, 10 + fontHeight * 5);
  prettyPrint('|w|Damage    |C|: |W|' + c1.damage, v.w-v.w/4+20, 10 + fontHeight * 6);
  prettyPrint('|w|Symbol    |C|: |W|' + c1.symbol, v.w-v.w/4+20, 10 + fontHeight * 7);
  prettyPrint('|w|Class     |C|: |W|' + c1.class.name, v.w-v.w/4+20, 10 + fontHeight * 8);
  prettyPrint('|w|Specialty |C|: |W|' + c1.class.specialty, v.w-v.w/4+20, 10 + fontHeight * 9);
  prettyPrint('|w|Affects   |C|: ', v.w-v.w/4+20, 10 + fontHeight * 10);
  //Print all of the effects for the first creature
  (function(c,l){
    for(var effect in c.effects){
      if(c.effects[effect].stacks){
        prettyPrint('|w|'+effect+'|R|('+c.effects[effect].stacks+')|c|: |W|'+c.effects[effect].timer,v.w-v.w/4+40,10+fontHeight*++l);
      }else{
        prettyPrint('|w|'+effect+'|c|: |W|'+c.effects[effect].timer,v.w-v.w/4+40,10+fontHeight*++l);
      } //end if
    } //end for
  })(c1,10);

  // Display Creature Two
  ctx.fillText(c2.name, v.w-v.w/8, v.h/2+10+fontHeight);
  prettyPrint('|w|Weight    |C|: |W|' + c2.weight, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 3);
  prettyPrint('|w|Height    |C|: |W|' + c2.height, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 4);
  prettyPrint('|w|Health    |C|: |W|' + c2.health+'/'+c2.healthMax, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 5);
  prettyPrint('|w|Damage    |C|: |W|' + c2.damage, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 6);
  prettyPrint('|w|Symbol    |C|: |W|' + c2.symbol, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 7);
  prettyPrint('|w|Class     |C|: |W|' + c1.class.name, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 8);
  prettyPrint('|w|Specialty |C|: |W|' + c1.class.specialty, v.w-v.w/4+20, 20+v.h/2 + fontHeight * 9);
  prettyPrint('|w|Affects   |C|: ', v.w-v.w/4+20, 20+v.h/2 + fontHeight * 10);
  //Print all of the effects for the first creature
  (function(c,l){
    for(var effect in c.effects){
      if(c.effects[effect].stacks){
        prettyPrint('|w|'+effect+'|R|('+c.effects[effect].stacks+')|c|: |W|'+c.effects[effect].timer,v.w-v.w/4+40,20+v.h/2+fontHeight*++l);
      }else{
        prettyPrint('|w|'+effect+'|c|: |W|'+c.effects[effect].timer,v.w-v.w/4+40,20+v.h/2+fontHeight*++l);
      } //end if
    } //end for
  })(c2,10);

  ctx.drawImage(images.get("SpriteSheet"), 9*32,0*32,32,32,0, 0,360,360);
  setTimeout(function(){printCreatures(c1,c2);},100);
} //end printCreatures()
