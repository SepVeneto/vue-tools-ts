import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BcComponent from './components/bcComponent';

const app = createApp(App);
app.use(BcComponent);
app.use(store).use(router).mount("#app");
