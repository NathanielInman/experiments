import { Easel  } from 'common/easel';
import { Engine } from 'engine/core';
import { jQuery } from 'vendor/jquery-2.1.3.min';

if(!Easel.activated){
  document.getElementById('noscript').innerHTML =
  `<p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  // Debugging variables
  window.easel = Easel; //pull to outer scope

  // Establish an instance of the engine
  window.engine = new Engine();

  // remove the no script overlay
  $('#noscript').remove();

  // When resizing or reloading canvas re-configure the font sizes
  // and other factors that are lost at reload
  Easel.config=function(){
    window.fontRatio = 0.02; //scale the font to the size of the window
    window.fontSize = (v.w * fontRatio)|0; //scale size based solely on viewport width
    window.scrollOffset = 0; //this is used to scroll the main text during overflow
    //ctx.font = window.fontSize + "px Courier New";
    ctx.imageSmoothingEnabled = false;
  };

  // When the browser requires a redraw, or information is changed and
  // the app needs to update the view, call this function
  Easel.onDraw=function(){
    engine.draw(); //pass in the custom drawing loop
  };

  // Add an event listener to the canvas so we can pass clicked sectors
  $(C).on('mousedown', engine.input.mousedown);
  $(C).on('mouseup', engine.input.mouseup);
  $(C).on('mousemove', engine.input.mousemove);
  $(D).keydown(engine.input.keydown);
  $('#environments').click(engine.input.environmentClick);
  $('#changeEnvironment').click(function(){
    if($('#environments').is(':visible')){
      $('#environments').hide();
    }else{
      $('#environments').show();
    } //end if
  });
  // Go ahead and draw
  Easel.redraw();
} //end if
