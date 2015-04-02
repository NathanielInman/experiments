import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

export var combobox = {
  draw:function(options){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||200,
        h = options.h||40,
        r = options.r||20,
        t = options.t||['default'],
        c = options.c||'#999',
        o = options.o||'#000',
        i = options.i||0,  //index of the text array
        v = options.v||false;
        d = options.d||false;

    // Now draw the menu if the down arrow was pressed
    ctx.strokeStyle=o;
    if(d)(function(){
      var n = i - 5 < 0 ? 0 : i - 5,j=0;
      ctx.fillStyle=hex2rgba(c,1,0.1,0.2);
      if(t.length>10)ctx.roundRect(x,y+h,w,11*30+12,r,true); //draw background
      ctx.fillStyle=hex2rgba(c,1,0.7,0.9);
      for(;n<t.length&&j<=10;n++,j++){
        ctx.fillText(t[n],x+w/2,y+h+30*j+30);
      } //end for
    })();

    // Acquire the appropriate colors for the button
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

    // Draw the down arrow
    ctx.beginPath();
    ctx.fillStyle='#000';
    ctx.moveTo(x+w-35,y+  10);
    ctx.lineTo(x+w-25,y+h-10);
    ctx.lineTo(x+w-15,y+  10);
    ctx.lineTo(x+w-35,y+  10);
    ctx.fill();

    // Setup and draw the button text
    ctx.fillStyle='#000';
    ctx.textAlign = 'center';
    ctx.font = '30px Courier New';
    ctx.fillText(t[i]+'['+(i+1)+'/'+t.length+']',x+w/2,y+30);
  }
};
