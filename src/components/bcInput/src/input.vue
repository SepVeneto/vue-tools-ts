<script lang="tsx">
import { computed, defineComponent, ref, PropType } from 'vue'

type IInputBorder = PropType<'none' | 'bottom' | 'all'>;

export default defineComponent({
  name: 'BcInput',
  props: {
    defaultValue: [String, Number],
    onlyDisplay: Boolean,
    border: {
      type: String as IInputBorder,
      validator: (val: string) => {
        return ['none', 'bottom', 'all'].includes(val);
      },
      default: 'all',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    password: Boolean,
  },
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
</script>

<style>
.bc-input.no-border > .el-input__inner {
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 0;
  border: 0;
  font-family: 'YaHei';
  line-height: 1.5;
}
.bc-input.no-border > .el-textarea__inner {
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 0;
  border: 0;
  font-family: 'YaHei';
  line-height: 1.5;
  resize: none;
  padding: 0;
}
.bc-input.bottom-border > .el-input__inner {
  background-color: transparent;
  border-radius: initial;
  padding-left: 0;
  border: 0;
  border-bottom: 1px solid #DCDFE6;
  font-family: 'YaHei';
  line-height: 1.5;
}
.bc-input.bottom-border > .el-textarea__inner {
  background-color: transparent;
  border-radius: initial;
  padding-left: 0;
  border: 0;
  border-bottom: 1px solid #DCDFE6;
  font-family: 'YaHei';
  line-height: 1.5;
  resize: none;
}
</style>
