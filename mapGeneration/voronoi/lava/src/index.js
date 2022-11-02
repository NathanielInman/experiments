import { Easel, ink } from '@ion-cloud/core';
import { Voronoi } from './Voronoi';
import { Point } from './Point';
import { r } from './randomNumber';

const easel = new Easel();
const { ctx, viewport: v } = easel;
const map = new Voronoi();

window.v = v; // push this out to global space so it can be used within Point
map.points = [];

for (let i = 0; i < 100; i++) map.points.push(new Point(r(v.w), r(v.h)));

// When resizing or reloading canvas re-configure the font sizes
// and other factors that are lost at reload
easel.config = function () {
  window.fontRatio = 0.02; // scale the font to the size of the window
  window.fontSize = (v.w * window.fontRatio) | 0; // scale size based solely on viewport width
  window.scrollOffset = 0; // this is used to scroll the main text during overflow
  ctx.font = window.fontSize + 'px Courier New';
  ctx.textAlign = 'center';
  ctx.imageSmoothingEnabled = false;
};

// When the browser requires a redraw, or information is changed and
// the app needs to update the view, call this function
easel.onDraw = function () {
  const fg = ink('#900', { l: 0.2, format: 'hex' });
  const bg = ink('#900', { l: 0.02, format: 'hex' });
  const lc = ink('#900', { r: 0.92, format: 'hex' });

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, v.w, v.h);
  map.compute(map.points, v.w, v.h);

  const edges = map.getEdges();

  // Draw the line connections
  ctx.lineWidth = 2;
  ctx.strokeStyle = fg;
  for (let i = 0, e; i < edges.length; i++) {
    e = edges[i];
    ctx.beginPath();
    ctx.moveTo(e.start.x, e.start.y);
    ctx.lineTo(e.end.x, e.end.y);
    ctx.closePath();
    ctx.stroke();
  } // end for

  // Draw the points
  ctx.fillStyle = lc;
  for (let i = 0, p; i < map.points.length; i++) {
    p = map.points[i];
    ctx.beginPath();
    ctx.fillRect(p.x, p.y, 3, 3);
    ctx.closePath();
    ctx.fill();
  } // end for
};

// The main loop consists of transitioning colors of the map
// while drawing the voronoi diagram
(function mainLoop () {
  map.points.forEach((p) => p.move());
  easel.redraw();
  setTimeout(mainLoop, 16);
})();
