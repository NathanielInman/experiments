// Random number function that returns a random integer between min and max
// generator is INCLUSIVE not exclusive on upperbound like some generators
function r(min,max){
  return Math.floor(min+Math.random()*(1+max-min))
} //end r()

// Creates the entire matrix for the arcade character
function generateIcon(){
  return [
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a],
    [a=r(0,1),b=r(0,1),c=r(0,1),r(0,1),c,b,a]
  ];
} //end generateMatrix()

function app() {
  'use strict';

  var arcadeIcon,
      color,
      columns = 10,
      rows = 5,
      cellWidth = v.w/columns,
      cellHeight = v.h/rows,
      pointWidth = cellWidth/9,
      pointHeight = cellHeight/9;

  for(var x=0;x<columns;x++){
    for(var y=0;y<rows;y++){
      arcadeIcon = generateIcon();
      color = 'rgb('+r(100,255)+','+r(100,255)+','+r(100,255)+')';
      for(var col=0;col<arcadeIcon.length;col++){
        for(var row=0;row<arcadeIcon[col].length;row++){
          if(arcadeIcon[col][row]){
            ctx.fillStyle=color;
          }else{
            ctx.fillStyle='#000';
          } //end if
          ctx.fillRect(x*cellWidth+row*pointWidth+pointWidth,
                       y*cellHeight+col*pointHeight+pointHeight,
                       pointWidth+1,pointHeight+1);
        } //end for
      } //end for
    } //end for
  } //end for
  Easel.onDraw=function(){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,v.w,v.h);
    app();
  };
} //end app()
