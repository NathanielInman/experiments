import './index.styl';
import { Easel } from '@ion-cloud/core';
export const easel = new Easel('2d', { willReadFrequently: true });

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
const noscript = document.querySelector('noscript');

if (!easel.activated) {
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
} else {
  noscript.style.visibility = 'hidden';
  main();
} // end if

// Execute the main function, blurring the textures
function main () {
  const t1 = new Image();
  const t2 = new Image();

  // Lady shirt in the background
  t1.src = '/shirt.png';
  t2.src = '/money.png';
  loop();

  function loop () {
    const v = easel.viewport;
    const ctx = easel.ctx;
    const w = Math.floor(v.w / 5); const h = Math.floor(v.h / 5);

    ctx.fillStyle = '#f00';
    ctx.fillRect(w, h, w, h);
    ctx.fillRect(w * 2, h, w, h);
    ctx.fillRect(w * 3, h, w, h);
    ctx.fillRect(w, h * 2, w, h);
    ctx.fillRect(w * 3, h * 2, w, h);
    ctx.fillRect(w, h * 3, w, h);
    ctx.fillRect(w * 2, h * 3, w, h);
    ctx.fillRect(w * 3, h * 3, w, h);
    ctx.fillStyle = '#00f';
    ctx.fillRect(w * 2, h * 2, w, h);
    const img1 = ctx.getImageData(w * 2, h * 2, w, h);
    const img2 = ctx.getImageData(w, h, w, h);

    // now draw blends
    const blend1 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend2 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend3 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend4 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend5 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend6 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend7 = ctx.getImageData(w * 2, h * 2, w, h);
    const blend8 = ctx.getImageData(w * 2, h * 2, w, h);

    for (let i = 0, x, y, vperc, hperc, lrperc, tlperc, trperc, llperc; i < img1.data.length; i++) {
      if (i % 4 === 0) { // limit calculations to 1/4th
        x = Math.floor(i / 4) % w; // image data contains 4 entries per pixel: r,g,b,a
        y = Math.floor(Math.floor(i / 4) / w);
        vperc = y / h;
        hperc = x / w;
        lrperc = (x + y) / ((w + h) * 0.5);
        tlperc = (x + y) / ((w + h) * 0.5) - 1;
        trperc = (x - y) / h + 1;
        llperc = (y - x) / w + 1;
      } // end if
      blend1.data[i] = img1.data[i] * (1 - vperc) + img2.data[i] * vperc;
      blend2.data[i] = img1.data[i] * vperc + img2.data[i] * (1 - vperc);
      blend3.data[i] = img1.data[i] * (1 - hperc) + img2.data[i] * hperc;
      blend4.data[i] = img1.data[i] * hperc + img2.data[i] * (1 - hperc);
      blend5.data[i] = img1.data[i] * (1 - lrperc) + img2.data[i] * lrperc;
      blend6.data[i] = img1.data[i] * tlperc + img2.data[i] * (1 - tlperc);
      blend7.data[i] = img1.data[i] * (1 - trperc) + img2.data[i] * trperc;
      blend8.data[i] = img1.data[i] * (1 - llperc) + img2.data[i] * llperc;
    } // end for
    ctx.putImageData(blend2, w * 2, h);
    ctx.putImageData(blend1, w * 2, h * 3);
    ctx.putImageData(blend4, w, h * 2);
    ctx.putImageData(blend3, w * 3, h * 2);
    ctx.putImageData(blend5, w * 3, h * 3);
    ctx.putImageData(blend6, w, h);
    ctx.putImageData(blend7, w * 3, h);
    ctx.putImageData(blend8, w, h * 3);
    requestAnimationFrame(loop);
  } // end draw();
} // end app()
