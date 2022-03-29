<template>
  <el-pagination
    class="bc-pagination"
    :background="background"
    style="text-align: right"
    :page-sizes="pageSizes || [5, 10, 20, 50]"
    :layout="layout"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElPagination } from 'element-plus'
export default defineComponent({
  name: 'BcTablePagination',
  inheritAttrs: false,
  props: {
    pageSizes: Array as PropType<number[]>,
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    },
    background: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    ElPagination,
  },
})
</script>
