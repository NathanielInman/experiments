import './index.styl';
import { Easel, ink } from '@ion-cloud/core';
import { prepareMap } from './prepareMap';
import { applyErosion } from './applyErosion';
import { normalize } from './normalize';
import { settings } from './settings';

const easel = new Easel();
const {ctx, viewport: v } = easel;
const map = prepareMap(); // creates map and applies height & biomes

normalize(map);
applyErosion(map);
normalize(map);

easel.onDraw = () => {
  const v = easel.viewport;
  const ctx = easel.ctx;
  const pw = v.w / settings.map.width; // pixel width
  const ph = v.h / settings.map.height; // pixel height

  for (let y = 0; y < settings.map.height; y++) {
    for (let x = 0, lightness; x < settings.map.width; x++) {
      lightness = map[y][x].height > 1 ? 1 : map[y][x].height;
      if (map[y][x].height <= settings.levels.water) {
        ctx.fillStyle = ink(settings.colors.water, { lightness });
      } else if (map[y][x].height <= settings.levels.beach) {
        ctx.fillStyle = ink(settings.colors.beach, { lightness: lightness / 4 });
      } else if (map[y][x].height > settings.levels.mountain) {
        lightness = 0.4 + (1 - 0.4) *
          (lightness - settings.levels.mountain) /
          (1 - settings.levels.mountain);
        ctx.fillStyle = ink(settings.colors.mountain, { lightness });
      } else if (map[y][x].biome <= settings.levels.grass) {
        ctx.fillStyle = ink(settings.colors.dirt, { lightness: lightness / 2 });
      } else if (map[y][x].biome <= settings.levels.trees) {
        ctx.fillStyle = ink(settings.colors.grass, { lightness: lightness / 2 });
      } else if (map[y][x].biome > settings.levels.trees) {
        ctx.fillStyle = ink(settings.colors.trees, { lightness: lightness / 2 });
      } // end if
      ctx.fillRect(x * pw - 0.3, y * ph - 0.3, pw + 0.6, ph + 0.6);
    } // end for
  } // end for
};
easel.redraw();
