// Import all the deliverable components of the engine
import { draw } from 'engine/draw/main';
import { sector } from 'engine/draw/sector';
import { mousedown } from 'engine/input/mousedown';
import { mouseup } from 'engine/input/mouseup';
import { keydown } from 'engine/input/keydown';
import { location } from 'engine/input/mouselocation';
import { map  } from 'engine/map/collection';
import { creature } from 'engine/database/creature';
import { environment } from 'engine/database/environment';
import { floor } from 'engine/database/floor';
import { wall } from 'engine/database/wall';
import { hex2rgba } from 'engine/draw/hex2rgba'; //utility only
import { sizes } from 'engine/draw/sizes';

// Create the deliverable structure for the engine.
var Engine = function(){};
Engine.prototype.draw = draw;
Engine.prototype.draw.sector = sector;
Engine.prototype.draw.sizes = sizes;
Engine.prototype.input = {};
Engine.prototype.input.mousedown = mousedown;
Engine.prototype.input.mouseup = mouseup;
Engine.prototype.input.keydown = keydown;
Engine.prototype.input.mouselocation = location;
Engine.prototype.map = map;
Engine.prototype.database = {};
Engine.prototype.database.creature = creature;
Engine.prototype.database.environment = environment;
Engine.prototype.database.floor = floor;
Engine.prototype.database.wall = wall;
Engine.prototype.hex2rgba = hex2rgba; //utility only


// Export the engine
export { Engine };
