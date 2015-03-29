// Import all the deliverable components of the engine
import { draw        } from 'engine/controllers/draw/main';
import { keydown     } from 'engine/controllers/input/keydown';
import { mousedown   } from 'engine/controllers/input/mousedown';
import { mouseup     } from 'engine/controllers/input/mouseup';
import { mousemove   } from 'engine/controllers/input/mousemove';
import { location    } from 'engine/controllers/input/mouselocation';
import { map         } from 'engine/data-model/map';
import { creature    } from 'engine/data-model/creature';
import { environment } from 'engine/data-model/environment';
import { floor       } from 'engine/data-model/floor';
import { wall        } from 'engine/data-model/wall';
import { components  } from 'engine/data-model/components';

// Create the deliverable structure for the engine.
var Engine = function(){};
Engine.prototype.draw = draw;
Engine.prototype.input = {};
Engine.prototype.input.mousedown = mousedown;
Engine.prototype.input.mouseup = mouseup;
Engine.prototype.input.mousemove = mousemove;
Engine.prototype.input.keydown = keydown;
Engine.prototype.input.mouselocation = location;
Engine.prototype.map = map;
Engine.prototype.database = {};
Engine.prototype.database.creature = creature;
Engine.prototype.database.environment = environment;
Engine.prototype.database.floor = floor;
Engine.prototype.database.wall = wall;

// Export the engine
export { Engine };
