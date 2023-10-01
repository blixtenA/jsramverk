// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import RenderMainView from './components/RenderMainView.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: RenderMainView,
  },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
  });
  
  export default router;