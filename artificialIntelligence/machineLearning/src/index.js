import '@babel/polyfill';
import './index.styl';
import 'buefy/dist/buefy.min.css'
import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';

// Ensure production gets no vue messages and dev gets correct ones
Vue.config.devtools = false;
if(process.env.NODE_ENV==='production'){
  Vue.config.silent = true;
  Vue.config.productionTip = false;
} //end if

// Ensure that we're using the official vue router
Vue.use(Buefy);

// initialize the application
new Vue({
  el: 'app',
  render: h=> h(App)
});
