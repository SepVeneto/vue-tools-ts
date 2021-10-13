import { computed, defineComponent } from "vue";
import { ElMessageBox } from 'element-plus';
import { buttonProps } from './type';

const SPECIAL = Object.freeze<string>([])

export default defineComponent({
  name: 'BcButton',
  emits: ['click'],
  props: buttonProps,
  setup(props, context) {
    const isSpecialButton = computed(() => {
      return SPECIAL.includes(props.type)
    })
    const specialIcon = computed(() => {
      if (!isSpecialButton.value) {
        return null;
      }
      return `bc${props.type.replace(/\S?/, letter => letter.toUpperCase())}`;
    })

    function handleClick(event: MouseEvent) {
      if (props.confirm || props.type === 'delete' || props.type === 'danger') {
        const confirmText = typeof props.confirm === 'boolean' ? '此操作无法撤销，是否继续？' : props.confirm;
        ElMessageBox.confirm(confirmText, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          context.emit('click', event);
        }).catch(() => ({}))
      } else {
        context.emit('click', event);
      }
    }
    const tooltip = (node: () => JSX.Element) => (
      <el-tooltip
        placement="top"
        v-slots={{content: () => <span>{context.slots.default?.()}</span>}}
      >
        <span>{node()}</span>
      </el-tooltip>
    )
    const button = () => (
      <el-button
        class={['bc-button', {mini: props.mini || isSpecialButton}]}
        {...{
          ...context.attrs,
          type: props.type === 'delete' ? 'danger' : (isSpecialButton.value ? 'primary' : props.type),
          tooltip: isSpecialButton.value || props.tooltip,
          onClick: handleClick,
        }}
      >
        {(props.icon || isSpecialButton.value) && !context.attrs.loading
          && <svg-icon icon={props.icon || specialIcon.value} />}
        <span>{isSpecialButton.value || props.tooltip || context.slots.default?.()}</span>
      </el-button>
    )
    return () => (context.slots.default && (props.tooltip || isSpecialButton.value))
      ? tooltip(button)
      : button()
  },
});
