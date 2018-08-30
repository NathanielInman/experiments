import {shuffle} from './shuffle';

// Meander Calculation:
//
// 1. Choose a starting map edge and ending map edge, acquire
// the terminal points based on tose edges.
//
// 2. Create bresenhams line between the terminal points. This
// is called the pathing vector.
//
// 3. Break up the pathing vector into chunks of 9x9 where the
// pathing vector crosses the center. There may be left-over of
// the pathing vector.
//
// 4. For each chunk, perform a recursive maze generation algorithm
// on the chunk. Repeat this step until there is a path from the
// start of the pathing vector within the chunk to the end of the
// pathing vector in the chunk. A* can be used for the pathing
// algorithm.
//
// 5. Merely use bresenhams line to wrap up the extraneous pathing
// vector not covered by chunks, alternatively break up the remaining
// path into the largest odd number and chunk and process it similarly
// to the previous part of the algorithm to make it more consistent.
// Left overs in this optional way would still be filled in with
// bresenhams line.
//
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
export function meander(map){
  const sectors=[],
        directions = [
          {move: {x:-2,y:0}, carve: {x:-1,y:0}}, //west
          {move: {x:2,y:0}, carve: {x:1,y:0}}, //east
          {move: {x:0,y:-2}, carve: {x:0,y:-1}}, //north
          {move: {x:0,y:2}, carve: {x:0,y:1}} //south
        ],
        sx = 1, sy = 1,
        tx = 9, ty = 9;

  let path;

  do{
    let x = sx, y = sy,
        direction, //represents the random chosen direction
        sector=map.getSector({x,y}) //represents the sector we're testing

    map.getSector({x: 9,y: 9}).setRemoved();
    sector.visited = true;
    sector.setFloor(); //start tile is always floor
    sectors.push(sector);
    do{
      shuffle(directions); //mutate in-place
      for(let i=0;i<directions.length;i++){
        direction=directions[i];
        if(
          map.isInbounds({
            x: x+direction.move.x,
            y: y+direction.move.y,
            width: 10,
            height: 10
          })&&
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
    path = map.findPath({
      x1: sx, y1: sy, x2: tx, y2: ty,
      test(sector){
        return sector.isWalkable();
      }
    })
  }while(!path);
  path.forEach(sector=> sector.setFloorSpecial());

} //end function
