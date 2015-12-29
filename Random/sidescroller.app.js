function drawAsset(o,ox,oy){
  var i=0,
      x,y,w,h;

  for(;i<o.length;i++){
    x = o[i][0]*assets.scale+ox;
    y = o[i][1]*assets.scale+oy;
    w = o[i][2]*assets.scale;
    h = o[i][3]*assets.scale
    ctx.fillRect(x,y,w,h);
  } //end for
};
//the main drawing function
function draw(){
  var x,y,w,h;

  //Handle the key staging
  if(player.key.left){
    if(player.x-player.w/2-1>0){ //player can't walk off the screen
      player.dirty.push(function(){player.x-=player.s;});
    } //end if
  } //end if
  if(player.key.right){
    if(player.x+player.w/2+1<v.w){ //player can't walk off the screen
      player.dirty.push(function(){player.x+=player.s;});
    } //end if
  } //end if
  if(player.key.up){
    if(!player.jump.is)player.perform.jump(player);
  } //end if
  //draw the ground
  for(var i=0;i<v.w/assets.scale;i++){
    ctx.fillStyle='#833';
    ctx.fillRect(i*assets.scale,v.h-assets.scale,50,50);
    ctx.fillStyle=assets.grass.color;
    drawAsset(assets.brick,i*assets.scale,v.h-assets.scale);
  } //end for
  //draw the player
  if(player.dirty.length>0){
    x = player.x-player.w/2;
    y = v.h-assets.scale-player.h-player.y-player.jump.c;
    w = player.w;
    h = player.h;
    ctx.fillStyle='#000';
    ctx.fillRect(x,y,w,h);
    for(operation in player.dirty){
      player.dirty[operation]();
    } //end for
    player.dirty=[];
  } //end if
  ctx.fillStyle=player.c;
  x = player.x - player.w/2;
  y = v.h-assets.scale-player.h-player.y-player.jump.c;
  w = player.w;
  h = player.h;
  ctx.fillRect(x,y,w,h);
  setTimeout(draw,1);
};

//Event handlers
(function(){
  Mousetrap.bind(['w','up'],function(){player.key.up=true;});
  Mousetrap.bind(['w','up'],function(){player.key.up=false;},'keyup');
  Mousetrap.bind(['d','right'],function(){player.key.right=true;});
  Mousetrap.bind(['d','right'],function(){player.key.right=false;},'keyup');
  Mousetrap.bind(['a','left'],function(){player.key.left=true;});
  Mousetrap.bind(['a','left'],function(){player.key.left=false;},'keyup');
  draw();
})();

