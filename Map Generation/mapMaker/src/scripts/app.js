import { Easel } from 'common/easel';
import { Engine } from 'engine/core';

if(!Easel.activated){
  document.getElementById('noscript').innerHTML =
  `<p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  // Hide the no script overlay
  document.getElementById('noscript').style.visibility='hidden';

  // When resizing or reloading canvas re-configure the font sizes
  // and other factors that are lost at reload
  Easel.config=function(){
    window.fontRatio = 0.02; //scale the font to the size of the window
    window.fontSize = (v.w * fontRatio)|0; //scale size based solely on viewport width
    window.scrollOffset = 0; //this is used to scroll the main text during overflow
    //ctx.font = window.fontSize + "px Courier New";
    ctx.font = '10px Courier New';
    ctx.textAlign = 'left';
    ctx.imageSmoothingEnabled = false;
  };

  // When the browser requires a redraw, or information is changed and
  // the app needs to update the view, call this function
  Easel.onDraw=function(){
    window.draw(); //pass in the custom drawing loop
  };

  // Instantiate the game engine
  window.engine = new Engine();
  window.engine.enabled = {};
  window.engine.enabled.totalVnums = 0;
  ctx.strokeStyle="#555";
  for(let x = 1; x< v.w;x+=50){ ctx.moveTo(x,0);ctx.lineTo(x,v.h); }
  for(let y = 1; y< v.h;y+=50){ ctx.moveTo(0,y);ctx.lineTo(v.w,y); }

  // Instantiate the drawing loop
  window.draw = function(){
    "use strict";

    // Clean the canvas
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,v.w,v.h);

    // Draw the outlines and then draw the selected squares
    ctx.stroke();
    var o = window.engine.enabled;
    for(let i in o){
      if(o[i].enabled){
        // fill square
        ctx.fillStyle="#222";
        ctx.fillRect(o[i].c*50,o[i].r*50,50,50);

        // bottom arrow
        ctx.moveTo(o[i].c*50+25,o[i].r*50+35);
        ctx.lineTo(o[i].c*50+25,o[i].r*50+48);
        ctx.lineTo(o[i].c*50+20,o[i].r*50+43);
        ctx.moveTo(o[i].c*50+25,o[i].r*50+48);
        ctx.lineTo(o[i].c*50+30,o[i].r*50+43);

        // top arrow
        ctx.moveTo(o[i].c*50+25,o[i].r*50+15);
        ctx.lineTo(o[i].c*50+25,o[i].r*50+ 2);
        ctx.lineTo(o[i].c*50+20,o[i].r*50+ 7);
        ctx.moveTo(o[i].c*50+25,o[i].r*50+ 2);
        ctx.lineTo(o[i].c*50+30,o[i].r*50+ 7);

        // left arrow
        ctx.moveTo(o[i].c*50+15,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+ 2,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+ 7,o[i].r*50+20);
        ctx.moveTo(o[i].c*50+ 2,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+ 7,o[i].r*50+30);

        // right arrow
        ctx.moveTo(o[i].c*50+35,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+48,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+43,o[i].r*50+20);
        ctx.moveTo(o[i].c*50+48,o[i].r*50+25);
        ctx.lineTo(o[i].c*50+43,o[i].r*50+30);

        // draw the vnum on the bottom left of the square
        ctx.fillStyle="#fff";
        ctx.fillText(o[i].vnum,3+o[i].c*50,(1+o[i].r)*50-3);
      } //end if
    }
    ctx.stroke();
  };

  // Add an event listener to the canvas so we can pass clicked sectors
  C.addEventListener('click', function(e) {
    var collection = window.engine.enabled;
    var column = Math.floor(e.x/50), row = Math.floor(e.y/50);
    var key = column+':'+row;
    if(collection[key]&&collection[key].enabled){
      collection[key].enabled=false;
    }else{
      if(!collection[key])collection.totalVnums++;
      collection[key]={
        c: column,
        r: row,
        enabled: true,
        vnum: collection.totalVnums
      }
    }
    Easel.redraw();
  }, false);

  // Go ahead and draw
  Easel.redraw();
} //end if
