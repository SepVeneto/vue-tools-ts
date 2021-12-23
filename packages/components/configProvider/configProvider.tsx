import { reactive } from 'vue';
import { ExtractPropTypes, PropType, provide } from 'vue';
import { defineComponent } from 'vue';
export interface TableProps {
  arrayName?: string,
  pageName?: string,
  pageSizeName?: string,
  totalName?: string,
}
export interface SelectProps {
  label?: string,
  value?: string,
  arrayName?: string,
}
export const configProviderProps = {
  table: {
    type: Object as PropType<TableProps>
  },
  select: {
    type: Object as PropType<SelectProps>
  },
  response: {
    type: Object as PropType<{ code?: string, msg?: string, data?: string }>,
  }
}
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;
export default defineComponent({
  name: 'BcConfigProvider',
  props: configProviderProps,
  setup(props, { slots, attrs }) {
    const configProvider = reactive({
      ...props,
    })
    provide('configProvider', { ...configProvider, ...attrs });
    return () => slots.default?.()
  },
})
