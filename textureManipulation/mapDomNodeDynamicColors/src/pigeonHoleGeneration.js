const hallwayLengthMean = 5;
const hallwayLengthSigma = 1.4; // standard deviation = sigma
const minRoomSize = 2;
const maxRoomSize = 5;
const directions = ['north', 'south', 'east', 'west'];

// Given a mean and standard deviation, compute a random length
function getHallwayLength () {
  const X = Math.random() * Math.PI * 2;
  const Y = Math.random();
  const r = hallwayLengthSigma * Math.sqrt(-2 * Math.log(Y));
  // x = r*Math.cos(X)+hallwayLengthMean,
  const y = r * Math.sin(X) + hallwayLengthMean;

  return y | 0 || 1; // we're on a grid, can't have partial/0 hallway lengths
} // end getHallwayLength()

function getTargetCoordinates ({ x, y, direction, length, w, h }) {
  let result; const r = Math.random() < 0.5 ? 1 : -1;

  if (direction === 'north') {
    result = { x: x + r * (w || 0), y: y - (length || h) };
  } else if (direction === 'south') {
    result = { x: x + r * (w || 0), y: y + (length || h) };
  } else if (direction === 'east') {
    result = { x: x + (length || w), y: y + r * (h || 0) };
  } else if (direction === 'west') {
    result = { x: x - (length || w), y: y + r * (h || 0) };
  } // end if
  return result;
} // end getTargetCoordinates()

// shuffles an array in place
function shuffle (array) {
  for (let i = array.length - 1, j; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } // end for
  return array;
} // end shuffle()

export function PHG (map, retry = 5) {
  let x = Math.floor(Math.random() * map.width / 2) + Math.floor(map.width / 4);
  let y = Math.floor(Math.random() * map.height / 2) + Math.floor(map.height / 4);
  const nodes = []; let leafs = []; let direction; let target; let path; let rooms = 0;

  nodes.push({ x, y, direction: 'north' });
  nodes.push({ x, y, direction: 'south' });
  nodes.push({ x, y, direction: 'east' });
  nodes.push({ x, y, direction: 'west' });
  shuffle(nodes);
  do {
    if (!direction) {
      [x, y, direction] = Object.values(nodes.pop());
    } else if (map.isPathEmpty(path)) {
      x = target.x; y = target.y;
      nodes.push({ x, y, direction: 'north' });
      nodes.push({ x, y, direction: 'south' });
      nodes.push({ x, y, direction: 'east' });
      nodes.push({ x, y, direction: 'west' });
      path.forEach(p => {
        if (map.isEmpty(p.x, p.y)) map.setCorridor(p.x, p.y);
      });
      shuffle(nodes);
      rooms += buildRooms(JSON.parse(JSON.stringify(path)));
      leafs = [].concat(
        leafs,
        ...JSON.parse(JSON.stringify(path))
          .map(p => directions.map(direction => {
            return { x: p.x, y: p.y, direction };
          }))
      );
      path.length = 0;
      continue;
    } else if (nodes.length) {
      [x, y, direction] = Object.values(nodes.pop());
    } else if (leafs.length) {
      [x, y, direction] = Object.values(leafs.pop());
    }// end if
    target = getTargetCoordinates({ x, y, direction, length: getHallwayLength() });
    path = map.getPath(x, y, target.x, target.y);
  } while (nodes.length || leafs.length);

  // we require a certain percentage of the screen to be populated
  // with rooms; otherwise we restart the process.
  const requiredRooms = map.width * map.height / Math.pow(maxRoomSize, 2) / 2;

  // if we don't meet the requiredRooms and we still have retries left then
  // go ahead and retry; otherwise accept the current result
  if (rooms > requiredRooms) {
    wallifyCorridors();
  } else if (!retry) {
    wallifyCorridors();
  } else {
    map.reset();
    PHG(map, retry - 1);
  } // end if

  function buildRooms (path) {
    let rooms = 0;

    while (path.length) {
      shuffle(path);
      shuffle(directions);
      const [ox, oy] = Object.values(path.pop());

      // sometimes a path has been closed, only try to build if we know
      // we can connect it to a hallway/floor
      // eslint-disable-next-line complexity,curly,no-loop-func
      if (map.isWalkable(ox, oy)) directions.find(direction => {
        let result = false;
        let x = ox; let y = oy; // restore values before last try

        const w = Math.floor(Math.random() * (maxRoomSize - minRoomSize) + minRoomSize);
        const h = Math.floor(Math.random() * (maxRoomSize - minRoomSize) + minRoomSize);
        const t = getTargetCoordinates({ x, y, direction, w, h });
        if (direction === 'north') {
          y -= 1; t.y -= 1;
          if (x < t.x) { x -= w / 2 | 0; t.x -= w / 2 | 0; } else { x += w / 2 | 0; t.x += w / 2 | 0; }
        } else if (direction === 'south') {
          y += 1; t.y += 1;
          if (x < t.x) { x -= w / 2 | 0; t.x -= w / 2 | 0; } else { x += w / 2 | 0; t.x += w / 2 | 0; }
        } else if (direction === 'east') {
          x += 1; t.x += 1;
          if (y < t.y) { y -= h / 2 | 0; t.y -= h / 2 | 0; } else { y += h / 2 | 0; t.y += h / 2 | 0; }
        } else if (direction === 'west') {
          x -= 1; t.x -= 1;
          if (y < t.y) { y -= h / 2 | 0; t.y -= h / 2 | 0; } else { y += h / 2 | 0; t.y += h / 2 | 0; }
        } // end if
        if (map.isSquareEmpty(x, y, t.x, t.y)) {
          map.fillRoom(x, y, t.x, t.y);
          result = true;
          if (direction === 'north' && map.isCorridor(Math.floor((x + t.x) / 2), y + 1)) {
            map.setDoor(Math.floor((x + t.x) / 2), y);
          } else if (direction === 'north' && map.isCorridor(Math.ceil((x + t.x) / 2), y + 1)) {
            map.setDoor(Math.ceil((x + t.x) / 2), y);
          } else if (direction === 'south' && map.isCorridor(Math.floor((x + t.x) / 2), y - 1)) {
            map.setDoor(Math.floor((x + t.x) / 2), y);
          } else if (direction === 'south' && map.isCorridor(Math.ceil((x + t.x) / 2), y - 1)) {
            map.setDoor(Math.ceil((x + t.x) / 2), y);
          } else if (direction === 'east' && map.isCorridor(x - 1, Math.floor((y + t.y) / 2))) {
            map.setDoor(x, Math.floor((y + t.y) / 2));
          } else if (direction === 'east' && map.isCorridor(x - 1, Math.ceil((y + t.y) / 2))) {
            map.setDoor(x, Math.ceil((y + t.y) / 2));
          } else if (direction === 'west' && map.isCorridor(x + 1, Math.floor((y + t.y) / 2))) {
            map.setDoor(x, Math.floor((y + t.y) / 2));
          } else if (direction === 'west' && map.isCorridor(x + 1, Math.ceil((y + t.y) / 2))) {
            map.setDoor(x, Math.ceil((y + t.y) / 2));
          } // end if
          rooms++;
        } // end if
        return result;
      });
    } // end while()
    return rooms;
  } // end buildRoom()

  // surround the corridors that arent surrounded with walls yet with walls now.
  function wallifyCorridors () {
    map.sectors.forEach((row, y) => {
      // eslint-disable-next-line complexity
      row.forEach((sector, x) => {
        if (sector.isCorridor()) {
          if (x > 0 && map.isEmpty(x - 1, y)) map.setWall(x - 1, y);
          if (x > 0 && y > 0 && map.isEmpty(x - 1, y - 1)) map.setWall(x - 1, y - 1);
          if (y > 0 && map.isEmpty(x, y - 1)) map.setWall(x, y - 1);
          if (y > 0 && x < map.width - 1 && map.isEmpty(x + 1, y - 1)) map.setWall(x + 1, y - 1);
          if (x < map.width - 1 && map.isEmpty(x + 1, y)) map.setWall(x + 1, y);
          if (x < map.width - 1 && y < map.height - 1 && map.isEmpty(x + 1, y + 1)) map.setWall(x + 1, y + 1);
          if (y < map.height - 1 && map.isEmpty(x, y + 1)) map.setWall(x, y + 1);
          if (y < map.height - 1 && x > 0 && map.isEmpty(x - 1, y + 1)) map.setWall(x - 1, y + 1);
        } // end if
      });
    });
  } // end wallifyCorridors()
} // end function
