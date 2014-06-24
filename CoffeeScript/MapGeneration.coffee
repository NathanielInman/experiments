###
	Map Generation written by Nathaniel Inman in Coffeescript
	06/23/2014
###

#Initialize the Map Generator class
class MapGenerator
	currentCellGeneration: null
	numberOfRows: 50
	numberOfColumns: 50
	canvas: $('canvas')
	drawingContext: ctx
	sizing: v
	#Produce the constructor for the class
	constructor: ->
		@populate()
		@drawMap()
		
	# Map generation 
	populate: ->
		@curCell=[]
		for row in [0...@numberOfRows]
			@curCell[row]=[]
			for col in [0...@numberOfColumns]
				cell=@createCell row,col
				@curCell[row][col]=cell
				
	# Cell generation
	createCell: (row,col) ->
		row:row
		col:col
		color:Math.floor(Math.random()*255)
		active:Math.floor(Math.random()*10)
		
	# Drawing map
	drawMap: ->
		for row in [0...@numberOfRows]
			for col in [0...@numberOfColumns]
				@drawCell @curCell[row][col]
				
	# Drawing cell
	drawCell: (cell) ->
		x= @sizing.w/@numberOfRows*cell.col
		y= @sizing.h/@numberOfColumns*cell.row
		if cell.active < 5
			fillStyle = 'rgb('+cell.color+','+cell.color+',0)';
		else
			fillStyle = 'rgb('+cell.color+',0,0)';
		@drawingContext.fillStyle=fillStyle
		@drawingContext.fillRect x,y,@sizing.w/@numberOfRows,@sizing.h/@numberOfColumns
		
new MapGenerator()

