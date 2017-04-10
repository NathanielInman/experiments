###
	Map Generator written by Nathaniel Inman in Coffeescript
	06/23/2014
	
	drawLength - specifies the maximum cooridors length on builder walk
	drawTypes:
	  0 - Both are allowed, but cut wide for cardinal
	  1 - Both are allowed
	  2 - Diagonal only, but cut wide to allow cardinal move
	  3 - Diagonal only
	  4 - Cardinal only
###
#Put the Map Generator class in the window scope (root)
root = exports ? this
#Begin building the class
class root.MapGenerator
	rows: 50 #total number of rows
	columns: 50 #total number of columns
	sizing: v #this is the {w:#,h:} viewport size (imported from header)
	map:[]
	iter:0
	spawned:0
	moveDirection:0
	allocatedBlocks:0
	root:
		x:25
		y:25
	stopped:5 #corridor length maximum to walk with the builder
	stepped:0 #how long we've walked this iteration
	drawType:0
	
	setFloor: (x,y) ->
		if x<0 or y<0 or x>=@rows or y>=@columns then return 0
		@map[x][y].type=1
		@allocatedBlocks++
		
	setWall: (x,y) ->
		if x<0 or y<0 or x>=@rows or y>=@columns then return 0
		@map[x][y].type=2
		@allocatedBlocks++
	
	isFloor: (x,y) ->
		if x<0 or y <0 or x>=@rows or y>=@columns
			return 0
		if @map[x][y].type==1
			return 1
		else
			return 0
		
	#Produce the constructor for the class
	constructor: ->
		@createMap()
		@diffusionLimitedAggregation()
		@surroundMap()
		@drawMap()
		
	# Create Map Array
	createMap: ->
		@map=[]
		for row in [0...@rows]
			@map[row]=[]
			for col in [0...@columns]
				cell=@createCell row,col
				@map[row][col]=cell
				
	# Cell generation
	createCell: (row,col) ->
		row:row
		col:col
		type:0
		occupied:0
		
	# Drawing map
	drawMap: ->
		for row in [0...@rows]
			for col in [0...@columns]
				@drawCell @map[row][col]
				
	# Drawing cell
	drawCell: (cell) ->
		x= @sizing.w/@rows*cell.col
		y= @sizing.h/@columns*cell.row
		if cell.type == 1
			ctx.fillStyle = 'rgb(130,80,20)'
		else if cell.type == 2
			ctx.fillStyle = 'rgb(200,200,200)'
		else
			ctx.fillStyle = 'rgb(0,0,0)'
		if cell.occupied
			ctx.fillStyle = '#F00'
		ctx.fillRect x,y,@sizing.w/@rows+1,@sizing.h/@columns+1
		
	# Diffusion Limited Aggregation
	diffusionLimitedAggregation: ->
		while @allocatedBlocks<(@root.x*@root.y)/2
			if not @spawned
				if @allocatedBlocks==0 #First sector is the very center
					cx=@root.x
					cy=@root.y
					@setFloor(cx,cy)
				else #Spawn at random position
					cx=r(1,@rows,false)
					cy=r(1,@columns,false)
				if not @drawType or @drawType==1
					@moveDirection=r(0,8,false)
				else if @drawType<4
					@moveDirection=r(4,8,false)
				else
					@moveDirection=r(0,4,false)
				@stepped=0
				@spawned=1
			else #builder already spawned and knows its direction, move the builder
				if @moveDirection==0 and cy>0 # NORTH
					cy--
					@stepped++
				else if @moveDirection==1 and cx<@rows #EAST
					cx++
					@stepped++
				else if @moveDirection==2 and cy<@columns #SOUTH
					cy++
					@stepped++
				else if @moveDirection==3 and cx>0 #WEST
					cx++
					@stepped++
				else if @moveDirection==4 and cx<@rows and cy>0 #NORTHEAST
					cy--
					cx++
					@stepped++
				else if @moveDirection==5 and cx<@rows and cy<@columns #SOUTHEAST
					cy++
					cx++
					@stepped++
				else if @moveDirection==6 and cx>0 and cy<@columns #SOUTHWEST
					cy++
					cx--
					@stepped++
				else if @moveDirection==7 and cx>0 and cy>0 #NORTHWEST
					cy--
					cx--
					@stepped++
				if cx<@rows-1 and cy<@columns-1 and cx>1 and cy>1 and @stepped<=@stopped
					if @isFloor(cx+1,cy) and not @isFloor(cx,cy) #EAST
						@setFloor(cx,cy)
					else if @isFloor(cx-1,cy) and not @isFloor(cx,cy) #WEST
						@setFloor(cx,cy)
					else if @isFloor(cx,cy+1) and not @isFloor(cx,cy) #NORTH
						@setFloor(cx,cy)
					else if @isFloor(cx,cy-1) and not @isFloor(cx,cy) #SOUTH
						@setFloor(cx,cy)
					else if @isFloor(cx+1,cy-1) and not @isFloor(cx,cy) #NORTHWEST
						@setFloor(cx,cy)
						if not @drawType%2 then @setFloor(cx+1,cy)
					else if @isFloor(cx+1,cy+1) and not @isFloor(cx,cy) #NORTHEAST
						@setFloor(cx,cy)
						if not @drawType%2 then @setFloor(cx+1,cy)
					else if @isFloor(cx-1,cy-1) and not @isFloor(cx,cy) #SOUTHEAST
						@setFloor(cx,cy)
						if not @drawType%2 then @setFloor(cx-1,cy)
					else if @isFloor(cx-1,cy+1) and not @isFloor(cx,cy) #SOUTHWEST
						@setFloor(cx,cy)
						if not @drawType%2 then @setFloor(cx-1,cy)
					else
						@spawned=0
				else
					@spawned=0
	
	#Surround the map with visible walls
	surroundMap: ->
		for row in [0...@rows]
			for col in [0...@columns]
				if @isFloor(row,col)
					if not @isFloor(row-1,col  ) then @setWall(row-1,col  )
					if not @isFloor(row+1,col  ) then @setWall(row+1,col  )
					if not @isFloor(row  ,col-1) then @setWall(row  ,col-1)
					if not @isFloor(row  ,col+1) then @setWall(row  ,col+1)
					if not @isFloor(row-1,col-1) then @setWall(row-1,col-1)
					if not @isFloor(row+1,col-1) then @setWall(row+1,col-1)
					if not @isFloor(row-1,col+1) then @setWall(row-1,col+1)
					if not @isFloor(row+1,col+1) then @setWall(row+1,col+1)
			