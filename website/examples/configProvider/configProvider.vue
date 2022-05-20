<template>
  <bc-config-provider v-bind="globalConfig">
    <el-row style="width: 100vw; max-width: 100%" :gutter="10">
      <el-col :span="16">
        <bc-search
          v-model="params"
          :search="handleSearch"
          :config="searchConfig"
        />
        <bc-table
          ref="tableRef"
          :config="tableConfig"
          :api="getList"
        />
      </el-col>
      <el-col :span="8">
        <el-form>
          <el-form-item label="pageName: ">
            <bc-input v-model="globalConfig.table.pageName" width="120px" />
          </el-form-item>
          <el-form-item label="table.arrayName: ">
            <bc-input v-model="globalConfig.table.arrayName" width="120px" />
          </el-form-item>
          <el-form-item label="select.label: ">
            <bc-input v-model="globalConfig.select.label" />
          </el-form-item>
          <el-form-item label="select.value: ">
            <bc-input v-model="globalConfig.select.value" />
          </el-form-item>
          <el-form-item label="select.arrayName: ">
            <bc-input v-model="globalConfig.select.arrayName" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>  
    <pre>{{JSON.stringify(params, null, 2)}}</pre>
  </bc-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ConfigProvider',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const options = [
  {
    id: 1,
    country: '意大利',
    catalog: '战列舰',
    name: '维内托',
    originName: 'Vittorio Veneto',
    date: '1937-07-25',
    address: '里亚斯特造船厂',
    height: '237.8',
    weight: '40517',
  },
]
const searchConfig = ref([
  { catalog: 'input', prop: 'name' },
  { catalog: 'select', prop: 'options', api: getOptions }
])
const params = ref({})
const globalConfig = ref({
  table: {
    pageName: 'pageNum',
    pageSize: 'pageSize',
    arrayName: 'list',
  },
  search: {
    export: false,
  },
  select: {
    label: 'name',
    value: 'id',
    arrayName: 'list',
  }
})
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
const tableRef = ref();

function getOptions() {
  return Promise.resolve({
    data: {
      list: options,
    }
  })
}

function getList() {
  return Promise.resolve({
    data: {
      list: tableData.value,
    }
  })
}

function handleSearch() {
  tableRef.value.getList();
}
</script>
