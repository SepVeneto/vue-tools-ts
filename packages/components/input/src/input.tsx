import { computed, defineComponent, ref } from 'vue'
import { inputProps } from './type';
import '../style.css'

export default defineComponent({
  name: 'BcInput',
  props: inputProps,
  setup(props, context) {
    const passwordVisible = ref<boolean>(false);
    const inputRef = ref();

    const inputWidth = computed(() => {
      if (typeof props.width === 'number') {
        return `${props.width}px`;
      }
      return props.width;
    });
    const passwordStyle = computed(() => {
      const { type } = context.attrs;
      if (type === 'password') {
        return '';
      } else if (props.password && !passwordVisible.value) {
        return 'disc';
      }
      return '';
    })

    function showPassword(bool: boolean) {
      passwordVisible.value = bool;
    }
    // function focus() {
    //   inputRef.value.focus();
    // }
    // function blur() {
    //   inputRef.value.blur();
    // }

    const borderClass = {
      none: 'no-border',
      bottom: 'bottom-border',
      all: '',
    }[props.border];
    const passwordSuffix = () => (
      <i
        class="el-input__icon el-icon-view el-input__clear"
        style="text-security: none"
        onClick={() => { showPassword(!passwordVisible.value) }}
      ></i>
    )
    const input = () => (
      <el-input
        ref={inputRef}
        class={['bc-input', borderClass]}
        style={{width: inputWidth, 'text-security': passwordStyle}}
        placeholder='请输入'
        spellcheck={false}
        {...context.attrs}
        v-slots={{
          ...context.slots,
          suffix: () => context.slots.suffix?.() || (props.password && passwordSuffix())
        }}
      />
    )
    const text = () => (
      <span>{context.attrs.value}</span>
    )
    return props.onlyDisplay ? text : input;
  },
})