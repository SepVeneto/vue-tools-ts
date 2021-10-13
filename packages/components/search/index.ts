import Search from './search';
import { App, Plugin } from 'vue';
Search.install = (app: App) => {
  app.component(Search.name, Search);
}

const _BcSearch = Search as unknown as Plugin;
export default _BcSearch;
export const BcSearch = _BcSearch;