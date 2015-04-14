export var loader = {
  environments:{
    get:function(){ return loader.environments.status },
    done:function(){
      console.log('Finished loading environments.');
      loader.environments.status=true;
      loader.evaluate();
    },
    status: false //indicates whether it's done loading or not (true = finished)
  },
  evaluate:function(){
    if(loader.environments.get()){
      return true;
    }else{
      return false;
    } //end if
  }
}
