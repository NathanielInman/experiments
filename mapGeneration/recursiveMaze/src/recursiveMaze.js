import {shuffle} from './shuffle';

// Recursive Maze Generation:
//
// 1. Choose a starting point in the field.
//
// 2. Randomly choose a wall at that point and carve a passage
// through to the adjacent cell, but only if the adjacent cell
// has not been visited yet. This becomes the new current cell.
//
// 3. All adjacent cells have been visited, back up to the last
// cell that has uncarved walls and repeat.
//
// 4. The algorithm ends when the process has backed all the way
// up to the starting point.
export function recursiveMaze(map){
  const sectors=[],
        directions = [
          {move: {x:-2,y:0}, carve: {x:-1,y:0}}, //west
          {move: {x:2,y:0}, carve: {x:1,y:0}}, //east
          {move: {x:0,y:-2}, carve: {x:0,y:-1}}, //north
          {move: {x:0,y:2}, carve: {x:0,y:1}} //south
        ],
        sx = Math.floor(Math.random()*map.width),
        sy = Math.floor(Math.random()*map.height);

  let x = sx, y = sy,
      direction, //represents the random chosen direction
      sector=map.getSector({x,y}) //represents the sector we're testing

  sector.visited = true;
  sector.setFloor(); //start tile is always floor
  sectors.push(sector);
  do{
    shuffle(directions); //mutate in-place
    for(let i=0;i<directions.length;i++){
      direction=directions[i];
      if(
        map.isInbounds({x: x+direction.move.x,y: y+direction.move.y})&&
        !map.getSector({x: x+direction.move.x,y: y+direction.move.y}).visited
      ){
        sector = map.getSector({x: x+direction.carve.x,y: y+direction.carve.y});
        sector.setFloor();
        sector = map.getSector({x: x+direction.move.x,y: y+direction.move.y});
        sector.visited = true;
        sector.setFloor();
        break;
      }
    } //end for
    if(sector){
      ({x,y}=sector);
      sectors.push(sector);
      sector = null;
    }else{
      ({x,y}=sectors.pop());
    } //end if
  }while(x!==sx||y!==sy);

} //end function
