export function ajax(url,callback){
  var xhr;
  try{
    xhr = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  }catch(e){
    console.log(e);
    return;
  } //end try
  xhr.onreadystatechange = callback || function(){ if(xhr.readyState === 4){ console.log(xhr.responseText); }};
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send();
} //end ajax()
