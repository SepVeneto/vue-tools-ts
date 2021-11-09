<template>
  <div style="margin-bottom: 10px">
    <bc-button type="primary" @click="handleSearch">搜索</bc-button>
  </div>
  <bc-table
    ref="tableRef"
    :config="tableConfig"
    :api="getList"
    row-key="name"
  >
  </bc-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Remote',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const tableConfig = ref([
  { label: '国籍', prop: 'country' },
  { label: '生日', prop: 'date' },
  { label: '舰种', prop: 'catalog' },
  { label: '姓名', prop: 'name' },
  { label: '原名', prop: 'originName' },
  { label: '地址', prop: 'address' },
  { label: '身高', prop: 'height' },
  { label: '体重', prop: 'weight' },
])
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
const tableRef = ref();
function handleSearch() {
  tableRef.value.getList();
}
function getList() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          data: tableData.value,
        }
      })
    }, 1000)
  })
}
</script>
