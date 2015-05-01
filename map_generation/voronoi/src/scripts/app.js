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
    ctx.font = window.fontSize + "px Courier New";
    ctx.textAlign = 'center';
    ctx.imageSmoothingEnabled = false;
  };

  // When the browser requires a redraw, or information is changed and
  // the app needs to update the view, call this function
  Easel.onDraw=function(){
    window.draw(); //pass in the custom drawing loop
  };

  // Instantiate the game engine
  window.engine = new Engine();

  // Image library
  window.library = {};
  window.library.logo = new Image();
  window.library.logo.src = 'http://imgur.com/eWA73Yo.png';
  window.library.logo.size = 150;
  window.library.logo.onload = function(){ Easel.redraw(); };

  // Instantiate the drawing loop
  window.draw = function(){
    "use strict";
    
    var cHeight=0;
    var print=function(str){
      ctx.fillText(str,v.w/2,window.library.logo.size+fontSize*(++cHeight));
    };//'http://i.imgur.com/McLpC3c.png

    ctx.drawImage(
      window.library.logo, //the image
      v.w/2-window.library.logo.size/2, //x
      0, //y
      window.library.logo.size, //width
      window.library.logo.size //height
    );
    ctx.fillStyle='#FFF';
    print('voronoi Version 0.1.0 by Nathaniel Inman');
    print('[[ ENGINE STATUS ]]');
    print('a   : '+window.engine.a());
    print('b   : '+window.engine.b());
    print('c   : '+window.engine.c());
    print('d   : '+window.engine.d());
    print('c.e : '+window.engine.c.e());
    print('c.f : '+window.engine.c.f());
  };

  // Go ahead and draw
  Easel.redraw();
} //end if
