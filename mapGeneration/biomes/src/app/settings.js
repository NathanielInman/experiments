export const settings = {
  map: {
    width: 150,
    height: 150,
    depth: {
      min: 9,
      mid: 15,
      max: 30
    }
  },
  levels: {
    water: 0.45, //depth-based
    mountain: 0.63, //depth-based
    grass: 0.45, //biome-based
    trees: 0.55 //biome-based
  }
};
