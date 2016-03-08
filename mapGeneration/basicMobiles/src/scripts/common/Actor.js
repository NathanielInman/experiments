/* global r */
class Actor{
  constructor(map){
    do{
      this.x = r(0,map.width,1);
      this.y = r(0,map.height,1);
    }while(!map.walkable(this.x,this.y));
    this.occupies = map; //mobile knows where it is
    map.occupy(this); //send the mobile to the map
  }
  
  // If a move fails it tries 3 more times before giving up
  move(failed){
    var d = r(0,5,1), //randomly choose a direction go move
        x = this.x, y = this.y, //shorten variables
        map = this.occupies, //shorten variables
        w = map.width, h = map.height; //shorten variables

    if(d===north && y>0 && map.walkable(x,y-1)){
      map.unoccupy(this);this.y--;map.occupy(this);
    }else if(d===east && x<w-1 && map.walkable(x+1,y)){
      map.unoccupy(this);this.x++;map.occupy(this);
    }else if(d===south && y<h-1 && map.walkable(x,y+1)){
      map.unoccupy(this);this.y++;map.occupy(this);
    }else if(d===west && x>0 && map.walkable(x-1,y)){
      map.unoccupy(this);this.x--;map.occupy(this);
    }else if(!failed||failed<4){
      this.move(!failed?1:++failed);
    }
  }
}