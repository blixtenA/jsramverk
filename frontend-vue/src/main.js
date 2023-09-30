import { createApp} from 'vue';
import router from './router';
import App from './App.vue';

let app = "";
let containerSelector = "#app";

const mountPoint = document.querySelector(containerSelector);

if (mountPoint && mountPoint.__vue_app__ !== undefined) {
    app = mountPoint.__vue_app__._instance.proxy;
}
else {
    app = createApp(App);
    app.use(router);
    app.mount(containerSelector);
}