###
	Map Mobiles written by Nathaniel Inman in Coffeescript
	06/24/2014
###
#Put the Map Generator class in the window scope (root)
root = exports ? this
#Initialize the Map Mobiles class
class root.MapMobiles
	mob: []
	total: 5

	#Produce the constructor for the class
	constructor: (@totalNum) ->
		if @totalNum? then @total=@totalNum #pass in the requested amount of mobs or use default
		if @total 
			@generate() #will call createMobile for each of the mobs
			@populate() #will position the mobiles on the map
			root.map.drawMap()
		
	# Mobile population 
	populate: ->
		for cur in [0...@total]
			while root.map.map[@mob[cur].x][@mob[cur].y].type!=1 or root.map.map[@mob[cur].x][@mob[cur].y].occupied
				@mob[cur].x=r(0,root.map.rows,false)
				@mob[cur].y=r(0,root.map.columns,false)
			root.map.map[@mob[cur].x][@mob[cur].y].occupied=cur
				
	# Mobile generation
	generate: ->
		@mob=[] #initialize the mob array
		for cur in [0...@total] #loop through and create all mobiles
			@mob[cur]=@createMobile(cur) #make sure to send the id#
			
	# Mobile Class
	createMobile: (num) ->
		x:0
		y:0
		id:num