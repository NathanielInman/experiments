/************************************************************************************\

  Area Generator written by Nathaniel Inman on 07/09/2014
     
  The XML was migrated to JSON on 07/05/2014
  
  The list was extended for implementation in Exploring The Bleak
  on 03/30/13. The list is used in Plains of Sedia : Origins, Developed by
  Nathaniel Inman of The Other Experiment Studio found @ www.theoestudio.com
  All contents within are licensed under GPLv3

|************************************************************************************|
  L E V E L    R E Q U I R E M E N T S
|************************************************************************************|  
 
  Levels are between 0 and 20. There should be a greater number of habitats
  tailored around the end game. Minimum levels should be accomodated around
  the standard levels 0-20, but maximum levels can stray above 20 to give
  the player a greater sense of danger and difficulty on end-game levels.
  Please keep in mind that bosses will also carry this theme, and a level 30
  Wyvern would be nearly impossible to defeat no matter how equipped a level
  20 player might be as the dodge chance of the level difference to create
  tremendous difficulties, not to mention the crit chance of the Wyvern
  possibly killing the player in one hit.

|************************************************************************************|
  P O P U L A T I O N
|************************************************************************************|
  
  There are 5 population degrees~1:Vacant,2:Sparse,3:Even,4:Dense,5:Full
  Vacant is completely empty and packed is completely Full, and the other
  options are the most common. 1 and 5 are used predominately for
  debugging purposes.

|************************************************************************************|
  E N V I R O N M E N T S
|************************************************************************************|
  
  Environments are a pivitol part of all of PLOS, including ETB. It's
  important that habitats try not to be locked into specific environment
  types so that there can be more replayability in the game. Not to mention,
  environments chance the standard creatures that will spawn next to the
  magical creatures. This ensures that the area will have a great chance
  of being significantly different each time it's played.

|************************************************************************************|
  S P A W N S
|************************************************************************************|
  :: Type ::
  There are 3 different types: Magical Creatures, Standard Creatures, and
  Races. Each points to a different list. Note that there should not be
  an over abundance of a certain type in a habitat, especially magical
  creatures, as they're supposed to be uncommon within the world. (not
  necessarily rare.)
  
  :: Chance ::
  There is a 1-100% chance for the spawn to occur, the number of times that
  the mobile occurs depends both on the rank type (if it's>1) the size of
  the map, and the population tag of the habitat.
  
  :: Archetypes ::
  0:Standard,1:Zombie,2:Skeletal,3:Spirit,4:Phantom,5:Wraith,6:Spectral,
  7:Horror,8:Archon,9:Bugbear,10:Apparition
  Archetypes distinguish the creatures:
  existence status - Living,Dead,Undead,Incorporeal
  Whether they can be animated - 0,1
  Whether they can be enslaved - 0,1
  What their amplitude of physical damage is (-100% to 100%)
  What their resistance of physical damage is (-100% to 100%)
  What their elemental resistances are for Fire,Water,Air,Spirit & Earth
  What their elemental amplitudes are for Fire,Water,Air,Spirit & Earth
  What their sub-elemental resistances are for Han,Cho,Omn,Nu & Khai
  What their sub-elemental amplitudes are for Han,Cho,Omn,Nu & Khai
  
  :: Rank Types ::
  0:Regular,1:Minion,2:Mini-Boss,3:Boss,4:Rare,5:Ultra Rare,6:Epic
  All types spawn with a chance of 1-100%; though, Ranks above 1 will
  spawn a max of one time per habitat. Ranks above 0 will gradually
  have increased loot chance, health, armor, and damage to not exceed
  an additional 25% to each category. For detailed information on
  ranks refer to "Mobiles/Ranks.xml"
  
  :: Value ::
  The value within the mob tag specifies the specific entry of the specified 
  type tag list, whether that be magical creatures, standard creatures,
  or races.
  
|************************************************************************************|
  L O O T
|************************************************************************************|

  the chance (/100%) that a random item will drop is given by the type
  "?" under the loot section. Specific types may be dictated, where
  the available types are: armor, weapon, and ?. Potions and other
  miscellaneous item types are not allowed in habitats for balancing
  issues. Specific item types may be specified between the item brackets
  to indicate that a specific item may drop. Note that if a specific
  item is indicated, it will drop a maximum of one type per that habitat.
  It is generally assumed that a habitat will only be visited one time
  per player, so specifying certain items is okay, but tends to make
  the game predictable; thereby, please reduce the chance of those items
  to drop so they're merely slightly higher than the standard drop
  chance.

\************************************************************************************/

/* Ambient variables at window scope */
declare var ctx:any;
declare var v:any;

/* Each entry is serializable */
interface Serializable<T>{
  deserialize(input: Object): T;
}

/* Identifies the entries */
class Entry implements Serializable<Entry> {
  name: string;
  reqLevel: string;
  maxLevel: string;
  population: string;
  environments: number[];
  spawns: string[];
  loot: string[];
  deserialize(input){
    this.name = input.name;
    this.reqLevel = input.reqLevel;
    this.maxLevel = input.maxLevel;
    this.population = input.population;
    this.environments = input.environments;
    this.spawns = input.spawns;
    this.loot=input.loot;
    return this;
  }
}

/* The main class */
class HabitatGenerator implements Serializable<HabitatGenerator>{
  entry: number;
  habitat: any;
  environment: string[];
  creatures: string[];
  races: string[];
  armor: string[];
  constructor(list){
    this.habitat=[];
    this.environment=['Inside','Mountain','Canyon','Anchihaline Cave',
    'Talus Cave','Fracture Cave','Glacier Cave','Erosional Cave',
    'Sea Cave','Primary Cave','Cavern','Surface Mine','Sub-surface Mine',
    'Graveyard','Cemetary','Crypt','Mausoleum','Catacomb','Ossuary',
    'Charnel House','Arctic Tundra','Antarctic Tundra','Alpine Tundra',
    'Fellfield Tundra','Park Tundra','Closed Forest Taiga',
    'Lichen Woodland Taiga','Boreal Forest','Montane Grassland',
    'Montane Shrubland','Carpathian Forest','Giant Sequoia Forest',
    'Coastal Redwood Forest','Douglas-fir Forest','Sitka Spruce Forest',
    'Alerce Forest','Kauri Forest','Tropical Forest','Subtropical Forest',
    'Temperate Forest','Mediterranean Forest','Mediterranean Woodland',
    'Mediterranean Savanna','Mediterranean Shrubland',
    'Mediterranean Grassland','Tropical Broadleaf Forest',
    'Subtropical Broadleaf Forest','Bayou','Wetland Fen','Valley Bog',
    'Raised Bog','Blanket Bog','Freshwater Swamp Forest','Peat Swamp Forest',
    'Dambo Swamp','Mangrove Swamp','Bosque','Riparian Forest',
    'Bolster Heathland','Chalk Heathland','Chaparral Heathland','Fynbos',
    'Garrigue Hills','Moorland','Shrubland','Maquis Shrubland',
    'Coastal Plain','Highland Plateau','Prairie','Water Meadow','Veldt',
    'Machair','Cerrado Savanna','Xeric Shrubland','Cactus Shrubland',
    'Hamada Desert','Regs Desert','Ergs Desert','Sagebrush Steppe',
    'Badlands','Fissure Vent','Shield Volcano','Lava Dome','Cryptodome',
    'Mud Volcano','Hot Spring Geyser','Hot Spring','Pond','Rocky Shoreline',
    'Mudflat Shoreline','Shingle Beach','Sandy Beach','Shoal',
    'Estuary','River Delta','Neritic Zone','Kelp Forest','Coral Reef',
    'Hydrothermal Vent','Benthic Zone','Nothing','Player'];
    this.creatures=['Abada','Abaddon','Adar Llwch Gwin','Adlet',
    'Addonexus','Afanc','Agloolik','Agta','Alerion','Ahuizhotl','Akki',
    'Alphyn','Amphisbaena','Amphithere','Ankou','Aspis','Asrai','Aswang',
    'Bai Ze','Balam','Balrog','Banshee','Barbegazi','Barghest',
    'Basilisk','Bastet','Baykok','Black Annis','Blurr','Bunyip',
    'Caladrius','Calygreyhound','Campacti','Canaima','Catoblepas',
    'Centaur','Cerastes','Cerberus','Charybdis','Chimaera',
    'Cinnamologus','Clurichaun','Cyclops','Dip','Dobhar-chu',
    'Doppelganger','Dullahan','Drake','Drekavac','Dromedary',
    'Echeneis','Faun','Fei Lian','Fury','Gashadokuro','Grant','Gobriks',
    'Golem','Griffin','Harpy','Hercinia','Hydra','Incubus','Ifrit',
    'Imp','Kampe','Krakkan','Leucrota','Llamhigyn Y Dwr','Manticore',
    'Marid','Minotaur','Monocerus','Muldjewangk','Muscaliet',
    'Myrmecoleon','Nymph','Ogre','Onocentaur','Parandrus',
    'Pegasus','Perytons','Phoenix','Quanlier','Roc','Satyr','Scarab',
    'Sceadugenga','Schilla','Serpent','Shishi','Siren',
    'Succubus','Svagin','Tarasque','Thunderbird','Tikbalang',
    'Tikoloshe','Tiyanak','Tlatecuhtli','Unicorn','Undines',
    'Wendigo',"Will'o'Wisp",'Wyvern','Xolotl','Yale',
    'Yara-ma-yha-who','Yeti','Ziz'];
    this.races=['Human','Dwarf','Gnome','Elf','Half-elf','Halfling',
    'Goblin','Troll','Orc','Half-orc','Quickling','Pixie','Sprite',
    'Kobold'];
    this.armor=['Armor','Crown','Chapeau','Chaplet','Coif',
    'Coronet','Cowl','Spectacles','Tiara','Eyeglasses',
    'Monocle','Wreath','Circlet','Mask','Headdress','Hood',
    'Cap','Helm','Full Helm','Horned Helm','Skull Cap',
    'Face Guard','Face Plate','Armet','Barbute','Bascinet',
    'Burgonet','Sallet','Hounskull','Nasal Helm',
    'Spagenhelm','Full Sallet','Kippah','Klobuk','Kolpik',
    'Kufi','Mitre','Gorget','Amulet','Choker','Locket',
    'Medallion','Neckband','Necklace','Mark','Pendant','Icon',
    'Talisman','Amice','Pauldrons','Mantle','Studded Mantle',
    'Shoulder Pads','Spaulders','Scaled Shoulders',
    'Splint Shoulders','Half-plate Shoulders','Plate Shoulders',
    'Armlets','Armband','Arm-guards','Arm Wraps','Cuffs',
    'Wristband','Bracers','Bracelet','Shackles','Bindings',
    'Gloves','Mittens','Handwraps','Handguards','Gauntlets',
    'Chainmail Gauntlets','Scalemail Gauntlets',
    'Platemail Gauntlets','Platemail','Ringmail',
    'Chain Cuirass','Half-plate','Chestplate','Chestguard',
    'Scalemail','Splintmail','Studded Tunic','Tunic',
    'Vestment','Hauberk','Field Plate','Banded Mail',
    'Brigandine Armor','Robe','Raiment','Tabard',
    'Doublet','Chemise','Lorica Segmentata','Lamellar',
    'Shawl','Cape','Capelet','Cloak','Heavy Cloak',
    'Battle Cloak','Royal Cloak','Girdle','Belt','Cord',
    'Waistwrap','Sash','Genouillere','Bloomers',
    'Breeches','Trousers','Leggings','Legguards','Skirt',
    'Split Skirt','Tights','Pantaloons','Scale Leggings',
    'Splint Leggings','Helf-Plate Leggings','Plate Leggings',
    'Chainmail Leggings','Greaves','Slippers','Sandals',
    'Stalkers','Footguards','Scale Boots','Splint Boots',
    'Half-plate Boots','Plate Boots','Anklet','Boots',
    'Long Boots','Footguards','Ring','Band','Thumb Ring',
    'Wedding Ring','Engagement Ring','Signet Ring',
    'Blood Ring','Aegis','Scutum','Targe','Roundel','Buckler',
    'Disc Shield','Heater Shield','Bulwark Shield',
    'Tower Shield','Kite Shield'];
    this.deserialize(list);
    easel.redraw=()=>this.draw();
  }
  deserialize(list): void{
    for(habitat in list){
      this.habitat.push(new Entry().deserialize(list[habitat]));
    }
    this.update();
  }
  getEnvironments(environmentArray): string[]{
    for(index in environmentArray){
      if(typeof this.environment[environmentArray[index]]=='undefined')continue; //make sure not to update entries already updated
      environmentArray[index]=this.environment[environmentArray[index]];
    } //end for
    return environmentArray.join(', ');
  }
  printMob(mobObject): string{
    var archetype=mobObject.archetype.replace('Standard','');
    var rank=(' ['+mobObject.rank+']').replace(' [Regular]','');
    var name=(archetype.length==0?'':" ")+'Unknown';
    if(mobObject.type=='Magical Creature'){
      name=this.creatures[mobObject.id];
    }else if(mobObject.type=='Race'){
      name=this.races[mobObject.id];
    } //end if
    return archetype+name+rank+' ('+mobObject.chance+'%)';
  }
  printItem(itemObject): string{
    var name="Unknown";
    if(itemObject.type=='?'){
      name="Random Item"
    }else if(itemObject.id=='?'){
      name="Random "+itemObject.type
    }else{
      if(itemObject.type=='Armor'){
        name="Random "+this.armor[itemObject.id];
      }else if(itemObject.type=='Weapon'){
      } //end if
    } //end if
    return name+' ('+itemObject.chance+'%)';
  }
  draw(): void{
    ctx.font='24px Courier New';
    ctx.textAlign='center';
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
    ctx.fillStyle='#333';
    ctx.fillRect(0,0,v.w,48);
    ctx.fillStyle='#222';
    ctx.fillRect(0,v.h/10*2+52,v.w,48);
    ctx.fillStyle='#F80';
    ctx.fillRect(0,48,v.w,2);
    ctx.fillText(this.habitat[this.entry].name+" (LVL "+this.habitat[this.entry].reqLevel+" - "+this.habitat[this.entry].maxLevel+")",v.w/2,30);
    if(this.habitat[this.entry].population=='Vacant'){ctx.fillStyle='#200';
    }else if(this.habitat[this.entry].population=='Sparse'){ctx.fillStyle='#420';
    }else if(this.habitat[this.entry].population=='Even'){ctx.fillStyle='#630';
    }else if(this.habitat[this.entry].population=='Dense'){ctx.fillStyle='#840';
    }else if(this.habitat[this.entry].population=='Full'){ctx.fillStyle='#A50';}else{ctx.fillStyle='#88F';}
    ctx.fillRect(0,50,v.w,v.h/10);ctx.fillStyle='#FFF';
    ctx.fillText("Population density: "+this.habitat[this.entry].population,v.w/2,v.h/20+56);
    ctx.fillStyle='#F80';
    ctx.fillRect(0,v.h/10+50,v.w,2); 
    ctx.fillStyle='#111';
    ctx.fillRect(0,v.h/10*2+100,v.w/2,v.h);
    ctx.fillRect(v.w/2,v.h/10*2+100,v.w/2,v.h);
    ctx.fillStyle='#777';
    ctx.fillRect(0,v.h/10*2+50,v.w,2); 
    ctx.fillRect(v.w/2,v.h/10*2+50,2,v.h); //center dividor
    ctx.fillRect(0,v.h/10*2+100,v.w,2); //center dividor title
    ctx.fillStyle='#FFF';
    ctx.fillText(this.getEnvironments(this.habitat[this.entry].environments),v.w/2,v.h/10+v.h/20+56);
    ctx.fillText("Mobiles",v.w/4,v.h/10+(v.h/20+42)*2);
    ctx.fillText("Loot",v.w/4*3,v.h/10+(v.h/20+42)*2);
    var mobNum=0;
    for(;mobNum<this.habitat[this.entry].spawns.length;mobNum++){
      ctx.fillText(this.printMob(this.habitat[this.entry].spawns[mobNum]),v.w/4,100+v.h/10*2+(28)*(1+mobNum));
    } //end for
    var itemNum=0;
    for(;itemNum<this.habitat[this.entry].loot.length;itemNum++){
      ctx.fillText(this.printItem(this.habitat[this.entry].loot[itemNum]),v.w/4*3,100+v.h/10*2+(28)*(1+itemNum));
    } //end for
  }
  update(): void{
    this.entry=r(0,this.habitat.length,false);
    this.draw();
    setTimeout(() => this.update(),2000);
  }
}

/* Initialization */
var data = [
  {name:'Western Strand', //id=1 ~<<AREA>>
   province:'Tharsis',
   reqLevel:10,
   maxLevel:20,
   population:'Dense',
   environments:[91],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Fortress of Lost Souls', //id=2 ~<<AREA>>
   province:'Tharsis',
   reqLevel:30,
   maxLevel:40,
   population:'Dense',
   environments:[16],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Swamp of Cahar', //id=3 ~<<AREA>>
   province:'Tharsis',
   reqLevel:30,
   maxLevel:40,
   population:'Dense',
   environments:[91],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Elderfall Canyon', //id=4 ~<<AREA>>
   province:'Tharsis',
   reqLevel:25,
   maxLevel:55,
   population:'Dense',
   environments:[2],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Kinforge', //id=5 ~<<AREA>>
   province:'Tharsis',
   reqLevel:25,
   maxLevel:35,
   population:'Dense',
   environments:[68],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Kinforge Mine', //id=6 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:30,
   population:'Dense',
   environments:[12],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Thornlift Lake', //id=7 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:30,
   population:'Dense',
   environments:[51],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Darkwood Trading Post', //id=8 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:20,
   population:'Dense',
   environments:[61],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Darkwood', //id=9 ~<<AREA>>
   province:'Tharsis',
   reqLevel:10,
   maxLevel:25,
   population:'Dense',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Moran Veil', //id=10 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:25,
   population:'Dense',
   environments:[49],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Altire Caves', //id=11 ~<<AREA>>
   province:'Tharsis',
   reqLevel:15,
   maxLevel:15,
   population:'Dense',
   environments:[4],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Darnum Hill', //id=12 ~<<AREA>>
   province:'Tharsis',
   reqLevel:10,
   maxLevel:15,
   population:'Dense',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Temple of Goad', //id=13 ~<<AREA>>
   province:'Tharsis',
   reqLevel:10,
   maxLevel:10,
   population:'Dense',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Mellowdeep Marsh', //id=14 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:30,
   population:'Dense',
   environments:[55],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crowsfeet Spring', //id=15 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:25,
   population:'Dense',
   environments:[93],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Fingers of The Liche', //id=16 ~<<AREA>>
   province:'Tharsis',
   reqLevel:25,
   maxLevel:30,
   population:'Dense',
   environments:[94],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Fae Lake', //id=17 ~<<AREA>>
   province:'Tharsis',
   reqLevel:25,
   maxLevel:30,
   population:'Dense',
   environments:[86],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Hatchet', //id=18 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:30,
   population:'Dense',
   environments:[54],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Hatchet Forest', //id=19 ~<<AREA>>
   province:'Tharsis',
   reqLevel:20,
   maxLevel:30,
   population:"Dense",
   environments:[27],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Lutanian Ocean', //id=20 ~<<AREA>>
   province:'Tharsis',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[97,99,98],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Outer Reach', //id=21 ~<<AREA>>
   province:'Narsis',
   reqLevel:1,
   maxLevel:10,
   population:'Even',
   environments:[3],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Winebridge', //id=22 ~<<AREA>>
   province:'Crecia',
   reqLevel:45,
   maxLevel:50,
   population:'Dense',
   environments:[65],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Gilden', //id=23 ~<<AREA>>
   province:'Crecia',
   reqLevel:45,
   maxLevel:50,
   population:'Dense',
   environments:[71],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ridleah', //id=24 ~<<AREA>>
   province:'Crecia',
   reqLevel:40,
   maxLevel:45,
   population:'Dense',
   environments:[70],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Firan Fields', //id=25 ~<<AREA>>
   province:'Crecia',
   reqLevel:40,
   maxLevel:50,
   population:'Dense',
   environments:[68],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Harrow Ridge', //id=26 ~<<AREA>>
   province:'Crecia',
   reqLevel:45,
   maxLevel:50,
   population:'Dense',
   environments:[70],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Rhinestone Woodland', //id=27 ~<<AREA>>
   province:'Crecia',
   reqLevel:30,
   maxLevel:40,
   population:'Dense',
   environments:[36],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Blithe', //id=28 ~<<AREA>>
   province:'Crecia',
   reqLevel:20,
   maxLevel:30,
   population:'Dense',
   environments:[68],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jair Stream', //id=29 ~<<AREA>>
   province:'Crecia',
   reqLevel:25,
   maxLevel:30,
   population:'Dense',
   environments:[66],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jair Pool', //id=30 ~<<AREA>>
   province:'Crecia',
   reqLevel:25,
   maxLevel:30,
   population:'Dense',
   environments:[87],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crecian Highland', //id=31 ~<<AREA>>
   province:'Crecia',
   reqLevel:25,
   maxLevel:30,
   population:'Dense',
   environments:[72],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Drummund', //id=32 ~<<AREA>>
   province:'Crecia',
   reqLevel:30,
   maxLevel:40,
   population:'Dense',
   environments:[73],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Maelo', //id=33 ~<<AREA>>
   province:'Crecia',
   reqLevel:30,
   maxLevel:30,
   population:'Dense',
   environments:[37],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Monastery of The Yellow Dragon', //id=34 ~<<AREA>>
   province:'Crecia',
   reqLevel:35,
   maxLevel:35,
   population:'Dense',
   environments:[18],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Hale', //id=35 ~<<AREA>>
   province:'Crecia',
   reqLevel:35,
   maxLevel:40,
   population:'Dense',
   environments:[45],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Azulean Ocean', //id=36 ~<<AREA>>
   province:'Crecia',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[97,99,98],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crimson River', //id=37 ~<<AREA>>
   province:'New Saellem',
   reqLevel:80,
   maxLevel:90,
   population:'Dense',
   environments:[56],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Urkin Valley', //id=38 ~<<AREA>>
   province:'New Saellem',
   reqLevel:85,
   maxLevel:90,
   population:'Dense',
   environments:[64],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Dupree', //id=39 ~<<AREA>>
   province:'New Saellem',
   reqLevel:80,
   maxLevel:85,
   population:'Dense',
   environments:[22],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Duprean Gap', //id=40 ~<<AREA>>
   province:'New Saellem',
   reqLevel:80,
   maxLevel:85,
   population:'Dense',
   environments:[23],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Demon Tooth Ridge', //id=41 ~<<AREA>>
   province:'New Saellem',
   reqLevel:80,
   maxLevel:85,
   population:'Dense',
   environments:[24],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Dark Peninsula', //id=42 ~<<AREA>>
   province:'New Saellem',
   reqLevel:80,
   maxLevel:85,
   population:'Dense',
   environments:[25],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Dwarven Shrine', //id=43 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:80,
   population:'Dense',
   environments:[26],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Murkhill Valley', //id=44 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:80,
   population:'Dense',
   environments:[22],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Murkhill Point', //id=45 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:80,
   population:'Dense',
   environments:[83],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Thunderrock', //id=46 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:75,
   population:'Dense',
   environments:[6],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Carthage', //id=47 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:75,
   population:'Dense',
   environments:[20],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tarmaly', //id=48 ~<<AREA>>
   province:'New Saellem',
   reqLevel:65,
   maxLevel:70,
   population:'Dense',
   environments:[24],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Sarville Crossing', //id=49 ~<<AREA>>
   province:'New Saellem',
   reqLevel:65,
   maxLevel:70,
   population:'Dense',
   environments:[24],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jaspen Flats', //id=50 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:75,
   population:'Dense',
   environments:[21],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Pixian Encampment', //id=51 ~<<AREA>>
   province:'New Saellem',
   reqLevel:65,
   maxLevel:75,
   population:'Dense',
   environments:[57],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Sprite Encampment', //id=52 ~<<AREA>>
   province:'New Saellem',
   reqLevel:65,
   maxLevel:75,
   population:'Dense',
   environments:[57],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Shanto Woodlands', //id=53 ~<<AREA>>
   province:'New Saellem',
   reqLevel:65,
   maxLevel:75,
   population:'Dense',
   environments:[57],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Frozen Wastes', //id=54 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:80,
   population:'Dense',
   environments:[20],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Virgil Outpost', //id=55 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:75,
   population:'Dense',
   environments:[58],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Doonan', //id=56 ~<<AREA>>
   province:'New Saellem',
   reqLevel:70,
   maxLevel:75,
   population:'Dense',
   environments:[59],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Port of Doonan', //id=57 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:70,
   population:'Dense',
   environments:[59],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:"Lythantos' Shrine", //id=58 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[60],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Mirror Shelf', //id=59 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[48],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:"Leah's Belt", //id=60 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[1],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Cavern of Whispers', //id=61 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[4],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Monastery of The Blue Dragon', //id=62 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[17],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crystalline Caverns', //id=63 ~<<AREA>>
   province:'New Saellem',
   reqLevel:55,
   maxLevel:60,
   population:'Dense',
   environments:[10],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Criss Beach', //id=64 ~<<AREA>>
   province:'New Saellem',
   reqLevel:55,
   maxLevel:60,
   population:'Dense',
   environments:[88],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Forest of Frost', //id=65 ~<<AREA>>
   province:'New Saellem',
   reqLevel:50,
   maxLevel:60,
   population:'Dense',
   environments:[40],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:"Damien's Peak", //id=66 ~<<AREA>>
   province:'New Saellem',
   reqLevel:60,
   maxLevel:65,
   population:'Dense',
   environments:[81],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Moran', //id=67 ~<<AREA>>
   province:'New Saellem',
   reqLevel:55,
   maxLevel:60,
   population:'Dense',
   environments:[39],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Moran Wetlands', //id=68 ~<<AREA>>
   province:'New Saellem',
   reqLevel:50,
   maxLevel:60,
   population:'Dense',
   environments:[69],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Centaur Encampment', //id=69 ~<<AREA>>
   province:'New Saellem',
   reqLevel:50,
   maxLevel:60,
   population:'Dense',
   environments:[62],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Dillon', //id=70 ~<<AREA>>
   province:'New Saellem',
   reqLevel:45,
   maxLevel:50,
   population:'Dense',
   environments:[66],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Sea of Mists', //id=71 ~<<AREA>>
   province:'New Saellem',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[97],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Sea of Nurn', //id=72 ~<<AREA>>
   province:'New Saellem',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[96],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Fireforge Chasm', //id=73 ~<<AREA>>
   province:'Jewall',
   reqLevel:110,
   maxLevel:110,
   population:'Dense',
   environments:[11],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Blackened Plain', //id=74 ~<<AREA>>
   province:'Jewall',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[20],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tunnels of Tyr', //id=75 ~<<AREA>>
   province:'Jewall',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[5],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Mt. Tyr', //id=76 ~<<AREA>>
   province:'Jewall',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[1],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ironholde Prison', //id=77 ~<<AREA>>
   province:'Jewall',
   reqLevel:95,
   maxLevel:100,
   population:'Dense',
   environments:[12],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Endless Plains of Despair', //id=78 ~<<AREA>>
   province:'Jewall',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[21],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:"Mienous' Tears", //id=79 ~<<AREA>>
   province:'Jewall',
   reqLevel:90,
   maxLevel:99,
   population:'Dense',
   environments:[85],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Gnomish Refuge Camp', //id=80 ~<<AREA>>
   province:'Jewall',
   reqLevel:80,
   maxLevel:90,
   population:'Dense',
   environments:[63],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crimson River', //id=81 ~<<AREA>>
   province:'Jewall',
   reqLevel:100,
   maxLevel:100,
   population:'Dense',
   environments:[97,99,98],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Dharian Pines', //id=82 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[27],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Oakland Grove', //id=83 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[32],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Broken Path of Dhiar', //id=84 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[0],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Cirian Swamp', //id=85 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[52],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Gates of Dhiar', //id=86 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[0],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Arbrest Headland', //id=87 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[33],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Lien Grassland', //id=88 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[28],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Kiplar Drylands', //id=89 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[78],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Colleseum', //id=90 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[15],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Hippodrome', //id=91 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[15],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Fallen Kingdom', //id=92 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[13],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Palace', //id=93 ~<<AREA>>
   province:'Esthar',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[14],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Sands of Bone', //id=94 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jixti Tribe', //id=95 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Quice Tribe', //id=96 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Polvi Tribe', //id=97 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Hebna Tribe', //id=98 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Cevlar Tribe', //id=99 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Hopli Tribe', //id=100 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Toleer Tribe', //id=101 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Torni Tribe', //id=102 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Goni Tribe', //id=103 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Zemin Tribe', //id=104 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[77],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tilton Drylands', //id=105 ~<<AREA>>
   province:'Dumasque',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[74],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Great Divide', //id=106 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[80],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Morian Desert', //id=107 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[76],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Monestary of The Red Dragon', //id=108 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[19],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Kyrian Range', //id=109 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[1],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Loberian Drylands', //id=110 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[79],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Mt. Kyros', //id=111 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[82],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'The Iron Sands', //id=112 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[90],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Shrine of Dekkashraen', //id=113 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[17],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Molten Flats', //id=114 ~<<AREA>>
   province:'Morian',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[75],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:"Tiegan's Belt", //id=115 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[1],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Traitors Pass', //id=116 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[44],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Lake Meade', //id=117 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[50],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Amari Hinterlands', //id=118 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[34],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Dire Clefts', //id=119 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[8],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Amari Inlet', //id=120 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[92],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ruins of Ft. Kilner', //id=121 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[35],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jade Beach', //id=122 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[89],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Gorefell Range', //id=123 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[1],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Lower Meaden', //id=124 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[46],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Kyra', //id=125 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[43],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Twin River Flats', //id=126 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[56],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Upper Meaden', //id=127 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[42],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Warven Hill', //id=128 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Port Carvi', //id=129 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[91],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Verinton', //id=130 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ogler Foothills', //id=131 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[40],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Rolling Hills', //id=132 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[65],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Thurgis', //id=133 ~<<AREA>>
   province:'Amari',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[65],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Quirest Highland', //id=134 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[30],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crystal Falls', //id=135 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[47],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Brovost Cave', //id=136 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[7],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ruins of Menus', //id=137 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[14],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Agiea Springs', //id=138 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[84],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Mirian Caves', //id=139 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[4],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tirian Caves', //id=140 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[4],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Jirian Caves', //id=141 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[4],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tropics of Dumit', //id=142 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[38],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Agiea Rivers', //id=143 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[57],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Tropics of Neijeer', //id=144 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[38],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Lost City of Amone', //id=145 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[14],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Ettphemones Shrine', //id=146 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[17],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  },
  {name:'Crystal Shoreside', //id=147 ~<<AREA>>
   province:'Menusia',
   reqLevel:100,
   maxLevel:100,
   population:'Even',
   environments:[91],
   spawns:[
   ],
   loot:[
    {id:'?',type:'?',chance:'10'}
   ]
  }
];
var main = new HabitatGenerator(data);
