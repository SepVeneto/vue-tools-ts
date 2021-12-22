<template>
  <bc-select
    v-model="select"
    v-model:label="label"
    width="180px"
    :options="options"
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
const select = ref('')
const label = ref('')
const options = ref([
  { label: '维托里奥 维内托', value: 'vv' },
  { label: '安德烈亚 多利亚', value: 'Andrea Doria' },
])

</script>
