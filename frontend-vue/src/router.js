// router.js
<<<<<<< HEAD
import { createRouter, createWebHashHistory } from "vue-router";
import RenderMainView from "./components/RenderMainView.vue";
=======
import { createRouter, createWebHashHistory } from 'vue-router';
import RenderMainView from './components/RenderMainView.vue';
>>>>>>> cf083d4a604f17b3d34f2cd944f9c3a9a1749613

const routes = [
    {
        path: "/",
        name: "main",
        component: RenderMainView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log("Navigating to:", to.path);
    next();
});

export default router;
