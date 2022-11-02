import { Point } from './Point';
import { VEdge } from './VEdge';
import { VEvent } from './VEvent';
import { VParabola } from './VParabola';
import { VPolygon } from './VPolygon';
import { VQueue } from './VQueue';

export class Voronoi {
  constructor () {
    this.places = null;
    this.edges = null;
    this.cells = null;
    this.queue = new VQueue(); // TODO FIX?
    this.width = 0;
    this.height = 0; // TODO FIX?
    this.root = null;
    this.ly = 0;
    this.lasty = 0;
    this.fp = null;
  }

  compute (p, w, h) {
    if (p.length < 2) return [];
    this.root = null;
    this.places = p;
    this.edges = [];
    this.cells = [];
    this.width = w;
    this.height = h;
    this.queue.clear(true);
    let ev, cell;
    for (let i = 0; i < this.places.length; i++) {
      ev = new VEvent(this.places[i], true);
      cell = new VPolygon();
      this.places[i].cell = cell;
      this.queue.enqueue(ev);
      this.cells.push(cell);
    } // end for
    let e;
    while (!this.queue.isEmpty()) {
      e = this.queue.dequeue();
      this.ly = e.point.y;
      if (e.pe) {
        this.insertParabola(e.point);
      } else {
        this.removeParabola(e);
      } // end if
      this.lasty = e.y;
    } // end while
    this.finishEdge(this.root);
    for (let i = 0; i < this.edges.length; i++) {
      if (this.edges[i].neighbour) {
        this.edges[i].start = this.edges[i].neighbour.end;
      } // end if
    } // end for
  }

  getEdges () {
    return this.edges;
  }

  getCells () {
    return this.cells;
  }

  insertParabola (p) {
    if (!this.root) {
      this.root = new VParabola(p);
      this.fp = p;
      return;
    } // end if
    if (this.root.isLeaf && this.root.site.y - p.y < 0.01) {
      this.root.isLeaf = false;
      this.root.left = new VParabola(this.fp);
      this.root.right = new VParabola(p);
      const s = new Point((p.x + this.fp.x) / 2, this.height);
      if (p.x > this.fp.x) {
        console.log('!!!', s, this.fp, p);
        this.root.edge = new VEdge(s, this.fp, p);
      } else {
        console.log('!!!', s, this.fp, p);
        this.root.edge = new VEdge(s, p, this.fp);
      } // end if
      this.edges.push(this.root.edge);
      return;
    } // end if
    const par = this.getParabolaByX(p.x);
    if (par.cEvent) {
      this.queue.remove(par.cEvent);
      par.cEvent = null;
    } // end if
    const start = new Point(p.x, this.getY(par.site, p.x));
    const el = new VEdge(start, par.site, p);
    const er = new VEdge(start, p, par.site);
    el.neighbour = er;
    this.edges.push(el);
    par.edge = er;
    par.isLeaf = false;
    const p0 = new VParabola(par.site);
    const p1 = new VParabola(p);
    const p2 = new VParabola(par.site);
    par.right = p2;
    par.left = new VParabola();
    par.left.edge = el;
    par.left.left = p0;
    par.left.right = p1;
    this.checkCircle(p0);
    this.checkCircle(p2);
  }

  removeParabola (e) {
    const p1 = e.arch;
    const xl = this.getLeftParent(p1);
    const xr = this.getRightParent(p1);
    const p0 = this.getLeftChild(xl);
    const p2 = this.getRightChild(xr);

    if (p0.cEvent) {
      this.queue.remove(p0.cEvent);
      p0.cEvent = null;
    } // end if
    if (p2.cEvent) {
      this.queue.remove(p2.cEvent);
      p2.cEvent = null;
    } // end if
    const p = new Point(e.point.x, this.getY(p1.site, e.point.x));
    if (p0.site.cell.last === p1.site.cell.first) {
      p1.site.cell.addLeft(p);
    } else {
      p1.site.cell.addRight(p);
    } // end if
    p0.site.cell.addRight(p);
    p2.site.cell.addLeft(p);
    this.lasty = e.point.y;
    xl.edge.end = p;
    xr.edge.end = p;
    let higher; let par = p1;
    while (par !== this.root) {
      par = par.parent;
      if (par === xl) higher = xl;
      if (par === xr) higher = xr;
    } // end while
    higher.edge = new VEdge(p, p0.site, p2.site);
    this.edges.push(higher.edge);
    const gParent = p1.parent.parent;
    if (p1.parent.left === p1) {
      if (gParent.left === p1.parent) {
        gParent.left = p1.parent.right;
      } else {
        p1.parent.parent.right = p1.parent.right;
      } // end if
    } else {
      if (gParent.left === p1.parent) {
        gParent.left = p1.parent.left;
      } else {
        gParent.right = p1.parent.left;
      } // end if
    } // end if
    this.checkCircle(p0);
    this.checkCircle(p2);
  }

  finishEdge (n) {
    let mx;

    if (n.edge.direction.x > 0.0) {
      mx = Math.max(this.width, n.edge.start.x + 10);
    } else {
      mx = Math.min(0.0, n.edge.start.x - 10);
    } // end if
    n.edge.end = new Point(mx, n.edge.f * mx + n.edge.g);
    if (!n.left.isLeaf) this.finishEdge(n.left); // TODO FIX?
    if (!n.right.isLeaf) this.finishEdge(n.right); // TOOD FIX?
  }

  getXOfEdge (par, y) {
    const left = this.getLeftChild(par);
    const right = this.getRightChild(par);
    const p = left.site;
    const r = right.site;
    let dp = 2 * (p.y - y);
    const a1 = 1 / dp;
    const b1 = -2 * p.x / dp;
    const c1 = y + dp * 0.25 + p.x * p.x / dp;

    dp = 2 * (r.y - y);

    const a2 = 1 / dp;
    const b2 = -2 * r.x / dp;
    const c2 = y + dp * 0.25 + r.x * r.x / dp;
    const a = a1 - a2;
    const b = b1 - b2;
    const c = c1 - c2;
    const disc = b * b - 4 * a * c;
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);

    if (p.y < r.y) {
      return Math.max(x1, x2);
    } else {
      return Math.min(x1, x2);
    } // end if
  }

  getParabolaByX (xx) {
    let par = this.root; let x = 0;

    while (!par.isLeaf) {
      x = this.getXOfEdge(par, this.ly);
      if (x > xx) {
        par = par.left;
      } else {
        par = par.right;
      } // end if
    } // end while
    return par;
  }

  getY (p, x) {
    const dp = 2 * (p.y - this.ly);
    const b1 = -2 * p.x / dp;
    const c1 = this.ly + dp / 4 + p.x * p.x / dp;

    return (x * x / dp + b1 * x + c1);
  }

  checkCircle (b) {
    const lp = this.getLeftParent(b);
    const rp = this.getRightParent(b);
    const a = this.getLeftChild(lp);
    const c = this.getRightChild(rp);

    if (!a || !c || a.site === c.site) return;
    const s = this.getEdgeIntersection(lp.edge, rp.edge);
    if (!s) return;
    const d = this.getDistance(a.site, s);
    if (s.y - d >= this.ly) return;
    const e = new VEvent(new Point(s.x, s.y - d), false);
    b.cEvent = e;
    e.arch = b;
    this.queue.enqueue(e);
  }

  getDistance (a, b) {
    return (Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)));
  }

  getEdgeIntersection (a, b) {
    const I = this.getLineIntersection(a.start, a.bisect, b.start, b.bisect);
    const wd = (I.x - a.start.x) * a.direction.x < 0 ||
             (I.y - a.start.y) * a.direction.y < 0 ||
             (I.x - b.start.x) * b.direction.x < 0 ||
             (I.y - b.start.y) * b.direction.y < 0;

    if (wd) {
      return null;
    } else {
      return I;
    } // end if
  }

  getLineIntersection (a1, a2, b1, b2) {
    const dax = (a1.x - a2.x); const dbx = (b1.x - b2.x);
    const day = (a1.y - a2.y); const dby = (b1.y - b2.y);
    const den = dax * dby - day * dbx;

    if (den === 0) return null; // parallel
    const A = (a1.x * a2.y - a1.y * a2.x);
    const B = (b1.x * b2.y - b1.y * b2.x);
    const I = new Point(0, 0);
    I.x = (A * dbx - dax * B) / den;
    I.y = (A * dby - day * B) / den;
    return I;
  }

  getLeft (n) {
    return this.getleftChild(this.getLeftParent(n));
  }

  getRight (n) {
    return this.getRightChild(this.getRightParent(n));
  }

  getLeftParent (n) {
    let par = n.parent; let pLast = n;

    while (par.left === pLast) {
      if (!par.parent) return null;
      pLast = par; par = par.parent;
    } // end whiel
    return par;
  }

  getRightParent (n) {
    let par = n.parent; let pLast = n;

    while (par.right === pLast) {
      if (!par.parent) return null;
      pLast = par; par = par.parent;
    } // end while
    return par;
  }

  getLeftChild (n) {
    if (!n) return null;
    let par = n.left;
    while (!par.isLeaf) par = par.right;
    return par;
  }

  getRightChild (n) {
    if (!n) return null;
    let par = n.right;
    while (!par.isLeaf) par = par.left;
    return par;
  }
}
