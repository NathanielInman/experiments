/**
 * A sector is a individual location marker on a
 * map. In this example we have either a floor or
 * ground, and sometimes a wall on either
 */
class Sector{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.wall =  r(1)<0.25?1:0;
    this.floor = r(1)<0.90?1:0; 
  }
}