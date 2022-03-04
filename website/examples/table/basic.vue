<template>
  <bc-button @click="clear">clear</bc-button>
  <bc-table
    ref="tableRef"
    :config="tableConfig"
    :data="tableData"
  ></bc-table>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
export default defineComponent({
  name: 'BasicTable',
})
</script>

<script lang="ts" setup>
const tableRef = ref()
const tableConfig = [
  { type: 'selection', },
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '身高', prop: 'height', unit: 'm' },
  { label: '体重', prop: 'weight', unit: 'kg' },
]
const tableData = ref([
  { name: '维内托', age: 18, height: 237.8, weight: 40517 },
  { name: '安德烈亚•多利亚', age: 18, height: 186.9, weight: 28700 },
])
function clear() {
  tableRef.value.clearSelection();
}
</script>