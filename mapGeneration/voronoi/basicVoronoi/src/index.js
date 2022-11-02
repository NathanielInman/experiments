import { Easel, ink } from '@ion-cloud/core';
import { rndHex } from './rndHex';
import { Voronoi } from './Voronoi';
import { Point } from './Point';
import { r } from './randomNumber';

const easel = new Easel();
const { ctx, viewport: v } = easel;
const map = new Voronoi();

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
  const oc = easel.color.cur;
  const fg = ink(oc, {r: 0, g: 0.5, b: 0.6});
  const bg = ink(oc, {r: 0, g: 0.2, b: 0.3});
  const lc = ink(oc, {r: 0, g: 0.7, b: 0.8});

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

// Give current and destination target colors so we can loop and
// draw these for the map for added flavorz
easel.color = {
  cur: rndHex(),
  tar: rndHex()
};

// Apply a listener to the canvas to have a point move around
// with the mouse for added effect
easel.canvas.onmousemove = function (e) {
  const last = map.points[map.points.length - 1];

  last.x = e.clientX - e.target.offsetLeft;
  last.y = e.clientY - e.target.offsetTop;
  easel.redraw();
};

// The main loop consists of transitioning colors of the map
// while drawing the voronoi diagram
(function mainLoop () {
  if (easel.color.cur !== easel.color.tar) {
    const c = ink(easel.color.cur, { format: 'object' });
    const t = ink(easel.color.tar, { format: 'object' });

    c.r = c.r < t.r ? ++c.r : c.r > t.r ? --c.r : c.r;
    c.g = c.g < t.g ? ++c.g : c.g > t.g ? --c.g : c.g;
    c.b = c.b < t.b ? ++c.b : c.b > t.b ? --c.b : c.b;
    easel.color.cur = '#' + [c.r, c.g, c.b].map((x) => x.toString(16)).map((x) => x.length < 2 ? '0' + x : x).join('');
    if (!(c.r ^ t.r && c.g ^ t.g && c.b ^ t.b))easel.color.tar = rndHex();
  } else {
    easel.color.tar = rndHex();
  } // end if
  easel.redraw();
  setTimeout(mainLoop, 16);
})();
