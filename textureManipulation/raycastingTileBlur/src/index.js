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
  draw();

  // Add event listener for resizing the window
  window.addEventListener('resize', draw, false);
} // end if

function draw () {
  noscript.style.visibility = 'hidden';
  const t1 = performance.now();
  main();
  const t2 = performance.now();
  console.info(`Total execution took: ${t2 - t1} ms`);
} // end draw();

// Execute the main function, blurring the textures
function main () {
  const { ctx, viewport: v } = easel;

  const size = v.w < v.h ? v.w : v.h;
  const sx = Math.floor(size / 5);
  const sy = Math.floor(size / 5);
  const w = Math.floor(size / 5);
  const h = Math.floor(size / 5);
  const s = w / 4; // spread radius
  const r = w / 2; // blur radius

  ctx.fillStyle = '#f00';
  ctx.fillRect(sx, sy, w, h);
  const img1 = ctx.getImageData(sx, sy, w, h);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(sx + w, sy, w, h);
  const img2 = ctx.getImageData(sx + w, sy, w, h);
  ctx.fillStyle = '#00f';
  ctx.fillRect(sx + w * 2, sy, w, h);
  const img3 = ctx.getImageData(sx + w * 2, sy, w, h);
  ctx.fillStyle = '#ff0';
  ctx.fillRect(sx, sy + h, w, h);
  const img4 = ctx.getImageData(sx, sy + h, w, h);
  ctx.fillStyle = '#f0f';
  ctx.fillRect(sx + w, sy + h, w, h);
  const img5 = ctx.getImageData(sx + w, sy + h, w, h);
  ctx.fillStyle = '#0ff';
  ctx.fillRect(sx + w * 2, sy + h, w, h);
  const img6 = ctx.getImageData(sx + w * 2, sy + h, w, h);
  ctx.fillStyle = '#f93';
  ctx.fillRect(sx, sy + h * 2, w, h);
  const img7 = ctx.getImageData(sx, sy + h * 2, w, h);
  ctx.fillStyle = '#9f3';
  ctx.fillRect(sx + w, sy + h * 2, w, h);
  const img8 = ctx.getImageData(sx + w, sy + h * 2, w, h);
  ctx.fillStyle = '#39f';
  ctx.fillRect(sx + w * 2, sy + h * 2, w, h);
  const img9 = ctx.getImageData(sx + w * 2, sy + h * 2, w, h);
  const t1 = performance.now();
  for (let i = 0, x, y, bk, ox = sx + w / 2, oy = sy + h / 2; i < img5.data.length; i++) {
    if (i % 4 === 0) { // limit needless calculations to per pixel distance
      x = Math.floor(i / 4) % w; // image data contains 4 entries per pixel: r,g,b,a
      y = Math.floor(Math.floor(i / 4) / w);
      bk = (Math.sqrt(Math.pow(ox - x - sx, 2) + Math.pow(oy - y - sy, 2)) - s) / (r - s);
    } // end if
    img5.data[i] = img1.data[i] * bk + img5.data[i] * (1 - bk);
  } // end for
  const t2 = performance.now();
  ctx.putImageData(img5, sx * 2, sy * 2);
  console.info(`Image processed in ${t2 - t1} ms`);
} // end main()
