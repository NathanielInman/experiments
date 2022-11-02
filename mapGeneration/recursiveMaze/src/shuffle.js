// shuffles an array in place
export function shuffle (array) {
  for (let i = array.length - 1, j; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } // end for
  return array;
} // end shuffle()
