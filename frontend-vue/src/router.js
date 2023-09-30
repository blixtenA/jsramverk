// router.js
import { createRouter, createWebHistory } from 'vue-router';
import RenderMainView from './components/RenderMainView.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: RenderMainView,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
  });
  
  export default router;