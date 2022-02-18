import { App, Plugin } from 'vue';
import Button from './src/button';

Button.install = (app: App): void => {
  app.component(Button.name, Button);
}

const _Button = Button as unknown as Plugin;

export default _Button;
export const BcButton = _Button;

export * from './src/type'