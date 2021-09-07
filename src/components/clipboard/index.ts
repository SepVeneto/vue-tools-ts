import { App, Plugin } from '@vue/runtime-dom';
import Clipboard from './clipboard.vue';
Clipboard.install = (app: App) => {
  app.component(Clipboard.name, Clipboard);
}

const _Clipboard = Clipboard as unknown as Plugin;
export default _Clipboard;
export const BcClipboard = _Clipboard;
