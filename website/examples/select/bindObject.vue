<template>
  <bc-select
    v-model="select"
    width="180px"
    option-key="alias"
    custom-label="name"
    custom-value="detail"
    :options="options"
  />
  <pre>{{JSON.stringify(select, null, 2)}}</pre>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BindObject',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const select = ref('')
const options = ref([
  { name: '维内托 维托里奥', detail: {
    alias: 'vv',
    allName: 'Vittorio Veneto'
  }},
  { name: '安德烈亚 多利亚', detail: {
    alias: '女儿',
    allName: 'Andrea Doria'
  }},
])
</script>