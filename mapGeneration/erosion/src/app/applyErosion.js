export function applyErosion(map){
  let n=null, //will hold lowest neighbor
      mapHeight = map.length,
      mapWidth = map[0].length,types={};

  for(let raindrop=0,x,y,v;raindrop<10000;raindrop++){
    x = 1+Math.floor(Math.random()*(mapWidth-2));
    y = 1+Math.floor(Math.random()*(mapHeight-2));
    n = getLowestNeighbor(map,x,y);
    v = 0.005;
    while(n){
      map[y][x]-=v;
      types[n.type]=types[n.type]?types[n.type]+1:1;
      console.log(x,y,n);
      x = n.x;
      y = n.y;
      map[y][x]+=v;
      v = v / 4 * 3; //reduce velocity and size displacement
      if(y===0||y===mapHeight-1||x===0||x===mapWidth-1){
        n=null;
      }else{
        n = getLowestNeighbor(map,x,y);
      } //end if
    }
  }
  console.log(types);
} //end applyErosion()

//eslint-disable-next-line complexity
function getLowestNeighbor(map,x,y){
  let h = map[y][x].height,
      mapHeight = map.length,
      mapWidth = map[0].length,
      result = [];

  if(y>0&&map[y-1][x].height<h){
    result.push({x,y: y-1,v: map[y-1][x].height,type: 'north'});
  } //end if
  /*
  if(x>0&&map[y][x-1].height<h){
    result.push({x: x-1,y,v: map[y][x-1].height,type: 'west'});
  } //end if
  if(x<mapWidth-1&&map[y][x+1].height<h){
    result.push({x: x+1,y,v: map[y][x+1].height,type: 'east'});
  } //end if
  if(y<mapHeight-1&&map[y+1][x].height<h){
    result.push({x,y: y+1,v: map[y+1][x].height,type: 'south'});
  } //end if
  if(x>0&&y>0&&map[y-1][x-1].height<h){
    result.push({x: x-1,y: y-1,v: map[y-1][x-1].height,type:'northwest'});
  } //end if
  if(x<mapWidth-1&&y>0&&map[y-1][x+1].height<h){
    result.push({x: x+1,y: y-1,v: map[y-1][x+1].height,type:'northeast'});
  } //end if
  if(x<mapWidth-1&&y<mapHeight-1&&map[y+1][x+1].height<h){
    result.push({x: x+1,y: y+1,v: map[y+1][x+1].height,type:'southeast'});
  } //end if
  if(x>0&&y<mapHeight-1&&map[y+1][x-1].height<h){
    result.push({x: x-1,y: y+1,v: map[y+1][x-1].height,type:'southwest'});
  } //end if
  */
  return result.length?result.reduce((p,v)=> v.v<p.v?v:p):null;
} //end getLowestNeighbor()
