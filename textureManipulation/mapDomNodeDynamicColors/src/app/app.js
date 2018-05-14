import './app.styl';
import {PHG} from './pigeonHoleGeneration';
import {Map} from './Map';

let map = new Map(49,49),
    content = '', empty = 0;

PHG(map); //perform pigeon hole generation
map.sectors.forEach(row=>{
  row.forEach(sector=>{
    if(sector.isEmpty()){
      empty++;
    }else if(sector.isWall()){
      if(empty){
        content+=`<div class="cell" style="grid-column-end: span ${empty}"></div>`;
        empty=0;
      } //end if
      content+='<div class="cell" type="%">%</div>'
    }else if(sector.isDoor()){
      if(empty){
        content+=`<div class="cell" style="grid-column-end: span ${empty}"></div>`;
        empty=0;
      } //end if
      content+='<div class="cell" type="+">+</div>'
    }else if(sector.isCorridor()){
      if(empty){
        content+=`<div class="cell" style="grid-column-end: span ${empty}"></div>`;
        empty=0;
      } //end if
      content+='<div class="cell" type="*">*</div>'
    }else{
      if(empty){
        content+=`<div class="cell" style="grid-column-end: span ${empty}"></div>`;
        empty=0;
      } //end if
      content+='<div class="cell" type=".">.</div>'
    } //end if
  });
  if(empty){
    content+=`<div class="cell" style="grid-column-end: span ${empty}"></div>`;
    empty=0;
  }
});
document.querySelector('app').innerHTML=content;
document.querySelector('app').classList.add('grid');
