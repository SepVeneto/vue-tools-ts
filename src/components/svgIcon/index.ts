import { App, Plugin } from 'vue';
import SvgIcon from './svgIcon.vue';
// import '@/assets/icons';

SvgIcon.install = (app: App): void => {
  app.component(SvgIcon.name, SvgIcon);
}

const _SvgIcon = SvgIcon as unknown as Plugin;

export default _SvgIcon;
export const BcInput = _SvgIcon;