var app = function(){
  /**
   * The first demo was the original purpose of me creating the library. An interesting
   * result of moving particles with certain tweening algorithms can cause one to believe
   * their movements have purposes. I called it gnats.
   *
   * @type {Class} Utilizes the Ion class library ion.js
   */
  var gnats=new Ion(1000);
  	gnats.sx             = function(){return r(0,v.w);};
  	gnats.sy             = function(){return r(0,v.h);};
  	gnats.dx             = function(){return r(0,v.w);};
  	gnats.dy             = function(){return r(0,v.h);};
  	gnats.wx             = function(){return r(0,1)-0.5;};
  	gnats.wy             = function(){return r(0,1)-0.5;};
  	gnats.size           = function(){return r(0,2);};
  	gnats.tween_type     = 6;
  	gnats.onEscape       = function(atom){this.onEnd(atom);};
  	gnats.onEnd          = function(atom){
  		this.particle[atom].x = this.particle[atom].sx = gnats.sx();
  		this.particle[atom].y = this.particle[atom].sy = gnats.sy();
  		this.particle[atom].dx =gnats.dx();
  		this.particle[atom].dy =gnats.dy();
  		this.particle[atom].wx =gnats.wx();
  		this.particle[atom].wy =gnats.wy();
  		this.particle[atom].c  =0;
  	};
  	gnats.populate();
  	gnats.process();
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
