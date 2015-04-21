// Begin the actual module by importing modules
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

// Notate the loading of the module in the debugger
$('.debug').append('<br/>loading controllers/components/button.js [::hex2rgba]');

// All exports
export var button = {
  draw:function(options){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||200,
        h = options.h||40,
        r = options.r||20,
        t = options.t||'default',
        c = options.c||'#999',
        o = options.o||'#000',
        v = options.v||false;
        d = options.d||false;

    // Acquire the appropriate colors for the button
    ctx.strokeStyle=o;
    ctx.fillStyle=(function(){
      var s1=1.5,s2=1,s3=0.6;
      var grd = ctx.createLinearGradient(0, y, 0, h+y);
      if(v){ s1*=1.2;s2*=1.2;s3*=1.2; } //if we're hovering, raise the shading levels
      if(d){ s1*=0.9;s2*=0.9;s3*=0.9; } //if we're being pressed, lower the shading levels
      grd.addColorStop('0.00', hex2rgba(c,{r:s1,g:s1,b:s1},0.5));
      grd.addColorStop('0.30', hex2rgba(c,{r:s2,g:s2,b:s2},0.5));
      grd.addColorStop('0.60', hex2rgba(c,{r:s3,g:s3,b:s3},0.5));
      return grd;
    })();

    // Draw button
    ctx.roundRect(x,y,w,h,r,true);

    // Setup and draw the button text
    ctx.fillStyle='#000';
    ctx.textAlign = 'center';
    ctx.font = '30px Courier New';
    ctx.fillText(t,x+w/2,y+30);

    // Complete any listeners that were applied to the button
    if(d&&options.onClick)options.onClick();
  }
};
