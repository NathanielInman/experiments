var app = function(){
  /**
   * Color holds the current draw color as r,g,b, the target color, and
   * holds a function generate() that creates a new target color once the last
   * target color was reached
   *
   * @type {Object}
   */
  var color={
  	r:128,
  	g:128,
  	b:128,
  	generate:function(){
  		return {r:(100,256,false),g:r(100,256,false),b:r(100,256,false)};
  	},
  	target:{r:128,g:128,b:128}
  };

  /**
   * This nest demo constantly keeps 1000 ions on the screen and gives them tails with
   * a transparent overlay trick. The end effect is particles that explode out from a center
   * and trail upward
   *
   * @type {Class} Ion utilizes the ion.js library
   */
  var nest            = new Ion(1000);
  	nest.color      = 'rgba(128,128,128,0.5)';
  	nest.clear      = false;
  	nest.sx         = function(){return r(v.w/2-50,v.w/2+50);};
  	nest.sy         = function(){return r(v.h/5*4-50,v.h/5*4+50);};
  	nest.dx         = v.w/2;
  	nest.dy         = 0;
  	nest.wx         = function(){return r(0,3)-1.5;};
  	nest.wy         = function(){return r(0,3)-1.5;};
  	nest.size       = function(){return r(1,3);};
  	nest.tween_type = function(){return r(19,20,false);};
  	nest.onEnd      = function(id){this.particle.splice(id,1,this.getNew(id));};
  	nest.onEscape   = function(id){this.particle.splice(id,1,this.getNew(id));};
  	nest.getNew     = function(atom){
  		var sx=this.sx(atom);
  		var sy=this.sy(atom);
  		var wx=sx>v.w/2?r(0,1.5):r(0,1.5)-1.5;
  		var wy=sy>v.h/2?r(0,1.5):r(0,1.5)-1.5;
  		return {
  			id:atom, //be able to reference each particle individually outside of the class
  			sx:sx,
  			sy:sy,
  			x:sx,
  			y:sy,
  			dx:typeof this.dx=='function'?this.dx(atom):this.dx,
  			dy:typeof this.dy=='function'?this.dy(atom):this.dy,
  			c:typeof this.tween_current=='function'?this.tween_current(atom):this.tween_current,
  			d:500,
  			tt:typeof this.tween_type=='function'?this.tween_type(atom):this.tween_type,
  			s:typeof this.size=='function'?this.size(atom):this.size,
  			wx:wx,
  			wy:wy
  		};
  	};
  	nest.populate();
  	nest.process();

  /**
   * The following setInterval grabs a target color by color.generate() and reaches that target by
   * incrementing or decrementing any color by one that is not the destination amount. This allows colors
   * to phase almost seamlessly into their targets.
   *
   * @return {Void} This function doesn't return a result
   */
  setInterval(function(){
  	if(color.r==color.target.r &&
  	   color.g==color.target.g &&
  	   color.b==color.target.b){
  		tcolor=color.generate();
  	}else{
  		if(color.r<color.target.r){color.r++;}else if(color.r>color.target.r){color.r--;}
  		if(color.g<color.target.g){color.g++;}else if(color.g>color.target.g){color.g--;}
  		if(color.b<color.target.b){color.b++;}else if(color.b>color.target.b){color.b--;}
  	} //end if
  	nest.color='rgba('+color.r+','+color.g+','+color.b+',0.5)';
  },50);

  /**
   * The following setInterval clears the screen with a 20% transparent black box every 50ms. It
   * gives the illusion that the moving rectangles have a trail behind them. It's an interesting result
   * but due to the transparency can cause lag on slower browsers or computers.
   *
   * @return {Void} This function doesn't return a result
   */
  setInterval(function(){ctx.fillStyle='rgba(0,0,0,0.2)';ctx.fillRect(0,0,v.w,v.h);},50);
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
