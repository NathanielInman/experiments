Easel.config = function(){
  ctx.fontRatio = 0.2;
  ctx.textAlign = 'center';
  ctx.fontSize = Math.min(v.w,v.h)*ctx.fontRatio;
  ctx.font = ctx.fontSize + 'px Impact, Charcoal, sans-serif';
};

Easel.onDraw = function(){
  ctx.fillStyle = h2r(color.cur,1,0.3,0.4);
  ctx.fillRect(0, 0, v.w, v.h);
  ctx.fillStyle = h2r(color.cur,1,0.5,0.6);
  ctx.fillText(color.cur,v.w/2,v.h/2+ctx.fontSize/4);
};

var color = {
  cur: rndHex(),
  tar: rndHex()
};

/**
 * app - main entry point into the application, calls the initial render
 * function
 *
 * @return {type}  description
 */
function app() {
  "use strict";

  if(color.cur!==color.tar){
    let c = h2r(color.cur,{o:1});
    let t = h2r(color.tar,{o:1});
    c.r=c.r<t.r?++c.r:c.r>t.r?--c.r:c.r;
    c.g=c.g<t.g?++c.g:c.g>t.g?--c.g:c.g;
    c.b=c.b<t.b?++c.b:c.b>t.b?--c.b:c.b;
    color.cur='#'+[c.r,c.g,c.b].map((x)=>x.toString(16)).map((x)=>x.length<2?'0'+x:x).join('');
    if(!(c.r^t.r&&c.g^t.g&&c.b^t.b))color.tar=rndHex();
  }else{
    color.tar=rndHex();
  } //end if
  Easel.redraw();
  setTimeout(app,10);
} //end app()
