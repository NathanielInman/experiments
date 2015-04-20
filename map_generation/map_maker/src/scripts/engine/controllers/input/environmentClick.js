// At the beginning of the module notate it loaded and it's imports
console.log('loading controllers/input/environmentClick.js [::map,draw,hex2rgba,environment]');

// Begin the actual module by importing its requirements
import { map         } from 'engine/data-model/map';
import { draw        } from 'engine/controllers/draw/main';
import { hex2rgba    } from 'engine/controllers/draw/hex2rgba';
import { environment } from 'engine/data-model/environment';

export function environmentListClick(e){
  if(e.target.hash){
    // First start off by seeing if the new index is different from
    // the old index. If it is, then we need to iterate through all of
    // the created sectors re-appropriate new wall and floors that
    // are correct for the new environment. This is required because
    // not all environments allow all floor and wall types; such as a
    // volcanoe wouldn't allow a pool of water, and a pond wouldn't allow
    // a lavaflow sector.
    let newIndex = e.target.hash.replace('#','');
    let oldIndex = map.getEnvironmentIndex();
    if(newIndex !== oldIndex){
      let newFloors = environment.data[newIndex].floors;
      let newWalls = environment.data[newIndex].walls;
      for(let index in map.sector){
        map.sector[index].floor = newFloors[r(0,newFloors.length,1)];
        map.sector[index].wall = newWalls[r(0,newWalls.length,1)];
      } //end for
    } //end if

    // Remove the previously selected environment if it exists, and update
    // the environment to the new one, while hiding the dropdown list now
    // that an environment was selected.
    map.setEnvironment(newIndex);
    $(this).find('.selected').removeClass('selected');
    $(e.target).addClass('selected');
    $('#environments').hide();
  } //end if
  draw();
}

export function environmentBtnClick(e){
  if($('#environments').is(':visible')){
    $('#environments').hide();
  }else{
    $('#environments').show();
  } //end if
}

export function environmentBtnDown(e){
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().color.value;
  var s1 = 1.35,s2=0.9,s3=0.54;
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
}

export function environmentBtnOver(e){
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().color.value;
  let s1 = 1.8,s2=1.2,s3=0.72;
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
}

export function environmentBtnOut(e){
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().color.value;
  let s1 = 1.5,s2=1,s3=0.6;
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
}
