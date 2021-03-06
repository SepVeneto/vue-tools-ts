import sidebar from '../sidebar.json'
import { mdPlugin } from './plugins'
const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
    'slots',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

export const config = {
  base: '/vue-tools-ts/',
  title: 'basic说明文档',
  description: 'basic说明文档',
  themeConfig: {
    sidebar,
  },
  lang: 'zh-CN',

  markdown: {
    config: (md) => mdPlugin(md)
  },
  vue: {
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: buildTransformers()
      }
    }
  }
}
