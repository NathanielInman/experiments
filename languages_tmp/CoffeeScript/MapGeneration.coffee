###
	Map Generation written by Nathaniel Inman in Coffeescript
	06/24/2014
###
#Put the Map Generator class in the window scope (root)
root = exports ? this
#build a new MapGenerator from the window scope (root/this)
root.map=new MapGenerator()
#build a new MapMobiles from the window scope (root/this)
root.mobiles= new MapMobiles()
#build a new TimerEvent from the window scope (root/this)
root.timer=new MapTimer()
