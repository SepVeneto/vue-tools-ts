import { SFCWithInstall } from 'element-plus/es/utils/types';
import { App, Plugin } from 'vue';
import Input from './src/input.vue';

Input.install = (app: App): void => {
  app.component(Input.name, Input);
}

const _Input = Input as any as Plugin;

export default _Input;
export const BcInput = _Input;