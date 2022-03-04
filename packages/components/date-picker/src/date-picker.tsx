import { useConfigInject } from '@basic-components/hooks'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'BcDatePicker',
  props: {
    width: [String, Number],
    dayEnd: Boolean,
  },
  setup(props, { attrs }) {
    const { datePicker } = useConfigInject('datePicker', props)
    const realWidth = computed(() => {
      if (typeof props.width === 'string') {
        return props.width
      } else {
        return `${props.width}px`
      }
    })
    const type = computed(() => attrs.type as string | undefined)
    const timeRange = ['1111-11-11 00:00:00', '1111-11-11 23:59:59']
    const rangeDefaultConfig = {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      rangeSeparator: '至',
      defaultTime: props.dayEnd && type.value === 'datetimerange' ? timeRange : []
    }
    return {
      realWidth,
      rangeDefaultConfig,
      type,
      timeRange,
      datePicker,
    }
  },
  render() {
    return (<el-date-picker
      value-format={this.datePicker?.valueFormat}
      {...(this.type?.includes('range') ? this.rangeDefaultConfig: {})}
      {...this.$attrs}
      style={{ width: this.realWidth }}
    />)
  }
})
