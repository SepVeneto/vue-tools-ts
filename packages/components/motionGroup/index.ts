import { App, Plugin } from 'vue';
import MotionGroup from './src/CssMotion.group';

MotionGroup.install = (app: App) => {
  app.component(MotionGroup.name, MotionGroup)
}

const _MotionGroup = MotionGroup as unknown as Plugin;
export default _MotionGroup;
export const BcMotionGroup = _MotionGroup;

export * from './src/type'