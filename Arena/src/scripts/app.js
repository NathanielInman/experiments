/**
 * Main anonymous function that launches the web application
 */
(function(){
  "use strict";

  var status=''; // This will hold the error text if features are missing from the browser
  if(!Modernizr.borderradius){
      status+="<br/>Border radius isn't supported in your browser.";
  } //end if
  if(!Modernizr.canvas){
      status+="<br/>Canvas isn't supported in your browser.";
  } //end if
  if(!Modernizr.csstransitions){
      status+="<br/>CSS3 transitions aren't supported in your browser.";
  } //end if
  if(!status.length){
    document.getElementById('noscript').style.visibility='hidden';
    app();
  }else{
    ETB.$('noscript').innerHTML = `<p class="browsehappy">You are using an outdated browser.
      Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
      <span style="color:red;">${status}</span></p><div class="btn" onmousedown="
      document.getElementById('noscript').style.visibility='hidden';app();"
      >Continue Anyways</div>`;
  } //end if

  //Enter/Exit the fullscreen mode by clicking the canvas
  document.getElementsByTagName('canvas')[0].addEventListener('click', function requestFullScreen() {
    console.log('fullscreen = '+window.fullscreen);
    var req, e = document, el = e.body;
    if(window.fullscreen){
      window.fullscreen = false;el = e;
      req = e.exitFullscreen || e.msExitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen;
    }else{
      window.fullscreen = true;
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
})();
