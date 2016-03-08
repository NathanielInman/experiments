var height=10;
var draw=[{x:0,y:0,w:v.w}];
easel.onDraw=function(){ //pull a visible block to draw
  ctx.fillStyle='#0F0';
  var c=draw.pop();
  ctx.fillRect(c.x,c.y,c.w,height); //draw cur
  if(c.w/3>0.01){ //don't bother drawing if less than 1 pixel
    draw.push({x:c.x,        y:c.y+height+2,w:c.w/3}); //add left next
    draw.push({x:c.x+c.w/3*2,y:c.y+height+2,w:c.w/3}); //add right next
  } //end if
  if(draw.length!==0)easel.redraw();
};
easel.redraw();
