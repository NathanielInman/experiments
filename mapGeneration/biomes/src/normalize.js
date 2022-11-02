export function normalize (map) {
  let lowest = Infinity; let highest = -Infinity;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x].height < lowest) {
        lowest = map[y][x].height;
      } else if (map[y][x].height > highest) {
        highest = map[y][x].height;
      } // end if
    } // end for
  } // end for

  // now normalize the height
  const range = highest - lowest;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      map[y][x].height = (map[y][x].height - lowest) / range;
    } // end if
  } // end for
  return map;
} // end normalize()
