// Declare the module loaded and its imports
console.log('loading data-model/components.js [::map,environment]');

// Begin the actual module by importing its requirements
import { map         } from 'engine/data-model/map';
import { environment } from 'engine/data-model/environment';

// A list of visual components that will be drawn on the canvas
export var components = [
  function(){
    return {
      type : 'background',
      x    : 0,
      y    : 0,
      w    : v.w,
      h    : v.h,
      c    : map.getEnvironment().color.value
    };
  },
  function(){
    return {
      type : 'mapper',
      x    : 0,
      y    : 0,
      w    : (v.w<v.h?v.w:v.h), //needs to be a box, w&&h are equal take smallest
      h    : (v.w<v.h?v.w:v.h) //needs to be a box, w&&h are equal take smallest
    };
  },
  function(){
    return {
      type : 'background',
      x    : (v.w<v.h?v.w:v.h)+1,
      y    : 0,
      w    : v.w-(v.w<v.h?v.w:v.h),
      h    : v.h,
      c    : 'rgba(0,0,0,0.2)'
    };
  },
  function(){
    return {
      type : 'pane',
      x    : (v.w<v.h?v.w:v.h)+10,
      y    : 10,
      w    : v.w-(v.w<v.h?v.w:v.h)-20,
      h    : v.h-20,
      r    : 20,
      c    : '#222',
      o    : '#333'
    };
  },
  function(){
    return {
      type : 'combobox',
      x    : (v.w<v.h?v.w:v.h)+15,
      y    : 15,
      w    : v.w-(v.w<v.h?v.w:v.h)-30,
      h    : 80,
      r    : 20,
      t    : (function(e){
               var result=[];
               e.forEach(function(k){ result.push(k.name); });
               return result;
             })(environment.data),
      i    : map.getEnvironmentIndex(),
      c    : map.getEnvironment().color.value,
      v    : !(this instanceof window.constructor)?this.v:false
    };
  }
];
