// Notate the loading of the module
console.log('loading controllers/components/loader.js');

// Begin the actual module. We use a function so we can extend the function
// dynamically
var loader = function(){};
loader.environments = {
  get:function(){ return loader.environments.status; },
  done:function(res){
    console.log('Finished loading environments.');
    console.log('Populating environment combobox.');
    var select = document.getElementById('environments');
    for (let i = 0; i<res.length; i++){
        var opt = document.createElement('li');
        opt.innerHTML = '<a href="#'+i+'">['+(1+i)+'/'+res.length+'] '+res[i].name+'</a>';
        select.appendChild(opt);
    } //end for
    if(typeof loader.environments.onLoad === 'function')loader.environments.onLoad(); //callback attached
    console.log('Environment combobox populated.');
    loader.environments.status=true;
    loader.evaluate();
  },
  status: false //indicates whether it's done loading or not (true = finished)
};
loader.evaluate = function(){
  if(loader.environments.get()){
    return true;
  }else{
    return false;
  } //end if
};
export { loader };
