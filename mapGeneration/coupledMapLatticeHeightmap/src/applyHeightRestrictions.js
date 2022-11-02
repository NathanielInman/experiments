import { settings } from './settings';

export function applyHeightRestrictions (map) {
  for (let y = 0; y < settings.map.height; y++) {
    for (let x = 0, sector; x < settings.map.width; x++) {
      sector = map[y][x]; // shorten reference

      // layer 1: Central Weight up to sea level
      // Weight: 1
      let distanceWeight = (
        1 - Math.sqrt(Math.pow(settings.map.width / 2 - x, 2) +
          Math.pow(settings.map.height / 2 - y, 2)) /
        Math.sqrt(Math.pow(settings.map.width / 2, 2) +
          Math.pow(settings.map.height / 2, 2))
      );

      if (distanceWeight > 0.5) distanceWeight = 0.5; // limit to sea level
      sector.height += distanceWeight;
      sector.height /= 2;
    } // end for
  } // end for
} // end applyHeightRestrictions()
