import { App, Plugin } from 'vue';
import Status from './src/index.vue';

Status.install = (app: App) => {
  app.component(Status.name, Status);
}

const _Status = Status as unknown as Plugin;
export default _Status;
export const BcStatus = _Status;