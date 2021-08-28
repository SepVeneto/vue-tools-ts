import { SFCWithInstall } from 'element-plus/es/utils/types';
import { App } from 'vue';
import Button from './src/button.vue';

Button.install = (app: App): void => {
  app.component(Button.name, Button);
}

const _Button = Button as any as SFCWithInstall<typeof Button>;

export default _Button;
export const BcButton = _Button;