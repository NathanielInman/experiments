import { map } from 'engine/data-model/map';

export var pane = {
  draw:function(options){
    // Initialize variables
    var x = options.x||0, //origin x location
        y = options.y||0, //origin y location
        w = options.w||200, //width
        h = options.h||40, //height
        r = options.r||20, //radius size
        c = options.c||'#999', //background color
        o = options.o||'#000'; //outline color

    ctx.fillStyle=c;ctx.strokeStyle=o;
    ctx.roundRect(x,y,w,h,r,true);
  }
}
