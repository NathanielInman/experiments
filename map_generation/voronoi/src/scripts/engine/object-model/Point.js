/* global M */
class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  distance(point){
    var x1 = this.x, x2 = point.x,
        y1 = this.y, y2 = point.y;
        
    return M.sqrt(M.pow(x2-x1,2)+M.pow(y2-y1,2)); 
  }
}