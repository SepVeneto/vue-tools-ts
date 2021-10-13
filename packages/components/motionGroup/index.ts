import { App, Plugin } from 'vue';
import MotionGroup from './CssMotion.group';

MotionGroup.install = (app: App) => {
  app.component(MotionGroup.name, MotionGroup)
}

const _MotionGroup = MotionGroup as unknown as Plugin;
export default _MotionGroup;
export const BcMotionGroup = _MotionGroup;