export var Easel=(function(a) {
    if(!!window.CanvasRenderingContext2D){Easel.activated=true;}else{return false;}
    CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r,f,s){
      if (typeof r === "undefined") r = 5; //radius
      this.beginPath();
      this.moveTo(x + r, y);
      this.lineTo(x + w - r, y);
      this.quadraticCurveTo(x + w, y, x + w, y + r);
      this.lineTo(x + w, y + h - r);
      this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      this.lineTo(x + r, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - r);
      this.lineTo(x, y + r);
      this.quadraticCurveTo(x, y, x + r, y);
      this.closePath();
      if (s||typeof s=='undefined')this.stroke(); //default is stroke
      if (f)this.fill(); //default is no fill
    };
    W = window;
    D = document;
    M = Math;
    C = D.createElement("canvas");
    ctx = C.getContext("2d");
    $ = function(c) {
        return D.getElementById(c);
    };
    q = function() {
        C.width = v.w;
        C.height = v.h;
    };
    u = function() {
        ctx = C.getContext("2d");
    };
    w = function() {
        d = W;
        b = "inner";
        if (!(d.innerWidth)) {
            b = "client";
            d = D.documentElement || D.body;
        }
        return {
            w: d[b + "Width"],
            h: d[b + "Height"]
        };
    };
    v = w();
    a.background = "#000";
    a.redraw = function() {
      if(!a.started){a.config();a.started=true;}
      a.onDraw();
    };
    a.started = false;
    a.config = function(){};
    a.onDraw = function(){
      ctx.fillStyle = a.background;
      ctx.fillRect(0, 0, v.w, v.h);
    };
    W.r = function(f, g, e) {
        f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
        e = e || 0;
        g = M.random() * (g - f) + f;
        return e ? g | 0 : g;
    };
    W.onresize = function() {
        W.v = w();
        q();
        a.config();
        a.redraw();
    };
    D.body.appendChild(C);
    d = document.createElement("style");
    d.type = "text/css";
    d.rel = "stylesheet";
    d.innerHTML = "body{background-color:" + a.background + ";margin:0;}canvas{position:fixed;left:0;top:0;right:0;bottom:0;z-index:-1;}";
    D.getElementsByTagName("head")[0].appendChild(d);
    q();
    return a;
})(Easel || (Easel = {}));
