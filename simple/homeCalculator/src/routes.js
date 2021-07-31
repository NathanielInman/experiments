import { createWebHistory, createRouter } from 'vue-router';
import { helpRoute } from './routes/help/';
import Dashboard from './routes/Dashboard';

const routes = [
  ...helpRoute,
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/:catchAll(.*)', redirect: '/dashboard'}
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
