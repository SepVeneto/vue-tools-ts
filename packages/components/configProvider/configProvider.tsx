import { reactive } from 'vue';
import { ExtractPropTypes, PropType, provide } from 'vue';
import { defineComponent } from 'vue';
interface TableProps {
  arrayName?: string,
  pageName?: string,
  pageSizeName?: string,
}
interface SelectProps {
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
}
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;
export default defineComponent({
  name: 'BcConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const configProvider = reactive({
      ...props,
    })
    provide('configProvider', configProvider);
    return () => slots.default?.()
  },
})
