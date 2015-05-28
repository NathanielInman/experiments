import { easel } from "lib/easel";

let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'fonts/icomoon.woff';
let load = new Image();
    load.src = 'fonts/icomoon.woff';
    load.onload = function(){
      alert('hm');
    };
document.getElementsByTagName('head')[0].appendChild(link);
setTimeout(function(){
  ctx.fillStyle='red';
  ctx.font = '62px "icomoon"';
  ctx.fillText('\ue617',200,200);
},300);

setTimeout(function(){
  ctx.fillStyle='blue';
  ctx.fillText('\ue617',500,500);
},401);
console.log('Application started');
