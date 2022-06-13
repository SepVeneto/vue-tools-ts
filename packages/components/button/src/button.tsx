import { computed, defineComponent } from "vue";
import { ElMessageBox, ElButton, ElTooltip } from 'element-plus';
import { buttonProps } from './type';

const SPECIAL = Object.freeze<string>([])

export default defineComponent({
  name: 'BcButton',
  emits: ['click'],
  props: buttonProps,
  components: {
    ElButton,
    ElTooltip
  },
  setup(props, context) {
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
    const spanContent = !props.tooltip ? (context.slots.default?.() || false) : false
    const button = () => (
      <el-button
        class={['bc-button', {mini: props.mini }]}
        {...{
          ...context.attrs,
          type: props.type,
          tooltip: props.tooltip,
          onClick: handleClick,
        }}
      >
        <span>{spanContent}</span>
      </el-button>
    )
    const iconButton = () => (
      <el-button
        class={['bc-button', {mini: props.mini }]}
        {...{
          ...context.attrs,
          type: props.type,
          tooltip: props.tooltip,
          onClick: handleClick,
        }}
      />
    )
    return () => (context.slots.default && props.tooltip)
      ? tooltip(iconButton)
      : (context.attrs.icon ? iconButton() : button())
  },
});
