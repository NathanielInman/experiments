// Import all the deliverable components of the engine
import { arrows } from 'engine/draw/arrows';
import { draw } from 'engine/draw/main';
import { sector } from 'engine/draw/sector';
import { mousedown } from 'engine/input/mousedown';
import { mouseup } from 'engine/input/mouseup';
import { location } from 'engine/input/mouselocation';
import { map  } from 'engine/map/collection';

// Create the deliverable structure for the engine.
var Engine = function(){};
Engine.prototype.draw = draw;
Engine.prototype.draw.arrows = arrows;
Engine.prototype.draw.sector = sector;
Engine.prototype.input = {};
Engine.prototype.input.mousedown = mousedown;
Engine.prototype.input.mouseup = mouseup;
Engine.prototype.input.mouselocation = location;
Engine.prototype.map = map;

// Export the engine
export { Engine };
