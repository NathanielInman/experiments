import {ink,Easel} from 'ion-cloud';
import {Ion} from './Ion';
import {Map} from './Map';
import {environments} from './environments';
import {Player} from './Player';

window.ink = ink;

let magic=new Ion(1000),
    r=function(f,g,e){
      g=g||0;e=e||true;
      g=Math.random()*(g-f);
      g=g<0?Math.random()*g:g+f;
      return e==false?Math.floor(g):g
    };

let noscript = document.querySelector('noscript'),
    easel = new Easel(),
    environmentIndex = Math.floor(Math.random()*environments.length),
    environment = environments[environmentIndex],
    map = new Map(50,50,environment),
    player = new Player(map,easel); //create the player and tie map to it

//eslint-disable-next-line no-console
console.info(`environment: ${environment.name}`);

if(!easel.activated){
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  easel.config = ()=>{
    let s = easel.viewport.w<easel.viewport.h?easel.viewport.w:easel.viewport.h;

    easel.ctx.font = `${s/(player.sight*2+1)}px monospace`;
    easel.ctx.textBaseline = 'middle';
    easel.ctx.textAlign = 'center';
  };

  //eslint-disable-next-line complexity
  easel.onDraw = function(){
    let rh = easel.viewport.h/(player.sight*2+1), //row height
        rw = easel.viewport.w/(player.sight*2+1), //row width
        rs = rh<rw?rh:rw; //row size (takes lesser of width/height)

    // start by cleaning the map
    easel.ctx.fillStyle=ink(`hsl(${
      environment.color.hue},${
      environment.color.saturation},${
      environment.color.lightness.ambient})`);
    easel.ctx.fillRect(0,0,easel.viewport.w,easel.viewport.h);

    // now draw the sectors
    easel.ctx.shadowBlur = 0;
    for(let y=player.y-player.sight;y<=player.y+player.sight+1;y++){
      for(let x=player.x-player.sight;x<=player.x+player.sight+1;x++){
        if(x<0||y<0||x>map.width-1||y>map.height-1) continue;
        let ox = (x-player.x+player.sight)*rs,
            oy = (y-player.y+player.sight)*rs,
            mx = ox+rs/2, my = oy+rs/2,
            s = map.getColors(x,y);

        if(map.isSeen(x,y)&&s){
          easel.ctx.fillStyle = s.backgroundColor;
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.fillStyle = s.foregroundColor;
          easel.ctx.fillText(s.character,mx,my);
        } //end if
      } //end for
    } //end for

    // now that we've drawn the map, draw the player
    easel.ctx.shadowBlur = 5;
    easel.ctx.fillStyle=ink('#0f0',{a: 0.5});
    easel.ctx.fillText('@',player.sight*rs+rs/2,player.sight*rs+rs/2);
    if(map.getSector(player.x,player.y).type.sunk){
      let s = map.getColors(player.x,player.y);

      easel.ctx.shadowBlur = 0;
      easel.ctx.fillStyle = s.backgroundColor;
      easel.ctx.fillRect(player.sight*rs,player.sight*rs+rs/2,rs,rs/2-1);
      easel.ctx.fillStyle = s.foregroundColor;
      easel.ctx.fillText(s.character,player.sight*rs+rs/2,player.sight*rs+rs/2);
    } //end if

    // now draw the shadows
    easel.ctx.beginPath();
    for(let y=player.y-player.sight-1;y<=player.y+player.sight;y++){
      for(let x=player.x-player.sight;x<=player.x+player.sight+1;x++){
        let ox = (x-player.x+player.sight)*rs,
            oy = (y-player.y+player.sight)*rs,
            ss = 3; //shadow size is based off the row size

        if(x<0||y<0||x>map.width-1||y>map.height-1||!map.isVisible(x,y)){
          let shadows = map.getNearVisible(x,y);

          if(shadows.includes('west')){
            easel.ctx.rect(ox,oy,ss,rs);
          } //end if
          if(shadows.includes('east')){
            easel.ctx.rect(ox+rs-ss,oy,ss,rs);
          } //end if
          if(shadows.includes('north')){
            easel.ctx.rect(ox,oy,rs,ss);
          } //end if
          if(shadows.includes('south')){
            easel.ctx.rect(ox,oy+rs-ss,rs,ss);
          } //end if
          if(shadows.includes('northwest')){
            easel.ctx.rect(ox,oy,ss,ss);
          } //end if
          if(shadows.includes('northeast')){
            easel.ctx.rect(ox+rs-ss,oy,ss,ss);
          } //end if
          if(shadows.includes('southwest')){
            easel.ctx.rect(ox,oy+rs-ss,ss,ss);
          } //end if
          if(shadows.includes('southeast')){
            easel.ctx.rect(ox+rs-ss,oy+rs-ss,ss,ss);
          } //end if
        } //end if
      } //end for
    } //end for
    easel.ctx.fillStyle = 'rgba(0,0,0,0.7)';
    easel.ctx.shadowColor = '#000';
    easel.ctx.shadowBlur = 15;
    easel.ctx.fill();
    magic.background = easel.ctx.getImageData(0,0,easel.viewport.w,easel.viewport.h);
  };
  easel.redraw();

  magic.easel          = easel;
  magic.tween_duration = 1000;
  magic.sx             = function(){return r(0,easel.viewport.w);};
  magic.sy             = function(){return r(0,easel.viewport.h);};
  magic.dx             = function(x){return x;};
  magic.dy             = function(y){return y-50;};
  magic.size           = function(){return r(0,2);};
  magic.color          = function(atom){
    let p, halfTween = magic.tween_duration/2;

    if(atom.c<=halfTween){
      p = atom.c/halfTween;
    }else{
      p = (halfTween-Math.abs(halfTween-atom.c))/halfTween;
    } //end if
    return `rgba(25,150,255,${p})`;
  };
  magic.tween_type     = 6;
  magic.onEscape       = function(atom){this.onEnd(atom);};
  magic.onEnd          = function(atom){
    this.particle[atom].x = this.particle[atom].sx = magic.sx();
    this.particle[atom].y = this.particle[atom].sy = magic.sy();
    this.particle[atom].dx = magic.dx(this.particle[atom].x);
    this.particle[atom].dy = magic.dy(this.particle[atom].y);
    this.particle[atom].c  =0;
  };
  magic.background = easel.ctx.getImageData(0,0,easel.viewport.w,easel.viewport.h);
  magic.populate();
  magic.process();
} //end if
