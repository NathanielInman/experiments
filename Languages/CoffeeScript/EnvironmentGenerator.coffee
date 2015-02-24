###
	Environment Generator was written by Nathaniel Inman in Coffeescript
	06/26/2014

	Environment type list was created in XML on 02/25/11
	Environment type list was converted to JSON on 05/05/14
	Environment type list was translated to CoffeeScript on 06/26/14
	
	The list was extended for implementation in Exploring The Bleak :Online
	on 11-16-2012 and then re-extended for Exploring The Bleak on 04-16-2013.
	The list is used in Plains of Sedia :Origins Developed by
	Nathaniel Inman of The Other Experiment Studio found @ www.theoestudio.com
	All contents within are licensed under GPLv3 
###

#Put the Map Generator class in the window scope (root)
root = exports ? this
#Initialize the Map Mobiles class
class root.environmentGenerator
	environmentlist:
		name:"Environment List"
		environment:[
			name:'Player'
			number:101
			color:'#999999'
			obstructions:'Nothing'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:1
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:3
			weatherrestrictions:['0']
			magicmodifier:
				type:'Earth'
				amount:1
			description:"This sector indicates the sector that the player currently occupies. The reason it's number is 101 is because 0-99 marks environments and it is outside of the scope."
		,
			name:'Nothing'
			number:100
			color:'#000000'
			obstructions:'Nothing'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:3
			weatherrestrictions:['0']
			magicmodifier:
				type:'Earth'
				amount:1
			description:"This sector marks a sector that nothing currently exists on. The reason it's number is 100 is because 0-99 marks environments and it is outside of the scope."
		,
			name:'Mountain'
			number:1
			color:'#505050'
			obstructions:'Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','20','21']
			magicmodifier:
				type:'Earth'
				amount:1.03
			creatures:'Mountain Animal, Mountain Bird'
			description:"A large elevated summit of rock rises abruptly from the earth. Few trees or vegetation surround the area. It seems to be characterized greatly by its remoteness and inaccessibility. The only sounds appear to be the billowing of wind and the occassional falling rock or chirping bird. The air is thin and sparse making it difficult to breathe."
		,
			name:'Canyon'
			number:2
			color:'#505023'
			obstructions:'Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','17','20']
			magicmodifier:
				type:'Earth'
				amount:1.02
			creatures:'Mountain Animal, Mountain Bird'
			description:"A deep gorge into the earth where an ancient river once flowed holds little to no trees or vegetation."
		,
			name:'Anchihaline Cave'
			number:3
			color:'#1E1E10'
			obstructions:'Rock'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20','21']
			magicmodifier:
				type:'Earth'
				amount:1.03
			description:"A dark cave containing fresh and slightly saline water, likely near the coast. The atmosphere seems dense from humidity, blanketing sound that would otherwise echo loudly."
		,
			name:'Talus Cave'
			number:4
			color:'#051919'
			obstructions:'Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:1
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0']
			magicmodifier:
				type:'Earth'
				amount:1.01
			description:"A semi-dark cave formed from openings between rocks that have fallen."
		,
			name:'Fracture Cave'
			number:5
			color:'#1B0D1B'
			obstructions:'Rock'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20','21']
			magicmodifier:
				type:'Earth'
				amount:1.03
			description:"A dark sub-earthen cave consisting of fractured block rocks, with heavy mineraled water. The humid and warm cave carries a slight stench of something foreign."
		,
			name:'Glacier Cave'
			number:6
			color:'#013232'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0','20','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			description:"An almost glowing blue cave of ice whisps a nearly tangible mist as something warm beneath that eats at the glacier."
		,
			name:'Erosional Cave'
			number:7
			color:'#300F30'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20','21']
			magicmodifier:
				type:'Earth'
				amount:1.03
			description:"A dark and musty cave riddled with potholes and standing water with indeterminable sounds from afar, hopefly just water droplets making strange sounds by echoing off the rock walls."
		,
			name:'Sea Cave'
			number:8
			color:'#141348'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			description:"The dark cave sits near the ocean, and beneath a cliff. The strong smell of salt carries other foreign smells with it, some decipherable as fish or carrion, others hard to describe. The cave doesn't echo as much as one might think as sounds are dampened by the tide that slowly ripples inward."
		,
			name:'Primary Cave'
			number:9
			color:'#0B0B0B'
			obstructions:'Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:5
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Earth'
				amount:1.03
			description:"The dark and smelly cave seems to have been formed by ancient lava flows that still carry the stench of ash, methane, and burning rock. Echoes are almost painful to the ears and the pressure of the depth constantly pushes in on the head and dissorients the senses."
		,
			name:'Cavern'
			number:10
			color:'#311919'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:1
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:1
				tharsis:0
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Earth'
				amount:1.02
			description:"An extremely dark and large chamber in a cave gives way in locations to stalagmites and stalagtites, minerals the make spikes both upwards and downwards from the dripping solution of pitch, sand, sinter, or amberat that flows from the caverns ceiling."
		,
			name:'Surface Mine'
			number:11
			color:'#31184A'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:3
			weatherrestrictions:['1','2','3','4','5','10','11','17','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			description:"A huge step-layered hole in the ground where mining has taken place."
		,
			name:'Sub-surface Mine'
			number:12
			color:'#322564'
			obstructions:'Floor'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Earth'
				amount:1.02
			description:"A mine crafted by the hands of sentient beings, riddled with shafts and tunnels to reach buried ore, mineral, or gem deposits. The waste rock fills buckets that were at one time carried out and dumped above ground."
		,
			name:'Graveyard'
			number:13
			color:'#4B3232'
			obstructions:'Wall, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','10','11','17','21']
			magicmodifier:
				type:'Spirit'
				amount:1.05
			creatures:'Desert Bird'
			description:"A burial ground made for poor-class citizens and wanderers. rotting boards mark burial sites with the occasional stone."
		,
			name:'Cemetary'
			number:14
			color:'#4A1A1A'
			obstructions:'Wall'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:1
				dumasque:1
				esthar:1
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','10','11','17','21']
			magicmodifier:
				type:'Spirit'
				amount:1.05
			description:"A burial ground made for middle-class citizens. Graves are marked with tombstones or pillars of sometimes quite elaborate design. The area is fenced off with the occasional tree."
		,
			name:'Crypt'
			number:15
			color:'#643333'
			obstructions:'Wall'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:1
				dumasque:1
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Spirit'
				amount:1.03
			description:"A burial vault beneath ground made for upper-class, famous, or political citizens. Almost synonymous with a tomb, the dead are buried in niches within the walls with golden or gemed trinkets lying nearby to honor their memory. The air is heavy and carries with it the slight stench of death and earth."
		,
			name:'Mausoleum'
			number:16
			color:'#644B4B'
			obstructions:'Wall'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Spirit'
				amount:1.04
			description:"A single building a little large and quite stately housing tombs of only the richest and at one time most powerful. The stench of death is strong with the faint hint of ichor and spices."
		,
			name:'Catacomb'
			number:17
			color:'#7D4C4B'
			obstructions:'Wall'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:1
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Spirit'
				amount:1.03
			description:"Human-made passageways under cities for dead burial and worship."
		,
			name:'Ossuary'
			number:18
			color:'#974C4C'
			obstructions:'Wall'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['0','20','21']
			magicmodifier:
				type:'Spirit'
				amount:1.06
			description:"Underground cove for skeletal remains."
		,
			name:'Charnel House'
			number:19
			color:'#4F1A1A'
			obstructions:'Wall'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['0','20']
			magicmodifier:
				type:'Spirit'
				amount:1.02
			description:"Building made for skeletal remains."
		,
			name:'Arctic Tundra'
			number:20
			color:'#4B4B97'
			obstructions:'Rock, Floor, Tree'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:"Mountain Bird, Mountain Animal"
		,
			name:'Antarctic Tundra'
			number:21
			color:'#403B97'
			obstructions:'Rock, Floor'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Few trees."
		,
			name:'Alpine Tundra'
			number:22
			color:'#194B96'
			obstructions:'Tree, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Barren."
		,
			name:'Fellfield Tundra'
			number:23
			color:'#646496'
			obstructions:'Shrub, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Treeless with little vegetation."
		,
			name:'Park Tundra'
			number:24
			color:'#009696'
			obstructions:'Tree, Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:1
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Treeless with lots of vegetation."
		,
			name:'Closed Forest Taiga'
			number:25
			color:'#00967D'
			obstructions:'Tree, Shrub, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of coniferous trees like larch spruce fire and pine."
		,
			name:'Lichen Woodland Taiga'
			number:26
			color:'#183219'
			obstructions:'Tree, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Few coniferous trees like larch spruce fir and pine."
		,
			name:'Boreal Forest'
			number:27
			color:'#204B24'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of coniferous trees like larch spruce fire and pine."
		,
			name:'Montane Grassland'
			number:28
			color:'#339646'
			obstructions:'Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"No trees heavy weed-like vegetation."
		,
			name:'Montane Shrubland'
			number:29
			color:'#5B9740'
			obstructions:'Shrub, Flora, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"No trees all other vegetation."
		,
			name:'Carpathian Forest'
			number:30
			color:'#649664'
			obstructions:'Tree, Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Carpathian's with few shrubs and other vegetation."
		,
			name:'Giant Sequoia Forest'
			number:31
			color:'#114B25'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Giant Sequoia's with few shrubs and other vegetation."
		,
			name:'Coastal Redwood Forest'
			number:32
			color:'#973232'
			obstructions:'Tree, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Coastal Redwood's with few shrubs and other vegetation."
		,
			name:'Douglas-fir Forest'
			number:33
			color:'#96964A'
			obstructions:'Tree'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Douglas-fir's with few shrubs and other vegetation."
		,
			name:'Sitka Spruce Forest'
			number:34
			color:'#7D7D4B'
			obstructions:'Tree, Flora, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Sitka Spruce's with few shrubs and other vegetation."
		,
			name:'Alerce Forest'
			number:35
			color:'#646451'
			obstructions:'Tree'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Alerce's with few shrubs and other vegetation."
		,
			name:'Kauri Forest'
			number:36
			color:'#7D647D'
			obstructions:'Tree, Rock, Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Lots of Kauri's with few shrubs and other vegetation."
		,
			name:'Tropical Forest'
			number:37
			color:'#649696'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Humid"
		,
			name:'Subtropical Forest'
			number:38
			color:'#327E7D'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Very humid"
		,
			name:'Temperate Forest'
			number:39
			color:'#4B964B'
			obstructions:'Tree, Shrub, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Humid"
		,
			name:'Mediterranean Forest'
			number:40
			color:'#204B24'
			obstructions:'Tree, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:1
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:1
			temperature:5
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Humid"
		,
			name:'Mediterranean Woodland'
			number:41
			color:'#183219'
			obstructions:'Tree, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Less trees"
		,
			name:'Mediterranean Savanna'
			number:42
			color:'#0A9647'
			obstructions:'Rock, Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:"Very few trees"
		,
			name:'Mediterranean Shrubland'
			number:43
			color:'#0FAF4B'
			obstructions:'Shrub, Flora'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1,2,3,5']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:"No trees plenty of shrubbery. Very dry."
		,
			name:'Mediterranean Grassland'
			number:44
			color:'#97AF96'
			obstructions:'Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2','3','5']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:"No trees or shrubbery but plenty of grass. Very dry."
		,
			name:'Tropical Broadleaf Forest'
			number:45
			color:'#96AF7D'
			obstructions:'Tree, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:"Very humid."
		,
			name:'Subtropical Broadleaf Forest'
			number:46
			color:'#96AE4A'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:'Very humid.'
		,
			name:'Bayou'
			number:47
			color:'#323264'
			obstructions:'Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Desert Bird, Desert Animal'
			description:"Marshy slow-moving stream or river that's thick with trees."
		,
			name:'Wetland Fen'
			number:48
			color:'#343693'
			obstructions:'Tree, Water, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15']
			magicmodifier:
				type:'Water'
				amount:1.01
			creatures:'Desert Bird, Desert Animal'
			description:"Tall thick grass with marsh-like soil and standing water."
		,
			name:'Valley Bog'
			number:49
			color:'#181831'
			obstructions:'Tree, Flora, Rock, Water'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:5
			weatherrestrictions:['2','4','5','10','11','15']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Bird'
			description:"Valley of peat moss few trees."
		,
			name:'Raised Bog'
			number:50
			color:'#19324B'
			obstructions:'Water, Tree, Rock'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:5
			weatherrestrictions:['2','4','5','10','11','15']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Bird'
			description:"Raised dome of peat moss covered water with thick trees surrounding."
		,
			name:'Blanket Bog'
			number:51
			color:'#32324B'
			obstructions:'Water, Tree, Flora'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['2','4','5','6','7','8','9','10','11','12','13','14','15','21']
			magicmodifier:
				type:'Water'
				amount:1.03
			creatures:'Forest Bird'
			description:"Few trees with icy sludge and swamp-like."
		,
			name:'Freshwater Swamp Forest'
			number:52
			color:'#323264'
			obstructions:'Water, Tree'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird'
			description:"Very humid"
		,
			name:'Peat Swamp Forest'
			number:53
			color:'#4B324B'
			obstructions:'Water, Tree'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:5
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird'
			description:"Very humid"
		,
			name:'Dambo Swamp'
			number:54
			color:'#4B194B'
			obstructions:'Tree, Water, Flora'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird'
			description:"Few tall trees with tons of inter-connecting streams."
		,
			name:'Mangrove Swamp'
			number:55
			color:'#4B3219'
			obstructions:'Water, Shrub, Rock'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:5
			weatherrestrictions:['1','2','3','4','5','10','11','15','20']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird'
			description:"Very humid with thick tall trees with above ground roots."
		,
			name:'Bosque'
			number:56
			color:'#4B3232'
			obstructions:'Water, Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird'
			description:"Dry thin woodland area around a river."
		,
			name:'Riparian Forest'
			number:57
			color:'#1C9647'
			obstructions:'Tree, Water, Rock, Flora, Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"Humid thick woodland area around a river."
		,
			name:'Bolster Heathland'
			number:58
			color:'#1CAF4B'
			obstructions:'Shrub, Flora'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:3
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Cushion plants only which are low-growing fungai."
		,
			name:'Chalk Heathland'
			number:59
			color:'#63AF45'
			obstructions:'Shrub, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:3
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:'Thick grass and flowers only.'
		,
			name:'Chaparral Heathland'
			number:60
			color:'#AFC84A'
			obstructions:'Flora, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird, Mountain Animal'
			description:"Thick shrubs only that's Mountain-like."
		,
			name:'Fynbos'
			number:61
			color:'#6BC17C'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:'Rough shrubs only.'
		,
			name:'Garrigue Hills'
			number:62
			color:'#96C864'
			obstructions:'Floor, Rock, Water'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:1
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Soft shrubs only."
		,
			name:'Moorland'
			number:63
			color:'#32AEC7'
			obstructions:'Water, Shrub, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:3
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Thick grass and flowers that's hill-like."
		,
			name:'Shrubland'
			number:64
			color:'#63AF45'
			obstructions:'Shrub, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:3
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Thick low grass and shrubs that's plain-like."
		,
			name:'Maquis Shrubland'
			number:65
			color:'#96AFC8'
			obstructions:'Shrub'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:1
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Thick grass flowers and shrubs all hill-like."
		,
			name:'Coastal Plain'
			number:66
			color:'#3DB54A'
			obstructions:'Shrub, Flora, Water, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','18','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Flat low grassland near the coast."
		,
			name:'Highland Plateau'
			number:67
			color:'#6CBF65'
			obstructions:'Floor, Flora, Rock, Water, Rock, Shrub'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"Little grass with dry shrubs."
		,
			name:'Prairie'
			number:68
			color:'#54B848'
			obstructions:'Rock, Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Mountain Bird'
			description:"A large open area of thick grass and flowers with flat land."
		,
			name:'Water Meadow'
			number:69
			color:'#60C3B8'
			obstructions:'Water, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Bird, Forest Animal'
			description:"A large open area of thick low grass and standing water rows. There are occasionally jutting rocks or sickly trees sprouting from the ground."
		,
			name:'Veldt'
			number:70
			color:'#6CC6B0'
			obstructions:'Water, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:1
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"A large uncultivated country of grassland with little to no humidity and little low grass on flat land, cultured with large rocks jutting from teh earth."
		,
			name:'Machair'
			number:71
			color:'#64AEC7'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Forest Bird, Forest Animal'
			description:"An extremely fertile low-lying grass plain near water with the occasional flowers or hill."
		,
			name:'Cerrado Savanna'
			number:72
			color:'#67C5AD'
			obstructions:'Tree, Floor'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['11','2','3','4','5','6','7','8','9','10','11','12','13','14','15','17','21']
			magicmodifier:
				type:'Earth'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"Subtropical grass and shrubland, with thick prouting grass pushing into few small trees on hilly land."
		,
			name:'Xeric Shrubland'
			number:73
			color:'#AFC864'
			obstructions:'Shrub, Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"An extremely dry area filled with sharp rocks and few shrubs atop a broken ground with cactai for the closest thing to a tree."
		,
			name:'Cactus Shrubland'
			number:74
			color:'#AFC896'
			obstructions:'Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"A very dry area with few cactus atop a broken ground that forms around large hills."
		,
			name:'Hamada Desert'
			number:75
			color:'#C6D92C'
			obstructions:'Rock, Floor, Flora'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"A very dry landscape constisting primarily of barren and hard rocky plateaus with little sand. There is no vegetation."
		,
			name:'Regs Desert'
			number:76
			color:'#C8C831'
			obstructions:'Flora, Rock'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"A very dry landscape with a mixture of sand and gravel for earth, large rocks with the occasional plateau. Loose stones sit atop the ground, but very little vegetation survives here."
		,
			name:'Ergs Desert'
			number:77
			color:'#C8C84A'
			obstructions:'Water, Flora, Shrub'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"A very dry landscape with no vegetation, just an extensive accumulation of sand to the affect of what appears to be sandy seas."
		,
			name:'Sagebrush Steppe'
			number:78
			color:'#C8C896'
			obstructions:'Rock, Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Animal, Desert Bird'
			description:"This very dry landscape is consumed by sagebrush. There are few hills, as the land is mostly flat. The wind makes whistling and whirring sounds against all the brush and stirs up broken thistles that float from place to place."
		,
			name:'Badlands'
			number:79
			color:'#AFC836'
			obstructions:'Flora'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:1
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:5
			weatherrestrictions:['1','2']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Bird'
			description:"Very dry with little cactus and broken clay-rich soil."
		,
			name:'Fissure Vent'
			number:80
			color:'#961A1D'
			obstructions:'Floor, Lava'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:6
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Fire'
				amount:1.05	
			description:"Very dry vent where lava emerges. Is active."
		,
			name:'Shield Volcano'
			number:81
			color:'#C72026'
			obstructions:'Floor, Lava'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:6
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Fire'
				amount:1.04
			creatures:'Desert Bird'
			description:"Hill-like volcanoe that isn't active."
		,
			name:'Lava Dome'
			number:82
			color:'#E09726'
			obstructions:'Lava, Floor, Rock'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:6
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Fire'
				amount:1.03
			creatures:'Desert Bird'
			description:"Very tall Mountain-like structure that's always active."
		,
			name:'Cryptodome'
			number:83
			color:'#ED6464'
			obstructions:'Floor'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:6
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Fire'
				amount:1.01
			creatures:'Desert Bird'
			description:"Very tall Mountain-like structure that's never active"
		,
			name:'Mud Volcano'
			number:84
			color:'#F59596'
			obstructions:'Water, Floor, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:6
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Fire'
				amount:1.02
			creatures:'Desert Bird'
			description:"Circular mud shape that erupts streams of water."
		,
			name:'Hot Spring Geyser'
			number:85
			color:'#974F9F'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:4
			weatherrestrictions:['1','2','19']
			magicmodifier:
				type:'Air'
				amount:1.02
			creatures:'Desert Animals'
			description:"A mostly barren dry clay and dirt surrounds pools of foaming water that steam, and occasionally burst forth geysers into the air. The entire area is extremely humid and stinks of sulfur."
		,
			name:'Hot Spring'
			number:86
			color:'#6066AF'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:0
				amari:0
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:1
			temperature:4
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','20','21']
			magicmodifier:
				type:'Water'
				amount:1.01
			creatures:'Forest Animals'
			description:"A spring of naturally hot water, heated most likely by subterranean volcanic activity. The steam given off floats into the air, contained by the trees and rocks surrounding the area. It smells of fresh soil and pine."
		,
			name:'Pond'
			number:87
			color:'#6465AE'
			obstructions:'Water, Rock, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:1
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','20','21']
			magicmodifier:
				type:'Water'
				amount:1.01
			creatures:'Forest Animals'
			description:"A small body of still water is embanked here by rocks and growth. There is a small encovering of lilly pads and moss with groups of cat tails occasionally littering the edges of water."
		,
			name:'Rocky Shoreline'
			number:88
			color:'#E1E195'
			obstructions:'Rock, Floor, Flora'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"Large rocks litter the ground all the way up to the crashing waves of water, foaming up upon the breach and pushing mist outwards. The entire area is humid and birds squawl loudly in the sky as they search for food."
		,
			name:'Mudflat Shoreline'
			number:89
			color:'#646432'
			obstructions:'Floor, Water'
			spawnableprovinces:
				moria:1
				amari:0
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"Also known as tidal flats, the shoreline is a coastal wetland formed by mud being deposited from the tide. Rocks and wirey bush growth form further out from the tide, crawled by birds and small animals feeding on insects."
		,
			name:'Shingle Beach'
			number:90
			color:'#959737'
			obstructions:'Floor, Rock, Water'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"An pebbled beach splays out from the tide line. The pebbles range from 1 to 2 stones in size and cause the water to make a crashing sound as it pushes upon them."
		,
			name:'Sandy Beach'
			number:91
			color:'#C7C72E'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:1
				narsis:0
				tharsis:1
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"A humid sandy beach is encroached upon by a sliding tide of water. The wet sand is left alone as the tide pulls back. Tiny shells and other sea mysterium lay about scattered by the water. The smell of salt mixes with the hint of fresh blossoms the are carried in by the breeze."
		,
			name:'Shoal'
			number:92
			color:'#646565'
			obstructions:'Water'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:1
				crecia:0
				narsis:0
				tharsis:0
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"Sand walkways out onto the ocean that sometimes connect to land."
		,
			name:'Estuary'
			number:93
			color:'#646496'
			obstructions:'Water, Floor'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Birds'
			description:"Coastal body of water where one or more streams flow into it."
		,
			name:'River Delta'
			number:94
			color:'#6465AD'
			obstructions:'Floor, Water'
			spawnableprovinces:
				moria:0
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:1
				narsis:0
				tharsis:0
			temperature:2
			weatherrestrictions:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','18','20','21']
			magicmodifier:
				type:'Water'
				amount:1.02
			creatures:'Forest Animals, Forest Birds'
			description:"Muddy alluvial fan of water flowing into the ocean."
		,
			name:'Neritic Zone'
			number:95
			color:'#3D439B'
			obstructions:'Water'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0']
			magicmodifier:
				type:'Water'
				amount:1.05
			description:"Highest underwater oceanic."
		,
			name:'Kelp Forest'
			number:96
			color:'#2993D1'
			obstructions:'Tree, Water'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0']
			magicmodifier:
				type:'Water'
				amount:1.05
			description:"An underwater forest of kelp hosts eccentric fish swimming about."
		,
			name:'Coral Reef'
			number:97
			color:'#475AA8'
			obstructions:'Water, Rock'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0']
			magicmodifier:
				type:'Water'
				amount:1.05
			description:"Underwater coral reef."
		,
			name:'Hydrothermal Vent'
			number:98
			color:'#31184A'
			obstructions:'Water'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0']
			magicmodifier:
				type:'Air'
				amount:1.05
			description:"Underwater hot air vent."
		,
			name:'Benthic Zone'
			number:99
			color:'#0F102F'
			obstructions:'Floor, Water'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:0
				dumasque:0
				esthar:0
				jewall:0
				newsaellem:0
				crecia:0
				narsis:0
				tharsis:0
			temperature:1
			weatherrestrictions:['0']
			magicmodifier:
				type:'Water'
				amount:1.05
			description:"Bottom of all bodies of water that aren't oceanic."
		,
			name:'Inside'
			number:0
			color:'#4B4B4B'
			obstructions:'Water'
			spawnableprovinces:
				moria:1
				amari:1
				menusia:1
				dumasque:1
				esthar:1
				jewall:1
				newsaellem:1
				crecia:1
				narsis:1
				tharsis:1
			temperature:3
			weatherrestrictions:['0']
			magicmodifier:
				type:'Earth'
				amount:1
			description:"This sector marks the environment Inside. Inside environment is not affected by weather."
		]
	current: 0
		
	#Produce the constructor for the class
	constructor: (@totalNum) ->
		@current=r(0,@environmentlist.environment.length,false) #choose a random one to display
		@displayAssociated()
		
	displayAssociated: ->
		description=""
		fs=24 #font size
		cl=0 #current line
		ctx.fillStyle="#000"
		ctx.fillRect(0,0,v.w,v.h)
		ctx.font=fs+"px Courier new"
		ctx.textAlign="center"
		#draw title bar
		ctx.fillStyle="#333"
		ctx.fillRect(0,0,v.w,34)
		ctx.fillStyle="#FFF"
		ctx.fillText(@environmentlist.environment[@current].name,v.w/2,24)
		ctx.fillStyle="#AAA"
		ctx.fillRect(0,34,v.w,2)
		ctx.fillStyle=@environmentlist.environment[@current].color
		ctx.fillRect(0,36,v.w,v.h-36)
		ctx.fillStyle="rgba(0,0,0,0.35)"
		ctx.strokeStyle="#333"
		top=v.h/8
		left=v.w/8
		width=v.w/8*6
		height=v.h/8*6
		ctx.fillRect(left,top,width,height)
		ctx.rect(left,top,width,height)
		ctx.lineWidth=3
		ctx.stroke()
		ctx.fillStyle="#FFF"
		ctx.fillText("Obstructions : "+@environmentlist.environment[@current].obstructions,left+width/2,top+fs)
		if @environmentlist.environment[@current].creatures? then ctx.fillText("Creatures : "+@environmentlist.environment[@current].creatures,left+width/2,top+fs*2+2) else ctx.fillText("Creatures : None",left+width/2,top+fs*2+2)
		if @environmentlist.environment[@current].temperature==0
			ctx.fillText("Temperature : Extremely Cold (less than 0 degrees)",left+width/2,top+fs*3+4)
			description+="Because of it's temperature, being in this environment greater than one round when the player isn't properly clothed causes the player to become frozen. Being in the environment for longer than 5 rounds causes exhaustion regardless of being properly clothed. The player takes 25% health loss including the first round of being in this environment. If properly clothed, the player takes only 10% of their health in damage each round and forgoes becoming frozen."
		else if @environmentlist.environment[@current].temperature==1
			ctx.fillText("Temperature : Very Cold (0-29 degrees)",left+width/2,top+fs*3+4)
			description+="Because of it's temperature, being in this environment for greater than 5 rounds begins to cause 1d6 cold damage per turn. Being in the environment longer than 5 rounds causes exhaustion."
		else if @environmentlist.environment[@current].temperature==2 
			ctx.fillText("Temperature : Cold (30-67 degrees)",left+width/2,top+fs*3+4)
			description+="If not properly clothed in this environment the player will begin the lose 1d4 cold weather damage per round after 5 rounds."
		else if @environmentlist.environment[@current].temperature==3
			ctx.fillText("Temperature : Average (68-77 degrees)",left+width/2,top+fs*3+4)
		else if @environmentlist.environment[@current].temperature==4
			ctx.fillText("Temperature : Warm (78-88 degrees)",left+width/2,top+fs*3+4)
		else if @environmentlist.environment[@current].temperature==5
			ctx.fillText("Temperature : Hot (89-104 degrees)",left+width/2,top+fs*3+4)
		else if @environmentlist.environment[@current].temperature==6
			ctx.fillText("Temperature : Very Hot (105-119 degrees)",left+width/2,top+fs*3+4)
			description+="Due to the hot temperature the player loses 1d6 health per round if they are properly clothed."
		else 
			ctx.fillText("Temperature : Extremely Hot (120+ degrees)",left+width/2,top+fs*3+4)
			description+="Due to the extreme temperature the player becomes exhausted after 5 rounds. Furthermore, if time spent within the temperature is greater than one round then the character takes 25% of their total health in damage each round including the first, only taking 10% instead if they aren't properly clothed."
		weather=""
		weatherNum=0
		for num in @environmentlist.environment[@current].weatherrestrictions
			if num=='0'
				weather+=', Nothing'
			else if num=='1'
				weather+=', Cloudy'
			else if num=='2'
				weather+=', Partly Cloudy'
			else if num=='3'
				weather+=', Sunny'
			else if num=='4'
				weather+=', Mist'
			else if num=='5'
				weather+=', Drizzle'
			else if num=='6'
				weather+=', Ice Storm'
			else if num=='7'
				weather+=', Freezing Rain'
			else if num=='8'
				weather+=', Snow'
			else if num=='9'
				weather+=', Winter Storm'
			else if num=='10'
				weather+=', Rainy'
			else if num=='11'
				weather+=', Thunderstorm'
			else if num=='12'
				weather+=', Graupel'
			else if num=='13'
				weather+=', Ice Pellets'
			else if num=='14'
				weather+=', Hail'
			else if num=='15'
				weather+=', Monsoon'
			else if num=='16'
				weather+=', Blizzard'
			else if num=='17'
				weather+=', Tornado'
			else if num=='18'
				weather+=', Hurricane'
			else if num=='19'
				weather+=', Acid Rain'
			else if num=='20'
				weather+=', Haze'
			else if num=='21'
				weather+=', Fog'
			weatherNum++
			if weatherNum==6
				weatherNum=0
				weather+='\n'
		weather=weather.substring(2)
		weatherLines=weather.split('\n, ')
		cl=4
		for num in weatherLines
			if weatherLines.length+3>cl then num+=','
			if cl==4
				ctx.fillText("Weather : "+num,left+width/2,top+fs*cl+cl*2-2)
			else
				ctx.fillText(num,left+width/2,top+fs*cl+cl*2-2)
			cl++
		ctx.fillText("Magic Modifier : "+@environmentlist.environment[@current].magicmodifier.type+" by "+(@environmentlist.environment[@current].magicmodifier.amount*100)+"%",left+width/2,top+fs*cl+cl*2-2)
		cl+=2
		description=@environmentlist.environment[@current].description+description
		newDesc=description.match(/.{1,48}/g)
		for num in newDesc
			ctx.fillText(num,left+width/2,top+fs*cl+cl*2-2)
			cl++
		ctx.save()
		ctx.translate(left,top)
		ctx.rotate(Math.PI/2)
		if @environmentlist.environment[@current].spawnableprovinces.moria then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Moria",height/5-height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.amari then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Amari",height/5*2-height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.menusia then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Menusia",height/5*3-height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.dumasque then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Dumasque",height/5*4-height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.esthar then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Esthar",height/5*5-height/10,-10)
		ctx.restore()
		ctx.save()
		ctx.translate(left+width,top)
		ctx.rotate(Math.PI/2 *3)
		if @environmentlist.environment[@current].spawnableprovinces.jewall then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Jewall",-height/5+height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.newsaellem then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("New Saellem",-height/5*2+height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.crecia then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Crecia",-height/5*3+height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.narsis then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Narsis",-height/5*4+height/10,-10)
		if @environmentlist.environment[@current].spawnableprovinces.tharsis then ctx.fillStyle="#FFF" else ctx.fillStyle="#555"
		ctx.fillText("Tharsis",-height/5*5+height/10,-10)
		ctx.restore()
		@current=r(0,@environmentlist.environment.length,false) #choose a random one to display
		setTimeout("window.main.displayAssociated();",5000)

root.main = new environmentGenerator() #initialize the program
