import {ink,Easel} from 'ion-cloud';
import {Map} from './Map';
import {environments} from './environments';
import {Player} from './Player';

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
    easel.ctx.fillStyle=environment.color;
    easel.ctx.fillRect(0,0,easel.viewport.w,easel.viewport.h);

    // now draw the sectors
    for(let y=player.y-player.sight-1;y<=player.y+player.sight;y++){
      for(let x=player.x-player.sight;x<=player.x+player.sight+1;x++){
        if(x<0||y<0||x>map.width-1||y>map.height-1) continue;
        let ox = (x-player.x+player.sight)*rs,
            oy = (y-player.y+player.sight)*rs,
            mx = ox+rs/2, my = oy+rs/2,
            s = map.getColors(x,y);

        if(s){
          easel.ctx.shadowColor = s.backgroundShadowColor;
          easel.ctx.shadowBlur = s.backgroundShadowBlur;
          easel.ctx.fillStyle = s.backgroundColor;
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowColor = s.foregroundShadowColor;
          easel.ctx.shadowBlur = s.foregroundShadowBlur;
          easel.ctx.fillStyle = s.foregroundColor;
          easel.ctx.fillText(s.character,mx,my);
        } //end if
      } //end for
    } //end for

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
    easel.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    easel.ctx.shadowColor = '#000';
    easel.ctx.shadowBlur = 10;
    easel.ctx.fill();

    // now that we've drawn the map, draw the player
    easel.ctx.shadowBlur = 5;
    easel.ctx.fillStyle=ink('#0f0',{a: 0.5});
    easel.ctx.fillText('@',player.sight*rs+rs/2,player.sight*rs+rs/2);
  };
  easel.redraw();
} //end if
