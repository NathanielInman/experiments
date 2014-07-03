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
	Vacant is completely empty and packed is completely full, and the other
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
		name: String;
		type: Object;
		description: String;
	deserialize(input){
		this.name = input.name;
		this.type={
			pet:input.type.pet,
			mount:input.type.mount,
			description:input.type.description
		}
		this.description = input.description;
		return this;
	}
}

/* The main class */
class CreatureGenerator implements Serializable<CreatureGenerator>{
	member: number;
	creature: any;
	constructor(list){
		this.creature=[];
		this.deserialize(list);
		easel.redraw=()=>this.draw();
	}
	deserialize(list){
		for(creature in list){
			this.creature.push(new Entry().deserialize(list[creature]));
		}
		this.update();
	}
	draw(){
		ctx.font='24px Courier New';
		ctx.textAlign='center';
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,v.w,v.h);
		ctx.fillStyle='#333';
		ctx.fillRect(0,0,v.w,48);
		ctx.fillStyle='#08F';
		ctx.fillRect(0,48,v.w,2);
		ctx.fillStyle='#112';
		ctx.fillRect(0,v.h/8+v.h/10,v.w,v.h/10);
		ctx.fillRect(0,v.h/8+v.h/10*3,v.w,v.h/10);
		ctx.fillRect(0,v.h/8+v.h/10*5,v.w,v.h/10);
		ctx.fillRect(0,v.h/8+v.h/10*7,v.w,v.h/10);
		ctx.fillStyle='#04A';
		ctx.fillRect(0,v.h/8+v.h/10,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*2,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*3,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*4,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*5,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*6,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*7,v.w,2);
		ctx.fillRect(0,v.h/8+v.h/10*8,v.w,2);
		ctx.fillStyle='#FFF';
		ctx.fillText(this.creature[this.member].name,v.w/2,30);
		ctx.fillText(this.creature[this.member].type.pet?'This creature is a pet.':'This creature is NOT a pet.',v.w/2,v.h/8+v.h/10+v.h/20+6);
		ctx.fillText(this.creature[this.member].type.mount?'This creature is a mount.':'This creature is NOT a mount.',v.w/2,v.h/8+v.h/10*3+v.h/20+6);
		ctx.fillText(this.creature[this.member].type.description,v.w/2,v.h/8+v.h/10*5+v.h/20+6);
		ctx.fillText(this.creature[this.member].description,v.w/2,v.h/8+v.h/10*7+v.h/20+6);
	}
	update(){
		this.member=r(0,this.creature.length,false);
		this.draw();
		setTimeout(() => this.update(),1000);
	}
}

/* Initialization */
var data = [
	{
		name:"Westphalian",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Hanoverian",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Aegidienberger",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Andalusian",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Percheron",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Trakehner",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Zemaitukas",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Pottok",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Eriskay",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Paso Fino",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Freiberger",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Lusitano",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Murgese",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Oldenburg",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Dulmen",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Connemara",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Chincoteague",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Cypriot",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Mule",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Kiang",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Standardbred",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Thoroughbred",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Azteca",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Appaloosa",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Dartmoor",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Ladruber",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Knabstrup",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Karabakh",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Ardennes",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Belgian",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Clydesdale",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"A horse."
	},{
		name:"Fell",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Faroe",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Poitou",
		type:{
			pet:0,
			mount:1,
			description:"forest animal, desert animal",
		},		description:"A horse."
	},{
		name:"Akita Inu",
		type:{
			pet:0,
			mount:0,
			description:"forest animal,mountain animal",
		},		description:"A dog."
	},{
		name:"Bulldog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Pitbull Terrier",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Staffordshire Terrier",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Argentine Dogo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Boston Terrier",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Bull Terrier",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Dogue de Bordeaux",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"English Mastiff",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"A dog."
	},{
		name:"Neopolitan Mastiff",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Manchester Terrier",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Shar Pei",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Tosa",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A dog."
	},{
		name:"Leopard",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"A cat."
	},{
		name:"Snow Leopard",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, mountain animal",
		},		description:"A cat."
	},{
		name:"Clouded Leopard",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"A cat."
	},{
		name:"Cheetah",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Bengal Tiger",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Balinese Tiger",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Sumatran Tiger",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Siberian Tiger",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Amur Tiger",
		type:{
			pet:0,
			mount:0,
			description:"forest animal,jungle animal",
		},		description:"A cat."
	},{
		name:"Jaguar",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"A cat."
	},{
		name:"Lion",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal, desert animal",
		},		description:"A cat."
	},{
		name:"Orangutan",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Cape Buffalo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Rainbow Lizard",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Flying Squirrel",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Giant Panda",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Fox",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Bongo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Bontebok",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Fossa",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Forest Hog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Gerbil",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, desert animal",
		},		description:"Empty"
	},{
		name:"Hare",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Hedgehog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, desert animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Jackal",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Mandrill",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Nyala",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Oribi",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Otter",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Mongoose",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Seal",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Reedbuck",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Warthog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Waterbuck",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wild Cat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Badger",
		type:{
			pet:0,
			mount:0,
			description:"",
		},		description:"Empty"
	},{
		name:"Gorilla",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal, mountain animal",
		},		description:"Empty"
	},{
		name:"Dwarf Mongoose",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Lemur",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Iguana",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Golden Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Giant Armadillo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Sloth",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Squirrel Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Pygmy Marmoset",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Elephant",
		type:{
			pet:0,
			mount:0,
			description:"",
		},		description:"Empty"
	},{
		name:"Aye-Aye Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Capuchin Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Poison Arrow Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Alpaca Anteater",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Red Deer Giant Armadillo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wooly Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Spider Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Porcupine",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, desert animal",
		},		description:"Empty"
	},{
		name:"White Faced Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Howler Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Capybara",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Okapi",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Sumatran Rhinoceros",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Silvery Gibbon",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Giant River Otter",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Toucan Poison Arrow Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Happface Spider",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Glass Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Leaf-Cutter Ant",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Bush Pig",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Strawberry Poisoned Dart Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Antelope",
		type:{
			pet:0,
			mount:0,
			description:"forest animal,jungle animal",
		},		description:"Empty"
	},{
		name:"Bactrian Camel",
		type:{
			pet:0,
			mount:1,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Bahamas Rock Iguana",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Bale Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Owl Faced Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Ostrich",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Ouachita Burrowing Crayfish",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Geometric Tortoise",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Galapagos Land Snail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Salta Water Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Saltwater Crocodile",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Samoan Tree Snail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Samoan Flying Fox",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Sambar Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Salvin's Salamander",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Fairy Shrimp",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Uzungwe Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Prairie Dog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Usambara Banana Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Zug's Robber Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Zhou's Box Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Zapahuira Water Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Zambian Mole Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Zacate Blanco Treefrog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yunnan Flying Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yiwu Salamander",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellowtail Flounder",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellow-tailed Wooly Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellow-spotted Salamander",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellow-margined Box Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellow-legged Climbing Salamander",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White-lipped Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yellow River Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yarey Robber Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Warty Tree Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Visayan Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Volcan Tacana Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yamur Lake Grunter",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yalobusha Riverlet Crayfish",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Western Bearded Pig",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Yap Flying Fox",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wyoming Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Volcano Rabbit",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wrinkled Madagascar Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wutai Crab",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wreathed Cactus Snail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wood Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wolverine",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Wondiwoi Tree Kangaroo",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wild Goat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Whitehead's Spiny Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White-tipped Tuft-tailed Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White-tailed Mouse",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White-cheeked Spider Monkey",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Water Frog Wang's Crab",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wild Yak White-tailed Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White-spotted Madagascar Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Visayan Warty Pig",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Crocodile Newt",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Vanikoro Flying Fox",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Unicolored Oldfield Mouse",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Ubatuba Dwarf Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Turkana Mud Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tufted Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tulotoma Snail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tumbala Climbing Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tufted Gray Langur",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tufted Ground Squirrel",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tree Hole Crab",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Travancore Flying Squirrel",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Toothless Blindcat Timor",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tiger Chameleon",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Telescope Hornsnail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Three-striped Roof Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Langur",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Pebblesnail",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Jackrabbit",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Swamp Deer",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Painted Tree Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Palau Flying Fox",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Pond Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"La Palma Giant Lizard",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Kinabalu Toad",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Juliana's Golden Mole",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Jagged-shelled Turtle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Ivory Coast Frog",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Indian Giant Squirrel",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Sulcata Tortoise",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Dhole",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Gazelle",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Florida Panther",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Gray Wolf",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Grizzly Bear",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Koala Bears",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Kinkajou",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Kangaroo Rat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, desert animal",
		},		description:"Empty"
	},{
		name:"Numbat",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Red Wolf",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Tasmanian Devil",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"White Rhinoceros",
		type:{
			pet:0,
			mount:0,
			description:"forest animal",
		},		description:"Empty"
	},{
		name:"Wallaby",
		type:{
			pet:0,
			mount:0,
			description:"forest animal, desert animal",
		},		description:"Empty"
	},{
		name:"Prairie Falcon",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Cooper's Hawk",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Chanting Goshawk",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, jungle bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Peregrine Falcon",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, desert bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Osprey",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, jungle bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Harpy Eagle",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Golden Eagle",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Lammergeier",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Pariah Kite",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, jungle bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Brehminy Kite",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"Burrowing Owl",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	},{
		name:"White Pelican",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Great Blue Heron",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Snowy Egret",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Green Heron",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Greater White-fronted Goose",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Purple Martin",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Wood Duck",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Red-shouldered Hawk",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Mountain Bluebird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Ruby-crowned Kinglet",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Black-headed Heron",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Hooded Vulture",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Swallow-tailed Kite",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Paradise Tanager",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Long-tailed Sylph",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Black-backed Grosbeak",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Great Horned Owl",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Hoopoe Malachite",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Sunbird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Scarlet Macaw",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Orange Winged Parrot",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Woodpecker",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Belted Kingfisher",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Hooded Oriole",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Western Meadowlark",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Hummingbird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"White-Throate Swift",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Northern Pygmy Owl",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow Billed Cuckoo",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Sandpiper",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Mockingbird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Zamboanga Bulbul",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Wilson's Bird-of-paradise",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yemen Thrush",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Wrinkled Hornbill",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellowish Imperial Pigeon",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Northern Spotted Owl",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-throated Hanging-parrot",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Wood Stork",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-shouldered Blackbird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"prairie Chicken",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Lilian's Lovebird",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-legged Pigeon",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"White-winged Collared Dove",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-eyed Starling",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Western Spotted Owl",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Marbeled Murrelet",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-crowned Parakeet",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Kekapo",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Yellow-crested Cockatoo",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Hawaiian Goose",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"White-winged Wood Duck",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Purple Eagle",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Brown-winged Kingfisher",
		type:{
			pet:0,
			mount:0,
			description:"forest bird",
		},		description:"Empty"
	},{
		name:"Bukhts",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Mule",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Dulmen",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Connemara",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Giehe",
		type:{
			pet:0,
			mount:1,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Trokk",
		type:{
			pet:0,
			mount:1,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Derva",
		type:{
			pet:0,
			mount:1,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Ocelot",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Lion",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Addax Antelope",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Arabian Horse",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Bat",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Bighorn Sheep",
		type:{
			pet:0,
			mount:0,
			description:"desert animal, mountain animal",
		},		description:"Empty"
	},{
		name:"Bilby",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Cape Hare",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Chuckwallas",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Civet",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Collared Peccary",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Desert Elephant",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Desert Iguana",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Desert Tortoise",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Dingo",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Donkey",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Dromedary",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Fennec Fox",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Flamingo",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Gila Monster",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Hyena",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Jerboa",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Lizard",
		type:{
			pet:0,
			mount:0,
			description:"desert animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Marsupial Mole",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Meerkat",
		type:{
			pet:0,
			mount:0,
			description:"desert animal, forest animal",
		},		description:"Empty"
	},{
		name:"Nine-banded Armadillo",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Onager",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Oryx",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Pack Rat",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Penguin",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Peruvian Fox",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Phrynosoma Platyrhinos",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Pocket Mouse",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Polar Bear",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Quokka",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Rattlesnakes",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Roadrunner",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Sand Cobra",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Sandgrouse",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Scorpion",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Serval",
		type:{
			pet:0,
			mount:0,
			description:"desert animal, forest animal",
		},		description:"Empty"
	},{
		name:"Sidewinder",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Tarantula",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Veiled Chameleon",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"White-tailed Deer",
		type:{
			pet:0,
			mount:0,
			description:"desert animal",
		},		description:"Empty"
	},{
		name:"Nubian Vulture",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Griffin Vulture",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Jackal Buzzard",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Bald Eagle",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Egyptian Vulture",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Fan-tailed Raven",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Lappet-faced Vulture",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Great Indian Bustard",
		type:{
			pet:0,
			mount:0,
			description:"desert bird",
		},		description:"Empty"
	},{
		name:"Caspian Tiger",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Leopard",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Lion",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Aardvark",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Alligator",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Armadillo",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Baboon",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Bear",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Bison",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Chimpanzee",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Coyote",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal, desert animal",
		},		description:"Empty"
	},{
		name:"Crocodile",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal, forest animal",
		},		description:"Empty"
	},{
		name:"Deer",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Giraffe",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Hippopotamus",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Koala Bear",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Lynx",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal, forest animal, mountain animal",
		},		description:"Empty"
	},{
		name:"Monkey",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Red Panda",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Rhinoceros",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Skunk",
		type:{
			pet:0,
			mount:0,
			description:"desert animal, forest animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Snake",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Turtle",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Wild Dog",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Wolf",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Zebra",
		type:{
			pet:0,
			mount:0,
			description:"jungle animal",
		},		description:"Empty"
	},{
		name:"Falcon",
		type:{
			pet:0,
			mount:0,
			description:"jungle bird",
		},		description:"Empty"
	},{
		name:"English Mastiff",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Cougar",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal, jungle animal",
		},		description:"Empty"
	},{
		name:"Bobcat",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Andean Mountain Cat",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Chinchilla",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Ibex",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal, desert animal",
		},		description:"Empty"
	},{
		name:"Llama",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal, desert animal",
		},		description:"Empty"
	},{
		name:"Mountain Goat",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Mountain Kingsnake",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Mountain Lion",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Panda",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Pike",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Fish"
	},{
		name:"Puma",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Yak",
		type:{
			pet:0,
			mount:0,
			description:"mountain animal",
		},		description:"Empty"
	},{
		name:"Swamp Harrier",
		type:{
			pet:0,
			mount:0,
			description:"forest bird, mountain bird",
		},		description:"Empty"
	}
];

var main = new CreatureGenerator(data);