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
  constructor(map,x1,x2,y1,y2,parent){
    console.log('x1,x2,y1,y2',x1,x2,y1,y2);
    this._closed=false;
    this.map = map;
    this.width=x2-x1;
    this.height=y2-y1;
    this.parent=parent||false;
    this.initialize(x1,x2,y1,y2);
  }
  get opened(){ return this._closed===false; }
  get closed(){ return this._closed===true; } 
  setOpen(){ this._closed=false; }
  setClosed(){ this._closed=true; }

  // This creates a left and right child (left/right could be up and down) if there
  // is enough valid space to do so; otherwise, it sets the left and right child
  // as closed nodes
  initialize(x1,x2,y1,y2){
    if(this.width>=this.height){
      if(this.width>minSize*2){
        console.log('splitting vertically',minSize);
        let split = r(x1+minSize,x2-minSize,1);

        this.left = new Partition(this.map,x1,split,y1,y2,this);
        this.right = new Partition(this.map,split+1,x2,y1,y2,this);
      }else{
        console.log('Cant split vertically',this.width,minSize*2);
        this.left =  {closed:true};
        this.right = {closed:true};
        this.fill(x1,x2,y1,y2);
      } //end if
    }else{
      if(this.height>minSize*2){
        console.log('splitting horizontally');
        let split = r(y1+minSize,y2-minSize,1);

        this.left = new Partition(this.map,x1,x2,y1,split,this);
        this.right = new Partition(this.map,x1,x2,split+1,y2,this);
      }else{
        console.log('Cant split horizontally',this.height,minSize*2);
        this.left =  {closed:true};
        this.right = {closed:true};
        this.fill(x1,x2,y1,y2);
      } //end if
    } //end if
  }

  // Fill is called when the partition can no longer be broken down into
  // smaller partitions. It fills the floor and walls if it meets the size
  // requirement. If the room is way too smal, it's emptied and set to closed
  // so we know not to conenct this location with a hallway
  fill(x1,x2,y1,y2){

    // If the room is smaller than it's allowed to be then we need to close
    // it off and prevent it from being connected by a hallway
    if(this.width<tinSize||this.height<tinSize){
      for(let i=x1;i<x2;i++)for(let j=y1;j<y2;j++)this.map.sector[i][j].setEmpty();
      this.setClosed(); //This node can't be connected to
      return; //make sure to exit early
    } //end if

    // Make sure we randomly place the room in the allocated space, not using
    // the whole space allocated or it will look entirely too generic and
    // repeated
    if(this.width>minSize){
      x1=r(x1,x1+tinSize,1);
      x2=r(x2-tinSize,x2+1,1);
    }else if(this.width>minSize/2&&r(0,2,1)===1){
      x1=r(x1,x1+tinSize,1);
    }else if(this.width>minSize/2){
      x2=r(x2-tinSize,x2+1,1);
    } //end if
    if(this.height>minSize){
      y1=r(y1,y1+tinSize,1);
      y2=r(y2-tinSize,y2+1,1);
    }else if(this.height>minSize/2&&r(0,2,1)===1){
      y1=r(y1,y1+tinSize,1);
    }else if(this.height>minSize/2){
      y2=r(y2-tinSize,y2+1,1);
    } //end if

    // Carve the floors and walls surrounding the room
    for(let i=x1-1;i<=x2;i++){
      for(let j=y1-1;j<=y2;j++){
        if(i===x1-1||i===x2||j===y1-1||j==y2){
          this.map.sector[i][j].setWall();
        }else{
          this.map.sector[i][j].setFloor();
        } //end if
      } //end for
    } //end for
    this.setOpen(); //this is a pathable partition
  }

  //Connect is called after all the partitions are finished. It loops through
  //the partitions and connects all the sisters together that are still living
  //and works it's way up to the root node.
  connect(){
    console.log(this);
    if(this.left.opened&&this.right.opened){
      //connect child rooms
      this.setClosed(); //mark node as leaf
      this.left.setClosed();
      this.right.setClosed();
      console.log('connected: ',this.left,this.right);
    }else if(this.left.closed&&this.right.opened){
      this.right.setClosed();
      this.setOpen(); //mark node as leaf
      //connect right with current
      console.log('connected: ',this.right,this)
    }else if(this.left.opened&&this.right.closed){
      this.left.setOpen();
      this.setOpen(); //mark node as leaf
      //connect left with current
      console.log('connected: ',this.left,this);
    }else if(this.left.closed&&this.right.closed){
      this.setOpen(); //mark node as leaf
    }else if(this.left.closed&&this.left.opened){
      this.left.connect(); //recursively call left
    }else if(this.right.closed&&this.left.opened){
      this.right.connect(); //recursively call right
    } //end if
    if(this.parent)this.parent.connect(); //walk upwards
  }
}

export function bsp(map){
  let tree = new Partition(map,1,map.width-1,1,map.height-1);

  tree.connect();
  console.info('Ran binary space partitioning');
}

