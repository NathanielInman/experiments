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
