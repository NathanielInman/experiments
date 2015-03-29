import { map } from 'engine/data-model/map';

export var components = [
  function(){
    return {
      type : 'background',
      x    : 0,
      y    : 0,
      w    : v.w,
      h    : v.h,
      c    : map.environment.background.value
    }
  },
  function(){
    return {
      type : 'mapper',
      x    : 0,
      y    : 0,
      w    : (v.w<v.h?v.w:v.h), //needs to be a box, w&&h are equal take smallest
      h    : (v.w<v.h?v.w:v.h) //needs to be a box, w&&h are equal take smallest
    }
  },
  function(){
    return {
      type : 'background',
      x    : (v.w<v.h?v.w:v.h)+1,
      y    : 0,
      w    : v.w-(v.w<v.h?v.w:v.h),
      h    : v.h,
      c    : 'rgba(0,0,0,0.2)'
    }
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
    }
  },
  function(){
    return {
      type : 'button',
      x    : (v.w<v.h?v.w:v.h)+4,
      y    : 10,
      w    : 200,
      h    : 40,
      r    : 20,
      t    : 'testBtn',
      c    : map.environment.background.value,
      v    : !(this instanceof window.constructor)?this.v:false
    };
  }
];
