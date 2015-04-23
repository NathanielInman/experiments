// Begin the actual module by import it's requirements
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

// Notate the loading of the module in the debugger
$('.rollbar').append('<br/>loading controllers/components/combobox.js [::hex2rgba]');

// Begin the actual module by exporting the combobox
export var rollbar = {
  draw(options){
    console.log('redrawn');
    // Initialize variables
    var c = options.c||'#999',
        o = options.o||'#000',
        v = options.v||false;
        d = options.d||false;

    let rollbar = $('.rollbar');
    rollbar.css('background',hex2rgba(c,1,0.1,0.2));
    rollbar.css('border-color',hex2rgba(c,1,0.6));
    rollbar.css('color',hex2rgba(c,1,0.6));
  }
};
