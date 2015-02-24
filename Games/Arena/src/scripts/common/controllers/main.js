/*
 *     .---.   ___.-.  .--.    ___ .-.     .---.
 *   / .-, \ (   )   \/    \  (   )   \   / .-, \
 *  (__) ; |  | ' .-. ; .-. ;  |  .-. .  (__) ; |
 *    .'`  |  |  / (___)| | |  | |  | |    .'`  |
 *   / .'| |  | |    |  |/  |  | |  | |   / .'| |
 *  | /  | |  | |    |  ' .'   | |  | |  | /  | |
 *  ; |  ; |  | |    |  .'.-.  | |  | |  ; |  ; |
 *  ' `-'  |  | |    '  `-' /  | |  | |  ' `-'  |
 *  `.__.'_. (___)    `.__.'  (___)(___) `.__.'_.
 * February 11th, 2015 by Nathaniel Inman
 *
 * Meant to test abilities using Plains of Sedia and ETB data.
 **********************************/

outputCache = []; //@Global

/**
 * The main application function
 *
 * @type {VOID} Function returns no value
 */
function app() {
  "use strict";

  // Setup the two creatures that will attack each other
  var c1 = new Database.Creature("{r|C1|}");
  var c2 = new Database.Creature("{g|C2|}");

  // When resizing or reloading canvas re-configure the font sizes
  // and other factors that are lost at reload
  Easel.config=function(){
    window.fontRatio = 0.02;
    window.fontSize = (v.w * fontRatio)|0;
    window.scrollOffset = 0; //this is used to scroll the main text during overflow
    ctx.font = window.fontSize + "px Courier New";
    ctx.textAlign = 'center';
    ctx.imageSmoothingEnabled = false;
  };

  // When the browser requires a redraw, or information is changed and
  // the app needs to update the view, call this function
  Easel.onDraw=function(){ 
    printCreatures(c1,c2);
  };

  // Go ahead and start the application by initializing the first tick. It
  // continues to call itself until a create dies
  tick(c1,c2);
} //end app()
