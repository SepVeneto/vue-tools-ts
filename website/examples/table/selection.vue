<template>
  <bc-button @click="handleSelect" style="margin-bottom: 10px;">选择第二行</bc-button>
  <bc-table
    ref="tableRef"
    :config="tableConfig"
    :data="tableData"
    row-key="id"
    :row-selection="{
      selectedRowKeys,
      onChange: onSelectChange,
    }"
  ></bc-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const selectedRowKeys = ref<number[]>([1])
const tableRef = ref()
const tableConfig = [
  { type: 'select', },
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '身高', prop: 'height', unit: 'm' },
  { label: '体重', prop: 'weight', unit: 'kg' },
]
const tableData = ref([
  { name: '维内托', age: 18, height: 237.8, weight: 40517, id: 1 },
  { name: '安德烈亚•多利亚', age: 18, height: 186.9, weight: 28700, id: 2 },
])
function onSelectChange(keys: number[]) {
  selectedRowKeys.value = keys;
}
function handleSelect() {
  selectedRowKeys.value = [2]
}
</script>