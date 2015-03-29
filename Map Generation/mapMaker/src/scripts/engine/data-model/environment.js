export var environment = [
  {	name:      "mountain",
    floor:     [7,9],
    wall:      [3,4],
    background:{value:"#505050",strength:0.2},
    visited:   {floor:"#303030",    wall:"#404040"}
  },{	name:      "canyon",
    floor:     [1,7,11,6],
    wall:      [1,2,3],
    background:{value:"#505023",strength:0.6},
    visited:   {floor:"#606033",    wall:"#707043"}
  },{	name:      "anchihaline cave",
      floor:     [12],
      wall:      [8],
    background:{value:"#1e1e10",strength:0.2},
    visited:   {floor:"#2e2e20",    wall:"#3e3e30"}
  },{	name:      "talus cave",
      floor:     [12,7],
      wall:      [3,8],
    background:{value:"#051919",strength:0.4},
    visited:   {floor:"#152929",    wall:"#253939"}
  },{	name:      "fracture cave",
      floor:     [7],
      wall:      [3],
    background:{value:"#1B0D1B",strength:0.4},
    visited:   {floor:"#2B1D2B",    wall:"#3B2D3B"}
  },{	name:      "glacier cave",
      floor:     [5],
      wall:      [9],
    background:{value:"#013232",strength:0.4},
    visited:   {floor:"#114242",    wall:"#215252"}
  },{	name:      "erosional cave",
      floor:     [1,11,3],
      wall:      [1],
    background:{value:"#300F30",strength:0.5},
    visited:   {floor:"#401F40",    wall:"#502F50"}
  },{	name:      "sea cave",
      floor:     [3,7],
      wall:      [3],
    background:{value:"#141348",strength:0.6},
    visited:   {floor:"#242358",    wall:"#343368"}
  },{	name:      "primary cave",
      floor:     [2,7,11],
      wall:      [3],
    background:{value:"#0B0B0B",strength:0.5},
    visited:   {floor:"#1B1B1B",    wall:"#2B2B2B"}
  },{	name:      "cavern",
      floor:     [11,12],
      wall:      [2,8],
    background:{value:"#311919",strength:0.4},
    visited:   {floor:"#412929",    wall:"#513939"}
  },{	name:      "surface mine",
      floor:     [1,11],
      wall:      [1,3,5],
    background:{value:"#311841",strength:0.2},
    visited:   {floor:"#412851",    wall:"#513861"}
  },{	name:      "sub-surface mine",
      floor:     [7,10,12],
      wall:      [3,6,8],
    background:{value:"#222232",strength:0.4},
    visited:   {floor:"#333343",    wall:"#444454"}
  },{	name:      "graveyard",
      floor:     [1,4,9],
      wall:      [6,7],
    background:{value:"#4B3232",strength:0.4},
    visited:   {floor:"#5B4242",    wall:"#6B5252"}
  },{	name:      "cemetary",
      floor:     [4,9],
      wall:      [7],
    background:{value:"#4A1A1A",strength:0.3},
    visited:   {floor:"#5A2A2A",    wall:"#6A3A3A"}
  },{	name:      "crypt",
      floor:     [9],
      wall:      [7],
    background:{value:"#643333",strength:0.6},
    visited:   {floor:"#744343",    wall:"#845353"}
  },{	name:      "mausoleum",
      floor:     [14],
      wall:      [11],
    background:{value:"#644B4B",strength:0.4},
    visited:   {floor:"#745B5B",    wall:"#846B6B"}
  },{	name:      "catacomb",
      floor:     [1,11,7,10],
      wall:      [1,4,6],
    background:{value:"#7D4C4B",strength:0.1},
    visited:   {floor:"#8D5C5B",    wall:"#9D6C6B"}
  },{	name:      "ossuary",
      floor:     [13],
      wall:      [10],
    background:{value:"#474C1C",strength:0.4},
    visited:   {floor:"#575C2C",    wall:"#676C3C"}
  },{	name:      "charnel house",
      floor:     [10],
      wall:      [6],
    background:{value:"#4F2A0A",strength:0.1},
    visited:   {floor:"#5F3A1A",    wall:"#6F4A2A"}
  },{	name:      "artic tundra",
      floor:     [3,5,15],
      wall:      [9],
    background:{value:"#4B4B97",strength:0.0},
    visited:   {floor:"#5B5BA7",    wall:"#6B6BB7"}
  },{	name:      "antartic tundra",
      floor:     [3,15],
      wall:      [9],
    background:{value:"#403B97",strength:0.2},
    visited:   {floor:"#504BA7",    wall:"#605BB7"}
  },{	name:      "alpine tundra",
      floor:     [11],
      wall:      [2],
    background:{value:"#194B96",strength:0.6},
    visited:   {floor:"#295BA6",    wall:"#396BB6"}
  },{	name:      "fellfield tundra",
      floor:     [11],
      wall:      [2,3],
    background:{value:"#646496",strength:0.6},
    visited:   {floor:"#7474A6",    wall:"#8484B6"}
  },{	name:      "park tundra",
      floor:     [11,7],
      wall:      [2,3,13],
    background:{value:"#009696",strength:0.5},
    visited:   {floor:"#10A6A6",    wall:"#20B6B6"}
  },{	name:      "closed forest taiga",
      floor:     [4],
      wall:      [12,13],
    background:{value:"#00967D",strength:0.2},
    visited:   {floor:"#10A68D",    wall:"#20B69D"}
  },{	name:      "lichen woodland taiga",
      floor:     [4],
      wall:      [12,13],
    background:{value:"#183219",strength:0.2},
    visited:   {floor:"#284229",    wall:"#385239"}
  },{	name:      "boreal forest",
      floor:     [1,4],
      wall:      [12,13],
    background:{value:"#204B24",strength:0.2},
    visited:   {floor:"#305B34",    wall:"#406B44"}
  },{	name:      "montane grassland",
      floor:     [4],
      wall:      [12,3],
    background:{value:"#339646",strength:0.2},
    visited:   {floor:"#43A656",    wall:"#53B666"}
  },{	name:      "montane shrubland",
      floor:     [4],
      wall:      [12],
    background:{value:"#5B9740",strength:0.2},
    visited:   {floor:"#6BA750",    wall:"#7BB760"}
  },{	name:      "carpathian forest",
      floor:     [4,11],
      wall:      [12,13],
    background:{value:"#649664",strength:0.2},
    visited:   {floor:"#74A674",    wall:"#84B684"}
  },{	name:      "giant sequoia forest",
      floor:     [1,4,11],
      wall:      [12,13],
    background:{value:"#114B25",strength:0.2},
    visited:   {floor:"#215B35",    wall:"#316B45"}
  },{	name:      "coastal redwood forest",
      floor:     [1,11,7],
      wall:      [12,13],
    background:{value:"#311111",strength:0.7},
    visited:   {floor:"#412121",    wall:"#513131"}
  },{	name:      "douglas-fir forest",
      floor:     [4,11,7],
      wall:      [12,13],
    background:{value:"#96964A",strength:0.3},
    visited:   {floor:"#A6A66A",    wall:"#B6B67A"}
  },{	name:      "sitka spruce forest",
      floor:     [1,8,7],
      wall:      [12,13],
    background:{value:"#7D7D4B",strength:0.3},
    visited:   {floor:"#8D8D5B",    wall:"#9D9D6B"}
  },{	name:      "alerce forest",
      floor:     [4,8,7],
      wall:      [12,13],
    background:{value:"#649696",strength:0.4},
    visited:   {floor:"#74A6A6",    wall:"#84B6B6"}
  },{	name:      "kauri forest",
      floor:     [1,4,8,7],
      wall:      [3,12,13],
    background:{value:"#7D646D",strength:0.4},
    visited:   {floor:"#8D747D",    wall:"#9D848D"}
  },{	name:      "tropical forest",
      floor:     [1,11],
      wall:      [12,13],
    background:{value:"#649666",strength:0.3},
    visited:   {floor:"#74A676",    wall:"#84B686"}
  },{	name:      "subtropical forest",
      floor:     [4,11],
      wall:      [12,13],
    background:{value:"#327E7D",strength:0.3},
    visited:   {floor:"#428E8D",    wall:"#529E9D"}
  },{	name:      "temperate forest",
      floor:     [1,4],
      wall:      [3,12,13],
    background:{value:"#4B964B",strength:0.4},
    visited:   {floor:"#5BA65B",    wall:"#6BB66B"}
  },{	name:      "mediterranean forest",
      floor:     [1,7,11],
      wall:      [3,12,13],
    background:{value:"#204B24",strength:0.2},
    visited:   {floor:"#305B34",    wall:"#406B44"}
  },{	name:      "mediterranean woodland",
      floor:     [1,11],
      wall:      [12],
    background:{value:"#183219",strength:0.3},
    visited:   {floor:"#284229",    wall:"#385239"}
  },{	name:      "mediterranean savanna",
      floor:     [1],
      wall:      [13],
    background:{value:"#0A9647",strength:0.5},
    visited:   {floor:"#1AA657",    wall:"#2AB667"}
  },{	name:      "mediterranean shrubland",
      floor:     [4],
      wall:      [3,13],
    background:{value:"#0FAF4B",strength:0.4},
    visited:   {floor:"#1FBF5B",    wall:"#2FCF6B"}
  },{	name:      "mediterranean grassland",
      floor:     [4],
      wall:      [3],
    background:{value:"#97AF96",strength:0.3},
    visited:   {floor:"#A7BFA6",    wall:"#B7CFB6"}
  },{	name:      "tropical broadleaf forest",
      floor:     [1,4,11],
      wall:      [12],
    background:{value:"#96AF7D",strength:0.3},
    visited:   {floor:"#A6BF8D",    wall:"#B6CF9D"}
  },{	name:      "subtropical broadleaf forest",
      floor:     [1,11,7],
      wall:      [12,13],
    background:{value:"#96AE4A",strength:0.4},
    visited:   {floor:"#A6BE5A",    wall:"#B6CE6A"}
  },{	name:      "bayou",
      floor:     [1,8,3],
      wall:      [12],
    background:{value:"#323264",strength:0.5},
    visited:   {floor:"#424274",    wall:"#525285"}
  },{	name:      "wetland fen",
      floor:     [1,8,3,4],
      wall:      [13],
    background:{value:"#343693",strength:0.4},
    visited:   {floor:"#4446A3",    wall:"#5456B3"}
  },{	name:      "valley bog",
      floor:     [1,8,3,7],
      wall:      [13,12],
    background:{value:"#181831",strength:0.3},
    visited:   {floor:"#282841",    wall:"#383851"}
  },{	name:      "raised bog",
      floor:     [1,8,3,7,11],
      wall:      [3,13,12],
    background:{value:"#19324B",strength:0.5},
    visited:   {floor:"#29425B",    wall:"#39526B"}
  },{	name:      "blanket bog",
      floor:     [1,8,3,7,11],
      wall:      [2,3,13,12],
    background:{value:"#32324B",strength:0.5},
    visited:   {floor:"#42425B",    wall:"#52526B"}
  },{	name:      "freshwater swamp forest",
      floor:     [8,3],
      wall:      [13,12],
    background:{value:"#323264",strength:0.6},
    visited:   {floor:"#424274",    wall:"#525284"}
  },{	name:      "peat swamp forest",
      floor:     [11,8,3],
      wall:      [13],
    background:{value:"#4B324B",strength:0.6},
    visited:   {floor:"#5B425B",    wall:"#6B526B"}
  },{	name:      "dambo swamp",
      floor:     [11,8,3],
      wall:      [12],
    background:{value:"#4B194B",strength:0.4},
    visited:   {floor:"#5B295B",    wall:"#6B396B"}
  },{	name:      "mangrove swamp",
      floor:     [11,8,3,1],
      wall:      [12],
    background:{value:"#4B3219",strength:0.5},
    visited:   {floor:"#5B4229",    wall:"#6B5239"}
  },{	name:      "bosque",
      floor:     [11,8,1,3],
      wall:      [12,13],
    background:{value:"#4B3232",strength:0.4},
    visited:   {floor:"#5B4242",    wall:"#6B5252"}
  },{	name:      "riparian forest",
      floor:     [11,3],
      wall:      [12],
    background:{value:"#1C9647",strength:0.3},
    visited:   {floor:"#2CA657",    wall:"#3CB667"}
  },{	name:      "bolster heathland",
      floor:     [4],
      wall:      [12],
    background:{value:"#1CAF4B",strength:0.5},
    visited:   {floor:"#2CBF5B",    wall:"#3CCF6B"}
  },{	name:      "chalk heathland",
      floor:     [1,4],
      wall:      [13,2],
    background:{value:"#63AF45",strength:0.4},
    visited:   {floor:"#73BF55",    wall:"#83CF65"}
  },{	name:      "chaparral heathland",
      floor:     [4,11],
      wall:      [13],
    background:{value:"#AFC84A",strength:0.3},
    visited:   {floor:"#BFD86A",    wall:"#CFE87A"}
  },{	name:      "fynbos",
      floor:     [3,8],
      wall:      [3,13],
    background:{value:"#6BC17C",strength:0.5},
    visited:   {floor:"#7BD18C",    wall:"#8BE19C"}
  },{	name:      "garrigue hills",
      floor:     [3,8,7],
      wall:      [3,2,13],
    background:{value:"#96C864",strength:0.2},
    visited:   {floor:"#A6D874",    wall:"#B6E884"}
  },{	name:      "moorland",
      floor:     [3,8],
      wall:      [2],
    background:{value:"#32AEC7",strength:0.3},
    visited:   {floor:"#42BED7",    wall:"#52CEE7"}
  },{	name:      "shrubland",
      floor:     [1,11],
      wall:      [13],
    background:{value:"#63AF45",strength:0.4},
    visited:   {floor:"#73BF55",    wall:"#83CF65"}
  },{	name:      "maquis shrubland",
      floor:     [4,1,11],
      wall:      [13],
    background:{value:"#96AFC8",strength:0.5},
    visited:   {floor:"#A6BFD8",    wall:"#B6CFE8"}
  },{	name:      "coastal plain",
      floor:     [3,7,8,1],
      wall:      [13,3],
    background:{value:"#3DB54A",strength:0.3},
    visited:   {floor:"#4DC55A",    wall:"#5DD56A"}
  },{	name:      "highland plateau",
      floor:     [3,7,8,1,7,11],
      wall:      [1,2,3,13],
    background:{value:"#6CBF65",strength:0.4},
    visited:   {floor:"#7CCF75",    wall:"#8CDF85"}
  },{	name:      "prairy",
      floor:     [4],
      wall:      [13],
    background:{value:"#54B848",strength:0.5},
    visited:   {floor:"#64C858",    wall:"#74D868"}
  },{	name:      "water meadow",
      floor:     [3,4,11,8],
      wall:      [2],
    background:{value:"#60C3B8",strength:0.5},
    visited:   {floor:"#70D3C8",    wall:"#80E3D8"}
  },{	name:      "veldt",
      floor:     [3,4],
      wall:      [13],
    background:{value:"#6CC6B0",strength:0.3},
    visited:   {floor:"#7CD6C0",    wall:"#8CE6D0"}
  },{	name:      "machair",
      floor:     [3,8,11],
      wall:      [1,2],
    background:{value:"#64AEC7",strength:0.4},
    visited:   {floor:"#74BED7",    wall:"#84CEE7"}
  },{	name:      "cerrado savanna",
      floor:     [4,8],
      wall:      [12],
    background:{value:"#67C5AD",strength:0.5},
    visited:   {floor:"#77D5BD",    wall:"#87E5CD"}
  },{	name:      "xeric shrubland",
      floor:     [1,4],
      wall:      [12,13],
    background:{value:"#AFC864",strength:0.4},
    visited:   {floor:"#BFD874",    wall:"#CFE884"}
  },{	name:      "cactus shrubland",
      floor:     [11],
      wall:      [3],
    background:{value:"#AFC895",strength:0.3},
    visited:   {floor:"#BFD8A5",    wall:"#CFE8B5"}
  },{	name:      "hamada desert",
      floor:     [6,7],
      wall:      [3],
    background:{value:"#C6D92C",strength:0.4},
    visited:   {floor:"#D6E93C",    wall:"#E6F94C"}
  },{	name:      "regs desert",
      floor:     [6,7,11],
      wall:      [3],
    background:{value:"#C8C831",strength:0.5},
    visited:   {floor:"#D8D841",    wall:"#E8E851"}
  },{	name:      "ergs desert",
      floor:     [6],
      wall:      [3],
    background:{value:"#C8C84A",strength:0.4},
    visited:   {floor:"#D8D85A",    wall:"#E8E86A"}
  },{	name:      "sagebrush steppe",
      floor:     [7],
      wall:      [3,13],
    background:{value:"#C8C896",strength:0.5},
    visited:   {floor:"#D8D8A6",    wall:"#E8E8B6"}
  },{	name:      "badlands",
      floor:     [7],
      wall:      [3],
    background:{value:"#AFC836",strength:0.4},
    visited:   {floor:"#BFD846",    wall:"#CFE856"}
  },{	name:      "fissure vent",
      floor:     [2,7],
      wall:      [2,3],
    background:{value:"#961A1D",strength:0.3},
    visited:   {floor:"#A62A2D",    wall:"#B63A3D"}
  },{	name:      "shield volcano",
      floor:     [2,7],
      wall:      [8,3],
    background:{value:"#C72026",strength:0.3},
    visited:   {floor:"#D73036",    wall:"#E74046"}
  },{	name:      "lava dome",
      floor:     [2,7,12],
      wall:      [8,3],
    background:{value:"#E09726",strength:0.4},
    visited:   {floor:"#D0A736",    wall:"#E0B746"}
  },{	name:      "cryptodome",
      floor:     [7,12],
      wall:      [3,8],
    background:{value:"#ED6464",strength:0.5},
    visited:   {floor:"#ED7474",    wall:"#FD8484"}
  },{	name:      "mud volcano",
      floor:     [2,8,12],
      wall:      [3,8],
    background:{value:"#F59596",strength:0.4},
    visited:   {floor:"#F5A5A6",    wall:"#F5B5B6"}
  },{	name:      "hot spring geyser",
      floor:     [3,8,1,11],
      wall:      [3],
    background:{value:"#974F9F",strength:0.3},
    visited:   {floor:"#A75FAF",    wall:"#B76FBF"}
  },{	name:      "hot spring",
      floor:     [3,8,11,7],
      wall:      [3],
    background:{value:"#6066AF",strength:0.4},
    visited:   {floor:"#7076BF",    wall:"#8086CF"}
  },{	name:      "pond",
      floor:     [3,8,4],
      wall:      [3,12],
    background:{value:"#6465AE",strength:0.5},
    visited:   {floor:"#7475BE",    wall:"#8485CE"}
  },{	name:      "rocky shoreline",
      floor:     [3,7,6],
      wall:      [3,10],
    background:{value:"#E1E195",strength:0.5},
    visited:   {floor:"#F1F1A5",    wall:"#FFFFD5"}
  },{	name:      "mudflat shoreline",
      floor:     [3,8],
      wall:      [3,5,10],
    background:{value:"#646432",strength:0.3},
    visited:   {floor:"#747442",    wall:"#848452"}
  },{	name:      "shingle beach",
      floor:     [7,3],
      wall:      [3],
    background:{value:"#959737",strength:0.5},
    visited:   {floor:"#A5A747",    wall:"#B5B757"}
  },{	name:      "sandy beach",
      floor:     [3,6],
      wall:      [3,10],
    background:{value:"#C7C78E",strength:0.1},
    visited:   {floor:"#D7D79E",    wall:"#E7E7AE"}
  },{	name:      "shoal",
      floor:     [3,6],
      wall:      [10],
    background:{value:"#646565",strength:0.2},
    visited:   {floor:"#747575",    wall:"#848585"}
  },{	name:      "estuary",
      floor:     [1,8,3,6],
      wall:      [1,2,10],
    background:{value:"#646496",strength:0.5},
    visited:   {floor:"#7474A6",    wall:"#8484B6"}
  },{	name:      "river delta",
      floor:     [3,8],
      wall:      [10],
    background:{value:"#646496",strength:0.5},
    visited:   {floor:"#7474A6",    wall:"#8484B6"}
  }
];
