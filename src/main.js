import { createApp } from "vue";
import App from "./App.vue";
import faceapi from "./plugins/faceapi";

const app = createApp(App);
app.use(faceapi);
app.mount("#app");
