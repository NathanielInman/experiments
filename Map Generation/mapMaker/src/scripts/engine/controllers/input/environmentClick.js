import { map } from 'engine/data-model/map';
import { draw } from 'engine/controllers/draw/main';
import { hex2rgba } from 'engine/controllers/draw/hex2rgba';

export function environmentListClick(e){
  console.log('a',e)
  if(e.target.hash){
      map.setEnvironment(e.target.hash.replace('#',''));
      $(this).find('.selected').removeClass('selected');
      $(e.target).addClass('selected');
      $('#environments').hide();
  } //end if
  draw();
}

export function environmentBtnClick(e){
  console.log('b',e)
  if($('#environments').is(':visible')){
    $('#environments').hide();
  }else{
    $('#environments').show();
  } //end if
}

export function environmentBtnDown(e){
  let d = true;
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().background.value;
  var s1 = 1.5,s2=1,s3=0.6;
  if(d){ s1*=0.9;s2*=0.9;s3*=0.9; } //if we're being pressed, lower the shading levels
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
  console.log(c);
}

export function environmentBtnOver(e){
  let v = true;
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().background.value;
  var s1 = 1.5,s2=1,s3=0.6;
  if(v){ s1*=1.2;s2*=1.2;s3*=1.2; } //if we're hovering, raise the shading levels
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
  console.log(c);
}

export function environmentBtnOut(e){
  let comboButton = $('#changeEnvironment');
  let c = map.getEnvironment().background.value;
  var s1 = 1.5,s2=1,s3=0.6;
  comboButton.css('background','-webkit-linear-gradient(-90deg,'+hex2rgba(c,{r:s1,g:s1,b:s1},0.5)+','+hex2rgba(c,{r:s2,g:s2,b:s2},0.5)+' 30%,'+hex2rgba(c,{r:s3,g:s3,b:s3},0.5)+' 50%)');
  comboButton.css('color','#000');
  console.log(c);
}
