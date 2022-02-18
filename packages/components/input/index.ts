import { App, Plugin } from 'vue';
import Input from './src/input';

Input.install = (app: App): void => {
  app.component(Input.name, Input);
}

const _Input = Input as unknown as Plugin;

export default _Input;
export const BcInput = _Input;

export * from './src/type'