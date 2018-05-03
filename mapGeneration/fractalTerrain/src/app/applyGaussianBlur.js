function boxBlurHorizontal(scl, tcl, w, h, r) {
  let iarr = 1 / (r+r+1);

  for(let i=0,ti,li,ri,fv,lv,val; i<h; i++) {
    li = ti = i*w;
    ri = ti+r;
    fv = scl[ti].depth;
    lv = scl[ti+w-1].depth;
    val = (r+1)*fv;
    for(let j=0; j<r; j++) val += scl[ti+j].depth;
    for(let j=0; j<=r; j++){
      val += scl[ri++].depth - fv;
      tcl[ti++].depth = Math.round(val*iarr);
    } //end for
    for(let j=r+1; j<w-r; j++){
      val += scl[ri++].depth - scl[li++].depth;
      tcl[ti++].depth = Math.round(val*iarr);
    } //end for
    for(let j=w-r; j<w; j++){
      val += lv - scl[li++].depth;
      tcl[ti++].depth = Math.round(val*iarr);
    } //end for
  }
} //end boxBlurHorizontal()

function boxBlurVertical(scl, tcl, w, h, r) {
  let iarr = 1 / (r+r+1);

  for(let i=0,ti,li,ri,fv,lv,val; i<w; i++) {
    li = ti = i;
    ri = ti+r*w;
    fv = scl[ti].depth;
    lv = scl[ti+w*(h-1)].depth;
    val = (r+1)*fv;
    for(let j=0; j<r; j++) val += scl[ti+j*w].depth;
    for(let j=0; j<=r; j++){
      val += scl[ri].depth - fv;
      tcl[ti].depth = Math.round(val*iarr);
      ri+=w; ti+=w;
    } //end for
    for(let j=r+1; j<h-r; j++){
      val += scl[ri].depth - scl[li].depth;
      tcl[ti].depth = Math.round(val*iarr);
      li+=w; ri+=w; ti+=w;
    } //end for
    for(let j=h-r; j<h; j++){
      val += lv - scl[li].depth;
      tcl[ti].depth = Math.round(val*iarr);
      li+=w; ti+=w;
    } //end for
  } //end for
} //end boxBlurVertical()

function boxBlur(scl, tcl, w, h, r) {
  for(let i=0; i<scl.length; i++) tcl[i].depth = scl[i].depth;
  boxBlurHorizontal(tcl, scl, w, h, r);
  boxBlurVertical(scl, tcl, w, h, r);
} //end boxBlur()

/*
 * This converts the standard deviation of gauss blur `r` into
 * dimensions of boxes
 *
 * sigma = standard deviation
 * n = number of boxes
 */
function boxesForGauss(sigma, n){
  let width = Math.sqrt((12*sigma*sigma/n)+1),
      wl = Math.floor(width), //width lower bound
      wu = wl+2, //width upper bound
      m = Math.round((12*sigma*sigma - n*wl*wl - 4*n*wl - 3*n)/(-4*wl - 4)),
      sizes = [];

  for(let i=0;i<n;i++) sizes.push(i<m?wl:wu);
  return sizes;
} //end boxesForGauss()

export function applyGaussianBlur(map) {
  let w = map.width,
      h = map.height,
      r = 2,
      boxes = boxesForGauss(r, 3),
      scl=JSON.parse(JSON.stringify([].concat(...map.sectors))),
      tcl=JSON.parse(JSON.stringify(scl)); //clone map

  scl.forEach(o=> o.depth*=255); //eslint-disable-line no-return-assign
  boxBlur(scl, tcl, w, h, Math.floor((boxes[0]-1)/2));
  boxBlur(tcl, scl, w, h, Math.floor((boxes[1]-1)/2));
  boxBlur(scl, tcl, w, h, Math.floor((boxes[2]-1)/2));

  //eslint-disable-next-line no-return-assign
  tcl.forEach(o=> map.setDepth(o.x,o.y,o.depth/255));
} //end gaussianBlur()

