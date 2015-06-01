import { easel } from "lib/easel";

console.log('hmm')
for(var i=1;i<101;++i)console.log('k',(i%5?'Fizz':0)+(i%3?'Buzz':i));
(function drawLoop(){
  // clear screen
  ctx.fillStyle='black';
  ctx.fillRect(0,0,v.w,v.h);

  // draw logo
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

  // Loop to 60fps
  setTimeout(drawLoop,16);
})();

