// Notate the loading of the module in the debugger
$('.debug').append('loading controllers/components/loader.js');

// Begin the actual module. We use a function so we can extend the function dynamically
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
  status: false
};
loader.walls = {
  get:function(){ return loader.walls.status; },
  done:function(res){
    console.log('Finished loading walls.');
    if(typeof loader.walls.onLoad === 'function')loader.walls.onLoad();
    loader.walls.status=true;
    loader.evaluate();
  },
  status: false
};
loader.floors = {
  get:function(){ return loader.floors.status; },
  done:function(res){
    console.log('Finished loading floors.');
    if(typeof loader.floors.onLoad === 'function')loader.floors.onLoad();
    loader.floors.status=true;
    loader.evaluate();
  }
}
loader.evaluate = function(){
  if(loader.environments.get() &&
     loader.walls.get() &&
     loader.floors.get()){
    return true;
  }else{
    return false;
  } //end if
};
export { loader };
