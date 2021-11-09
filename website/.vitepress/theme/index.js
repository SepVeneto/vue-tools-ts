import BasicComp from 'basic-components'

import VPApp, { globals } from '../vitepress'

export default {
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(BasicComp)

    globals.forEach(([comp, name]) => {
      app.component(name, comp)
    })
  }
}