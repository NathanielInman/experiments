var app = function(){
  /**
   * Waterfall starts at the top of the screen and trails downward.
   * I gave it the bounce in-out tween to make it look a little neat.
   * tweens 1-10 are a more realistic waterfall.
   *
   * @type {Class} Utilizes the Ion class library ion.js
   */
  var waterfall            = new Ion(1000);
  	waterfall.sx         = function(){return v.w/2;};
  	waterfall.sy         = 0;
  	waterfall.dx         = function(){return v.w/2;};
  	waterfall.dy         = function(){return v.h;};
  	waterfall.wx         = function(){return r(0,3)-1.5;};
  	waterfall.wy         = 0;
  	waterfall.size       = function(){return r(1,3);};
  	waterfall.tween_type = 35;
  	waterfall.onEscape   = function(id){this.onEnd(id);};
  	waterfall.onEnd      = function(id){
  		this.particle[id].x  = this.particle[id].sx=v.w/2;
  		this.particle[id].y  = this.particle[id].sy=0;
  		this.particle[id].dx = v.w/2;
  		this.particle[id].dy = v.h;
  		this.particle[id].c  = 0;
  	};
  	waterfall.populate();
  	waterfall.process();
};

/**
 * Main anonymous function that launches the web application
 * if easel was able to create a canvas (if it's supported)
 */
(function(noscript){
  if(!Easel.activated){
   noscript.innerHTML =
   `<p class="browsehappy">
       You are using an outdated browser. Please
     <a href="http://browsehappy.com/"> upgrade your browser</a>
       to improve your experience.
     <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
   </p>`;
  }else{
    noscript.style.visibility='hidden';
    app();
  } //end if
})(document.getElementById('noscript'));
