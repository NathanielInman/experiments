import {easel} from './app';

// Execute the main function, blurring the textures
export function main() {
  let img1,img2,img3,
      img4,img5,img6,
      img7,img8,img9,
      t1,t2,
      size = v.w<v.h?v.w:v.h,
      sx = Math.floor(size/5),
      sy = Math.floor(size/5),
      w = Math.floor(size/5),
      h = Math.floor(size/5),
      s = w/4, //spread radius
      r = w/2; //blur radius

  ctx.fillStyle = '#f00';
  ctx.fillRect(sx,sy,w,h);
  img1 = ctx.getImageData(sx,sy,w,h);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(sx+w,sy,w,h);
  img2 = ctx.getImageData(sx+w,sy,w,h);
  ctx.fillStyle = '#00f';
  ctx.fillRect(sx+w*2,sy,w,h);
  img3 = ctx.getImageData(sx+w*2,sy,w,h);
  ctx.fillStyle = '#ff0';
  ctx.fillRect(sx,sy+h,w,h);
  img4 = ctx.getImageData(sx,sy+h,w,h);
  ctx.fillStyle = '#f0f';
  ctx.fillRect(sx+w,sy+h,w,h);
  img5 = ctx.getImageData(sx+w,sy+h,w,h);
  ctx.fillStyle = '#0ff';
  ctx.fillRect(sx+w*2,sy+h,w,h);
  img6 = ctx.getImageData(sx+w*2,sy+h,w,h);
  ctx.fillStyle = '#f93';
  ctx.fillRect(sx,sy+h*2,w,h);
  img7 = ctx.getImageData(sx,sy+h*2,w,h);
  ctx.fillStyle = '#9f3';
  ctx.fillRect(sx+w,sy+h*2,w,h);
  img8 = ctx.getImageData(sx+w,sy+h*2,w,h);
  ctx.fillStyle = '#39f';
  ctx.fillRect(sx+w*2,sy+h*2,w,h);
  img9 = ctx.getImageData(sx+w*2,sy+h*2,w,h);
  t1 = performance.now();
  for(let i=0,x,y,bk,ox=sx+w/2,oy=sy+h/2;i<img5.data.length;i++){
    if(i%4===0){ //limit needless calculations to per pixel distance
      x = Math.floor(i/4)%w; //image data contains 4 entries per pixel: r,g,b,a
      y = Math.floor(Math.floor(i/4)/w);
      bk = (Math.sqrt(Math.pow(ox-x-sx,2)+Math.pow(oy-y-sy,2))-s)/(r-s);
    } //end if
    img5.data[i] = img1.data[i]*bk+img5.data[i]*(1-bk);
  } //end for
  t2 = performance.now();
  ctx.putImageData(img5,sx*2,sy*2);
  console.info(`Image processed in ${t2-t1} ms`);
} //end main()
