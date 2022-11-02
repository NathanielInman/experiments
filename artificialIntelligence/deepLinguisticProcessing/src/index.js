import './index.styl';
import 'primeflex/primeflex.css'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import Tag from 'primevue/tag';
import { createApp } from 'vue';
import App from './App.vue';

// initialize the application
createApp(App)
  .use(PrimeVue)
  .component('tag', Tag)
  .directive('tooltip', Tooltip)
  .mount('app');
