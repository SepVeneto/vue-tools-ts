import {defineComponent } from 'vue'
export default defineComponent({
  name: 'SimpleTable',
  props: {
    data: Object,
    config: {
      type: Object,
      required: true,
    }
  },
  setup(props, context) {
    return () => (
      <el-table
        data={props.data}
      >
        {props.config.map(config => (
          <el-table-column {...config} />
        ))}
      </el-table>
    )
  }
})