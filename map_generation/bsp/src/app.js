import { easel } from "lib/easel";

var headerText = '  Version 0.1.0 by Nathaniel Inman';

easel.config = function(){
  ctx.textAlign = 'center';
  ctx.font = '24px Impact';
};

easel.redraw = function(){
  // clear screen
  ctx.fillStyle='black';
  ctx.fillRect(0,0,v.w,v.h);

  // draw jspm logo
  ctx.strokeStyle='#959595';
  ctx.fillStyle='#EDDA8D';
  ctx.lineWidth=20;
  ctx.lineCap='round';
  ctx.moveTo(v.w/2,v.h/2+v.h/4);
  ctx.lineTo(v.w/2-v.w/8,v.h/2+v.h/8);
  ctx.lineTo(v.w/2-v.w/8,v.h/2-v.h/8);
  ctx.lineTo(v.w/2,v.h/2-v.h/4);
  ctx.lineTo(v.w/2+v.w/8,v.h/2-v.h/8);
  ctx.lineTo(v.w/2+v.w/8,v.h/2+v.h/8);
  ctx.lineTo(v.w/2,v.h/2+v.h/4);
  ctx.moveTo(v.w/2,v.h/2);
  ctx.lineTo(v.w/2-v.w/8,v.h/2-v.h/8);
  ctx.moveTo(v.w/2,v.h/2);
  ctx.lineTo(v.w/2+v.w/8,v.h/2-v.h/8);
  ctx.moveTo(v.w/2,v.h/2);
  ctx.lineTo(v.w/2,v.h/2+v.h/4);
  ctx.fill();
  ctx.stroke();

  // Draw developer name and app version
  ctx.fillText(headerText, v.w/2, v.h-5);
};

easel.config(); // this is called every time window resizes
easel.redraw(); // this is called every time window resizes

