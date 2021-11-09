<template>
  <bc-table
    :config="tableConfig"
    :data="tableData"
  >
  </bc-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MultipleHeader',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const tableConfig = ref([
  { label: '国籍', prop: 'country' },
  { label: '生日', prop: 'date', width: 100 },
  { label: '舰种', prop: 'catalog' },
  { label: '个人信息', prop: 'info', children: [
    { label: '姓名', prop: 'name', width: 150 },
    { label: '原名', prop: 'originName', editable: true, width: 200 },
    { label: '地址', prop: 'address', width: 150 },
    { label: '身高', prop: 'height' },
    { label: '体重', prop: 'weight' },
  ] }
]);
const tableData = ref([
  {
    country: '意大利',
    catalog: '战列舰',
    name: '维内托',
    originName: 'Vittorio Veneto',
    date: '1937-07-25',
    address: '里亚斯特造船厂',
    height: '237.8',
    weight: '40517',
  },
  {
    country: '意大利',
    name: '安德烈亚•多利亚',
    catalog: '战列舰',
    originName: 'Andrea Doria',
    date: '1913-03-30',
    address: '拉斯佩齐亚船厂',
    height: '186.9',
    weight: '28700',
  },
  {
    country: '意大利',
    catalog: '驱逐舰',
    name: '乌戈里尼·维瓦尔迪',
    originName: 'Ugolino Vivaldi',
    date: '1929-01-09',
    address: '西赛斯特里造船厂',
    height: '107.3',
    weight: '1900',
  },
  {
    country: '苏联',
    catalog: '战列舰',
    name: '苏联',
    originName: 'Советский Союз',
    date: '2017-02-01',
    address: '波罗的海造船厂',
    height: '269.4',
    weight: '59150',
  },
]);
</script>
