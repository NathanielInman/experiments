export const environments = [
  {
    name: 'mountain',
    color: {
      hue: 0,
      saturation: 0,
      fog: 0.34,
      lightness: {
        ambient: 0.31,
        floorVisible: 0.3,
        floorHidden: 0.02,
        floorLetter: -0.02,
        floorLetterActive: 0.08,
        wallVisible: 0.5,
        wallHidden: 0.02,
        wallLetter: 0.06,
        wallLetterActive: 0.15
      }
    },
    walls: [
      'rock',
      'cobbled'
    ],
    floors: [
      'rocky',
      'cobbled'
    ],
    obstructions: [
      'rock'
    ],
    description: 'a large natural elevation of earth\'s surface rises abruptly from the surrounding level with little to no trees or vegetation.'
  },
  {
    name: 'anchialine cave',
    color: {
      hue: 60,
      saturation: 0.31,
      fog: 0.79,
      lightness: {
        ambient: 0.2,
        floorVisible: 0.1,
        floorHidden: 0.02,
        floorLetter: 0.06,
        floorLetterActive: 0.14,
        wallVisible: 0.2,
        wallHidden: 0.02,
        wallLetter: 0.05,
        wallLetterActive: 0.15
      }
    },
    walls: [
      'underground'
    ],
    floors: [
      'underground'
    ],
    obstructions: [
      'rock'
    ],
    description: 'this is a cave containing fresh water with an influx of salt water near the base, located near the coast.'
  },
  {
    name: 'graveyard',
    color: {
      hue: 0,
      saturation: 0,
      fog: 0.79,
      lightness: {
        ambient: 0.22,
        floorVisible: 0.1,
        floorHidden: 0.02,
        floorLetter: 0.04,
        floorLetterActive: 0.15,
        wallVisible: 0.2,
        wallHidden: 0.02,
        wallLetter: 0.04,
        wallLetterActive: 0.15
      }
    },
    walls: [
      'brick',
      'tree'
    ],
    floors: [
      'dirt',
      'grass',
      'cobbled',
      'lava'
    ],
    obstructions: [
      'wall',
      'rock'
    ],
    description: 'here is a burial ground for poor-class citizens and wanderers.'
  },
  {
    name: 'arctic tundra',
    color: {
      hue: 243,
      saturation: 0.52,
      fog: 0.72,
      lightness: {
        ambient: 0.65,
        floorVisible: 0.4,
        floorHidden: 0.02,
        floorLetter: -0.09,
        floorLetterActive: 0.13,
        wallVisible: 0.7,
        wallHidden: 0.02,
        wallLetter: 0.02,
        wallLetterActive: 0.13
      }
    },
    walls: [
      'ice',
      'rock'
    ],
    floors: [
      'water',
      'snow',
      'ice'
    ],
    obstructions: [
      'rock',
      'floor',
      'tree'
    ],
    description: 'north of the taiga belt is this arctic tundra where the subsoil is frozen. there are few trees here.'
  },
  {
    name: 'park tundra',
    color: {
      hue: 180,
      saturation: 0.70,
      fog: 0.78,
      lightness: {
        ambient: 0.30,
        floorVisible: 0.1,
        floorHidden: 0.02,
        floorLetter: -0.02,
        floorLetterActive: 0.15,
        wallVisible: 0.3,
        wallHidden: 0.02,
        wallLetter: 0.04,
        wallLetterActive: 0.15
      }
    },
    walls: [
      'rock and dirt',
      'rock',
      'vegetation'
    ],
    floors: [
      'rocky',
      'dirt and rock'
    ],
    obstructions: [
      'tree',
      'shrub'
    ],
    description: 'high enough that strong winds occur a lot but just low enough for trees to grow, this park tundra is generally pretty cold.'
  },
  {
    name: 'sea cove',
    color: {
      hue: 241,
      saturation: 0.59,
      fog: 0.68,
      lightness: {
        ambient: 0.19,
        floorVisible: 0.1,
        floorHidden: 0.02,
        floorLetter: 0.11,
        floorLetterActive: 0.25,
        wallVisible: 0.25,
        wallHidden: 0.02,
        wallLetter: 0.08,
        wallLetterActive: 0.25
      }
    },
    walls: [
      'rock'
    ],
    floors: [
      'water',
      'rocky'
    ],
    obstructions: [
      'rock',
      'floor'
    ],
    description: 'this cave beneath a cliff was caused by erosion from the waves of water crashing in on weak rock and soil.'
  },
  {
    name: 'alpine tundra',
    color: {
      hue: 216,
      saturation: 0.70,
      fog: 0.43,
      lightness: {
        ambient: 0.34,
        floorVisible: 0.12,
        floorHidden: 0.02,
        floorLetter: -0.03,
        floorLetterActive: 0.15,
        wallVisible: 0.3,
        wallHidden: 0.02,
        wallLetter: 0.07,
        wallLetterActive: 0.18
      }
    },
    walls: [
      'rock and dirt'
    ],
    floors: [
      'dirt and rock'
    ],
    obstructions: [
      'rock'
    ],
    description: 'here is a natural biome that doesn\'t contain trees because the altitude is too high.'
  },
  {
    name: 'closed forest taiga',
    color: {
      hue: 170,
      saturation: 0.70,
      fog: 0.52,
      lightness: {
        ambient: 0.3,
        floorVisible: 0.18,
        floorHidden: 0.02,
        floorLetter: -0.03,
        floorLetterActive: 0.15,
        wallVisible: 0.35,
        wallHidden: 0.02,
        wallLetter: 0.07,
        wallLetterActive: 0.18
      }
    },
    walls: [
      'tree',
      'vegetation'
    ],
    floors: [
      'grass'
    ],
    obstructions: [
      'tree',
      'shrub',
      'flora'
    ],
    description: 'composed prediminately of coniferous trees like larch, spruce, fire, and pine, this area is high in altitude.'
  }
];
