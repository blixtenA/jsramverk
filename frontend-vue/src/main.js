import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import RenderMainView from "./components/RenderMainView.vue";
import RenderTicketView from "./components/RenderTicketView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: RenderMainView,
  },
  {
    path: "/ticket/:selectedItem",
    name: "ticket",
    component: RenderTicketView,
    props: true,
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
