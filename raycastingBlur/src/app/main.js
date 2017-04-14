import {easel} from './app';

// Execute the main function, blurring the textures
export function main() {
  let img1,img2,blend,
    w = Math.floor(v.w/5), h = Math.floor(v.h/5),
    r = w; //blur radius

  ctx.fillStyle = '#f00';
  ctx.fillRect(w,h,w*3,h*3);
  img1 = ctx.getImageData(w,h,w*3,h*3);
  ctx.fillStyle = '#00f';
  ctx.fillRect(w,h,w*3,h*3);
  img2 = ctx.getImageData(w,h,w*3,h*3);
  blend = ctx.getImageData(w,h,w*3,h*3);

  for(let i=0,x,y,bk,ox=w*2+w/2,oy=h*2+h/2;i<img1.data.length;i++){
    if(i%4===0){ //limit needless calculations to per pixel distance
      x = Math.floor(i/4)%w; //image data contains 4 entries per pixel: r,g,b,a
      y = Math.floor(Math.floor(i/4)/w);
      bk = Math.sqrt(Math.pow(ox-x-w,2)+Math.pow(oy-y-h,2))/r;
    } //end if
    blend.data[i] = img1.data[i]*(1-bk)+img2.data[i]*bk;
  } //end for
  ctx.putImageData(blend,w,h);
  //requestAnimationFrame(loop);
} //end main()
