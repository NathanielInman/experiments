export class Sector{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.floor=r(0,2,1);
    this.wall=r(0,2,1);
  }
}
