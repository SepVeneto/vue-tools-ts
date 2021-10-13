<template>
  <el-pagination
    class="custom-pagination"
    :background="background"
    style="text-align: right"
    :page-sizes="pageSizes || [5, 10, 20, 50]"
    :layout="layout"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
export default {
  name: 'BcTablePagination',
  props: {
    pageSizes: Array,
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    },
    background: {
      type: Boolean,
      default: true,
    }
  },
}
</script>
