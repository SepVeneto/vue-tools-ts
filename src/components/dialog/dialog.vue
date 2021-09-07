<script lang="tsx">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'BcDialog',
  // inheritAttrs: false, // 不被作为props的attributes不会暴露在组件的根元素上
  emits: ['update:modelValue', 'cancel', 'submit'],
  props: {
    noFooter: Boolean
  },
  setup(props, context) {
    const fullscreen = ref(false);
    const isFullscreen = ref(false);

    fullscreen.value = !!context.attrs.fullscreen;
    isFullscreen.value = !!context.attrs.fullscreen || context.attrs.fullscreen === '';

    function handleFullScreen() {
      fullscreen.value = !fullscreen.value;
    }
    function handleCancel() {
      context.emit('update:modelValue', false);
      context.emit('cancel');
    }

    const footer = () => (
      <footer>
        <el-button onClick={handleCancel}>取消</el-button>
        <el-button onClick={() => context.emit('submit')}>确认</el-button>
      </footer>
    );
    const title = () => (
      <header class="dialog-title">
        <span class="text">{context.attrs.title}</span>
        {!isFullscreen.value && <i class="icon el-icon-full-screen" onClick={handleFullScreen}></i>}
      </header>
    );
    const dialog = () => (
      <el-dialog
        close-on-click-modal={false}
        fullscreen={fullscreen.value}
        {...{
          'onUpdate:modelValue': (visible:boolean) => context.emit('update:modelValue', visible),
        }}
        {...context.attrs}
        v-slots={{
          title,
          footer: () => (!props.noFooter && (context.slots?.footer || footer()))
        }}
      >
        <el-scrollbar
          ref="scrollbar"
          class={['scrollbar', { isFullscreen: context.attrs.fullscreen || context.attrs.fullscreen === '' }]}>
          {context.slots.default?.()}
        </el-scrollbar>
      </el-dialog>
    );
    return dialog;
  }
})
</script>

<style lang="scss" scoped>
.dialog-title {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  .icon {
    align-self: flex-start;
    cursor: pointer;
  }
  .text {
    font-size: 18px;
  }
}
.scrollbar {
  :deep(.el-scrollbar__wrap) {
    max-height: 500px;
    padding-bottom: 17px;
  }
  :deep(.el-scrollbar__view) {
    padding-right: 14px;
  }
}
.isFullscreen {
  &:deep(.el-scrollbar__wrap) {
    max-height: calc(100vh - 200px);
  }
}
</style>
