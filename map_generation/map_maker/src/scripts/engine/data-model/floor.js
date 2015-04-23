// Begin the actual module by importing its requirements
import { jQuery } from 'vendor/jquery-2.1.3.min';
import { loader } from 'engine/controllers/components/loader';

// Notate that the module loaded and its imports
$('.rollbar').append('<br/>loading data-model/floor.js [::jQuery,loader]');

// Export the floor database
var floor = function(){};
$.ajax('http://localhost:5000/world/floors')
  .done(function(res,status){
    if(status==='success'){
      floor.data = res;
      loader.floors.done(res); //pass response obj to loader
    }else{
      console.log('Floor resource error: ',arguments);
    } //end f
  });
export { floor };
