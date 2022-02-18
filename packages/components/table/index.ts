import { App, Plugin } from 'vue';
import Table from './src/table';

Table.install = (app: App): void => {
  app.component(Table.name, Table);
}

const _Table = Table as unknown as Plugin;

export default _Table;
export const BcTable = _Table;

export * from './src/type'
