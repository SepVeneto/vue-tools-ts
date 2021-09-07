import { App, Plugin } from 'vue';
import Button from './src/button.vue';

Button.install = (app: App): void => {
  app.component(Button.name, Button);
}

const _Button = Button as unknown as Plugin;

export default _Button;
export const BcButton = _Button;