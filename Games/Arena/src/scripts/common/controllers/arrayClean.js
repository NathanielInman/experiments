/**
 * Clean function extension for array allows the array to
 * iterate through it's entries and remove all those that have
 * no values within them, or values that are falsy, these
 * include: undefined, null, 0, false, NaN, ''
 *
 * @return {Array} Returns the finished array result
 */
Array.prototype.clean = function(){
  for(var i=0;i<this.length;i++){
    if(!this[i]){
      this.splice(i,1);
      i--;
    } //end if
  } //end for
  return this;
};
