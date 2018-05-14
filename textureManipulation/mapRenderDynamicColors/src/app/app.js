import './app.styl';
import {PHG} from './pigeonHoleGeneration';
import {Map} from './Map';

let map = new Map(49,49),
    content = '';

PHG(map); //perform pigeon hole generation
map.sectors.forEach(row=>{
  row.forEach(sector=>{
    if(sector.isEmpty()){
      content+='<div class="cell" type=""></div>'
    }else if(sector.isWall()){
      content+='<div class="cell" type="%">%</div>'
    }else if(sector.isDoor()){
      content+='<div class="cell" type="+">+</div>'
    }else if(sector.isCorridor()){
      content+='<div class="cell" type="*">*</div>'
    }else{
      content+='<div class="cell" type=".">.</div>'
    } //end if
  });
});
document.querySelector('app').innerHTML=content;
document.querySelector('app').classList.add('grid');
