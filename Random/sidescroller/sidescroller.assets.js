var assets={
  brick:[
    [0,    0,   0.5, 0.3],
    [0.55, 0,   0.45,0.3],
    [0,    0.35,0.2, 0.3],
    [0.25, 0.35,0.5, 0.3],
    [0.8,  0.35,0.2, 0.3],
    [0,    0.7, 0.5, 0.3],
    [0.55, 0.7, 0.45,0.3]
  ],
  scale: 50,
  grass:{ color: '#F82' }
};
var player={
  x: v.w/2, //x location
  y: 0, //y location
  w: 50, //width of player
  h: 50, //height of player
  s: 1, //speed of the player
  c: '#BDB', //color of player
  key:{ //key activation must be smooth and staged so multiple keys can be pressed at the same time
    right: false,
    up: false,
    left: false
  },
  jump:{
    is: false, //are we currently jumping
    d: 1, //direction of jump
    a: 100, //destination jump value
    c: 0,  //current jump value
    s: 0.1 //speed of the
  },
  dirty:[],
  perform:{
    jump:function jump(object){
      if(object.jump.d==1){
        object.jump.is=true;
        object.dirty.push(function(){object.jump.c++;});
        if(object.jump.c==object.jump.a)object.jump.d=0;
      }else{
        object.dirty.push(function(){object.jump.c--;});
      } //end if
      if(object.jump.c!==0||object.jump.d==1){
        setTimeout(function(){jump(object)},1);
      }else{
        object.jump.is=false;object.jump.d=1;
      } //end if
    }
  }
};
