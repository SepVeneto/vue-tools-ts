import { computed, defineComponent, ref } from 'vue'
import { inputProps } from './type';
import '../style.css'

export default defineComponent({
  name: 'BcInput',
  props: inputProps,
  setup(props, context) {
    const inputRef = ref();

    const inputWidth = computed(() => {
      if (typeof props.width === 'number') {
        return `${props.width}px`;
      }
      return props.width;
    });

    const borderClass = {
      none: 'no-border',
      bottom: 'bottom-border',
      all: '',
    }[props.border];
    const input = () => (
      <el-input
        ref={inputRef}
        class={['bc-input', borderClass]}
        style={{width: inputWidth.value}}
        placeholder='请输入'
        spellcheck={false}
        {...context.attrs}
        v-slots={{
          ...context.slots,
          suffix: () => context.slots.suffix?.()
        }}
      />
    )
    const text = () => (
      <span>{context.attrs.value}</span>
    )
    return props.onlyDisplay ? text : input;
  },
})