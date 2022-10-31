import { ink, Easel, Ion, IonCloud } from 'ion-cloud';
import { Map } from './Map';
import { environments } from './environments';
import { Player } from './Player';
import { capitalize } from './capitalize';

const noscript = document.querySelector('noscript');
const easel = new Easel();
const scene = new IonCloud(easel, Ion);
const environmentIndex = Math.floor(Math.random() * environments.length);
const environment = environments[environmentIndex];
const map = new Map(50, 50, environment);
const player = new Player(map, easel, scene); // create the player and tie map to it

scene.camera = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0
};

if (!easel.activated) {
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
} else {
  easel.config = () => {
    easel.ctx.textBaseline = 'middle';
  };

  // eslint-disable-next-line complexity
  easel.onDraw = function () {
    const rh = easel.viewport.h / (player.sight * 2 + 1); // row height
    const rw = easel.viewport.w / (player.sight * 2 + 1); // row width
    const rs = rh < rw ? rh : rw; // row size (takes lesser of width/height)
    const c = environment.color;
    const s = easel.viewport.w < easel.viewport.h ? easel.viewport.w : easel.viewport.h;
    const ambient = ink(`hsl(${c.hue},${c.saturation},${c.lightness.ambient})`);

    // start by cleaning the map
    easel.ctx.font = `${s / (player.sight * 2 + 1)}px monospace`;
    easel.ctx.textAlign = 'center';
    easel.ctx.fillStyle = ambient;
    easel.ctx.fillRect(0, 0, easel.viewport.w, easel.viewport.h);
    scene.clean(); // ensure we don't have leftover particles

    // now draw the sectors
    easel.ctx.shadowBlur = 0;
    for (let y = player.y - player.sight; y <= player.y + player.sight + 1; y++) {
      for (let x = player.x - player.sight; x <= player.x + player.sight + 1; x++) {
        if (x < 0 || y < 0 || x > map.width - 1 || y > map.height - 1) continue;
        const ox = (x - player.x + player.sight) * rs;
        const oy = (y - player.y + player.sight) * rs;
        const mx = ox + rs / 2; const my = oy + rs / 2;
        const s = map.getColors(x, y);

        if (map.isSeen(x, y) && s) {
          easel.ctx.fillStyle = s.backgroundColor;
          easel.ctx.fillRect(ox, oy, rs, rs);
          easel.ctx.fillStyle = s.foregroundColor;
          easel.ctx.fillText(s.character, mx, my);
          if (map.isVisible(x, y) && map.getSector(x, y).type.animation === 'bubbles') {
            scene.animate('bubbles', {
              startX: ox,
              startY: oy,
              width: rs,
              height: rs,
              color: ink(ambient, { lightness: 0.5, format: 'hex' }),
              distance: 10,
              quantity: 50,
              duration: 500
            });
          } else if (map.isVisible(x, y) && map.getSector(x, y).type.animation === 'flame') {
            scene.animate('smoke', {
              startX: ox,
              startY: oy,
              width: rs,
              color: ink(s.backgroundColor, { lightness: 0.4, format: 'hex', a: 0.1 }),
              height: rs,
              quantity: 100
            });
          } // end if
        } // end if
      } // end for
    } // end for

    // now that we've drawn the map, draw the player
    easel.ctx.shadowBlur = 5;
    easel.ctx.fillStyle = ink('#0f0', { a: 0.5 });
    easel.ctx.fillText('@', player.sight * rs + rs / 2, player.sight * rs + rs / 2);
    if (map.getSector(player.x, player.y).type.sunk) {
      const s = map.getColors(player.x, player.y);

      easel.ctx.shadowBlur = 0;
      easel.ctx.fillStyle = s.backgroundColor;
      easel.ctx.fillRect(player.sight * rs, player.sight * rs + rs / 2, rs, rs / 2 - 1);
      easel.ctx.fillStyle = s.foregroundColor;
      easel.ctx.fillText(s.character, player.sight * rs + rs / 2, player.sight * rs + rs / 2);
    } // end if

    // now draw the shadows
    easel.ctx.beginPath();
    for (let y = player.y - player.sight - 1; y <= player.y + player.sight; y++) {
      for (let x = player.x - player.sight; x <= player.x + player.sight + 1; x++) {
        const ox = (x - player.x + player.sight) * rs;
        const oy = (y - player.y + player.sight) * rs;
        const ss = 3; // shadow size is based off the row size

        if (x < 0 || y < 0 || x > map.width - 1 || y > map.height - 1 || !map.isVisible(x, y)) {
          const shadows = map.getNearVisible(x, y);

          if (shadows.includes('west')) {
            easel.ctx.rect(ox, oy, ss, rs);
          } // end if
          if (shadows.includes('east')) {
            easel.ctx.rect(ox + rs - ss, oy, ss, rs);
          } // end if
          if (shadows.includes('north')) {
            easel.ctx.rect(ox, oy, rs, ss);
          } // end if
          if (shadows.includes('south')) {
            easel.ctx.rect(ox, oy + rs - ss, rs, ss);
          } // end if
          if (shadows.includes('northwest')) {
            easel.ctx.rect(ox, oy, ss, ss);
          } // end if
          if (shadows.includes('northeast')) {
            easel.ctx.rect(ox + rs - ss, oy, ss, ss);
          } // end if
          if (shadows.includes('southwest')) {
            easel.ctx.rect(ox, oy + rs - ss, ss, ss);
          } // end if
          if (shadows.includes('southeast')) {
            easel.ctx.rect(ox + rs - ss, oy + rs - ss, ss, ss);
          } // end if
        } // end if
      } // end for
    } // end for
    easel.ctx.fillStyle = 'rgba(0,0,0,0.7)';
    easel.ctx.shadowColor = '#000';
    easel.ctx.shadowBlur = 15;
    easel.ctx.fill();
    easel.ctx.textAlign = 'left';
    easel.ctx.font = '14px monospace';
    easel.ctx.fillStyle = ink(`hsl(${c.hue},${c.saturation},${c.lightness.ambient + 0.3})`);
    easel.ctx.fillText(capitalize(environment.name), 20, 20);
    scene.background = easel.ctx.getImageData(0, 0, easel.viewport.w, easel.viewport.h);
    easel.ctx.shadowBlur = 0;
  };
  easel.redraw();
  scene.draw();
} // end if
