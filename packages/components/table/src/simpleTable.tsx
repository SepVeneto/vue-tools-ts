import {defineComponent } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
export default defineComponent({
  name: 'SimpleTable',
  props: {
    data: Object,
    config: {
      type: Object,
      required: true,
    }
  },
  components: {
    ElTable,
    ElTableColumn,
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