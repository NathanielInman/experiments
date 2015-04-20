console.log('loading data-model/floor.js');
export var floor = [
  {id:0, name:'empty',        character:' ',color:'#000',background:'#000',liquid:false,emitLight:false,string:'move', damage:false},
  {id:1, name:'dirt',         character:'.',color:'#210',background:'#431',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:2, name:'lava',         character:'~',color:'#A11',background:'#511',liquid:true, emitLight:{r:175,g:0,b:0,a:0.6,strength:1.0,shadow:false,color:true,override:true}, string:'wade', damage:{string:'Lava burns you for 2 damage.',value:2}},
  {id:3, name:'water',        character:'~',color:'#55A',background:'#224',liquid:true, emitLight:false,string:'swim', damage:false},
  {id:4, name:'grass',        character:',',color:'#261',background:'#131',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:5, name:'snow',         character:'"',color:'#69F',background:'#CCC',liquid:false,emitLight:false,string:'tread',damage:false},
  {id:6, name:'sand',         character:'`',color:'#FF9',background:'#DD5',liquid:false,emitLight:{r:175,g:125,b:0,a:0.4,strength:0.5,shadow:false,color:true,override:true},string:'tread',damage:false},
  {id:7, name:'rocky',        character:'^',color:'#555',background:'#444',liquid:false,emitLight:false,string:'climb',damage:false},
  {id:8, name:'muddy',        character:';',color:'#431',background:'#210',liquid:false,emitLight:false,string:'tread',damage:false},
  {id:9, name:'cobbled',      character:':',color:'#110',background:'#333',liquid:false,emitLight:false,string:'jaunt',damage:false},
  {id:10,name:'wood',         character:'=',color:'#210',background:'#421',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:11,name:'dirt and rock',character:'*',color:'#211',background:'#431',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:12,name:'underground',  character:'.',color:'#112',background:'#334',liquid:false,emitLight:false,string:'step', damage:false},
  {id:13,name:'sandstone',    character:'=',color:'#553',background:'#442',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:14,name:'brick',        character:':',color:'#533',background:'#422',liquid:false,emitLight:false,string:'walk', damage:false},
  {id:15,name:'ice',          character:'+',color:'#55D',background:'#44A',liquid:false,emitLight:false,string:'slide', damage:false}
];
