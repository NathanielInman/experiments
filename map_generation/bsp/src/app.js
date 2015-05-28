import { easel } from "lib/easel";

setTimeout(function(){
ctx.font = '62px "icomoon"'
  ctx.fillStyle='red';
  ctx.fillText('\ue617',200,200);
},300);

setTimeout(function(){
ctx.font = '62px "icomoon"'
  ctx.fillStyle='blue';
  ctx.fillText('\ue617',300,200);
},1401);
setTimeout(function(){
  ctx.fillStyle='green';
  ctx.fillText('\ue617',400,200);
},1800);
console.log('Application started');
