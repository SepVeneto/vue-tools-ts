import { App } from 'vue';
import components from './index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const installer = function() {
  const install = (app: App) => {
    app.use(ElementPlus);
    components.forEach(item => {
      app.use(item)
    })
  }
  return {
    install,
  }
}

export default installer();