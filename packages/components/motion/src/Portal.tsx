import { computed, defineComponent } from 'vue'
import CssMotion from './CssMotion.vue'
export default defineComponent({
  name: 'Portal',
  components: {
    CssMotion,
  },
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(bool) {
        emit('update:modelValue', bool)
      }
    })
    return {
      visible
    }
  },
  render() {
    return true
      && <css-motion {...{
        ...this.$attrs,
        show: this.modelValue,
        onLeaved: () => this.visible = false
      }}>{this.$slots.default?.()}</css-motion>
  }
})