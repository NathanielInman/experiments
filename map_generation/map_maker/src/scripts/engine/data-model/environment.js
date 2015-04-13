import { jQuery } from 'vendor/jquery-2.1.3.min';

var environment = function(){};
$.ajax('http://localhost:5000/world/environments/')
  .done(function(res,status){
    if(status==='success'){
      environment.data = res;
    }else{
      console.log('Environment resource error: ',arguments);
    } //end if
  });
export { environment };
