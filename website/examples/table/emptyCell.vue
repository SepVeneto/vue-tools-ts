<template>
  <bc-table
    :config="tableConfig"
    :data="tableData"
    empty-text="N/A"
  />
  <bc-table
    style="margin-top: 20px;"
    :config="tableConfig"
    :data="tableData"
    :empty-text="renderEmptyCell"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
const tableConfig = shallowRef([
  { label: '国籍', prop: 'country' },
  { label: '生日', prop: 'date', width: 100 },
  { label: '舰种', prop: 'catalog' },
  { label: '姓名', prop: 'name', width: 150 },
  { label: '原名', prop: 'originName', width: 200 },
  { label: '地址', prop: 'address', width: 150 },
  { label: '身高', prop: 'height' },
  { label: '体重', prop: 'weight' },
])
const tableData = shallowRef([
  {
    country: '意大利',
    catalog: '战列舰',
    name: '维内托',
    originName: 'Vittorio Veneto',
    date: '1937-07-25',
    address: '里亚斯特造船厂',
  },
  {
    country: '意大利',
    name: '安德烈亚•多利亚',
    catalog: '战列舰',
    originName: 'Andrea Doria',
    date: '1913-03-30',
    address: '拉斯佩齐亚船厂',
  },
  {
    country: '意大利',
    catalog: '驱逐舰',
    name: '乌戈里尼·维瓦尔迪',
    originName: 'Ugolino Vivaldi',
    date: '1929-01-09',
    address: '西赛斯特里造船厂',
  },
  {
    country: '苏联',
    catalog: '战列舰',
    name: '苏联',
    originName: 'Советский Союз',
    date: '2017-02-01',
    address: '波罗的海造船厂',
  },
]);
function renderEmptyCell(val: string | number, column: Record<string, string | number>) {
  if (column.property === 'weight') {
    return val === '' ? 'N/A' : val
  } else {
    return val === '' ? '--' : val
  }
}
</script>
