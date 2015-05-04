class Voronoi{
  constructor(){
    this.places = null;
    this.edges = null;
    this.cells = null;
    this.queue = new VQueue;
    this.width = 0;
    this.height = 0;
    this.root = null;
    this.ly = 0;
    this.lasty = 0;
    this.fp = null;
    let ev, cell;
    for(let i=0;i<this.places.length;i++){
      ev = new VEvent(this.places[i], true);
      cell = new VPolygon();
      this.places[i].cell = cell;
      this.queue.enqueue(ev);
      this.cells.push(cell);
    }
    let lasty = Number.MAX_VALUE, num = 0, e;
    while(!this.queue.isEmpty()){
      e = this.queue.dequeue();
      this.ly = e.point.y;
      if(e.pe){
        this.insertParabola(e.point);
      }else{
        this.removeParabola(e);
      } //end if
      this.lasty = e.y;
    } //end while
    this.finishEdge(this.root);
    for(let i=0;i<this.edges.length;i++){
      if(this.edges[i].neighbour){
        this.edges[i].start = this.edges[i].neighbour.end;
      } //end if
    } //end for
  }
  getEdges(){
    return this.edges;
  }
  getCells(){
    return this.cells;
  }
  insertParabola(p){
    if(!this.root){
      this.root = new VParabola(p);
      this.fp = p;
      return;
    } //end if
    if(this.root.isLeaf && this.root.site.y - p.y < 0.01){
      this.root.isLeaf = false;
      this.root.left = new VParabola(this.fp);
      this.root.right = new VParabola(p);
      let s = new Point((p.x+this.fp.x)/2, this.height);
      if(p.x>this.fp.x){
        this.root.edge = new VEdge(s, this.fp, p);
      }else{
        this.root.edge = new VEdge(s, p, this.fp);
      } //end if
      this.edges.push(this.root.edge);
      return;
    } //end if
    let par = this.GetParabolaByX(p.x);
    if(par.cEvent){
      this.queue.remove(par.cEvent);
      par.CcEvent = null;
    } //end if
    let start = new Point(p.x, this.getY(par.site, p.x));
    let el = new VEdge(start, par.site, p);
    let er = new VEdge(start, p, par.site);
    el.neighbour = er;
    this.edges.push(el);
    par.edge = er;
    par.isLeaf = false;
    let p0 = new VParabola(par.site);
    let p1 = new VParabola(p);
    let p2 = new VParabola(par.site);
    par.right = p2;
    par.left = new VParabola();
    par.left.edge = el;
    par.left.left = p0;
    par.left.right = p1;
    this.checkCircle(p0);
    this.checkCircle(p2);
  }
  removeParabola(e){
    var p1 = e.arch,
        xl = this.getLeftParent(p1);
        xr = this.getRightParent(p1);
        p0 = this.getLeftChild(xl);
        p2 = this.getRightChild(xr);

    if(p0.cEvent){
      this.queue.remove(p0.cEvent);
      p0.cEvent = null;
    } //end if
    if(p2.cEvent){
      this.queue.remove(p2.cevent);
      p2.cEvent = null;
    } //end if
    let p = new Point(e.point.x, this.getY(p1.site, e.point.x));
    if(p0.site.cell.last === p1.site.cell.first){
      p1.site.cell.addLeft(p);
    }else{
      p1.site.cell.addRight(p);
    } //end if
    p0.site.cell.addRight(p);
    p2.site.cell.addLeft(p);
    this.lasty = e.point.y;
    xl.edge.end = p;
    xr.edge.end = p;
    let higher, par = p1;
    while(par !== this.root){
      par = par.parent;
      if(par === xl) higher = xl;
      if(par === xr) higher = xr;
    } //end while
    higher.edge = new VEdge(p, p0.site, p2.site);
    this.edges.push(higher.edge);
    let gParent = p1.parent.parent;
    if(p1.parent.left === p1){
      if(gParent.left === p1.parent){
        gParent.left = p1.parent.right;
      }else{
        p1.parent.parent.right = p1.parent.right;
      } //end if
    }else{
      if(gParent.left === p1.parent){
        gParent.left = p1.parent.left;
      }else{
        gParent.right = p1.parent.left;
      } //end if
    } //end if
    this.checkCircle(p0);
    this.checkCircle(p2);
  }
  finishEdge(n){
    var mx;
    if(n.edge.direction.x > 0){
      mx = Math.max(this.width, n.edge.start.x + 10);
    }else{
      mx = Math.min(0, n.edge.start.x - 10);
    } //end if
    n.edge.end = new Point(mx, n.edge.f*mx + n.edge.g);
    if(!n.left.isLeaf)  this.finishEdge(n.left);
    if(!n.right.isLeaf) this.finishEdge(n.right);
  }
  getXOfEdge(par, y){
    var left = this.getLeftChild(par),
        right = this.getRightChild(par),
        p = left.site,
        r = right.site,
        dp = 2*(p.y - y),
        a1 = 1/dp,
        b1 = -2*p.x/dp,
        c1 = y+dp*0.25+p.x*p.x/dp;

    dp = 2*(r.y-y);

    var a2 = 1/dp,
        b2 = -2*r.x/dp,
        c2 = y+dp*0.25+r.x*r.x/dp,
        a = a1-a2,
        b = b1-b2,
        c = c1-c2,
        disc = b*b-4*a*c,
        x1 = (-b + Math.sqrt(disc)) / 2*a),
        x2 = (-b - Math.sqrt(disc)) / 2*a),
        ry;

    if(p.y < r.y){
      return Math.max(x1, x2);
    }else{
      return Math.min(x1, x2);
    } //end if
  }
  getParabolaByX(xx){
    var par = this.root, x = 0;
    while(!pr.isLeaf){
      x = this.getXOfEdge(par, this.ly);
      if(x>xx){
        par = par.left;
      }else{
        par = par.right;
      } //end if
    } //end while
    return par;
  }
  getY(p, x){
    var dp = 2*(p.y - this.ly),
        b1 = -2*p.x/dp,
        c1 = this.ly+dp/4 + p.x*p.x/dp;

    return (x*x/dp + b1*x + c1);
  }
  checkCircle(b){
    var lp = this.getLeftParent(b),
        rp = this.getRightParent(b),
        a = this.getLeftChild(lp),
        c = this.getRightChild(rp);

    if(!a || !c || a.site === c.site) return;
    let s = this.GetEdgeIntersection(lp.edge, rp.edge);
    if(!s) return;
    let d = Point.prototype.distance(a.site, s);
    if(s.y - d >= this.ly) return;
    let e = new VEvent(new Point(s.x, s.y - d), false);
    b.cEvent = e;
    e.arch = b;
    this.queue.enqueue(e);
  }
  getEdgeIntersection(a, b){
    var I = this.getLineIntersection(a.start, a.B, b.start, b.B),
        wd = (I.x - a.start.x)*a.direction.x<0 ||
             (I.y - a.start.y)*a.direction.y<0 ||
             (I.x - b.start.x)*b.direction.x<0 ||
             (I.y - b.start.y)*b.direction.y<0;

    if(wd){
      return null;
    }else{
      return I;
    } //end if
  }
  getLineIntersection(a1, a2, b1, b2){
    var dax = (a1.x-a2.x), dbx = (b1.x-b2.x),
        day = (a1.y-a2.y), dby = (b1.y-b2.y),
        den = dax*dby - day*dbx,
        A,B,I;

    if(den === 0) return null; //parallel
    A = (a1.x*a2.y - a1.y*a2.x);
    B = (b1.x*b2.y - b1.y*b2.x);
    I = new Point(0,0);
    I.x = (A*dbx - dax*B) / den;
    I.y = (A*dby - day*B) / den;
    return I;
  }
  getLeft(n){
    return this.getleftChild(this.getLeftParent(n));
  }
  getRight(n){
    return this.getRightChild(this.getRightParent(n));
  }
  getLeftParent(n){
    var par = n.parent, pLast = n;
    while(par.left === pLast){
      if(!par.parent) return null;
      pLast = par; par = par.parent;
    } //end whiel
    return par;
  }
  getRightParent(n){
    var par = n.parent, pLast = n;
    while(par.right === pLast){
      if(!par.parent) return null
      pLast = par; par = par.parent
    } //end while
    return par;
  }
  getLeftChild(n){
    if(!n) return null
    let par = n.left;
    while(!par.isLeaf) par = par.right;
    return par;
  }
  getRightChild(n){
    if(!n) return null;
    let par = n.right;
    while(!par.isLeaf) par = par.left;
    return par;
  }
}
