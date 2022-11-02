function boxBlurHorizontal (scl, tcl, w, h, r) {
  const iarr = 1 / (r + r + 1);

  for (let i = 0, ti, li, ri, fv, lv, val; i < h; i++) {
    li = ti = i * w;
    ri = ti + r;
    fv = scl[ti].height;
    lv = scl[ti + w - 1].height;
    val = (r + 1) * fv;
    for (let j = 0; j < r; j++) val += scl[ti + j].height;
    for (let j = 0; j <= r; j++) {
      val += scl[ri++].height - fv;
      tcl[ti++].height = Math.round(val * iarr);
    } // end for
    for (let j = r + 1; j < w - r; j++) {
      val += scl[ri++].height - scl[li++].height;
      tcl[ti++].height = Math.round(val * iarr);
    } // end for
    for (let j = w - r; j < w; j++) {
      val += lv - scl[li++].height;
      tcl[ti++].height = Math.round(val * iarr);
    } // end for
  }
} // end boxBlurHorizontal()

function boxBlurVertical (scl, tcl, w, h, r) {
  const iarr = 1 / (r + r + 1);

  for (let i = 0, ti, li, ri, fv, lv, val; i < w; i++) {
    li = ti = i;
    ri = ti + r * w;
    fv = scl[ti].height;
    lv = scl[ti + w * (h - 1)].height;
    val = (r + 1) * fv;
    for (let j = 0; j < r; j++) val += scl[ti + j * w].height;
    for (let j = 0; j <= r; j++) {
      val += scl[ri].height - fv;
      tcl[ti].height = Math.round(val * iarr);
      ri += w; ti += w;
    } // end for
    for (let j = r + 1; j < h - r; j++) {
      val += scl[ri].height - scl[li].height;
      tcl[ti].height = Math.round(val * iarr);
      li += w; ri += w; ti += w;
    } // end for
    for (let j = h - r; j < h; j++) {
      val += lv - scl[li].height;
      tcl[ti].height = Math.round(val * iarr);
      li += w; ti += w;
    } // end for
  } // end for
} // end boxBlurVertical()

function boxBlur (scl, tcl, w, h, r) {
  for (let i = 0; i < scl.length; i++) tcl[i].height = scl[i].height;
  boxBlurHorizontal(tcl, scl, w, h, r);
  boxBlurVertical(scl, tcl, w, h, r);
} // end boxBlur()

/*
 * This converts the standard deviation of gauss blur `r` into
 * dimensions of boxes
 *
 * sigma = standard deviation
 * n = number of boxes
 */
function boxesForGauss (sigma, n) {
  const width = Math.sqrt((12 * sigma * sigma / n) + 1);
  const wl = Math.floor(width); // width lower bound
  const wu = wl + 2; // width upper bound
  const m = Math.round((12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4));
  const sizes = [];

  for (let i = 0; i < n; i++) sizes.push(i < m ? wl : wu);
  return sizes;
} // end boxesForGauss()

export function applyGaussianBlur (map) {
  const w = map[0].length;
  const h = map.length;
  const r = 3;
  const boxes = boxesForGauss(r, 3);
  const scl = JSON.parse(JSON.stringify([].concat(...map)));
  const tcl = JSON.parse(JSON.stringify(scl)); // clone map

  scl.forEach(o => o.height *= 255); // eslint-disable-line no-return-assign
  boxBlur(scl, tcl, w, h, Math.floor((boxes[0] - 1) / 2));
  boxBlur(tcl, scl, w, h, Math.floor((boxes[1] - 1) / 2));
  boxBlur(scl, tcl, w, h, Math.floor((boxes[2] - 1) / 2));

  // eslint-disable-next-line no-return-assign
  tcl.forEach(o => map[o.y][o.x].height = o.height / 255);
} // end gaussianBlur()
