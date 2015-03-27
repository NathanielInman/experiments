// Import all the deliverable components of the engine
import { draw        } from 'engine/controllers/draw/main';
import { sector      } from 'engine/controllers/draw/sector';
import { sizes       } from 'engine/controllers/draw/sizes';
import { keydown     } from 'engine/controllers/input/keydown';
import { mousedown   } from 'engine/controllers/input/mousedown';
import { mouseup     } from 'engine/controllers/input/mouseup';
import { location    } from 'engine/controllers/input/mouselocation';
import { map         } from 'engine/controllers/map/collection';
import { creature    } from 'engine/data-model/creature';
import { environment } from 'engine/data-model/environment';
import { floor       } from 'engine/data-model/floor';
import { wall        } from 'engine/data-model/wall';
import { hex2rgba    } from 'engine/controllers/draw/hex2rgba';

// Create the deliverable structure for the engine.
var Engine = function(){};
Engine.prototype.hex2rgba = hex2rgba;
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

// Export the engine
export { Engine };
