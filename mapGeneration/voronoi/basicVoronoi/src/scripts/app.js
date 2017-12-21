import { Easel  } from 'common/easel';
import { map    } from 'engine/core';
import { ink    } from 'common/ink';
import { rndHex } from 'common/ink';

if(!Easel.activated){
  document.getElementById('noscript').innerHTML =
  `<p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  // Hide the no script overlay
  document.getElementById('noscript').style.visibility='hidden';

  // When resizing or reloading canvas re-configure the font sizes
  // and other factors that are lost at reload
  Easel.config=function(){
    window.fontRatio = 0.02; //scale the font to the size of the window
    window.fontSize = (v.w * fontRatio)|0; //scale size based solely on viewport width
    window.scrollOffset = 0; //this is used to scroll the main text during overflow
    ctx.font = window.fontSize + "px Courier New";
    ctx.textAlign = 'center';
    ctx.imageSmoothingEnabled = false;
  };

  // When the browser requires a redraw, or information is changed and
  // the app needs to update the view, call this function
  Easel.onDraw=function(){
    let oc = Easel.color.cur,
        fg = ink(oc,0,0.5,0.6),
        bg = ink(oc,0,0.2,0.3),
        lc = ink(oc,0,0.7,0.8);

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,v.w,v.h);
    map.compute(map.points,v.w,v.h);

    let edges = map.getEdges(),
        cells = map.getCells();

    // Draw the line connections
    ctx.lineWidth = 2;
    ctx.strokeStyle = fg;
    for(let i=0,e;i<edges.length;i++){
      e = edges[i];
      ctx.beginPath();
      ctx.moveTo(e.start.x, e.start.y);
      ctx.lineTo(e.end.x,e.end.y);
      ctx.closePath();
      ctx.stroke();
    } //end for

    // Draw the points
    ctx.fillStyle = lc;
    for(let i=0,p;i<map.points.length;i++){
      p = map.points[i];
      ctx.beginPath();
      ctx.fillRect(p.x,p.y,3,3);
      ctx.closePath();
      ctx.fill();
    } //end for
  };

  // Give current and destination target colors so we can loop and
  // draw these for the map for added flavorz
  Easel.color = {
    cur: rndHex(),
    tar: rndHex()
  };

  // Apply a listener to the canvas to have a point move around
  // with the mouse for added effect
  Easel.C.onmousemove = function(e){
    let last = map.points[map.points.length-1];

    last.x = e.clientX - e.target.offsetLeft;
    last.y = e.clientY - e.target.offsetTop;
    Easel.redraw();
  };

  // The main loop consists of transitioning colors of the map
  // while drawing the voronoi diagram
  (function mainLoop(){
    if(Easel.color.cur!==Easel.color.tar){
      let c = ink(Easel.color.cur,{o:1}),
          t = ink(Easel.color.tar,{o:1});

      c.r=c.r<t.r?++c.r:c.r>t.r?--c.r:c.r;
      c.g=c.g<t.g?++c.g:c.g>t.g?--c.g:c.g;
      c.b=c.b<t.b?++c.b:c.b>t.b?--c.b:c.b;
      Easel.color.cur='#'+[c.r,c.g,c.b].map((x)=>x.toString(16)).map((x)=>x.length<2?'0'+x:x).join('');
      if(!(c.r^t.r&&c.g^t.g&&c.b^t.b))Easel.color.tar=rndHex();
    }else{
      Easel.color.tar=rndHex();
    } //end if
    Easel.redraw();
    setTimeout(mainLoop,16);
  })();
} //end if
