// These three constants control the size of the rooms
const tinSize = 3;
const minSize = 2*tinSize;
const maxSize = 3*tinSize;

/**
 * The partition class is essentially a binary tree with tiny controller
 * logic to handle partition sizes and closing of partitions that don't
 * meet the size requirements. After the tree is constructed, there's a 
 * connect method that walks up the tree from the bottom nodes recursively
 * connecting sister leaves together with hallways.
 */
class Partition{

  /**
   * This constructor creates a partitioned map down to the smallest 
   * available size. The rooms are constructed with walls. After initialization
   * The connect function is called to build out hallways.
   */
  constructor(map,x1,x2,y1,y2,parent){
    this.width=x2-x1;
    this.height=y2-y1;
    this.parent=parent||false;
    this.size=r(this.size,this.size+1,1);
    if(this.width>=this.height){
      if(this.width>minSize*2){
        let split = r(x1+this.size,x2-this.size,1);
        this.left = new Partition(map,x1,split,y1,y2,this);
        this.right = new Partition(map,split+1,x2,y1,y2,this);
      }else{
        this.fill(map,x1,x2,y1,y2);
      } //end if
    }else{
      if(this.height>this.size*2){
        let split = r(y1+this.size,y2-this.size,1);
        this.left = new Partition(map,x1,x2,y1,split,this);
        this.right = new Partition(map,x1,x2,split+1,y2,this);
      }else{
        this.fill(map,x1,x2,y1,y2);
      } //end if
    } //end if
  }

  /**
   * Fill is called when the partition can no longer be broken down into
   * smaller partitions. It fills the floor and walls if it meets the size
   * requirement. If the room is way too small, it's emptied and set to closed
   * so we know not to connect this location with a hallway
   */
  fill(map,x1,x2,y1,y2){
    var i,j,w=x2-x1,h=y2-y1;

    // If the room is smaller than it's allowed to be then we need to close
    // it off and prevent it from being connected by a hallway
    if(w<tinSize||h<tinSize){
      for(i=x1;i<x2;i++)for(j=y1;j<y2;j++)map.sector[i][j].setEmpty();
      this.closed=true; //This node can't be connected to
      return; //make sure to exit early
    } //end if

    // Make sure we randomly place the room in the allocated space, not using
    // the whole space allocated or it will look entirely too generic and
    // repeated
    if(w>minSize){
      x1=r(x1,x1+tinSize,1);
      x2=r(x2-tinSize,x2+1,1);
    }else if(w>minSize/2&&r(0,2,1)===1){
      x1=r(x1,x1+tinSize,1);
    }else if(w>minSize/2){
      x2=r(x2-tinSize,x2+1,1);
    } //end if
    if(h>minSize){
      y1=r(y1,y1+tinSize,1);
      y2=r(y2-tinSize,y2+1,1);
    }else if(h>minSize/2&&r(0,2,1)===1){
      y1=r(y1,y1+tinSize,1);
    }else if(h>minSize/2){
      y2=r(y2-tinSize,y2+1,1);
    } //end if

    // Carve the floors and walls surrounding the room
    for(i=x1-1;i<=x2;i++){
      for(j=y1-1;j<=y2;j++){
        if(i==x1-1||i==x2||j==y1-1||j==y2){
          map.sector[i][j].setWall();
        }else{
          map.sector[i][j].setFloor(); 
        } //end if
      } //end for
    } //end for
  }

  /**
   * Connect is called after all the partitions are finished. It loops through
   * the partitions and connects all the sisters together that are still living
   * and works it's way up the the root node.
   */
  connect(){
    if(this.left&&!this.left.closed){
      this.left.connect();
    }else if(this.right){
      
    } //end if
    console.log('Connecting ',this.left,this.right);
  }
}
export var bsp = function(map){
  var tree = new Partition(map,1,map.width-1,1,map.height-1);
  tree.connect();
  console.log('Ran bsp.');
};
