// Begin the actual module by importing its requirements
import { map         } from 'engine/data-model/map';
import { draw        } from 'engine/controllers/draw/main';
import { hex2rgba    } from 'engine/controllers/draw/hex2rgba';
import { environment } from 'engine/data-model/environment';

// Notate the loading of the module and its imports
$('.rollbar').append('<br/>loading controllers/input/rollbarClick.js [::map,draw,hex2rgba,environment]');

export function rollbarBtnClick(e){
  var that = $(this);
  if(that.css('width')==='40px'){
    that.css({width:'auto',height:'auto',left:'0px'}).removeClass('button');
  }else{
    that.css({left:'auto',width:'40px',height:'10px'}).addClass('button');
  } //end if
}

export function rollbarBtnDown(e){
  let c = map.getEnvironment().color.value;
  $('.rollbar').css('background',hex2rgba(c,1,0.1,0.15));
}

export function rollbarBtnOver(e){
  let c = map.getEnvironment().color.value;
  $('.rollbar').css('background',hex2rgba(c,1,0.15,0.2));
}

export function rollbarBtnOut(e){
  let c = map.getEnvironment().color.value;
  $('.rollbar').css('background',hex2rgba(c,1,0.1,0.15));
}
