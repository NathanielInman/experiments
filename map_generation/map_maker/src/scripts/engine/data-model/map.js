// Begin the actual module by importing Map and exporting the map instance
import { Map } from 'engine/object-model/Map';

// Notate that the module loaded and its imports
$('.rollbar').append('<br/>loading data-model/map.js [::Map]');

// Export the instance of the Map class
export var map = new Map();
