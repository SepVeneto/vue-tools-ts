import { computed, defineComponent, ref } from 'vue'
import { inputProps } from './type';
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElInput, ElMessage } from 'element-plus'
// import '../style.css'
import { copyText } from 'packages/components/_util/tools';

export default defineComponent({
  name: 'BcInput',
  props: inputProps,
  components: {
    DocumentCopy
  },
  setup(props, context) {
    const inputRef = ref<typeof ElInput>();

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
    const copyOptions = typeof props.copy === 'boolean' ? { size: 20 } : props.copy
    const suffix = () => (
      <>
        {props.copy &&
          <el-icon size={copyOptions.size ?? 20} color={copyOptions.color} onClick={handleCopy}>
            {context.slots.icon?.() ?? <document-copy />}
          </el-icon>
        }
        {context.slots.suffix?.()}
      </>
    )
    async function handleCopy() {
      await copyText(inputRef.value?.modelValue)
      ElMessage.success('复制成功')
    }
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
          // suffix: () => context.slots.suffix?.()
          suffix,
        }}
      />
    )
    const text = () => (
      <span>{context.attrs.value}</span>
    )
    return props.onlyDisplay ? text : input;
  },
})