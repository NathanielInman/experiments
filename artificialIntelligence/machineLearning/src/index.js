import './index.styl';
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import { createApp} from 'vue';
import App from './App.vue';

// initialize the application
createApp(App)
  .use(PrimeVue)
  .mount('app');
