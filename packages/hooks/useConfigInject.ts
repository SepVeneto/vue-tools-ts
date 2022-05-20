import { computed, inject, UnwrapRef } from "vue"
import { ConfigProviderProps } from '@basic-components/components/configProvider';
import { SelectProps } from "@basic-components/components/select";

export const useConfigInject = <T>(name: string, props: T) => {
  const configProvider = inject<UnwrapRef<ConfigProviderProps>>('configProvider', {});
  const table = computed(() => configProvider.table)
  const pageName = computed<string>(() => configProvider.table?.pageName || 'page');
  const pageSizeName = computed<string>(() => configProvider.table?.pageSizeName || 'rows');
  const arrayName = computed<string>(() => configProvider.table?.arrayName || 'data');
  const label = computed<string>(() => configProvider.select?.label || (props as SelectProps).customLabel || 'label');
  const value = computed<string>(() => configProvider.select?.value || (props as SelectProps).customValue || 'value');
  const optionsName = computed<string>(() => configProvider.select?.arrayName || (props as SelectProps).arrayName || 'rows');
  const response = computed(() => configProvider.response);
  const datePicker = computed(() => configProvider.datePicker)
  return {
    search: configProvider.search,
    datePicker,
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