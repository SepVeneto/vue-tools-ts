<template>
  <bc-table
    :config="tableConfig"
    :data="tableData"
  >
    <template #country-header="{column}">
      <div style="display: flex; align-items: center;">
        <el-icon :size="20" style="margin-right: 10px">
          <svg t="1636083394948" class="icon" viewBox="0 0 1546 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4761" width="200" height="200"><path d="M11.321867 1017.710074h1520.904177V6.289926H11.321867v1011.420148z m1524.678133 3.773955v-3.773955 3.773955zM5.031941 1024V0h1533.48403v1024H5.031941z" fill="#353636" p-id="4762"></path><path d="M8.805897 2.515971h1527.194103V1020.226044H8.805897z" fill="#D64B24" p-id="4763"></path><path d="M264.176904 118.250614l32.707617 99.380836h104.412776L317.012285 278.014742l31.449631 99.380835L264.176904 315.7543l-84.285012 61.641277 32.707617-99.380835-84.285013-60.383292h104.412777zM535.90172 65.415233l-1.257985 35.223588 31.449631 12.579852-33.965602 8.805897-1.257985 33.965602-18.869779-28.933661-32.707617 7.547912 21.38575-26.417691-17.611794-28.933661 31.449632 13.837838zM652.894349 177.375921l-15.095823 30.191647 23.90172 23.901719-33.965602-5.031941-15.095823 30.191647-5.031941-33.965602-33.965602-5.031941L603.832924 202.535627l-5.031941-33.965602 23.90172 23.901719zM617.670762 315.7543l11.321867 32.707616h33.965602l-27.675676 20.127765 10.063882 32.707616-27.675675-20.127764-27.675676 20.127764 11.321867-32.707616-27.675675-20.127765h33.965602zM535.90172 421.425061l-2.515971 33.965602 32.707617 12.579853-33.965602 8.805897-2.51597 33.965602-17.611794-28.933661-33.965602 8.805897 22.643735-26.417691-18.869779-28.933661 32.707617 12.579853z" fill="#FBDC00" p-id="4764"></path></svg>
        </el-icon>
        <span>{{column.label}}</span>
      </div>  
    </template>
    <template #name="{row}">
      <span>{{row.name}}</span>
    </template>
    <template #operate="{row}">
      <bc-button type="text" @click="handleEdit(row)">编辑</bc-button>
      <bc-button type="text" @click="handleRemove(row)">删除</bc-button>
    </template>
  </bc-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CustomHeader',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const tableConfig = ref([
  { label: '国籍', prop: 'country', header: true },
  { label: '生日', prop: 'date' },
  { label: '舰种', prop: 'catalog' },
  { label: '姓名', prop: 'name' },
  { label: '原名', prop: 'originName' },
  { label: '操作', prop: 'operate' }
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
function handleEdit(row) {
  console.log('edit', row);
}
function handleRemove(row) {
  console.log('remove', row)
}
</script>
