export function applyErosion(map){
  let n=null, //will hold lowest neighbor
      mapHeight = map.length,
      mapWidth = map[0].length;

  for(let raindrop=0,x,y;raindrop<2000;raindrop++){
    x = Math.floor(Math.random()*mapWidth);
    y = Math.floor(Math.random()*mapHeight);
    n = getLowestNeighbor(map,x,y);
    while(n){
      map[y][x]-=0.01;
      x = n.x;
      y = n.y;
      map[y][x]+=0.005;
      n = getLowestNeighbor(map,x,y);
    }
  }
} //end applyErosion()

//eslint-disable-next-line complexity
function getLowestNeighbor(map,x,y){
  let h = map[y][x].height,
      mapHeight = map.length,
      mapWidth = map[0].length,
      result = [];

  if(x>0&&map[y][x-1].height<h){ //east
    result.push({x: x-1,y,v: map[y][x-1].height});
  } //end if
  if(x<mapWidth-1&&map[y][x+1].height<h){ //west
    result.push({x: x+1,y,v: map[y][x+1].height});
  } //end if
  if(y>0&&map[y-1][x].height<h){ //north
    result.push({x,y: y-1,v: map[y-1][x].height});
  } //end if
  if(y<mapHeight-1&&map[y+1][x].height<h){ //south
    result.push({x,y: y+1,v: map[y+1][x].height});
  } //end if
  if(x>0&&y>0&&map[y-1][x-1].height<h){ //northwest
    result.push({x: x-1,y: y-1,v: map[y-1][x-1].height});
  } //end if
  if(x<mapWidth-1&&y>0&&map[y-1][x+1].height<h){ //northeast
    result.push({x: x+1,y: y-1,v: map[y-1][x+1].height});
  } //end if
  if(x<mapWidth-1&&y<mapHeight-1&&map[y+1][x+1].height<h){ //southeast
    result.push({x: x+1,y: y+1,v: map[y+1][x+1].height});
  } //end if
  if(x>0&&y<mapHeight-1&&map[y+1][x-1].height<h){ //southwest
    result.push({x: x-1,y: y+1,v: map[y+1][x-1].height});
  } //end if
  return result.length?result.reduce((p,v)=> v.v<p.v?v:p):null;
} //end getLowestNeighbor()
