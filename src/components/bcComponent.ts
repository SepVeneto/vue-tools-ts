import { App } from 'vue';
import components from './index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const installer = function() {
  const install = (app: App) => {
    app.use(ElementPlus, {
      locale: zhCn,
    });
    components.forEach(item => {
      app.use(item)
    })
  }
  return {
    install,
  }
}

export default installer();