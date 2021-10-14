import { defineAsyncComponent } from '@vue/runtime-core';
import config from './nav.config.json';

const LoadingComponent = {
  template: `<div v-loading="true" style="min-height: 500px; width: 100%;"></div>`
}
const ErrorComponent = {
  template: `
  <div style="text-align: center; padding: 100px 0;">Loading error. Please refresh the page and try again</div>`
}

const getAsyncComponent = (func) => {
  return defineAsyncComponent({
    loader: func,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  })
}

const load = (path) => {
  return getAsyncComponent(() => (
    import(`./docs${path}.md`)
  ))
}

let route = registerRoute(config)

function registerRoute(config) {
  const routes = [];
  config.forEach(item => {
    const component = load(item.path);
    routes.push({
      path: item.path,
      name: `compoent-${item.name}`,
      meta: {
        title: item.name
      },
      component,
    })
  })
  return routes;
}

export default route;