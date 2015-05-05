/**
 * main entrance point to application
 */
function app() {
  "use strict";

  var
  scene = new IonCollection();
  scene.make('fire',250,200,100,120,'rgba(250,50,0,0.05)',100);
  scene.make('vortex',-250,-250,400,function(){
    scene.make('laser',-250,-250,-150,250);
  });
  scene.draw();
  scene.clearScene=function(){
    // Clear screen
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);

    // Draw a ground
    ctx.fillStyle='rgba(10,80,10,0.7)';
    ctx.fillRect(0,v.h/4*3,v.w,v.h/4);
  };
  setInterval(function(){
    if(scene.camera.dx===0){
      scene.camera.x--;
    }else{
      scene.camera.x++;
    } //end if
    if(scene.camera.x<100||scene.camera.x>v.w-500)scene.camera.dx^=1;
  },10);
} //end app()
