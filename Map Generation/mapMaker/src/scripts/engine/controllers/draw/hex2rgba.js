export function hex2rgba(hex,alpha){
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex=hex.replace(shorthandRegex,function(m,r,g,b) { return r+r+g+g+b+b; });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if(result&&(typeof alpha=='string'||typeof alpha=='number')){
		return 'rgba('+parseInt(result[1],16)+','+parseInt(result[2],16)+','+parseInt(result[3],16)+','+alpha+')';
  }else if(result&&(typeof alpha=='object')){
    result=(function(r,g,b,a){
      r*=a.r;g*=a.g;b*=a.b;
      if(r>255)r=255;if(g>255)g=255;if(b>255)b=255;
      return {r:parseInt(r),g:parseInt(g),b:parseInt(b),a:a.a||1}
    })(parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16),alpha);
    return 'rgba('+result.r+','+result.g+','+result.b+','+result.a+')'
	}else{
		return 'rgba(0,0,0,0)';
	} //end if
}
