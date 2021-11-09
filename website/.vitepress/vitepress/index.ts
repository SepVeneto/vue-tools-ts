import 'normalize.css'

import '../../../packages/theme-chalk/src/index.scss'
import 'prismjs/themes/prism.css'
import './style/index.scss'

import VPApp from './components/vp-app.vue'
import VPDemo from './components/vp-demo.vue'

console.log('created')
export default VPApp
export const globals = [
  [VPDemo, 'Demo']
]