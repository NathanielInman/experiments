(function(){
	var config = {
		numberOfObjects: 400,
		sizePowerOfTwo: 3 //this is the accuracy, gets much better the lower the number (but slower)
	};		
	var myTree = new SpatialHash(config.sizePowerOfTwo);
	var myObjects = []; // our objects will be stored here
	var createObjects = function() { //create some objects and save them in myObjects
		var i=0;
		myObjects.length = 0;
		for(;i<config.numberOfObjects;i++) {
			myObjects.push({
				id : i,
				last:null,
				x : r(10, v.w),
				y : r(10, v.h),
				width : r(10, 20),
				height : r(10, 20),
				vx: r(-1,1),
				vy: r(-1,1),
				check : false
			});
		}
	};
	var drawObjects = function( node ) {
		var i=0,obj, objects = node.retrieve(); // get all
		for(;i<objects.length;i++) {
			obj = objects[ i ];			
			if( obj.check ) {
				ctx.strokeStyle = 'rgba(255,255,255,0.9)';
			} else {
				ctx.strokeStyle = 'rgba(255,255,255,0.2)';
			} //end if
			ctx.strokeRect( obj.x, obj.y, obj.width, obj.height );
		} //end for
	};
	var main = function() {
	 	var i=0,j,returnObjects = [];
		myTree.clear();//clear the tree
		ctx.clearRect(0, 0, v.w, v.h);		
		//update myObjects and insert them into the tree again
		for(;i<myObjects.length;i++) {
			returnObjects=[];
			myObjects[i].x += myObjects[i].vx;
			myObjects[i].y += myObjects[i].vy;
			myObjects[i].check = false;
			if( myObjects[i].x > v.w ) myObjects[i].x = 0;
			if( myObjects[i].x < 0 ) myObjects[i].x = v.w;
			if( myObjects[i].y > v.h ) myObjects[i].y = 0;
			if( myObjects[i].y < 0 ) myObjects[i].y = v.h;				
			myTree.insert( myObjects[i] );
			returnObjects = myTree.retrieve({
				x:myObjects[i].x,
				y:myObjects[i].y,
				width:myObjects[i].width,
				height:myObjects[i].height
			});
			//filter out the searched object unless something else is found
			for(j=0;j<returnObjects.length;j++){
				if(returnObjects[j].id!==myObjects[i].id){ 
					(function(o1,o2){
						var hold; //holds for swapping a variable
						if(o1.idle||o2.idle)return;
						o1.check=true;o2.check=true; //highlight the objects
						if(o1.last==o2.id||o2.last==o1.id)return;
						if(o1.vx>0&&o2.vx>0||o1.vx<0&&o2.vx<0){ //diff y axis dir
							hold=o1.vy;o1.vy=o2.vy;o2.vy=hold;
						}else if(o1.vy>0&&o2.vy>0||o1.vy<0&&o2.vy<0){ //dif x axis dir
							hold=o1.vx;o1.vx=o2.vx;o2.vx=hold;
						}else{
							hold=o1.vy;o1.vy=o2.vy;o2.vy=hold;
							hold=o1.vx;o1.vx=o2.vx;o2.vx=hold;
						} //end if
						o1.last=o2.id;o2.last=o1.id;
					})(returnObjects[j],myObjects[i]);
					break;
				} //end if
			} //end for
		} //end for
		drawObjects( myTree );
		requestAnimFrame( main );
	};
	(function(){
		W.requestAnimFrame = (function () {
			return  W.requestAnimationFrame   ||
			W.webkitRequestAnimationFrame     ||
			W.mozRequestAnimationFrame        ||
			W.oRequestAnimationFrame          ||
			W.msRequestAnimationFrame         ||
			function (callback) {
				W.setTimeout(callback, 1000 / 60);
			};
		})();
		createObjects();//create objects
		main();//init first loop
		W.myTree = myTree;//make myTree available in global namespace
	})();
})();