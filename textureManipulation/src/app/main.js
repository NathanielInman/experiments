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
    let img1,img2;

    ctx.drawImage(t1,v.w/5,v.h/5,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5*2,v.h/5,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5*3,v.h/5,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5,v.h/5*2,v.w/5,v.h/5);
    ctx.drawImage(t2,v.w/5*2,v.h/5*2,v.w/5,v.h/5);
    img1 = ctx.getImageData(v.w/5*2,v.h/5*2,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5*3,v.h/5*2,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5,v.h/5*3,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5*2,v.h/5*3,v.w/5,v.h/5);
    img2 = ctx.getImageData(v.w/5*2,v.h/5*3,v.w/5,v.h/5);
    ctx.drawImage(t1,v.w/5*3,v.h/5*3,v.w/5,v.h/5);

    // now draw blends
    let size = img1.data.length;

    console.log('size',size);
    for(let i=0,perc;i<img1.data.length;i++){
      perc = i/img1.data.length;
      img1.data[i] = img1.data[i]*(1-perc)+img2.data[i]*perc;
    } //end for
    ctx.putImageData(img1,v.w/5*2,v.h/5*3);
    //requestAnimationFrame(loop);
  } //end draw();
} //end app()
