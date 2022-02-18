import 'normalize.css'

import '../../../packages/theme-chalk/src/index.scss'
import 'prismjs/themes/prism.css'
import './style/index.scss'
import 'element-plus/theme-chalk/index.css'

import VPApp from './components/vp-app.vue'
import VPDemo from './components/vp-demo.vue'

export default VPApp
export const globals = [
  [VPDemo, 'Demo']
]