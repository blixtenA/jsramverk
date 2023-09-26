import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import RenderMainView from "./components/RenderMainView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: RenderMainView,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
