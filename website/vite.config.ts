import path from 'path'
// import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
// import { projRoot } from './.vitepress/utils/paths'
import type { Alias } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

const alias: Alias[] = []
// if (process.env.DOC_ENV !== 'production') {
//   alias.push(
//     {
//       find: /^element-plus(\/(es|lib))?$/,
//       replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
//     },
//     {
//       find: /^element-plus\/(es|lib)\/(.*)$/,
//       replacement: `${path.resolve(projRoot, 'packages')}/$2`,
//     }
//   )
// }

export default defineConfig({
  server: {
    host: true,
    fs: {
      strict: true,
      // 需要访问根目录node_modules中element-plus的字体文件
      allow: [path.resolve(__dirname, '..')],
    },
  },
  plugins: [
    vueJsx()
  ]
  // resolve: {
  //   alias,
  // },
  // plugins: [Inspect()],
  // optimizeDeps: {
  //   include: ['@vueuse/core', 'dayjs'],
  // },
})
