// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()

export function cuesta(map=5){
  let x=[
        map.width/6|0,
        map.width/6*5|0
      ][Math.random()*2|0],
      y=[
        map.height/6|0,
        map.height/6*5|0
      ][Math.random()*2|0],
      xw=x>map.width/2?-1:1, //we weight the DLA to opposite the side of the...
      yw=y>map.height/2?-1:1, //starting location
      sparks=[], //holds all filled locations to start a new spark
      filled = 0,
      maxFilled = map.width*map.height/3,
      hashmap = {},
      r = (n,m)=> filled<maxFilled/16?true:Math.random()*2-(n===m?1:0)<0.4;

  // We start in a corner and create a spark predominately in the weighted
  // opposite direction.
  do{
    if(filled<maxFilled/16){
      map.setCorridor(x,y);
    }else{
      map.setFloor(x,y);
    } //end if
    filled++;
    if(map.isEmpty(x-1,y)&&r(xw,-1)&&!hashmap[`${x-1}:${y}`]){
      sparks.push({x: x-1,y}); hashmap[`${x-1}:${y}`]={x: x-1,y};
    } //end if
    if(map.isEmpty(x+1,y)&&r(xw,1)&&!hashmap[`${x+1}:${y}`]){
      sparks.push({x: x+1,y}); hashmap[`${x+1}:${y}`]={x: x+1,y};
    } //end if
    if(map.isEmpty(x,y-1)&&r(yw,-1)&&!hashmap[`${x}:${y-1}`]){
      sparks.push({x,y: y-1}); hashmap[`${x}:${y-1}`]={x,y: y-1};
    } //end if
    if(map.isEmpty(x,y+1)&&r(yw,1)&&!hashmap[`${x}:${y+1}`]){
      sparks.push({x,y: y+1}); hashmap[`${x}:${y+1}`]={x,y: y+1};
    } //end if
    if(sparks.length){
      ({x,y} = shuffle(sparks).pop());
    }else{
      ({x,y} = shuffle(Object.values(hashmap)).pop());
    } //end if
  }while(filled<maxFilled);

  // surround the corridors that arent surrounded with walls yet with walls now.
  map.sectors.forEach((row,y)=>{

    //eslint-disable-next-line complexity
    row.forEach((sector,x)=>{
      if(sector.isWalkable()){
        if(x===0||x===map.width-1||y===0||y===map.height-1) map.setWall(x,y);
        if(x>0&&map.isEmpty(x-1,y)) map.setWall(x-1,y);
        if(x>0&&y>0&&map.isEmpty(x-1,y-1)) map.setWall(x-1,y-1);
        if(y>0&&map.isEmpty(x,y-1)) map.setWall(x,y-1);
        if(y>0&&x<map.width-1&&map.isEmpty(x+1,y-1)) map.setWall(x+1,y-1);
        if(x<map.width-1&&map.isEmpty(x+1,y)) map.setWall(x+1,y);
        if(x<map.width-1&&y<map.height-1&&map.isEmpty(x+1,y+1)) map.setWall(x+1,y+1);
        if(y<map.height-1&&map.isEmpty(x,y+1)) map.setWall(x,y+1);
        if(y<map.height-1&&x>0&&map.isEmpty(x-1,y+1)) map.setWall(x-1,y+1);
      } //end if
    });
  });
} //end function
