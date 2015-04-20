/**
 * hex2rgb takes a hex value and converts it to an rgb. Optionally an alpha value
 * may be passed in the options variable as a string or decimal (i.e. 0-1) to apply
 * this alpha value to the end rgb. Also optional, is the ability to apply strength
 * values to either r,g or b by passing decimals (i.e. 0-1) through an object so that
 * the resulting rgb value is tempered by these weights such that hex2rgb('#FFF',{r:0.5,g:0.5,b:0.5,a:0.9})
 * would result in rgba(136,136,136,0.9) instead of rgba(255,255,255,0.9). Additionally
 * lower and upper threshholds may be supplied to ensure that the result is brighter
 * than the lower threshold or darker than the upper threshold. These thresholds are passed
 * as a decimal (i.e. 0-1) value such that a threshold of 0 is black and a threshold of
 * 1 is white.
 *
 * @param  {String} hex                     The value that is to be converted
 * @param  {String||Number||Object} options Optional values to restructure the value
 * @param  {Float} lt                       Optional lower brightness threshold
 * @param  {Float} ut                       Optional upper brightness threshold
 * @return {String}                         The rgba converted value from hex
 */
 console.log('loading controllers/draw/hex2rgba.js');
 export function hex2rgba(hex,options,lt,ut){
  var r,g,b,o=options||1,result = /^#?([a-f\d]{2}|[a-f\d]{1})([a-f\d]{2}|[a-f\d]{1})([a-f\d]{2}|[a-f\d]{1})$/i.exec(hex);
  var clt = function(){ return !lt || (r+g+b)/3/255 >= lt; };
  var cut = function(){ return !ut || (r+g+b)/3/255 <= ut; };
  var cot = function(){ if(r>255)r=255;if(g>255)g=255;if(b>255)b=255; };
  if(!result)return 'rgba(0,0,0,0)';
  result.forEach(function(i,j,k){ if(i.length==1)k[j]=i+i; });
  r = parseInt(result[1],16); g = parseInt(result[2],16); b = parseInt(result[3],16);
  if(!(clt()&&cut())&&!clt()||!cut())(function(){
    for(let i=0;i<1000&&(!clt()||!cut());i++){
      if(!clt()){
        r*=1.01;g*=1.01;b*=1.01;
      } //end if
      if(!cut()){
        r*=0.99;g*=0.99;b*=0.99;
      }//end if
      cot();
    } //end for
    r=parseInt(r);g=parseInt(g);b=parseInt(b);
  })();
	if(typeof o=='string'||typeof o=='number'){
		return 'rgba('+r+','+g+','+b+','+o+')';
  }else if(typeof o=='object'){
    r=parseInt(r*o.r);g=parseInt(g*o.g);b=parseInt(b*o.b);o=o.a||1;
    cot();
    return 'rgba('+r+','+g+','+b+','+o+')';
	}else{
		return 'rgba(0,0,0,0)';
	} //end if
}
