<template>
  <bc-select v-model="select" width="180px" :api="getOptions" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Api',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const select = ref('');
function getOptions() {
  return Promise.resolve({
    data: [
      { label: '维托里奥 维内托', value: 'vv' },
      { label: '安德烈亚 多利亚', value: 'Andrea Doria' },
    ]
  })
}
</script>