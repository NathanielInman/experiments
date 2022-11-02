import './index.styl';
import { Easel } from '@ion-cloud/core';
import { prepareMap } from './prepareMap';
import { applyErosion } from './applyErosion';
import { normalize } from './normalize';
import { settings } from './settings';

const easel = new Easel();
const map = prepareMap();

normalize(map);
applyErosion(map);
normalize(map);
easel.onDraw = () => {
  const v = easel.viewport;
  const ctx = easel.ctx;
  const pw = v.w / settings.map.width; // pixel width
  const ph = v.h / settings.map.height; // pixel height

  for (let y = 0; y < settings.map.height; y++) {
    for (let x = 0, c, c2; x < settings.map.width; x++) {
      c = Math.floor(Math.abs(256 * map[y][x].height)).toString(16);
      c = c.padStart(2, '0');
      if (map[y][x].height <= settings.levels.water) {
        c2 = 255 / settings.levels.water * map[y][x].height;
        c2 = Math.floor(c2 < 0 ? 0 : c2).toString(16);
        c2 = c2.padStart(2, '0');
        ctx.fillStyle = `#00${c}${c2}`;
      } else if (map[y][x].height <= settings.levels.mountain) {
        c2 = 255 / (settings.levels.mountain - settings.levels.water) *
          (map[y][x].height - settings.levels.water);
        c2 = Math.floor(c2 < 0 ? 0 : c2).toString(16);
        c2 = c2.padStart(2, '0');
        ctx.fillStyle = `#${c2}${c}${c2}`;
      } else {
        c2 = 255 / (1 - settings.levels.mountain) *
          (map[y][x].height - settings.levels.water);
        c2 = Math.floor(c2 + 200 > 255 ? 255 : c2 + 200).toString(16);
        c2 = c2.padStart(2, '0');
        ctx.fillStyle = `#${c2}${c2}${c2}`;
      } // end if
      ctx.fillRect(x * pw - 0.3, y * ph - 0.3, pw + 0.6, ph + 0.6);
    } // end for
  } // end for
};
easel.onDraw();
