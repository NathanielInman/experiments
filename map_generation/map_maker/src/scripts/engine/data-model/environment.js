import { jQuery } from 'vendor/jquery-2.1.3.min';
import { loader } from 'engine/controllers/components/loader';

var environment = function(){};
$.ajax('http://localhost:5000/world/environments/')
  .done(function(res,status){
    if(status==='success'){
      loader.environments.done();
      environment.data = res;
    }else{
      console.log('Environment resource error: ',arguments);
    } //end if
  });
export { environment };
