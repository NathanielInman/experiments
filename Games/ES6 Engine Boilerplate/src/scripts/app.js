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
  document.getElementById('noscript').style.visibility='hidden';
  var myEngineInstance = new Engine();
  var fontRatio = 0.02;
  var fontSize = v.w * fontRatio;
  ctx.fillStyle='#FFF';
  ctx.fillText('starting',10,fontSize*1);
  ctx.fillText(myEngineInstance.a(),10,fontSize*2);
  ctx.fillText(myEngineInstance.b(),10,fontSize*3);
  ctx.fillText(myEngineInstance.c(),10,fontSize*4);
  ctx.fillText(myEngineInstance.d(),10,fontSize*5);
  ctx.fillText(myEngineInstance.c.e(),10,fontSize*6);
  ctx.fillText(myEngineInstance.c.f(),10,fontSize*7);
  ctx.fillText('done',10,fontSize*8);
} //end if

/*
  //Enter/Exit the fullscreen mode by clicking the canvas
  document.getElementsByTagName('canvas')[0].addEventListener('click', function requestFullScreen() {
    var req, e = document, el = e.body;
    if($$.fullscreen){
      $$.fullscreen = false;el = e;
      req = e.exitFullscreen || e.msExitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen;
    }else{
      $$.fullscreen = true;
      req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    } //end if
    if (req) { // Native full screen.
      req.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      (function(wscript){
        if (wscript !== null) wscript.SendKeys("{F11}");
      })(new ActiveXOBject("WScript.Shell"));
    } //end if
  }, false);
  */
