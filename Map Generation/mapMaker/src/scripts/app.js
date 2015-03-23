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

  // Instantiate the drawing loop
  window.draw = function(){
    "use strict";

    // Clean the canvas
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,v.w,v.h);

    // Draw the outlines and then draw the selected squares
    ctx.strokeStyle="#555";ctx.beginPath();
    for(let x = 1; x< v.w;x+=50){ ctx.moveTo(x,0);ctx.lineTo(x,v.h); }
    for(let y = 1; y< v.h;y+=50){ ctx.moveTo(0,y);ctx.lineTo(v.w,y); }
    ctx.stroke();
    var o = window.engine.enabled;
    for(let i in o){
      if(o[i].enabled){
        // fill square
        ctx.fillStyle="#222";
        ctx.fillRect(o[i].c*50,o[i].r*50,50,50);

        // bottom arrow
        if(o[i].south){
          ctx.moveTo(o[i].c*50+25,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+25,o[i].r*50+48);
          ctx.lineTo(o[i].c*50+20,o[i].r*50+43);
          ctx.moveTo(o[i].c*50+25,o[i].r*50+48);
          ctx.lineTo(o[i].c*50+30,o[i].r*50+43);
        } //end if

        // top arrow
        if(o[i].north){
          ctx.moveTo(o[i].c*50+25,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+25,o[i].r*50+ 2);
          ctx.lineTo(o[i].c*50+20,o[i].r*50+ 7);
          ctx.moveTo(o[i].c*50+25,o[i].r*50+ 2);
          ctx.lineTo(o[i].c*50+30,o[i].r*50+ 7);
        } //end if

        // left arrow
        if(o[i].west){
          ctx.moveTo(o[i].c*50+25,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+ 2,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+ 7,o[i].r*50+20);
          ctx.moveTo(o[i].c*50+ 2,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+ 7,o[i].r*50+30);
        } //end if

        // right arrow
        if(o[i].east){
          ctx.moveTo(o[i].c*50+25,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+48,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+43,o[i].r*50+20);
          ctx.moveTo(o[i].c*50+48,o[i].r*50+25);
          ctx.lineTo(o[i].c*50+43,o[i].r*50+30);
        } //end if

        // draw the vnum on the bottom left of the square
        ctx.fillStyle="#fff";
        ctx.fillText(o[i].vnum,3+o[i].c*50,(1+o[i].r)*50-3);
      } //end if
    }
    ctx.stroke();
  };

  // Add an event listener to the canvas so we can pass clicked sectors
  C.addEventListener('mousedown', function(e){
    window.engine.clickX = Math.floor(e.x/50);
    window.engine.clickY = Math.floor(e.y/50);
  });
  C.addEventListener('mouseup', function(e){
    var dX = window.engine.clickX;
    var dY = window.engine.clickY;
    var uX = Math.floor(e.x/50);
    var uY = Math.floor(e.y/50);
    var linkSector = function(dir){
      var keyA = dX+":"+dY;
      var keyB = uX+":"+uY;
      var collection = window.engine.enabled;
      if(collection[keyA]&&collection[keyB]){ //only link sectors that exist
        if(dir=='north'){
          collection[keyA].north=true;collection[keyB].south=true;
        }else if(dir=='south'){
          collection[keyA].south=true;collection[keyB].north=true;
        }else if(dir=='east'){
          collection[keyA].east=true;collection[keyB].west=true;
        }else if(dir=='west'){
          collection[keyA].west=true;collection[keyB].east=true;
        } //end if
      } //end if
    };
    var addSector = function(dir){
      var key = uX+":"+uY;
      var collection = window.engine.enabled;
      if(collection[key]&&collection[key].enabled){
        collection[key].enabled=false;
        if(collection[key].north){
          collection[key].north=false;
          collection[uX+":"+(uY-1)].south=false;
        } //end if
        if(collection[key].south){
          collection[key].south=false;
          collection[uX+":"+(uY+1)].north=false;
        } //end if
        if(collection[key].west){
          collection[key].west=false;
          collection[(uX-1)+":"+uY].east=false;
        } //end if
        if(collection[key].east){
          collection[key].east=false;
          collection[(uX+1)+":"+uY].west=false;
        } //end if
      }else{
        if(!collection[key]){ //not created yet, make it now
          collection.totalVnums++;
          collection[key]={
            c: uX,
            r: uY,
            enabled: true,
            north: dir=='north'?true:false,
            south: dir=='south'?true:false,
            east: dir=='east'?true:false,
            west: dir=='west'?true:false,
            vnum: collection.totalVnums
          };
        }else{ //created previously but disabled, re-enable it
          collection[key].enabled=true;
        } //end if
      } //end if
    };

    if(uX == dX && uY == dY){
      addSector();
    }else if(uX == dX +1 && uY == dY){
      linkSector('east');
    }else if(uX == dX -1 && uY == dY){
      linkSector('west');
    }else if(uX == dX && uY == dY +1){
      linkSector('south');
    }else if(uX == dX && uY == dY -1){
      linkSector('north');
    } //end if
    Easel.redraw();
  });

  // Go ahead and draw
  Easel.redraw();
} //end if
