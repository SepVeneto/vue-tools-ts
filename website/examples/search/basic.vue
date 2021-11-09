<template>
  <bc-search
    v-model="params"
    :config="searchConfig"
    :search="handleSearch"
    create
    @create="handleCreate"
    @export="handleExport"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Basic',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const searchConfig = ref([
  { catalog: 'input', name: '名称', prop: 'name' },
])
const params = ref({})

function handleSearch() {
  console.log('trigger search');
}

function handleExport() {
  console.log('trigger export');
}
function handleCreate() {
  console.log('trigger create', params.value);
}
</script>
