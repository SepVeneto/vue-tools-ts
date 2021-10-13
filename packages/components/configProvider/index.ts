import { App, Plugin } from "vue";
import ConfigProvider from "./configProvider";

ConfigProvider.install = (app: App): void => {
  app.component(ConfigProvider.name, ConfigProvider);
}

const _ConfigProvider = ConfigProvider as unknown as Plugin;
export default _ConfigProvider
export const BcConfigProvider = _ConfigProvider