import { reactive } from 'vue';
import { provide } from 'vue';
import { defineComponent } from 'vue';
import { configProviderProps } from './type'

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
