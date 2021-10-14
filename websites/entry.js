import { createApp } from 'vue';
import bcComponent from 'basic-components';
import demoBlock from './components/demoBlock.vue'
import App from './app.vue';

import routes from './route.config'
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App);
app.use(bcComponent)
app.use(router)
app.component('DemoBlock', demoBlock)
app.mount('#app')