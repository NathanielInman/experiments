/**
 * Created by nate on 12/23/14.
 */
var pad=document.getElementById('pad');
pad.style.width='100%';
pad.style.height='100%';
pad.width=pad.offsetWidth;
pad.height=pad.offsetHeight;
var ctx=pad.getContext('2d');
var v={w:pad.offsetWidth,h:pad.offsetHeight};
ctx.fillColor='#000';
ctx.fillRect(0,0, v.w, v.h);
r = function (f, g, e) {
  g = g || 0;
  e = e || true;
  g = Math.random() * (g - f);
  g = g < 0 ? Math.random() * g : g + f;
  return e == false ? Math.floor(g) : g
};

var smokeImage = new Image();
smokeImage.src = "images/smokeParticle.png";
var scene = new Ion(250);
scene.sx = function () {return r(0, v.w);};
scene.sy = function () {return r(0, v.h / 2) + v.h / 8 * 3;};
scene.dx = function () {return v.w;};
scene.dy = function () {return r(0, v.h / 2) + v.h / 8 * 3;};
scene.wx = function () {return r(0, 3) - 1.5;};
scene.wy = function () {return r(0, 1) - 0.5;};
scene.size = function () {return r(1, 3);};
scene.tween_type = 17;
scene.tween_speed = 40;
scene.image = smokeImage;
scene.imageWidth = 256;
scene.imageHeight = 256;
scene.onEscape = function (id) {this.onEnd(id);};
scene.clearColor=  '#000';
scene.onEnd = function (id) {
  this.particle[id].x = this.particle[id].sx = r(0, v.w);
  this.particle[id].y = this.particle[id].sy = r(0, v.h / 2) + v.h / 8 * 3;
  //this.particle[id].dx = v.w;
  //this.particle[id].dy = r(v.h/4)+ v.h/4;
  this.particle[id].c = 0;
};
scene.populate();
scene.process();