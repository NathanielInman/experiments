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
    water: 0.45, // depth-based
    beach: 0.47, // depth-based
    mountain: 0.75, // depth-based
    grass: 0.45, // biome-based
    trees: 0.52 // biome-based
  },
  colors: {
    water: '#004',
    beach: '#440',
    dirt: '#442',
    grass: '#141',
    trees: '#243',
    mountain: '#444'
  }
};
