/* global M */
class ParticleCollection{
  /**
   * When creating a new instance of a particle collection it
   * establishes the collection size with an optional width and
   * height parameter, as well as an optional size parameter for the
   * actual particle itself. After establishing these parameters it
   * initializaes the collection of particles and connects them
   */
  constructor(width,height,size){
    this.max = { row: height||15, col: width||10 };
    this.particleSize = size||3;
    this.get = [];
    this.initialize();
    this.connect();
  }
  
  /**
   * Initialize function makes a large array specified by the
   * collection max row and column and establishes individual
   * particles at each index of that array in random locations
   */
  initialize(){
    var list = this.get, //shorten the array name 
        s = this.particleSize, //shorten the name
        i, j, x, y; //temp variables
        
    ctx.fillStyle='#0F0';
    for(i=0;i<this.max.col;i++){
      for(j=0;j<this.max.row;j++){
        x = 1/this.max.col*i+r(1)/this.max.col;
        y = 1/this.max.row*j+r(1)/this.max.row;
        list.push(new Particle(x,y));
        ctx.fillRect(x*v.w,y*v.h,s,s);
      } //end for
    } //end for
  }
  
  /**
   * Connect function iterates through all of the particles and
   * attempts to match each particle with two nearby particles
   * so it can draw a line between them. This will make a mesh
   * of connected particles
   */
  connect(){
    var list = this.get, //shorten the array name
        sId1, sAmt1, sId2, sAmt2, //distinguishers reset on pass 
        i, j, amt1, amt2, res; //temp variables
        
    for(i=0;i<list.length;i++){
      sAmt1 = sAmt2 = 100; sId1 = sId2 = null;
      for(j=0;j<list.length;j++){
        // Hypotenuse is sqrt(a^2 + b^2) or a^2 + b^2 = c^2
        // according to pythagorean theorem
        amt1 = M.pow(list[j].x-list[i].x,2);
        amt2 = M.pow(list[j].y-list[i].y,2);
        res = M.sqrt(amt1+amt2);
        
        // Attempt to connect the particle to one other particle
        if(j!==i&&j!==list[i].f1&&res<0.15){
          if(res<sAmt1&&!list[j].c1||sId1===null&&!list[j].c1){
            sAmt1=res;sId1=j;
          } //end if
        } //end if
        
        // Attempt to connect the particle to a second particle
        if(j!==i&&j!==list[i].f2&&res<0.15&&j!==list[i].f1){
          if(res<sAmt2&&!list[j].c2||sId2===null&&!list[j].c2){
            sAmt2=res;sId2=j;
          } //end if
        } //end if
      } //end for
      
      // If we were able to connect it to one particle
      if(sId1!==null){
        ctx.strokeStyle='#00F';
        ctx.beginPath();
        ctx.moveTo(list[i].x*v.w|0,list[i].y*v.h|0);
        ctx.lineTo(list[sId1].x*v.w|0,list[sId1].y*v.h|0);
        ctx.stroke();
        list[sId1].c1=true; //dot is now connected
        list[sId1].f1=i; //apply an imprint of what marked it
      } //end if
      
      // If we were able to connect it to the second particle
      if(sId2!==null){
        ctx.strokeStyle='#F0F';
        ctx.beginPath();
        ctx.moveTo(list[i].x*v.w|0,list[i].y*v.h|0);
        ctx.lineTo(list[sId2].x*v.w|0,list[sId2].y*v.h|0);
        ctx.stroke();
        list[sId2].c1=true; //dot is now connected
        list[sId2].f1=i; //apply an imprint of what marked it
      } //end if
    } //end for
  }
}