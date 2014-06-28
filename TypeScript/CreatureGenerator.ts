/************************************************************************************\
	Creature Generator written by Nathaniel Inman on 06/27/2014
     
	Standard Creatures list was converted from Terminal Groupings
	*.TG to XML on 01/18/11. The xslt was created on 08/11/12
	The XML was migrated to JSON on 06/27/2014
	
	The list was extended for implementation in Exploring The Bleak
	on 04/16/13. The list is used in Plains of Sedia : Origins, Developed by
	Nathaniel Inman of The Other Experiment Studio found @ www.theoestudio.com
	All contents within are licensed under GPLv3
    
	The pet field can be either 1 or 0 as a boolean representation.
	The mount field can be either 1 or 0 as a boolean representation.
	The type field can be either "forest animal","forest bird","desert animal",
	"desert bird","jungle animal","jungle bird","mountain animal",
	"mountain bird"
	
	The type field is used to restrict the animals to randomly generate on
	environment-specific locations. Each environment has a chance of having
	multiple standard creature types, as well as each creature having the
	possibility of residing in multiple types of areas.
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
	id: number;
	deserialize(input){
		this.id = input.id;
		return this;
	}
}

/* The main class */
class CreatureGenerator implements Serializable<CreatureGenerator>{
	mainId: number;
	firstMember: Entry;
	secondMember: Entry;
	constructor(){
		this.draw();
	}
	deserialize(input){
		this.mainId=input.mainId;
		this.firstMember = new Entry().deserialize(input.firstMember);
		this.secondMember = new Entry().deserialize(input.secondMember);
		return this;
	}
	draw(){
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,v.w,v.h);
		ctx.fillStyle='#FFF';
		ctx.fillText("YAY!",100,100);
	}
}

/* Initialization */
var data = {
	mainId: 42,
	firstMember: {
		id: 1337
	},
	secondMember: {
		id: -1
	}
};

var main = new CreatureGenerator().deserialize(data);
console.log(main);

/*
<itemlist>
	<item number="1" name="Westphalian">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="2" name="Hanoverian">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="3" name="Aegidienberger">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="4" name="Andalusian">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="5" name="Percheron">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="6" name="Trakehner">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="7" name="Zemaitukas">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="8" name="Pottok">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="9" name="Eriskay">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="10" name="Paso Fino">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="11" name="Freiberger">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="12" name="Lusitano">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="13" name="Murgese">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="14" name="Oldenburg">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="15" name="Dulmen">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="16" name="Connemara">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="17" name="Chincoteague">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="18" name="Cypriot">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="19" name="Mule">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="20" name="Kiang">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="21" name="Standardbred">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="22" name="Thoroughbred">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="23" name="Azteca">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="24" name="Appaloosa">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="25" name="Dartmoor">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="26" name="Ladruber">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="27" name="Knabstrup">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="28" name="Karabakh">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="29" name="Ardennes">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="30" name="Belgian">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="31" name="Clydesdale">
		<type pet="0" mount="1">forest animal</type>
		<description>A horse.</description>
	</item>
	<item number="32" name="Fell">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="33" name="Faroe">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="34" name="Poitou">
		<type pet="0" mount="1">forest animal, desert animal</type>
		<description>A horse.</description>
	</item>
	<item number="35" name="Akita Inu">
		<type pet="0" mount="0">forest animal,mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="36" name="Bulldog">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="37" name="Pitbull Terrier">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="38" name="Staffordshire Terrier">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="39" name="Argentine Dogo">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="40" name="Boston Terrier">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="41" name="Bull Terrier">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="42" name="Dogue de Bordeaux">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="43" name="English Mastiff">
		<type pet="0" mount="0">forest animal</type>
		<description>A dog.</description>
	</item>
	<item number="44" name="Neopolitan Mastiff">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="45" name="Manchester Terrier">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="46" name="Shar Pei">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="47" name="Tosa">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A dog.</description>
	</item>
	<item number="48" name="Leopard">
		<type pet="0" mount="0">forest animal</type>
		<description>A cat.</description>
	</item>
	<item number="49" name="Snow Leopard">
		<type pet="0" mount="0">forest animal, mountain animal</type>
		<description>A cat.</description>
	</item>
	<item number="50" name="Clouded Leopard">
		<type pet="0" mount="0">forest animal</type>
		<description>A cat.</description>
	</item>
	<item number="51" name="Cheetah">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="52" name="Bengal Tiger">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="53" name="Balinese Tiger">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="54" name="Sumatran Tiger">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="55" name="Siberian Tiger">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="56" name="Amur Tiger">
		<type pet="0" mount="0">forest animal,jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="57" name="Jaguar">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>A cat.</description>
	</item>
	<item number="58" name="Lion">
		<type pet="0" mount="0">jungle animal, desert animal</type>
		<description>A cat.</description>
	</item>
	<item number="59" name="Orangutan">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="60" name="Cape Buffalo">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="61" name="Rainbow Lizard">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="62" name="Flying Squirrel">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="63" name="Giant Panda">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="64" name="Fox">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="65" name="Bongo">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="66" name="Bontebok">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="67" name="Fossa">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="68" name="Forest Hog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="69" name="Gerbil">
		<type pet="0" mount="0">forest animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="70" name="Hare">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="71" name="Hedgehog">
		<type pet="0" mount="0">forest animal, desert animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="72" name="Jackal">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="73" name="Mandrill">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="74" name="Nyala">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="75" name="Oribi">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="76" name="Otter">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="77" name="Mongoose">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="78" name="Seal">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="79" name="Reedbuck">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="80" name="Warthog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="81" name="Waterbuck">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="82" name="Wild Cat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="83" name="Badger">
		<type pet="0" mount="0">"forest animal</type>
		<description>Empty</description>
	</item>
	<item number="84" name="Gorilla">
		<type pet="0" mount="0">forest animal, jungle animal, mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="85" name="Dwarf Mongoose">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="86" name="Lemur">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="87" name="Iguana">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="88" name="Golden Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="89" name="Giant Armadillo">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="90" name="Sloth">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="91" name="Squirrel Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="92" name="Pygmy Marmoset">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="93" name="Elephant">
		<type pet="0" mount="0">"forest animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="94" name="Aye-Aye Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="95" name="Capuchin Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="96" name="Poison Arrow Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="97" name="Alpaca Anteater">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="98" name="Red Deer Giant Armadillo">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="99" name="Wooly Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="100" name="Spider Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="101" name="Porcupine">
		<type pet="0" mount="0">forest animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="102" name="White Faced Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="103" name="Howler Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="104" name="Capybara">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="105" name="Okapi">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="106" name="Sumatran Rhinoceros">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="107" name="Silvery Gibbon">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="108" name="Giant River Otter">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="109" name="Toucan Poison Arrow Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="110" name="Happface Spider">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="111" name="Glass Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="112" name="Leaf-Cutter Ant">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="113" name="Bush Pig">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="114" name="Strawberry Poisoned Dart Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="115" name="Antelope">
		<type pet="0" mount="0">forest animal,jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="116" name="Bactrian Camel">
		<type pet="0" mount="1">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="117" name="Bahamas Rock Iguana">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="118" name="Bale Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="119" name="Owl Faced Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="120" name="Ostrich">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="121" name="Ouachita Burrowing Crayfish">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="122" name="Geometric Tortoise">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="123" name="Galapagos Land Snail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="124" name="Salta Water Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="125" name="Saltwater Crocodile">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="126" name="Samoan Tree Snail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="127" name="Samoan Flying Fox">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="128" name="Sambar Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="129" name="Salvin's Salamander">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="130" name="Fairy Shrimp">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="131" name="Uzungwe Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="132" name="Prairie Dog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="133" name="Usambara Banana Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="134" name="Zug's Robber Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="135" name="Zhou's Box Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="136" name="Zapahuira Water Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="137" name="Zambian Mole Rat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="138" name="Zacate Blanco Treefrog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="139" name="Yunnan Flying Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="140" name="Yiwu Salamander">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="141" name="Yellowtail Flounder">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="142" name="Yellow-tailed Wooly Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="143" name="Yellow-spotted Salamander">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="144" name="Yellow-margined Box Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="145" name="Yellow-legged Climbing Salamander">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="146" name="White-lipped Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="147" name="Yellow River Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="148" name="Yarey Robber Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="149" name="Warty Tree Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="150" name="Visayan Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="151" name="Volcan Tacana Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="152" name="Yamur Lake Grunter">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="153" name="Yalobusha Riverlet Crayfish">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="154" name="Western Bearded Pig">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="155" name="Yap Flying Fox">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="156" name="Wyoming Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="157" name="Volcano Rabbit">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="158" name="Wrinkled Madagascar Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="159" name="Wutai Crab">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="160" name="Wreathed Cactus Snail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="161" name="Wood Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="162" name="Wolverine">
		<type pet="0" mount="0">forest animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="163" name="Wondiwoi Tree Kangaroo">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="164" name="Wild Goat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="165" name="Whitehead's Spiny Rat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="166" name="White-tipped Tuft-tailed Rat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="167" name="White-tailed Mouse">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="168" name="White-cheeked Spider Monkey">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="169" name="Water Frog Wang's Crab">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="170" name="Wild Yak White-tailed Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="171" name="White-spotted Madagascar Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="172" name="Visayan Warty Pig">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="173" name="Crocodile Newt">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="174" name="Vanikoro Flying Fox">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="175" name="Unicolored Oldfield Mouse">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="176" name="Ubatuba Dwarf Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="177" name="Turkana Mud Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="178" name="Tufted Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="179" name="Tulotoma Snail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="180" name="Tumbala Climbing Rat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="181" name="Tufted Gray Langur">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="182" name="Tufted Ground Squirrel">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="183" name="Tree Hole Crab">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="184" name="Travancore Flying Squirrel">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="185" name="Toothless Blindcat Timor">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="186" name="Tiger Chameleon">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="187" name="Telescope Hornsnail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="188" name="Three-striped Roof Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="189" name="Langur">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="190" name="Pebblesnail">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="191" name="Jackrabbit">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="192" name="Swamp Deer">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="193" name="Painted Tree Rat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="194" name="Palau Flying Fox">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="195" name="Pond Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="196" name="La Palma Giant Lizard">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="197" name="Kinabalu Toad">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="198" name="Juliana's Golden Mole">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="199" name="Jagged-shelled Turtle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="200" name="Ivory Coast Frog">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="201" name="Indian Giant Squirrel">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="202" name="Sulcata Tortoise">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="203" name="Dhole">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="204" name="Gazelle">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="205" name="Florida Panther">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="206" name="Gray Wolf">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="207" name="Grizzly Bear">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="208" name="Koala Bears">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="209" name="Kinkajou">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="210" name="Kangaroo Rat">
		<type pet="0" mount="0">forest animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="211" name="Numbat">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="212" name="Red Wolf">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="213" name="Tasmanian Devil">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="214" name="White Rhinoceros">
		<type pet="0" mount="0">forest animal</type>
		<description>Empty</description>
	</item>
	<item number="215" name="Wallaby">
		<type pet="0" mount="0">forest animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="216" name="Prairie Falcon">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="217" name="Cooper's Hawk">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="218" name="Chanting Goshawk">
		<type pet="0" mount="0">forest bird, jungle bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="219" name="Peregrine Falcon">
		<type pet="0" mount="0">forest bird, desert bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="220" name="Osprey">
		<type pet="0" mount="0">forest bird, jungle bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="221" name="Harpy Eagle">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="222" name="Golden Eagle">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="223" name="Lammergeier">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="224" name="Pariah Kite">
		<type pet="0" mount="0">forest bird, jungle bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="225" name="Brehminy Kite">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="226" name="Burrowing Owl">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
	<item number="227" name="White Pelican">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="228" name="Great Blue Heron">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="229" name="Snowy Egret">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="230" name="Green Heron">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="231" name="Greater White-fronted Goose">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="232" name="Purple Martin">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="233" name="Wood Duck">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="234" name="Red-shouldered Hawk">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="235" name="Mountain Bluebird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="236" name="Ruby-crowned Kinglet">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="237" name="Black-headed Heron">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="238" name="Hooded Vulture">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="239" name="Swallow-tailed Kite">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="240" name="Paradise Tanager">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="241" name="Long-tailed Sylph">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="242" name="Black-backed Grosbeak">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="243" name="Great Horned Owl">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="244" name="Hoopoe Malachite">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="245" name="Sunbird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="246" name="Scarlet Macaw">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="247" name="Orange Winged Parrot">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="248" name="Woodpecker">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="249" name="Belted Kingfisher">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="250" name="Hooded Oriole">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="251" name="Western Meadowlark">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="252" name="Hummingbird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="253" name="White-Throate Swift">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="254" name="Northern Pygmy Owl">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="255" name="Yellow Billed Cuckoo">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="256" name="Sandpiper">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="257" name="Mockingbird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="258" name="Zamboanga Bulbul">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="259" name="Wilson's Bird-of-paradise">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="260" name="Yemen Thrush">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="261" name="Wrinkled Hornbill">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="262" name="Yellowish Imperial Pigeon">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="263" name="Northern Spotted Owl">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="264" name="Yellow-throated Hanging-parrot">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="265" name="Wood Stork">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="266" name="Yellow-shouldered Blackbird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="267" name="prairie Chicken">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="268" name="Lilian's Lovebird">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="269" name="Yellow-legged Pigeon">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="270" name="White-winged Collared Dove">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="271" name="Yellow-eyed Starling">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="272" name="Western Spotted Owl">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="273" name="Marbeled Murrelet">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="274" name="Yellow-crowned Parakeet">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="275" name="Kekapo">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="276" name="Yellow-crested Cockatoo">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="277" name="Hawaiian Goose">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="278" name="White-winged Wood Duck">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="279" name="Purple Eagle">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="280" name="Brown-winged Kingfisher">
		<type pet="0" mount="0">forest bird</type>
		<description>Empty</description>
	</item>
	<item number="281" name="Bukhts">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="282" name="Mule">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="283" name="Dulmen">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="284" name="Connemara">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="285" name="Giehe">
		<type pet="0" mount="1">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="286" name="Trokk">
		<type pet="0" mount="1">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="287" name="Derva">
		<type pet="0" mount="1">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="288" name="Ocelot">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="289" name="Lion">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="290" name="Addax Antelope">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="291" name="Arabian Horse">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="292" name="Bat">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="293" name="Bighorn Sheep">
		<type pet="0" mount="0">desert animal, mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="294" name="Bilby">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="295" name="Cape Hare">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="296" name="Chuckwallas">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="297" name="Civet">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="298" name="Collared Peccary">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="299" name="Desert Elephant">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="300" name="Desert Iguana">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="301" name="Desert Tortoise">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="302" name="Dingo">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="303" name="Donkey">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="304" name="Dromedary">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="305" name="Fennec Fox">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="306" name="Flamingo">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="307" name="Gila Monster">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="308" name="Hyena">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="309" name="Jerboa">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="310" name="Lizard">
		<type pet="0" mount="0">desert animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="311" name="Marsupial Mole">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="312" name="Meerkat">
		<type pet="0" mount="0">desert animal, forest animal</type>
		<description>Empty</description>
	</item>
	<item number="313" name="Nine-banded Armadillo">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="314" name="Onager">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="315" name="Oryx">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="316" name="Pack Rat">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="317" name="Penguin">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="318" name="Peruvian Fox">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="319" name="Phrynosoma Platyrhinos">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="320" name="Pocket Mouse">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="321" name="Polar Bear">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="322" name="Quokka">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="323" name="Rattlesnakes">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="324" name="Roadrunner">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="325" name="Sand Cobra">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="326" name="Sandgrouse">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="327" name="Scorpion">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="328" name="Serval">
		<type pet="0" mount="0">desert animal, forest animal</type>
		<description>Empty</description>
	</item>
	<item number="329" name="Sidewinder">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="330" name="Tarantula">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="331" name="Veiled Chameleon">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="332" name="White-tailed Deer">
		<type pet="0" mount="0">desert animal</type>
		<description>Empty</description>
	</item>
	<item number="333" name="Nubian Vulture">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="334" name="Griffin Vulture">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="335" name="Jackal Buzzard">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="336" name="Bald Eagle">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="337" name="Egyptian Vulture">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="338" name="Fan-tailed Raven">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="339" name="Lappet-faced Vulture">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="340" name="Great Indian Bustard">
		<type pet="0" mount="0">desert bird</type>
		<description>Empty</description>
	</item>
	<item number="341" name="Caspian Tiger">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="342" name="Leopard">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="343" name="Lion">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="344" name="Aardvark">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="345" name="Alligator">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="346" name="Armadillo">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="347" name="Baboon">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="348" name="Bear">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="349" name="Bison">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="350" name="Chimpanzee">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="351" name="Coyote">
		<type pet="0" mount="0">jungle animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="352" name="Crocodile">
		<type pet="0" mount="0">jungle animal, forest animal</type>
		<description>Empty</description>
	</item>
	<item number="353" name="Deer">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="354" name="Giraffe">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="355" name="Hippopotamus">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="356" name="Koala Bear">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="357" name="Lynx">
		<type pet="0" mount="0">jungle animal, forest animal, mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="358" name="Monkey">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="359" name="Red Panda">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="360" name="Rhinoceros">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="361" name="Skunk">
		<type pet="0" mount="0">desert animal, forest animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="362" name="Snake">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="363" name="Turtle">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="364" name="Wild Dog">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="365" name="Wolf">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="366" name="Zebra">
		<type pet="0" mount="0">jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="367" name="Falcon">
		<type pet="0" mount="0">jungle bird</type>
		<description>Empty</description>
	</item>
	<item number="368" name="English Mastiff">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="369" name="Cougar">
		<type pet="0" mount="0">mountain animal, jungle animal</type>
		<description>Empty</description>
	</item>
	<item number="370" name="Bobcat">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="371" name="Andean Mountain Cat">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="372" name="Chinchilla">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="373" name="Ibex">
		<type pet="0" mount="0">mountain animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="374" name="Llama">
		<type pet="0" mount="0">mountain animal, desert animal</type>
		<description>Empty</description>
	</item>
	<item number="375" name="Mountain Goat">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="376" name="Mountain Kingsnake">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="377" name="Mountain Lion">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="378" name="Panda">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="379" name="Pike">
		<type pet="0" mount="0">mountain animal</type>
		<description>Fish</description>
	</item>
	<item number="380" name="Puma">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="381" name="Yak">
		<type pet="0" mount="0">mountain animal</type>
		<description>Empty</description>
	</item>
	<item number="382" name="Swamp Harrier">
		<type pet="0" mount="0">forest bird, mountain bird</type>
		<description>Empty</description>
	</item>
</itemlist>
*/
	