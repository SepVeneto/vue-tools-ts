import { App, Plugin } from '@vue/runtime-dom';
import Upload from './upload.vue';
Upload.install = (app: App) => {
  app.component(Upload.name, Upload);
}

const _Upload = Upload as unknown as Plugin;
export default _Upload;
export const BcUpload = _Upload;