export function hex2rgba(hex,alpha){	
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex=hex.replace(shorthandRegex,function(m,r,g,b) {
      return r+r+g+g+b+b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if(result){
		return 'rgba('+parseInt(result[1],16)+','+parseInt(result[2],16)+','+parseInt(result[3],16)+','+alpha+')';
	}else{
		return 'rgba(0,0,0,0)';
	} //end if
}
