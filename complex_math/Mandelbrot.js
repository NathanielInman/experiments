var v,w=function(){var t=window,n="inner";return t.innerWidth||(n="client",t=document.documentElement||document.body),{w:t[n+"Width"],h:t[n+"Height"]}},v=w(),$=function(t){return document.getElementsByTagName(t)[0]},sa=function(t,n){for(var e=0;e<n.length;e++)$(t).setAttribute(n[e][0],n[e][1])},ctx,r=function(){ctx=$("canvas").getContext("2d")},q=function(){sa("canvas",[["width",v.w+"px"],["height",v.h+"px"]])};q(),r(),window.onresize=function(){v=w(),r(),q(),ctx.fillStyle="#000",ctx.fillRect(0,0,v.w,v.h)},ctx.fillStyle="#000",ctx.fillRect(0,0,v.w,v.h);

var iterations=5000,
    X = -0.7463,
    Y =  0.1102,
    R =  0.005,
    xmin=X-R,xmax=X+R,
    ymin=Y-R,ymax=Y+R;

var mandelbrotIteration=function(cx,cy,maxiter){
  var x=0.0,y=0.0,tmp=0;
  for(var i=0;i<maxiter&&x*x+y*y<=4;++i){
    tmp=2*x*y;
    x=x*x-y*y+cx;
    y=tmp+cy;
  } //end for
  return i;
}; 
(function mainLoop(cur){
  var c,r,g,b, //variables used to distinguish color
      ix,iy,x,y,i; //location and iteration location variables

  for(var ix=cur;ix<cur+1&&ix<v.w;++ix){
    for(var iy=0;iy<v.h;++iy){
      x = xmin+(xmax-xmin)*ix/(v.w-1);
      y = ymin+(ymax-ymin)*iy/(v.h-1);
      i = mandelbrotIteration(x,y,iterations);
      c = 0xffffff/3*3*Math.log(i)/Math.log(iterations-1.0);
      r = (c & 0xff0000) >> 16;
      g = (c & 0x00ff00) >> 8;
      b = (c & 0x0000ff);
      ctx.fillStyle='rgb('+r+','+g+','+b+')';
      ctx.fillRect(ix,iy,3,3);
    } //end for
  } //end for
  if(ix<v.w)setTimeout(function(){mainLoop(ix)},1);
})(0);
