import BasicComp from 'basic-components'
import ElementPlus from 'element-plus'

import VPApp, { globals } from '../vitepress'

export default {
  Layout: VPApp,
  enhanceApp: async ({ app }) => {
    app.use(ElementPlus, {
      // locale: await import('element-plus/es/locale/lang/zh-cn')
    })
    app.use(BasicComp)

    globals.forEach(([comp, name]) => {
      app.component(name, comp)
    })
  }
}