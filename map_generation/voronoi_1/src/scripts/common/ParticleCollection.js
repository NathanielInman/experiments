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
    this.maxConnect = v.w<v.h?v.w/4:v.h/4;
    this.get = [];
    this.initialize();
    this.loop(); //start the main loop 
  }

  /**
   * Initialize function makes a large array specified by the
   * collection max row and column and establishes individual
   * particles at each index of that array in random locations
   */
  initialize(){
    var list = this.get, //shorten the array name 
        s = this.particleSize, //shorten the name
        i, j, x, y, dx, dy; //temp variables

    for(i=0;i<this.max.col;i++){
      for(j=0;j<this.max.row;j++){
        x = M.floor((v.w*i+r(v.w))/this.max.col); //place randomly in col
        y = M.floor((v.h*j+r(v.h))/this.max.row); //place randomly in row
        dx = M.floor((v.w*i+r(v.w))/this.max.col);
        dy = M.floor((v.h*j+r(v.h))/this.max.row);
        list.push(new Particle(x,y,dx,dy));
      } //end for
    } //end for
  }

  /**
   * Continue to update the frames by moving the particles and
   * connecting them on each frame
   */
  loop(){
    // Start by clearing the canvas
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
    ctx.fillStyle='#0F0';
    
    // Main logic
    this.move(); //Move all of the particles
    this.connect(); //Continue to connect them as they move
    setTimeout(()=>this.loop(),10); //Once we start, lets continue 
  }
  
  /**
   * Iterate through all of the particles in the collection and
   * move them towards their destinations. If the destination was
   * accomplished then we acquire a new destination
   */
  move(){
    var i, p, m, s = this.particleSize, //shorten variable names
        dX, dY, //computed difference between two coordinates
        error; //Error (Bresenhams line algorithm) decides axis priority

    for(i=0;i<this.get.length;i++){
      p = this.get[i]; //shorten the particle name
      dX = p.dx - p.x; dY = p.dy - p.y; //compute the deltas
      error = M.abs(dY/dX); //find the axis priority

      if(error>0 && error<0.5){
        p.y+=dY>0?1:-1;
      }else if(error<1){
        p.x+=dX>0?1:-1;
      }else{
        //If the error is 1 then there is no deltas - we've achieved
        //the destination. Time to acquire a new destination
        p.dx = M.floor((v.w*(i/this.max.row|0)+r(v.w))/this.max.col);
        p.dy = M.floor((v.h*(i%this.max.row)  +r(v.h))/this.max.row);
      } //end if
      ctx.fillRect(p.x,p.y,s,s);
      p.c1=false;p.c2=false;p.f1=-1;p.f2=-1;
    } //end for
  }
  
  /**
   * Connect function iterates through all of the particles and
   * attempts to match each particle with two nearby particles
   * so it can draw a line between them. This will make a mesh
   * of connected particles
   */
  connect(){
    var sId1, sAmt1, sId2, sAmt2, //distinguishers reset on pass 
        i, j, amt1, amt2, res, p1, p2; //temp variables

    for(i=0;i<this.get.length;i++){
      sAmt1 = sAmt2 = this.maxConnect; sId1 = sId2 = null; p1 = this.get[i];
      for(j=this.get.length-1;j>=0;j--){
        p2 = this.get[j];
        
        // Hypotenuse = sqrt(a^2 + b^2) such that
        // a^2 + b^2 = c^2 is pythagorean theorem
        amt1 = M.pow(p2.x-p1.x,2);
        amt2 = M.pow(p2.y-p1.y,2);
        res = M.sqrt(amt1+amt2);

        // Attempt to connect the particle to one other particle
        if(j!==i&&j!==p1.f1&&res<this.maxConnect){ //can't be itself or too far
          if(res<sAmt1&&!p2.c1||sId1===null&&!p2.c1){
            sAmt1=res;sId1=j;
          } //end if
        } //end if

        // Attempt to connect the particle to a second particle
        if(j!==i&&j!==p1.f1&&j!==p1.f2&&j!==sId1&&res<this.maxConnect){
          if(res<sAmt2&&!p2.c2||sId2===null&&!p2.c2){
            sAmt2=res;sId2=j;
          } //end if
        } //end if
      } //end for

      // If we were able to connect it to one particle
      if(sId1!==null){
        p2 = this.get[sId1]; //shorten the name of particle2
        ctx.strokeStyle='#0F0';
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y); //move to current particle
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
        p2.c1=true; //dot is now connected
        p2.f1=i; //apply an imprint of what marked it
      } //end if

      // If we were able to connect it to the second particle
      if(sId2!==null){
        p2 = this.get[sId2]; //shorten the name of particle2
        ctx.strokeStyle='#FF0';
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y); //move to current particle
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
        p2.c2=true; //dot is now connected
        p2.f2=i; //apply an imprint of what marked it
      } //end if
    } //end for
  }
}