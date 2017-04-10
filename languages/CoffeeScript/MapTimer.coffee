###
	Map Timer written by Nathaniel Inman in Coffeescript
	06/24/2014
###
#Put the Map Generator class in the window scope (root)
root = exports ? this
#Initialize the Map Timer class
class root.MapTimer
	map:0 #holds map reference
	mob:0 #holds mobile reference
	isFloor:0 #holds isFloor reference function
	
	#Produce the constructor for the class
	constructor: ->
		@map=root.map.map
		@isFloor=root.map.isFloor
		@mob=root.mobiles.mob
		setTimeout("window.timer.moveMobiles()",100)

	moveMobiles: ->
		for cur in @mob
			direction=r(0,4,false)
			if direction==0 and @isFloor(cur.x-1,cur.y) #west
				@map[cur.x][cur.y].occupied=0 #clear last position
				@map[cur.x-1][cur.y].occupied=cur.id #update to new position on map
				cur.x-- #update the actual mobs position to reflect the maps
			else if direction==1 and @isFloor(cur.x,cur.y-1) #north
				@map[cur.x][cur.y].occupied=0 #clear last position
				@map[cur.x][cur.y-1].occupied=cur.id #update to new position on map
				cur.y-- #update the actual mobs position to reflect the maps
			else if direction==2 and @isFloor(cur.x+1,cur.y) #east
				@map[cur.x][cur.y].occupied=0 #clear last position
				@map[cur.x+1][cur.y].occupied=cur.id #update to new position on map
				cur.x++ #update the actual mobs position to reflect the maps
			else if direction==3 and @isFloor(cur.x,cur.y+1) #south
				@map[cur.x][cur.y].occupied=0 #clear last position
				@map[cur.x][cur.y+1].occupied=cur.id #update to new position on map
				cur.y++ #update the actual mobs position to reflect the maps
		root.map.drawMap()
		setTimeout("window.timer.moveMobiles()",100)