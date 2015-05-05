var app = function(){
  /**
   * Flame appears at a location and works its way upward.
   *
   * @type {Class} Utilizes the Ion class library ion.js
   */
  var origin={
  	v:v.w/2,
  	d:0
  };
  var flame                = new Ion(200);
  	flame.color          = 'rgba(250,150,0,0.2)';
  	flame.sx             = function(){return origin.v+r(0,v.w/16)-v.w/32;};
  	flame.sy             = function(){return v.h/4*3;};
  	flame.dx             = function(){return origin.v;};
  	flame.dy             = function(){return v.h/2;};
  	flame.wx             = function(){return r(0,0.5)-0.25;};
  	flame.wy             = function(){return r(0,2)-2;};
  	flame.size           = function(){return r(1,3);};
  	flame.tween_type     = function(){return r(10,20,false);};
  	flame.tween_duration = function(){return r(300,600,false);};
  	flame.onEscape       = function(id){this.onEnd(id);};
  	flame.onEnd          = function(id){
  		this.particle[id].x  = this.particle[id].sx= flame.sx();
  		this.particle[id].y  = this.particle[id].sy= flame.sy();
  		this.particle[id].dx = flame.dx();
  		this.particle[id].dy = flame.dy();
  		this.particle[id].c  = 0;
  	};
  	flame.m              = function(atom){
  		var p=this.particle[atom];
  		if(p.c>p.d*0.15){ //reset after we reach 15%
  			this.onEnd(atom);
  		}else{
  			p.s=30-30/p.d*p.c;
  		} //end if
  	};
  	flame.populate();
  	flame.process();
  	setInterval(function(){
  		if(origin.d===0){
  			origin.v--;
  		}else{
  			origin.v++;
  		} //end if
  		if(origin.v<100||origin.v>v.w-100)origin.d^=1;
  	},10);
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
