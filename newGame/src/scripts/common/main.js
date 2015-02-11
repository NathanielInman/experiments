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
 * Meant to test abilities using Plains of Sedia and
 * Exploring The Bleak data.
 **********************************/

// JSHint Linting supplications
var ctx = ctx || function() {};
var v = v || {
  w: 0,
  h: 0
};
var r = r || function() {};
var Ion = Ion || function() {};
var outputCache=[];
var fontHeight = 16;
var heightOffset = 0;
ctx.font = fontHeight + "px Courier New";
ctx.textAlign = 'center';

/**
 * The main application function
 *
 * @type {VOID} Function returns no value
 */
function app() {
  "use strict";

  //Setup the two creatures that will attack each other
  var c1 = new Database.Creature();
  var c2 = new Database.Creature();
  tick(c1,c2);
  printCreatures(c1,c2); //begin updating of the view
} //end app()