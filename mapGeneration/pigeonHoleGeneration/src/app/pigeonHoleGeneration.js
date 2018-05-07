const hallwayLengthMean = 5;
const hallwayLengthSigma = 1.4; //standard deviation = sigma

// Given a mean and standard deviation, compute a random length
function getHallwayLength(){
  let X = Math.random()*Math.PI*2,
      Y = Math.random(),
      r = hallwayLengthSigma*Math.sqrt(-2*Math.log(Y)),
      //x = r*Math.cos(X)+hallwayLengthMean,
      y = r*Math.sin(X)+hallwayLengthMean;

  return y|0; //we're on a grid, can't have partial hallway lengths
} //end getHallwayLength()

function getRandomDirection(){
  let directions = ['north','south','east','west'],
      randomIndex = Math.floor(Math.random()*directions.length);

  return directions[randomIndex];
} //end getRandomDirection()

function getTargetCoordinates(x,y,direction,length){
  let result;

  if(direction==='north'){
    result = {x,y: y-length};
  }else if(direction==='south'){
    result = {x,y: y+length};
  }else if(direction==='east'){
    result = {x: x+length,y};
  }else if(direction==='west'){
    result = {x: x-length,y};
  } //end if
  return result;
} //end getTargetCoordinates()

export function PHG(map){
  let cx=Math.floor(Math.random()*map.width/2)+Math.floor(map.width/4),
      cy=Math.floor(Math.random()*map.height/2)+Math.floor(map.height/4);

  for(let i=0,l,d,t;i<500;i++){
    l = getHallwayLength();
    d = getRandomDirection();
    t = getTargetCoordinates(cx,cy,d,l);
    if(l>0&&map.isPathFree(cx,cy,t.x,t.y)){
      map.setPathFloor(cx,cy,t.x,t.y);
      cx = t.x; cy = t.y;
    } //end if
  } //end for
} //end function
