<template>
  <bc-search
    v-model="params"
    :config="searchConfig"
    :search="handleSearch"
  >
    <bc-button>测试</bc-button>
  </bc-search>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Default',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const searchConfig = ref([
  { catalog: 'input', name: '名称', prop: 'name' },
])
const params = ref({
  name: 'veneto'
})
// const defaultValue = ref({
//   name: 'veneto'
// })

function handleSearch() {
  console.log('trigger search');
}

</script>
