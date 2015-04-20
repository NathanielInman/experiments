// Notate that the module loaded and its imports
console.log('loading data-model/map.js [::Map]');

// Begin the actual module by importing Map and exporting the map instance
import { Map } from 'engine/object-model/Map';

// Export the instance of the Map class
export var map = new Map();
