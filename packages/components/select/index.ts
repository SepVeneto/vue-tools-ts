import { App, Plugin } from 'vue';
import Select from './src/select.vue';

Select.install = (app: App) => {
  app.component(Select.name, Select);
}

const _Select = Select as unknown as Plugin;
export default _Select;
export const BcSelect = _Select;

export * from './src/type'