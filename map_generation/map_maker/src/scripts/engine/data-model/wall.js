// Begin the actual module by importing its requirements
import { jQuery } from 'vendor/jquery-2.1.3.min';
import { loader } from 'engine/controllers/components/loader';

// Notate that the module loaded and its imports
$('.debug').append('<br/>loading data-model/wall.js [::jQuery,loader]');

// begin the actual module by exporting the wall database
var wall = function(){};
$.ajax('http://localhost:5000/world/walls')
  .done(function(res,status){
    if(status==='success'){
      wall.data = res;
      loader.walls.done(res); //pas response obj to loader
    }else{
      console.log('Walls resource error: ',arguments);
    } //end if
  });
export { wall };
