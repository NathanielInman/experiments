import {easel} from './app';

// Execute the main function, blurring the textures
export function main() {
  let t1 = new Image(),
      t2 = new Image();

  // Lady shirt in the background
  t1.src = 'http://i.imgur.com/K4sPN88.jpg';
  t1.crossOrigin = 'Anonymous';
  t2.src = 'http://i.imgur.com/HZdyZam.jpg';
  t2.crossOrigin = 'Anonymous';
  setTimeout(loop,3000);

  function loop(){
    let img1,img2,w = Math.floor(v.w/5), h = Math.floor(v.h/5);

    /*
    ctx.drawImage(t1,w,h,w,h);
    ctx.drawImage(t1,w*2,h,w,h);
    ctx.drawImage(t1,w*3,h,w,h);
    ctx.drawImage(t1,w,h*2,w,h);
    ctx.drawImage(t1,w*3,h*2,w,h);
    ctx.drawImage(t1,w,h*3,w,h);
    ctx.drawImage(t1,w*2,h*3,w,h);
    ctx.drawImage(t1,w*3,h*3,w,h);
    ctx.drawImage(t2,w*2,h*2,w,h);
    img1 = ctx.getImageData(w*2,h*2,w,h);
    img2 = ctx.getImageData(w,h,w,h);
    */
    ctx.fillStyle = '#f00';
    ctx.fillRect(w,h,w,h);
    ctx.fillRect(w*2,h,w,h);
    ctx.fillRect(w*3,h,w,h);
    ctx.fillRect(w,h*2,w,h);
    ctx.fillRect(w*3,h*2,w,h);
    ctx.fillRect(w,h*3,w,h);
    ctx.fillRect(w*2,h*3,w,h);
    ctx.fillRect(w*3,h*3,w,h);
    ctx.fillStyle = '#00f';
    ctx.fillRect(w*2,h*2,w,h);
    img1 = ctx.getImageData(w*2,h*2,w,h);
    img2 = ctx.getImageData(w,h,w,h);

    // now draw blends
    let blend1 = ctx.getImageData(w*2,h*2,w,h),
        blend2 = ctx.getImageData(w*2,h*2,w,h),
        blend3 = ctx.getImageData(w*2,h*2,w,h),
        blend4 = ctx.getImageData(w*2,h*2,w,h),
        blend5 = ctx.getImageData(w*2,h*2,w,h),
        blend6 = ctx.getImageData(w*2,h*2,w,h),
        blend7 = ctx.getImageData(w*2,h*2,w,h),
        blend8 = ctx.getImageData(w*2,h*2,w,h);

    console.log(img1.data.length);
    for(let i=0,x,y,vperc,hperc,lrperc,tlperc,trperc,llperc;i<img1.data.length;i++){
      if(i%4===0){
        x = Math.floor(i/4)%w; //image data contains 4 entries per pixel: r,g,b,a
        y = Math.floor(Math.floor(i/4)/w);
        vperc = y/h;
        hperc = x/w;
        lrperc = (x+y)/((w+h)*.5);
        tlperc = (x+y)/((w+h)*.5)-1;
        trperc = (x-y)/h+1;
        llperc = (y-x)/w+1;
      } //end if
      blend1.data[i] = img1.data[i]*(1-vperc)+img2.data[i]*vperc;
      blend2.data[i] = img1.data[i]*vperc+img2.data[i]*(1-vperc);
      blend3.data[i] = img1.data[i]*(1-hperc)+img2.data[i]*hperc;
      blend4.data[i] = img1.data[i]*hperc+img2.data[i]*(1-hperc);
      blend5.data[i] = img1.data[i]*(1-lrperc)+img2.data[i]*lrperc;
      blend6.data[i] = img1.data[i]*tlperc+img2.data[i]*(1-tlperc);
      blend7.data[i] = img1.data[i]*(1-trperc)+img2.data[i]*trperc;
      blend8.data[i] = img1.data[i]*(1-llperc)+img2.data[i]*llperc;
    } //end for
    ctx.putImageData(blend2,w*2,h);
    ctx.putImageData(blend1,w*2,h*3);
    ctx.putImageData(blend4,w,h*2);
    ctx.putImageData(blend3,w*3,h*2);
    ctx.putImageData(blend5,w*3,h*3);
    ctx.putImageData(blend6,w,h);
    ctx.putImageData(blend7,w*3,h);
    ctx.putImageData(blend8,w,h*3);
    //requestAnimationFrame(loop);
  } //end draw();
} //end app()
