// Notate the loading of the module and it's imports
$('.rollbar').append('<br/>loading controllers/components/background.js');

// Begin the actual module
export var background = {
  draw(options){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||200,
        h = options.h||40,
        c = options.c||'#000';

    ctx.fillStyle=c;
    ctx.fillRect(x,y,w,h);
  }
};
