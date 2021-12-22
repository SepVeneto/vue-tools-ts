<template>
  <!-- <custom-table
    :config="tableConfig"
    :data="tableData"
  ></custom-table> -->
  <div>test</div>
  <el-table :data="tableData">
    <el-table-column label="姓名" prop="name" />
    <!-- <el-table-column
      v-for="item in tableConfig"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    > -->
    <!-- </el-table-column> -->
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
import customTable from '../../../packages/components/table/src/simpleTable'
export default defineComponent({
  name: 'BasicTable',
})
</script>

<script lang="ts" setup>
const tableConfig = ref([
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '身高', prop: 'height', unit: 'm' },
  { label: '体重', prop: 'weight', unit: 'kg' },
])
const tableData = ref([
  { name: '维内托', age: 18, height: 237.8, weight: 40517 },
  { name: '安德烈亚•多利亚', age: 18, height: 186.9, weight: 28700 },
])
</script>