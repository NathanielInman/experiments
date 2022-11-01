import './index.styl';
import { Easel } from '@ion-cloud/easel';
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
  const t1 = performance.now();
  main();
  const t2 = performance.now();
  console.info(`Total execution took: ${t2 - t1} ms`);
} // end if

// Execute the main function, blurring the textures
export function main () {
  const { ctx, viewport: v } = easel;
  const sx = Math.floor(v.w / 5);
  const sy = Math.floor(v.h / 5);
  const w = Math.floor(v.w / 5 * 3);
  const h = Math.floor(v.h / 5 * 3);
  const s = w / 4; // spread radius
  const r = w / 2; // blur radius

  ctx.fillStyle = '#f00';
  ctx.fillRect(sx, sy, w, h);
  const img1 = ctx.getImageData(sx, sy, w, h);
  ctx.fillStyle = '#00f';
  ctx.fillRect(sx, sy, w, h);
  const img2 = ctx.getImageData(sx, sy, w, h);
  const blend = ctx.getImageData(sx, sy, w, h);
  const t1 = performance.now();
  for (let i = 0, x, y, bk, ox = sx + w / 2, oy = sy + h / 2; i < blend.data.length; i++) {
    if (i % 4 === 0) { // limit needless calculations to per pixel distance
      x = Math.floor(i / 4) % w; // image data contains 4 entries per pixel: r,g,b,a
      y = Math.floor(Math.floor(i / 4) / w);
      bk = (Math.sqrt(Math.pow(ox - x - sx, 2) + Math.pow(oy - y - sy, 2)) - s) / (r - s);
    } // end if
    blend.data[i] = img1.data[i] * (1 - bk) + img2.data[i] * bk;
  } // end for
  const t2 = performance.now();
  ctx.putImageData(blend, sx, sy);
  console.info(`Image processed in ${t2 - t1} ms`);
} // end main()
