import { App, Plugin } from 'vue';
import Motion from './CssMotion.vue';

Motion.install = (app: App) => {
  app.component(Motion.name, Motion)
}

const _Motion = Motion as unknown as Plugin;
export default _Motion;
export const BcMotion = _Motion;