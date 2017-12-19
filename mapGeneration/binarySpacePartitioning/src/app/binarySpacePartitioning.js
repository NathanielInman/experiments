// These three constants control the size of the rooms
const minSize = 1;
const maxSize = 6;
const r = (lint,uint)=> Math.floor(Math.random()*(uint-lint))+lint;

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
      if(this.width>maxSize){ //splitting horizontally
        let split = r(x1+minSize,x2-minSize,1);

        this.left = new Partition(this.map,x1,split,y1,y2,this,'L');
        this.right = new Partition(this.map,split+1,x2,y1,y2,this,'R');
      }else{ //can't split horizontally, too smalle - close nodes
        this.left =  {closed:true,pathable:[]};
        this.right = {closed:true,pathable:[]};
        this.fill();
      } //end if
    }else{
      if(this.height>maxSize){ // splitting vertically
        let split = r(y1+minSize,y2-minSize,1);

        this.left = new Partition(this.map,x1,x2,y1,split,this,'L');
        this.right = new Partition(this.map,x1,x2,split+1,y2,this,'R');
      }else{ //can't split vertically, too small - close nodes
        this.left =  {closed:true,pathable:[]};
        this.right = {closed:true,pathable:[]};
        this.fill();
      } //end if
    } //end if
  }

  // Fill is called when the partition can no longer be broken down into
  // smaller partitions. It fills the floor and walls if it meets the size
  // requirement. If the room is way too smal, it's emptied and set to closed
  // so we know not to conenct this location with a hallway
  fill(){
    let x1 = this.x1, y1 = this.y1, x2 = this.x2, y2 = this.y2;

    // Carve the floors and walls surrounding the room
    for(let j=y1-1;j<=y2;j++){
      for(let i=x1-1;i<=x2;i++){
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
        if(i===x1-1||i===x2||j===y1-1||j==y2){
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

    console.log('connecting...',this.id,this);
    console.log('leafs...',[[this.left.x1,this.left.y1],[this.left.x2,this.left.y2]],[[this.right.x1,this.right.y1],[this.right.x2,this.right.y2]]);

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

        console.log('debuggery horizontal',this.left.pathable,this.right.pathable);
        console.log('debuggery chosen',s1,s2);
        this.pathable = [].concat.apply([],[this.pathable,this.left.pathable,this.right.pathable]);
        for(let j=s1.y;j<=s2.y;j++)
          for(let i=s1.x;i<=s2.x;i++)
            this.map.setCorridor(i,j);
      }else if(this.left.x1===this.right.x1&&this.left.x2===this.right.x2){
        let s1i=this.left.pathable.findIndex(s=>s.direction==='south'),
            s2i=this.right.pathable.findIndex(s=>s.direction==='north'),
            s1=this.left.pathable.splice(s1i,1).pop(),
            s2=this.right.pathable.splice(s2i,1).pop();

        console.log('debuggery vertical',this.left.pathable,this.right.pathable);
        console.log('debuggery chosen',s1,s2);
        this.pathable = [].concat.apply([],[this.pathable,this.left.pathable,this.right.pathable]);
        for(let j=s1.y;j<=s2.y;j++)
          for(let i=s1.x;i<=s2.x;i++)
            this.map.setCorridor(i,j);
      } //end if
    }else{ //Reached a terminal partition, apply pathable upwards
      this.pathable = [].concat.apply([],[this.pathable,this.left.pathable,this.right.pathable]);
    }//end if
  }
}

export function bsp(map){
  let tree = new Partition(map,1,map.width-1,1,map.height-1);

  tree.connect();
  console.info('Ran binary space partitioning');
}

