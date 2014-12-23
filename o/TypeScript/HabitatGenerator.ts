/************************************************************************************\

	Habitat Generator written by Nathaniel Inman on 07/02/2014
     
	Habitat Type list was created in XML on 03/29/13. 
	The XML was migrated to JSON on 07/02/2014
	
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
				this.environment=['Inside','Mountain','Canyon','Anchihaline Cave','Talus Cave','Fracture Cave',
				'Glacier Cave','Erosional Cave','Sea Cave','Primary Cave','Cavern','Surface Mine','Sub-surface Mine',
				'Graveyard','Cemetary','Crypt','Mausoleum','Catacomb','Ossuary','Charnel House','Arctic Tundra',
				'Antarctic Tundra','Alpine Tundra','Fellfield Tundra','Park Tundra','Closed Forest Taiga',
				'Lichen Woodland Taiga','Boreal Forest','Montane Grassland','Montane Shrubland','Carpathian Forest',
				'Giant Sequoia Forest','Coastal Redwood Forest','Douglas-fir Forest','Sitka Spruce Forest',
				'Alerce Forest','Kauri Forest','Tropical Forest','Subtropical Forest','Temperate Forest',
				'Mediterranean Forest','Mediterranean Woodland','Mediterranean Savanna','Mediterranean Shrubland',
				'Mediterranean Grassland','Tropical Broadleaf Forest','Subtropical Broadleaf Forest','Bayou',
				'Wetland Fen','Valley Bog','Raised Bog','Blanket Bog','Freshwater Swamp Forest','Peat Swamp Forest',
				'Dambo Swamp','Mangrove Swamp','Bosque','Riparian Forest','Bolster Heathland','Chalk Heathland',
				'Chaparral Heathland','Fynbos','Garrigue Hills','Moorland','Shrubland','Maquis Shrubland',
				'Coastal Plain','Highland Plateau','Prairie','Water Meadow','Veldt','Machair','Cerrado Savanna',
				'Xeric Shrubland','Cactus Shrubland','Hamada Desert','Regs Desert','Ergs Desert','Sagebrush Steppe',
				'Badlands','Fissure Vent','Shield Volcano','Lava Dome','Cryptodome','Mud Volcano','Hot Spring Geyser',
				'Hot Spring','Pond','Rocky Shoreline','Mudflat Shoreline','Shingle Beach','Sandy Beach','Shoal',
				'Estuary','River Delta','Neritic Zone','Kelp Forest','Coral Reef','Hydrothermal Vent',
				'Benthic Zone','Nothing','Player'];
				this.creatures=['Abada','Abaddon','Adar Llwch Gwin','Adlet','Addonexus','Afanc','Agloolik','Agta',
				'Alerion','Ahuizhotl','Akki','Alphyn','Amphisbaena','Amphithere','Ankou','Aspis','Asrai','Aswang',
				'Bai Ze','Balam','Balrog','Banshee','Barbegazi','Barghest','Basilisk','Bastet','Baykok','Black Annis',
				'Blurr','Bunyip','Caladrius','Calygreyhound','Campacti','Canaima','Catoblepas','Centaur','Cerastes',
				'Cerberus','Charybdis','Chimaera','Cinnamologus','Clurichaun','Cyclops','Dip','Dobhar-chu',
				'Doppelganger','Dullahan','Drake','Drekavac','Dromedary','Echeneis','Faun','Fei Lian','Fury',
				'Gashadokuro','Grant','Gobriks','Golem','Griffin','Harpy','Hercinia','Hydra','Incubus','Ifrit',
				'Imp','Kampe','Krakkan','Leucrota','Llamhigyn Y Dwr','Manticore','Marid','Minotaur','Monocerus',
				'Muldjewangk','Muscaliet','Myrmecoleon','Nymph','Ogre','Onocentaur','Parandrus','Pegasus','Perytons',
				'Phoenix','Quanlier','Roc','Satyr','Scarab','Sceadugenga','Schilla','Serpent','Shishi','Siren',
				'Succubus','Svagin','Tarasque','Thunderbird','Tikbalang','Tikoloshe','Tiyanak','Tlatecuhtli',
				'Unicorn','Undines','Wendigo',"Will'o'Wisp",'Wyvern','Xolotl','Yale','Yara-ma-yha-who','Yeti','Ziz'];
				this.races=['Human','Dwarf','Gnome','Elf','Half-elf','Halfling','Goblin','Troll','Orc','Half-orc',
				'Quickling','Pixie','Sprite','Kobold'];
				this.armor=['Armor','Crown','Chapeau','Chaplet','Coif','Coronet','Cowl','Spectacles','Tiara','Eyeglasses',
				'Monocle','Wreath','Circlet','Mask','Headdress','Hood','Cap','Helm','Full Helm','Horned Helm','Skull Cap',
				'Face Guard','Face Plate','Armet','Barbute','Bascinet','Burgonet','Sallet','Hounskull','Nasal Helm',
				'Spagenhelm','Full Sallet','Kippah','Klobuk','Kolpik','Kufi','Mitre','Gorget','Amulet','Choker','Locket',
				'Medallion','Neckband','Necklace','Mark','Pendant','Icon','Talisman','Amice','Pauldrons','Mantle',
				'Studded Mantle','Shoulder Pads','Spaulders','Scaled Shoulders','Splint Shoulders','Half-plate Shoulders',
				'Plate Shoulders','Armlets','Armband','Arm-guards','Arm Wraps','Cuffs','Wristband','Bracers','Bracelet',
				'Shackles','Bindings','Gloves','Mittens','Handwraps','Handguards','Gauntlets','Chainmail Gauntlets',
				'Scalemail Gauntlets','Platemail Gauntlets','Platemail','Ringmail','Chain Cuirass','Half-plate',
				'Chestplate','Chestguard','Scalemail','Splintmail','Studded Tunic','Tunic','Vestment','Hauberk',
				'Field Plate','Banded Mail','Brigandine Armor','Robe','Raiment','Tabard','Doublet','Chemise',
				'Lorica Segmentata','Lamellar','Shawl','Cape','Capelet','Cloak','Heavy Cloak','Battle Cloak',
				'Royal Cloak','Girdle','Belt','Cord','Waistwrap','Sash','Genouillere','Bloomers','Breeches','Trousers',
				'Leggings','Legguards','Skirt','Split Skirt','Tights','Pantaloons','Scale Leggings','Splint Leggings',
				'Helf-Plate Leggings','Plate Leggings','Chainmail Leggings','Greaves','Slippers','Sandals','Stalkers',
				'Footguards','Scale Boots','Splint Boots','Half-plate Boots','Plate Boots','Anklet','Boots',
				'Long Boots','Footguards','Ring','Band','Thumb Ring','Wedding Ring','Engagement Ring','Signet Ring',
				'Blood Ring','Aegis','Scutum','Targe','Roundel','Buckler','Disc Shield','Heater Shield','Bulwark Shield',
				'Tower Shield','Kite Shield'];
		this.deserialize(list);
		easel.redraw=()=>this.draw();
	}
	deserialize(list){
		for(habitat in list){
			this.habitat.push(new Entry().deserialize(list[habitat]));
		}
		this.update();
	}
	getEnvironments(environmentArray):string[]{
		for(index in environmentArray){
			if(typeof this.environment[environmentArray[index]]=='undefined')continue; //make sure not to update entries already updated
			environmentArray[index]=this.environment[environmentArray[index]];
		} //end for
		return environmentArray.join(', ');
	}
	printMob(mobObject):string{
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
	printItem(itemObject):string{
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
	draw(){
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
	update(){
		this.entry=r(0,this.habitat.length,false);
		this.draw();
		setTimeout(() => this.update(),2000);
	}
}

/* Initialization */
var data = [
	{name:"Abada Grove",
	 reqLevel:"1",
	 maxLevel:"8",
	 population:"Even",
	 environments:[38],
	 spawns:[
	  {id:'1',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'40'},
	  {id:'91',type:'Magical Creature',archetype:'Standard',rank:'Minion',chance:'50'},
	  {id:'90',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'5'},
	  {id:'3',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'5'}
	 ],
	 loot:[
	  {id:'58',type:'Armor',chance:'5'},
	  {id:'?',type:'?',chance:'15'}
	 ]
	},
	{name:"Adlet Den",
	 reqLevel:"5",
	 maxLevel:"15",
	 population:"Dense",
	 environments:[3,4,5,6,7,8,9],
	 spawns:[
	  {id:'4',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'80'},
	  {id:'5',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'20'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	},
	{name:"Mysterious Doonan Lake",
	 reqLevel:"0",
	 maxLevel:"20",
	 population:"Sparse",
	 environments:[87],
	 spawns:[
	  {id:'7',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'59',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'},
	  {id:'61',type:'Magical Creature',archetype:'Standard',rank:'Ultra Rare',chance:'20'},
	  {id:'69',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'80'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	},
	{name:"Leucrota Stomping Ground",
	 reqLevel:"10",
	 maxLevel:"15",
	 population:"Even",
	 environments:[5,2,12,27],
	 spawns:[
	  {id:'68',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'70',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'11'}
	 ]
	},
	{name:"Pristine Palace of Shimmering Water",
	 reqLevel:"13",
	 maxLevel:"16",
	 population:"Sparse",
	 environments:[24],
	 spawns:[
	  {id:'71',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'75',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'9'}
	 ]
	},
	{name:"The Hive",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Full",
	 environments:[7],
	 spawns:[
	  {id:'76',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'89',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"The Web",
	 reqLevel:"17",
	 maxLevel:"23",
	 population:"Dense",
	 environments:[5,4,3],
	 spawns:[
	  {id:'89',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'93',type:'Magical Creature',archetype:'Standard',rank:'Regularl',chance:'25'},
	  {id:'94',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'12'}
	 ]
	},
	{name:"A Burning Nest",
	 reqLevel:"18",
	 maxLevel:"24",
	 population:"Sparse",
	 environments:[72,67],
	 spawns:[
	  {id:'95',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'94',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'},
	  {id:'105',type:'Magical Creature',archetype:'Standard',rank:'Epic',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'15'}
	 ]
	},
	{name:"Wayside Shore",
	 reqLevel:"20",
	 maxLevel:"25",
	 population:"Even",
	 environments:[91,92,90],
	 spawns:[
	  {id:'92',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'30'},
	  {id:'17',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'75'},
	  {id:'6',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'10',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Spirit',rank:'Regular',chance:'40'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'18'}
	 ]
	},
	{name:"The Deep Forest",
	 reqLevel:"18",
	 maxLevel:"23",
	 population:"Even",
	 environments:[25,26,27],
	 spawns:[
	  {id:'8',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'29',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'14',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'3',type:'Race',archetype:'Zombie',rank:'Regular',chance:'30'},
	  {id:'2',type:'Race',archetype:'Zombie',rank:'Regular',chance:'15'},
	  {id:'3',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'15'},
	  {id:'2',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"The Skydar Nest",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[73,78,79],
	 spawns:[
	  {id:'9',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'16',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'13',type:'Race',archetype:'Standard',rank:'Regular',chance:'25'},
	  {id:'8',type:'Race',archetype:'Standard',rank:'Regular',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'13'}
	 ]
	},
	{name:"Mogden Woods",
	 reqLevel:"1",
	 maxLevel:"6",
	 population:"Even",
	 environments:[41],
	 spawns:[
	  {id:'2',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'100'},
	  {id:'38',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'40'},
	  {id:'42',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'30'},
	  {id:'0',type:'Race',archetype:'Wraith',rank:'Regular',chance:'25'},
	  {id:'0',type:'Race',archetype:'Spectral',rank:'Regular',chance:'15'},
	  {id:'1',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'100'},
	  {id:'12',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'28',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'20'},
	  {id:'12',type:'Race',archetype:'Standard',rank:'Regular',chance:'10'},
	  {id:'10',type:'Race',archetype:'Standard',rank:'Regular',chance:'5'}
	 ],
	 loot:[
	  {id:'?',type:'Weapon',chance:'25'},
	  {id:'?',type:'?',chance:'11'}
	 ]
	},
	{name:"Sunder Mines",
	 reqLevel:"2",
	 maxLevel:"7",
	 population:"Even",
	 environments:[12],
	 spawns:[
	  {id:'4',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'35'},
	  {id:'11',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'},
	  {id:'89',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'32'},
	  {id:'1',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'25'},
	  {id:'1',type:'Race',archetype:'Zombie',rank:'Regular',chance:'25'},
	  {id:'1',type:'Race',archetype:'Wraith',rank:'Mini-Boss',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'13'}
	 ]
	},
	{name:"Amphisbaena Graves",
	 reqLevel:"4",
	 maxLevel:"9",
	 population:"Sparse",
	 environments:[13,14],
	 spawns:[
	  {id:'13',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'75'},
	  {id:'0',type:'Race',archetype:'Zombie',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'45'},
	  {id:'0',type:'Race',archetype:'Phantom',rank:'Regular',chance:'30'},
	  {id:'7',type:'Race',archetype:'',rank:'Mini-Boss',chance:'5'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'6'}
	 ]
	},
	{name:"Folnir Bog",
	 reqLevel:"5",
	 maxLevel:"11",
	 population:"Dense",
	 environments:[49,50,51],
	 spawns:[
	  {id:'15',type:'Magical Creature',archetype:'Wraith',rank:'Mini-Boss',chance:'50'},
	  {id:'0',type:'Race',archetype:'Zombie',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'45'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'12'}
	 ]
	},
	{name:"Darrakah Cave",
	 reqLevel:"12",
	 maxLevel:"17",
	 population:"Sparse",
	 environments:[3,4],
	 spawns:[
	  {id:'18',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'43',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'35'},
	  {id:'44',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'4'}
	 ]
	},
	{name:"Barefoot Forest",
	 reqLevel:"9",
	 maxLevel:"14",
	 population:"Even",
	 environments:[39,35],
	 spawns:[
	  {id:'35',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'52',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'56',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'35'},
	  {id:'3',type:'Race',archetype:'Standard',rank:'Regular',chance:'25'},
	  {id:'4',type:'Race',archetype:'Standard',rank:'Regular',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'9'}
	 ]
	},
	{name:"Heart of the Mountain",
	 reqLevel:"1",
	 maxLevel:"5",
	 population:"Even",
	 environments:[12,81],
	 spawns:[
	  {id:'65',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'64',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'50'},
	  {id:'2',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'25'},
	  {id:'1',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'25'},
	  {id:'8',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'11'}
	 ]
	},
	{name:"Yylkra Valley",
	 reqLevel:"2",
	 maxLevel:"7",
	 population:"Even",
	 environments:[60,58,65],
	 spawns:[
	  {id:'63',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'50'},
	  {id:'0',type:'Race',archetype:'Phantom',rank:'Minion',chance:'25'},
	  {id:'3',type:'Race',archetype:'Phantom',rank:'Minion',chance:'25'},
	  {id:'4',type:'Race',archetype:'Phantom',rank:'Minion',chance:'25'},
	  {id:'5',type:'Race',archetype:'Phantom',rank:'Minion',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	},
	{name:"Talstar Woods",
	 reqLevel:"6",
	 maxLevel:"11",
	 population:"Dense",
	 environments:[41],
	 spawns:[
	  {id:'81',type:'Magical Creature',archetype:'Archon',rank:'Boss',chance:'50'},
	  {id:'86',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Furkrit Jungle",
	 reqLevel:"4",
	 maxLevel:"9",
	 population:"Even",
	 environments:[45],
	 spawns:[
	  {id:'97',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'104',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'107',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'25'},
	  {id:'12',type:'Race',archetype:'Standard',rank:'Regular',chance:'8'},
	  {id:'20',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'7'}
	 ]
	},
	{name:"Black Tooth Port",
	 reqLevel:"10",
	 maxLevel:"15",
	 population:"Dense",
	 environments:[70,71,66],
	 spawns:[
	  {id:'0',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'6',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'8',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'9',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'10',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'5',type:'Race',archetype:'Standard',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'6'}
	 ]
	},
	{name:"Hollow Hills",
	 reqLevel:"12",
	 maxLevel:"17",
	 population:"Sparse",
	 environments:[62],
	 spawns:[
	  {id:'103',type:'Magical Creature',archetype:'Wraith',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Zombie',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'45'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Redstone Timber",
	 reqLevel:"13",
	 maxLevel:"18",
	 population:"Even",
	 environments:[32],
	 spawns:[
	  {id:'108',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'98',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'25'},
	  {id:'0',type:'Race',archetype:'Apparition',rank:'Regular',chance:'75'},
	  {id:'0',type:'Race',archetype:'Ghost',rank:'Regular',chance:'35'},
	  {id:'0',type:'Race',archetype:'Wraith',rank:'Boss',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'12'}
	 ]
	},
	{name:"Rot Hill",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[62],
	 spawns:[
	  {id:'57',type:'Magical Creature',archetype:'Wraith',rank:'Mini-Boss',chance:'100'},
	  {id:'65',type:'Magical Creature',archetype:'Standard',rank:'Minion',chance:'35'},
	  {id:'0',type:'Race',archetype:'Zombie',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'45'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'15'}
	 ]
	},
	{name:"Cid's Lake",
	 reqLevel:"1",
	 maxLevel:"5",
	 population:"Sparse",
	 environments:[87],
	 spawns:[
	  {id:'62',type:'Magical Creature',archetype:'Standard',rank:'Epic',chance:'100'},
	  {id:'66',type:'Magical Creature',archetype:'Zombie',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'5'}
	 ]
	},
	{name:"Jinthraku Badlands",
	 reqLevel:"2",
	 maxLevel:"7",
	 population:"Even",
	 environments:[74],
	 spawns:[
	  {id:'60',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'50',type:'Magical Creature',archetype:'Archon',rank:'Boss',chance:'100'},
	  {id:'47',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'35'},
	  {id:'7',type:'Race',archetype:'Zombie',rank:'Regular',chance:'25'},
	  {id:'7',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'6'}
	 ]
	},
	{name:"Temple of Bai Ze",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[6,20,21,22,23],
	 spawns:[
	  {id:'19',type:'Magical Creature',archetype:'Spirit',rank:'Boss',chance:'50'},
	  {id:'55',type:'Magical Creature',archetype:'Skeletal',rank:'Minion',chance:'50'},
	  {id:'109',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Gates of Fire",
	 reqLevel:"20",
	 maxLevel:"25",
	 population:"Sparse",
	 environments:[15,83,84],
	 spawns:[
	  {id:'21',type:'Magical Creature',archetype:'Standard',rank:'Epic',chance:'50'},
	  {id:'106',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'12'}
	 ]
	},
	{name:"Top of Mt. Hiegar",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[34],
	 spawns:[
	  {id:'23',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'50'},
	  {id:'58',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	},
	{name:"The Wailing Port",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[88,93,94],
	 spawns:[
	  {id:'22',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'73',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'45'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'9'}
	 ]
	},
	{name:"Feral Wood",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Dense",
	 environments:[30,31],
	 spawns:[
	  {id:'24',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'},
	  {id:'110',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'35'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'7'}
	 ]
	},
	{name:"Basilisk Rock",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[64,28,29],
	 spawns:[
	  {id:'25',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'58',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'35'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Crossroads",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Sparse",
	 environments:[59,61,63,37],
	 spawns:[
	  {id:'26',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'61'},
	  {id:'72',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'48'},
	  {id:'31',type:'Magical Creature',archetype:'Standard',rank:'Ultra Rare',chance:'15'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'5'}
	 ]
	},
	{name:"Beneath Castle Aberdeen",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Full",
	 environments:[17,18],
	 spawns:[
	  {id:'27',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'38'},
	  {id:'49',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'37'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'6'}
	 ]
	},
	{name:"Mudbane Swamp",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Dense",
	 environments:[52,54,55],
	 spawns:[
	  {id:'30',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'58'},
	  {id:'54',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'34'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'4'}
	 ]
	},
	{name:"Green Flats",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Sparse",
	 environments:[68,69],
	 spawns:[
	  {id:'32',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'},
	  {id:'53',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'33'},
	  {id:'84',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'28'},
	  {id:'85',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'24'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'9'}
	 ]
	},
	{name:"Depths of the Crag",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Sparse",
	 environments:[95,96,97,98,99],
	 spawns:[
	  {id:'33',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'55'},
	  {id:'39',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'44'},
	  {id:'51',type:'Magical Creature',archetype:'Standard',rank:'Epic',chance:'33'},
	  {id:'67',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'30'},
	  {id:'102',type:'Magical Creature',archetype:'Standard',rank:'Rare',chance:'24'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Shadowed Trees",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Dense",
	 environments:[33,36,53],
	 spawns:[
	  {id:'34',type:'Magical Creature',archetype:'Standard',rank:'Boss',chance:'61'},
	  {id:'46',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'50'},
	  {id:'80',type:'Magical Creature',archetype:'Standard',rank:'Minion',chance:'48'},
	  {id:'88',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'44'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'7'}
	 ]
	},
	{name:"Centaur Steading",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[43,44],
	 spawns:[
	  {id:'36',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'58'},
	  {id:'45',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'56'},
	  {id:'82',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'41'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'13'}
	 ]
	},
	{name:"Eastern Sands of Dumasque",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Sparse",
	 environments:[77],
	 spawns:[
	  {id:'37',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'88'},
	  {id:'58',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'74'},
	  {id:'87',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'55'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'11'}
	 ]
	},
	{name:"Plains of Endless Despair",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Dense",
	 environments:[75,76],
	 spawns:[
	  {id:'40',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'41'},
	  {id:'48',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'},
	  {id:'8',type:'Race',archetype:'Wraith',rank:'Regular',chance:'35'},
	  {id:'8',type:'Race',archetype:'Standard',rank:'Regular',chance:'34'},
	  {id:'9',type:'Race',archetype:'Wraith',rank:'Regular',chance:'30'},
	  {id:'9',type:'Race',archetype:'Standard',rank:'Regular',chance:'25'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'9'}
	 ]
	},
	{name:"Cinnimon Trees",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[48],
	 spawns:[
	  {id:'41',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'},
	  {id:'41',type:'Magical Creature',archetype:'Spectral',rank:'Boss',chance:'50'},
	  {id:'79',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'40'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'7'}
	 ]
	},
	{name:"Lake Prim",
	 reqLevel:"15",
	 maxLevel:"20",
	 population:"Even",
	 environments:[85,86],
	 spawns:[
	  {id:'74',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'48'},
	  {id:'92',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'47'},
	  {id:'78',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'34'},
	  {id:'100',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	},
	{name:"Heart of the Phoenix",
	 reqLevel:"20",
	 maxLevel:"25",
	 population:"Dense",
	 environments:[90],
	 spawns:[
	  {id:'83',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'44'},
	  {id:'101',type:'Magical Creature',archetype:'Standard',rank:'Rare',chance:'41'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'6'}
	 ]
	},
	{name:"Nest of Lightning",
	 reqLevel:"1",
	 maxLevel:"5",
	 population:"Sparse",
	 environments:[10,11,1],
	 spawns:[
	  {id:'96',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'50'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"Theatre of Bone",
	 reqLevel:"20",
	 maxLevel:"25",
	 population:"Full",
	 environments:[19,16],
	 spawns:[
	  {id:'13',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'52'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'7'}
	 ]
	},
	{name:"A Silent Marsh",
	 reqLevel:"1",
	 maxLevel:"5",
	 population:"Sparse",
	 environments:[47,48],
	 spawns:[
	  {id:'78',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'34'},
	  {id:'100',type:'Magical Creature',archetype:'Standard',rank:'Regular',chance:'20'},
	  {id:'12',type:'Race',archetype:'Spectral',rank:'Regular',chance:'19'},
	  {id:'7',type:'Race',archetype:'Spectral',rank:'Regular',chance:'19'},
	  {id:'6',type:'Race',archetype:'Spectral',rank:'Regular',chance:'18'},
	  {id:'12',type:'Race',archetype:'Ghost',rank:'Regular',chance:'19'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'8'}
	 ]
	},
	{name:"The Hollow",
	 reqLevel:"10",
	 maxLevel:"15",
	 population:"Dense",
	 environments:[44,56,57],
	 spawns:[
	  {id:'34',type:'Magical Creature',archetype:'Standard',rank:'Mini-Boss',chance:'61'},
	  {id:'0',type:'Race',archetype:'Zombie',rank:'Regular',chance:'50'},
	  {id:'0',type:'Race',archetype:'Skeletal',rank:'Regular',chance:'45'},
	  {id:'0',type:'Race',archetype:'Phantom',rank:'Regular',chance:'30'}
	 ],
	 loot:[
	  {id:'?',type:'?',chance:'10'}
	 ]
	} 
];
var main = new HabitatGenerator(data);