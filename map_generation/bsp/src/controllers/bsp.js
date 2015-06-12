const tinSize = 3;
const minSize = 2*tinSize;
const maxSize = 3*tinSize;
class Partition{
  constructor(map,x1,x2,y1,y2){
    this.width=x2-x1;
    this.height=y2-y1;
    this.size=r(this.size,this.size+1,1);
    if(this.width>=this.height){
      if(this.width>minSize*2){
        let split = r(x1+this.size,x2-this.size,1);
        this.left = new Partition(map,x1,split,y1,y2);
        this.right = new Partition(map,split+1,x2,y1,y2);
      }else{
        this.fill(map,x1,x2,y1,y2);
      } //end if
    }else{
      if(this.height>this.size*2){
        let split = r(y1+this.size,y2-this.size,1);
        this.left = new Partition(map,x1,x2,y1,split);
        this.right = new Partition(map,x1,x2,split+1,y2);
      }else{
        this.fill(map,x1,x2,y1,y2);
      } //end if
    } //end if
  }
  fill(map,x1,x2,y1,y2){
    var i,j,w=x2-x1,h=y2-y1;
    if(w<tinSize||h<tinSize){
      for(i=x1;i<x2;i++)for(j=y1;j<y2;j++)map.sector[i][j].setEmpty();
    } //end if
    if(w>minSize){
      x1=r(x1,x1+tinSize,1);
      x2=r(x2-tinSize,x2+1,1);
    } //end if
    if(h>minSize){
      y1=r(y1,y1+tinSize,1);
      y2=r(y2-tinSize,y2+1,1);
    } //end if
    for(i=x1;i<x2;i++){
      for(j=y1;j<y2;j++){
        map.sector[i][j].setFloor();
      } //end for
    } //end for
  }
}
export var bsp = function(map){
  var tree = new Partition(map,1,map.width-1,1,map.height-1);
  console.log('Ran bsp.');
};
