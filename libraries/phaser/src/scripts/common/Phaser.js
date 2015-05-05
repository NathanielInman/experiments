class Phaser{
  constructor(interval,phase,color,context,properties,makeGradient){
    this.interval = interval || 100; //ms time it takes to iterate through a phase
    this.frame = this.interval; //current interval phase of the phaser
    this.phase = phase; //current literal phase iteration
    this.context = context; //context of the canvas
    this.properties = properties; //function(){return [x,y,width,height]}
    this.makeGradient = makeGradient; //function(){return ctx.createLinearGradient(0,0,0,v.h/5*4);}
    this.color = color; //An array holding color stops
    this.colorD = []; //Computed color difference to help iteration computation
    this.err = 0; //holds the number of errors that occurred on construction
    if(!makeGradient) console.error("Error "+(++this.err)+": Gradient missing.");
    if(!context) console.error("Error "+(++this.err)+": Context missing.");
    if(!properties) console.error("Error "+(++this.err)+": Properties missing.");
    if(!this.err) this.initialize();
  }
  initialize(){
    var cd, //color difference computed per phase, not per color stop
        cc, //current color - used to compute the difference from initial color
        fc, //first color - the initial color object
        phase, //Helps distinguish when to acquire first color or color diff
        firstName; //the first color phase name

    this.color.forEach((colorStop,i)=>{
      cd = {}, cc = {r:0,g:0,b:0}, phase=0, fc=0; //reset per color stop
      Object.keys(colorStop).forEach((key)=>{
        let c = colorStop[key], //shorten the phase color name
            nc = {r:c.r-cc.r,g:c.g-cc.g,b:c.b-cc.b}; //new color computed

        // On first iteration acquire the new color by
        // subtracting the current color from the original
        // color. Otherwise set the color difference
        if(phase===1){ //we skip phase 0 which is current (not an actual phase)
          fc=nc; //this is the first phase, give it the new color
          firstName=key; //set the first color phase name
        }else if(phase>1){
          cd[key]=nc;
        } //end if
        phase++;
        cc={r:c.r,g:c.g,b:c.b};
        if(key===this.phase) {
          let cur=this.color[i].current;
          cur.r=cc.r;cur.g=cc.g;cur.b=cc.b;
        } //end if
      });

      // Set the color difference
      cd[firstName]={
        r:fc.r-cc.r,
        g:fc.g-cc.g,
        b:fc.b-cc.b
      };
      this.colorD.push(cd);
    });
  }
  getNextPhase(){
    var found=0, // this flag indicates that we found the current phase
        newPhase='', key; //newPhase is the return obj

    // loop through the keys to find the designated key by first finding the
    // current one, if it doesn't find the next phase it's because it was on
    // the last phase of the list - it'll catch it in the next block
    for(key in this.color[0]){
      if(found){ newPhase=key; break; }
      if(key===this.phase) found=1;
    } //end for

    // If the newPhase isn't set, that's because we were on the last phase
    // previously, in order to loop around we have to grab the first key.
    if(newPhase.length===0){
      for(key in this.color[0]){
        if(key!=='current'){ newPhase = key; break; }
      } //end for
    } //end for

    // Set the current object colors to the next phase before returning the
    // new phase name
    this.color.forEach((colorStop,i)=>{
      colorStop.current.r=colorStop[this.phase].r;
      colorStop.current.g=colorStop[this.phase].g;
      colorStop.current.b=colorStop[this.phase].b;
    });

    // Now return the new phase that we found in the first or second block
    return newPhase;
  }
  drawNext(redraw){
    var grd=this.makeGradient(), // Acquire the create gradient function
        p = this.properties(); // Acquire the properties array

    // Iterate through each colorstop and add it to the gradient
    this.color.forEach((colorStop,i)=>{
      let c = colorStop.current;
      grd.addColorStop(i,'rgb('+(c.r|0)+','+(c.g|0)+','+(c.b|0)+')');
    });

    // Set the fill style to the gradient that was created and display it
    this.context.fillStyle=grd;
    this.context.fillRect(p[0],[1],p[2],p[3]);

    // If we've reached our interval limitation, then we need to transition
    // into the next phase
    if(this.frame==this.interval){
      this.frame=-1;
      this.phase=this.getNextPhase();
    } //end if

    // Increment the next colors after the frame was displayed so we have less
    // of a delay in processing
    this.color.forEach((colorStop,i)=>{
      let c1 = colorStop.current, //the current color being displayed
          c2 = this.colorD[i][this.phase]; //the color diff of the phase

      c1.r+=c2.r/this.interval;
      c1.g+=c2.g/this.interval;
      c1.b+=c2.b/this.interval;
    });

    //increment the frame to the next interval
    this.frame++;
  }
}
