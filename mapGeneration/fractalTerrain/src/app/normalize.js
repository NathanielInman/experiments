export function normalize(map){
  let lowest = Infinity, highest = -Infinity;

  for(let y=0;y<map.height;y++){
    for(let x=0,d;x<map.width;x++){
      d = map.getSector(x,y).depth;
      if(d<lowest){
        lowest = d;
      }else if(d>highest){
        highest = d;
      } //end if
    } //end for
  } //end for

  // now normalize the depth
  let range = highest - lowest;

  for(let y=0;y<map.height;y++){
    for(let x=0;x<map.width;x++){
      map.setDepth(x,y,(map.getSector(x,y).depth-lowest)/range);
    } //end if
  } //end for
  return map;
} //end normalize()
