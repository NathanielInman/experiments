import {ink,Easel} from 'ion-cloud';
import {Map} from './Map';
import {environments} from './environments';
import {Player} from './Player';

let noscript = document.querySelector('noscript'),
    easel = new Easel(),
    map = new Map(50,50),
    player = new Player(map), //create the player and tie map to it
    environmentIndex = Math.floor(Math.random()*environments.length),
    environment = environments[environmentIndex];

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

    easel.ctx.font = `${s/50}px monospace`;
    easel.ctx.textBaseline = 'middle';
    easel.ctx.textAlign = 'center';
  };
  easel.onDraw = function(){
    let rh = easel.viewport.h/map.height, //row height
        rw = easel.viewport.w/map.width, //row width
        rs = rh<rw?rh:rw; //row size (takes lesser of width/height)

    // start by cleaning the map
    easel.ctx.fillStyle=environment.color;
    easel.ctx.fillRect(0,0,easel.viewport.w,easel.viewport.h);

    // now draw the sectors
    map.sectors.forEach((row,y)=>{
      row.forEach((sector,x)=>{
        let ox = x*rs, oy = y*rs, mx = ox+rs/2, my = oy+rs/2,
            a = 0.5;

        if(sector.isVisible()){
          easel.ctx.shadowColor = ink('#000',{a: 0.3});
          easel.ctx.shadowBlur = 10;
          a = 0.5;
        }else{
          easel.ctx.shadowColor = '#000';
          easel.ctx.shadowBlur = 10;
          a = 0.15;
        } //end if
        if(sector.isWall()){
          easel.ctx.fillStyle=ink('#333',{a});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.fillStyle=ink('#888',{a});
          easel.ctx.fillText('#',mx,my);
        }else if(sector.isDoor()){
          easel.ctx.fillStyle=ink('#b94',{a});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.fillStyle=ink('#222',{a});
          easel.ctx.fillText('+',mx,my);
        }else if(sector.isCorridor()){
          easel.ctx.fillStyle=ink('#774',{a});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowBlur = 0;
          easel.ctx.fillStyle=ink('#999',{a});
          easel.ctx.fillText('.',mx,my);
        }else if(sector.isFloor()){ //floor
          easel.ctx.fillStyle=ink('#383',{a});
          easel.ctx.fillRect(ox,oy,rs,rs);
          easel.ctx.shadowBlur = 0;
          easel.ctx.fillStyle=ink('#666',{a});
          easel.ctx.fillText('.',mx,my);
        } //end if
      });
    });

    // now that we've drawn the map, draw the player
    easel.ctx.shadowBlur = 5;
    easel.ctx.fillStyle=ink('#0f0',{a: 0.5});
    easel.ctx.fillText('@',player.x*rs+rs/2,player.y*rs+rs/2);
  };
  easel.redraw();
} //end if

// eslint-disable-next-line complexity
document.addEventListener('keydown',event=>{
  let keyName = event.key;

  if(keyName==='a'||keyName==='h'||keyName==='ArrowLeft'){
    if(player.move('west')) easel.redraw();
  }else if(keyName==='x'||keyName==='j'||keyName==='ArrowDown'){
    if(player.move('south')) easel.redraw();
  }else if(keyName==='w'||keyName==='k'||keyName==='ArrowUp'){
    if(player.move('north')) easel.redraw();
  }else if(keyName==='d'||keyName==='l'||keyName==='ArrowRight'){
    if(player.move('east')) easel.redraw();
  }else if(keyName==='q'||keyName==='y'){
    if(player.move('northwest')) easel.redraw();
  }else if(keyName==='e'||keyName==='u'){
    if(player.move('northeast')) easel.redraw();
  }else if(keyName==='z'||keyName==='b'){
    if(player.move('southwest')) easel.redraw();
  }else if(keyName==='c'||keyName==='n'){
    if(player.move('southeast')) easel.redraw();
  } //end if
});
