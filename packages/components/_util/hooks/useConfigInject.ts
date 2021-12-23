import { computed, inject, UnwrapRef } from "vue"
import { ConfigProviderProps } from '../../configProvider/configProvider';
import { SelectProps } from "../../select/type";

export default <T>(name: string, props: T) => {
  const configProvider = inject<UnwrapRef<ConfigProviderProps>>('configProvider', {});
  const table = computed(() => configProvider.table)
  const pageName = computed<string>(() => configProvider.table?.pageName || 'page');
  const pageSizeName = computed<string>(() => configProvider.table?.pageSizeName || 'rows');
  const arrayName = computed<string>(() => configProvider.table?.arrayName || 'data');
  const label = computed<string>(() => configProvider.select?.label || (props as SelectProps).customLabel || 'label');
  const value = computed<string>(() => configProvider.select?.value || (props as SelectProps).customValue || 'value');
  const optionsName = computed<string>(() => configProvider.select?.arrayName || (props as SelectProps).arrayName || 'rows');
  const response = computed(() => configProvider.response);
  return {
    table,
    pageName,
    pageSizeName,
    arrayName,
    label,
    value,
    optionsName,
    response,
  }
};