import { App, Plugin } from 'vue';
import Dialog from './src/dialog';
Dialog.install = (app: App) => {
  app.component(Dialog.name, Dialog);
}

const _Dialog = Dialog as unknown as Plugin;
export default _Dialog;
export const BcDialog = _Dialog;

export * from './src/type'