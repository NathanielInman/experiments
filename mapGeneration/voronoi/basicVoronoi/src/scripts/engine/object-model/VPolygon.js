export class VPolygon{
  constructor(){
    this.size = 0;
    this.vertices = [];
    this.first = null;
    this.last = null;
  }
  addRight(p){
    this.vertices.push(p);
    this.size++;
    this.last = p;
    if(this.size==1) this.first = p;
  }
  addLeft(p){
    let vs = this.vertices;

    this.vertices = [p];
    for(let i=0;i<vs.length;i++)this.vertices.push(vs[i]);
    this.size++;
    this.first = p;
    if(this.size==1)this.left = p;
  }
}
