// Begin the actual module by import it's requirements
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

// Notate the loading of the module in the debugger
$('.debug').append('<br/>loading controllers/components/combobox.js [::hex2rgba]');

// Begin the actual module by exporting the combobox
export var combobox = {
  draw:function(options){
    // Initialize variables
    var x = options.x||0,
        y = options.y||0,
        w = options.w||200,
        h = options.h||40,
        r = options.r||20,
        t = options.t||['default'],
        c = options.c||'#999',
        o = options.o||'#000',
        i = options.i||0,  //index of the text array
        v = options.v||false;
        d = options.d||false;

    let combo = $('#environments');
    combo.css('background',hex2rgba(c,1,0.1,0.2));
    combo.find('a').css('color',hex2rgba(c,1,0.7,0.9));
    combo.css('left',x+'px');
    combo.css('top',(y+h-31)+'px'); //the 23 comes from 2*10 padding plus border
    let comboButton = $('#changeEnvironment');
    comboButton.css('color','#000');
    comboButton.css('left',x+'px');
    comboButton.css('top',y+'px');
    comboButton.css('height',h+'px');
    comboButton.css('width',w+'px');
    var s1 = 1.5,s2=1,s3=0.6;
    if(d){ s1*=0.9;s2*=0.9;s3*=0.9; } //if we're being pressed, lower the shading levels
    if(v){ s1*=1.2;s2*=1.2;s3*=1.2; } //if we're hovering, raise the shading levels
    comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
    comboButton.css('color','#000');
  }
};
