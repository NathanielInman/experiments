// Initialize the phaser object
var dayCycle = new Phaser(
  100,
  'dawn',
  [
    {
      current: {r:  0,g:  0,b:  0},
      dawn:    {r:119,g:153,b:187},
      daytime: {r:204,g:238,b:255},
      dusk:    {r:135,g: 51,b: 85},
      midnight:{r:  0,g:  0,b: 17}
    },{
      current: {r:  0,g:  0,b:  0},
      dawn:    {r:153,g: 85,b: 51},
      daytime: {r:170,g: 85,b: 51},
      dusk:    {r:  0,g: 17,b: 34},
      midnight:{r:153,g: 87,b: 22}
    }
  ],
  ctx,
  function(){
    return [0,0,v.w,v.h];
  },
  function(){
    return ctx.createLinearGradient(0,0,0,v.h/5*4);
  }
);

// on easel redraw have phaser draw it's components and then precache the next
// frame
Easel.onDraw = function(){
  dayCycle.drawNext(true);
};

// the main entrypoint to the application, it establishes a main loop by calling
// easel redraw. When easel redraws, it fires the onDraw method
function app() {
  "use strict";

  Easel.redraw()
  setTimeout(app,16);
} //end app()
