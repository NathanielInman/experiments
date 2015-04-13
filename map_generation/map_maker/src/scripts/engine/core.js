// Import all the deliverable components of the engine
import { draw                 } from 'engine/controllers/draw/main';
import { keydown              } from 'engine/controllers/input/keydown';
import { mousedown            } from 'engine/controllers/input/mousedown';
import { mouseup              } from 'engine/controllers/input/mouseup';
import { mousemove            } from 'engine/controllers/input/mousemove';
import { location             } from 'engine/controllers/input/mouselocation';
import { environmentListClick } from 'engine/controllers/input/environmentClick';
import { environmentBtnClick  } from 'engine/controllers/input/environmentClick';
import { environmentBtnDown   } from 'engine/controllers/input/environmentClick';
import { environmentBtnOver   } from 'engine/controllers/input/environmentClick';
import { environmentBtnOut    } from 'engine/controllers/input/environmentClick';
import { map                  } from 'engine/data-model/map';
import { creature             } from 'engine/data-model/creature';
import { environment          } from 'engine/data-model/environment';
import { floor                } from 'engine/data-model/floor';
import { wall                 } from 'engine/data-model/wall';
import { components           } from 'engine/data-model/components';

var Engine = function(){};
Engine.prototype.draw = draw;
Engine.prototype.input = {};
Engine.prototype.input.mousedown = mousedown;
Engine.prototype.input.mouseup = mouseup;
Engine.prototype.input.mousemove = mousemove;
Engine.prototype.input.keydown = keydown;
Engine.prototype.input.mouselocation = location;
Engine.prototype.input.environmentListClick = environmentListClick;
Engine.prototype.input.environmentBtnClick = environmentBtnClick;
Engine.prototype.input.environmentBtnDown = environmentBtnDown;
Engine.prototype.input.environmentBtnOver = environmentBtnOver;
Engine.prototype.input.environmentBtnOut = environmentBtnOut;
Engine.prototype.database = {};
Engine.prototype.database.creature = creature;
Engine.prototype.database.environment = environment;
Engine.prototype.database.floor = floor;
Engine.prototype.database.wall = wall;
Engine.prototype.onReady = function(){
  console.log('on-ready of engine called');
  this.map = map; //make sure to link the map after everything is loaded
  this.draw();
} //end if

// Export the engine
export { Engine };
