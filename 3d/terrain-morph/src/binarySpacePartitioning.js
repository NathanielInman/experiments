// These three constants control the size of the rooms
const tinSize = 3;
const minSize = 2*tinSize;
const maxSize = 3*tinSize;

// The partition class is essentially a binary tree with tiny controller
// logic to handle partition sizes and closing of partitions that don't
// meet the size requirements. After the tree is constructed, there's a
// connect method that walks up the tree from the bottom nodes recursively
// connecting sister leaves together with hallways.
class Partition{

  // This constructor creates a partitioned map down to the smallest
  // available size. The rooms are constructed with walls. After initialization
  // the connect function is called to build out hallways.
  constructor(map,x1,x2,y1,y2,parent,type){
    this.id=parent?parent.id+type:'@';
    this._closed=false;
    this.map = map;
    this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; //ordained space
    this.x1a = x1; this.y1a = y1; this.x2a = x2; this.y2a = y2; //used space
    this.width=x2-x1;
    this.height=y2-y1;
    this.parent=parent||false;
    this.pathable=[]; //room walls that can be connected to
    this.initialize();
  }
  get opened(){ return this._closed===false; }
  get closed(){ return this._closed===true; }
  setClosed(){ this._closed=true; }

  // This creates a left and right child (left/right could be up and down) if there
  // is enough valid space to do so; otherwise, it sets the left and right child
  // as closed nodes
  initialize(){
    let x1 = this.x1, y1 = this.y1, x2 = this.x2, y2 = this.y2;

    if(this.width>=this.height){
      if(this.width>minSize*2){ //splitting horizontally
        let split = r(x1+minSize,x2-minSize,1);

        this.left = new Partition(this.map,x1,split,y1,y2,this,'L');
        this.right = new Partition(this.map,split+1,x2,y1,y2,this,'R');
      }else{ //can't split horizontally, too smalle - close nodes
        this.left = {closed:true,pathable:[]};
        this.right = {closed:true,pathable:[]};
        this.fill();
      } //end if
    }else if(this.height>minSize*2){ // splitting vertically
      let split = r(y1+minSize,y2-minSize,1);

      this.left = new Partition(this.map,x1,x2,y1,split,this,'L');
      this.right = new Partition(this.map,x1,x2,split+1,y2,this,'R');
    }else{ //can't split vertically, too small - close nodes
      this.left = {closed:true,pathable:[]};
      this.right = {closed:true,pathable:[]};
      this.fill();
    } //end if
  }

  // Fill is called when the partition can no longer be broken down into
  // smaller partitions. It fills the floor and walls if it meets the size
  // requirement. If the room is way too smal, it's emptied and set to closed
  // so we know not to conenct this location with a hallway
  fill(){
    let x1 = this.x1, y1 = this.y1, x2 = this.x2, y2 = this.y2;

    // Make sure we randomly place the room in the allocated space, not using
    // the whole space allocated or it will look entirely too generic and
    // repeated
    if(this.width>minSize){
      this.x1a=x1=r(x1,x1+tinSize,1);
      this.x2a=x2=r(x2-tinSize,x2+1,1);
    }else if(this.width>minSize/2&&r(0,2,1)===1){
      this.x1a=x1=r(x1,x1+tinSize,1);
    }else if(this.width>minSize/2){
      this.x2a=x2=r(x2-tinSize,x2+1,1);
    } //end if
    if(this.height>minSize){
      this.y1a=y1=r(y1,y1+tinSize,1);
      this.y2a=y2=r(y2-tinSize,y2+1,1);
    }else if(this.height>minSize/2&&r(0,2,1)===1){
      this.y1a=y1=r(y1,y1+tinSize,1);
    }else if(this.height>minSize/2){
      this.y2a=y2=r(y2-tinSize,y2+1,1);
    } //end if

    // Carve the floors and walls surrounding the room
    for(let i=x1-1;i<=x2;i++){
      for(let j=y1-1;j<=y2;j++){
        // Make sure we're not a corner, if we're not then save to pathable
        if(i===Math.floor(x1+(x2-x1)/2)&&j===y1-1){ //north
          this.pathable.push({x: i,y: j,direction: 'north'});
        }else if(i===Math.floor(x1+(x2-x1)/2)&&j===y2){ //south
          this.pathable.push({x: i,y: j,direction: 'south'});
        }else if(i===x1-1&&j===Math.floor(y1+(y2-y1)/2)){ //west
          this.pathable.push({x: i,y: j,direction: 'west'});
        }else if(i===x2&&j===Math.floor(y1+(y2-y1)/2)){ //east
          this.pathable.push({x: i,y: j,direction: 'east'});
        } //end if
        if(i===x1-1||i===x2||j===y1-1||j===y2){
          this.map.setWall(i,j);
        }else{
          this.map.setFloor(i,j);
        } //end if
      } //end for
    } //end for
  }

  //Connect is called after all the partitions are finished. It loops through
  //the partitions and connects all the sisters together that are still living
  //and works it's way up to the root node.
  connect(){
    // Recursively traverse downwards to terminal leafs
    if(this.left.opened) this.left.connect();
    if(this.right.opened) this.right.connect();

    // terminal leafs and upward connect and operate
    if(this.left.opened&&this.right.opened){
      //connect child rooms
      this.left.setClosed();
      this.right.setClosed();
      if(this.left.y1===this.right.y1&&this.left.y2===this.right.y2){
        let s1i=this.left.pathable.findIndex(s=>s.direction==='east'),
            s2i=this.right.pathable.findIndex(s=>s.direction==='west'),
            s1=this.left.pathable.splice(s1i,1).pop(),
            s2=this.right.pathable.splice(s2i,1).pop();

        this.pathable = [].concat.apply([],[
          this.pathable,this.left.pathable,this.right.pathable
        ]);
        for(let i=s1.x;i<=s2.x;i++){
          if(this.map.isWall(i,s1.y)&&i!==s1.x){
            this.map.setCorridor(i,s1.y);
            break;
          }
          this.map.setCorridor(i,s1.y);
        } //end for
      }else if(this.left.x1===this.right.x1&&this.left.x2===this.right.x2){
        let s1i=this.left.pathable.findIndex(s=>s.direction==='south'),
            s2i=this.right.pathable.findIndex(s=>s.direction==='north'),
            s1=this.left.pathable.splice(s1i,1).pop(),
            s2=this.right.pathable.splice(s2i,1).pop();

        this.pathable = [].concat.apply([],[
          this.pathable,this.left.pathable,this.right.pathable
        ]);
        for(let j=s1.y;j<=s2.y;j++){
          if(this.map.isWall(s1.x,j)&&j!==s1.y){
            this.map.setCorridor(s1.x,j);
            break;
          }else{
            this.map.setCorridor(s1.x,j);
          } //end if
        } //end for
      } //end if
    }else{ //Reached a terminal partition, apply pathable upwards
      this.pathable = [].concat.apply([],[
        this.pathable,this.left.pathable,this.right.pathable
      ]);
    }//end if
  }
}

export function bsp(){
  let map = this,
      tree = new Partition(this,1,map.getWidth()-1,1,map.getHeight()-1);

  tree.connect();
  pruneMap();
  cleanMap();

  // remove unneeded walls
  function cleanMap(){
    var isUseful; //details whether wall is useful

    for(let i=0;i<map.getWidth();i++){
      for(let j=0;j<map.getHeight();j++){
        if(map.isWall(i,j)){
          isUseful = false;
          if(map.isWalkable(i-1,j)) isUseful = true;
          if(map.isWalkable(i,j-1)) isUseful = true;
          if(map.isWalkable(i+1,j)) isUseful = true;
          if(map.isWalkable(i,j+1)) isUseful = true;
          if(map.isWalkable(i-1,j-1)) isUseful = true;
          if(map.isWalkable(i-1,j+1)) isUseful = true;
          if(map.isWalkable(i+1,j-1)) isUseful = true;
          if(map.isWalkable(i+1,j+1)) isUseful = true;
          if(!isUseful) map.setVoid(i,j);
        }else if(map.isWalkable(i,j)){
          if(map.isVoid(i-1,j)) map.setWall(i-1,j);
          if(map.isVoid(i,j-1)) map.setWall(i,j-1);
          if(map.isVoid(i+1,j)) map.setWall(i+1,j);
          if(map.isVoid(i,j+1)) map.setWall(i,j+1);
          if(map.isVoid(i-1,j-1)) map.setWall(i-1,j-1);
          if(map.isVoid(i-1,j+1)) map.setWall(i-1,j+1);
          if(map.isVoid(i+1,j-1)) map.setWall(i+1,j-1);
          if(map.isVoid(i+1,j+1)) map.setWall(i+1,j+1);
        }//end if
      } //end for
    } //end for
  } //end cleanMap()

  // We are able to prune the map by iterating one-by-one through the
  // map and if the cell we're currently is one is walkable, then we
  // iterate through all nearby walkable floors, marking that floor as
  // seen and giving it the same identifier room number, keeping track
  // of the number or rooms per room identifier. Then we loop
  // through the entire map and remove cells that are of a room number
  // that isn't the largest size (thus keeping the largest room only)
  function pruneMap(){
    var node = {x: 0,y: 0},
        loc_max = {val: 0,cur: 0,num: 0,max: 0},
        unmapped=[];

    // iterate through all cells once, marking their location number
    // which is the number all nearby walkable cells will share
    for(let i=0;i<map.getWidth();i++){
      for(let j=0;j<map.getHeight();j++){
        if(map.isWalkable(i,j)&&!map.getLocation(i,j)){
          traverse(++loc_max.cur,i,j);
        } //end if
      } //end for
    } //end for

    // loop through all the cells, clearing them if they don't share the
    // location id of the most-touching or largest area we found
    for(let i=0;i<map.getWidth();i++){
      for(let j=0;j<map.getHeight();j++){
        if(map.isWalkable(i,j)&&map.getLocation(i,j)!==loc_max.num){
          map.setVoid(i,j);
        } //end if
      } //end for
    } //end for

    //look around at location and push unmapped nodes to stack
    function traverse_look(i,j){
      if(map.isWalkable(i-1,j)&&!map.getLocation(i-1,j)){
        node={x: i-1,y: j};
        unmapped.push(node);
        map.setLocation(i-1,j,-1);
      } //end if
      if(map.isWalkable(i,j-1)&&!map.getLocation(i,j-1)){
        node={x: i,y: j-1};
        unmapped.push(node);
        map.setLocation(i,j-1,-1);
      } //end if
      if(map.isWalkable(i+1,j)&&!map.getLocation(i+1,j)){
        node={x: i+1,y: j};
        unmapped.push(node);
        map.setLocation(i+1,j,-1);
      } //end if
      if(map.isWalkable(i,j+1)&&!map.getLocation(i,j+1)){
        node={x: i,y: j+1};
        unmapped.push(node);
        map.setLocation(i,j+1,-1);
      } //end if
    } //end traverse_look()

    // Traverse a location completely
    function traverse(curLoc,i,j){
      var newLoc = node,
          x = i, y = j;

      loc_max.val=1; //set the current mas size to 1
      map.setLocation(x,y,curLoc)
      traverse_look(x,y);
      while(unmapped.length>0){
        newLoc=unmapped.pop();
        x=newLoc.x;
        y=newLoc.y;
        traverse_look(x,y);
        map.setLocation(x,y,curLoc);
        loc_max.val++;
        if(loc_max.val>loc_max.max){
          loc_max.max=loc_max.val;
          loc_max.num=loc_max.cur;
        } //end manage maximum mass
      } //end while
    } //end traverse()
  } //end pruneMap()
}

